import { Pool } from "pg";

// Database connection
const pool = new Pool({
  user: process.env.PG_USER || "postgres",
  host: process.env.PG_HOST || "localhost",
  database: process.env.PG_DATABASE || "agent-portal",
  password: process.env.PG_PASSWORD || "postgres12345",
  port: Number(process.env.PG_PORT) || 5432,
});

// Map actions to status
const statusMap: { [key: string]: string } = {
  login: "active",
  logout: "suspended",
};

// Map actions to agent_status
const agentStatusMap: { [key: string]: string } = {
  ready: "READY",
  pause: "PAUSE",
  "in-call": "IN-CALL",
};

/**
 * Get all workspaces from the database
 */
export async function getAllWorkspaces() {
  try {
    const result = await pool.query(
      "SELECT id, agent_name as agent, status, agent_status as \"agentStatus\" FROM workspaces ORDER BY created_at DESC"
    );
    console.log("Fetched workspaces:", result.rows);
    return {
      success: true,
      data: result.rows,
    };
  } catch (error) {
    console.error("Error fetching workspaces:", error);
    return {
      success: false,
      error: "Failed to fetch workspaces",
    };
  }
}

/**
 * Update workspace status (login/logout)
 * When login: status -> "active", agent_status -> "READY"
 * When logout: status -> "suspended", agent_status -> "PAUSE"
 */
export async function updateWorkspaceStatus(
  workspaceId: string,
  action: "login" | "logout"
) {
  try {
    if (!statusMap[action]) {
      return {
        success: false,
        error: "Invalid action",
      };
    }

    const newStatus = statusMap[action];
    const autoAgentStatus = action === "login" ? "READY" : "PAUSE";

    console.log(
      `Updating workspace ${workspaceId} status to ${newStatus} and agent_status to ${autoAgentStatus}`
    );

    const result = await pool.query(
      "UPDATE workspaces SET status = $1, agent_status = $2 WHERE id = $3 RETURNING *",
      [newStatus, autoAgentStatus, workspaceId]
    );

    if (result.rowCount === 0) {
      return {
        success: false,
        error: "Workspace not found",
      };
    }

    return {
      success: true,
      message: "Workspace updated successfully",
      data: result.rows[0],
    };
  } catch (error) {
    console.error("Error updating workspace status:", error);
    return {
      success: false,
      error: "Failed to update workspace",
    };
  }
}

/**
 * Update workspace agent status (READY/PAUSE/IN-CALL)
 * Only allows change if workspace status is "active" (logged in)
 */
export async function updateWorkspaceAgentStatus(
  workspaceId: string,
  action: "ready" | "pause" | "in-call"
) {
  try {
    if (!agentStatusMap[action]) {
      return {
        success: false,
        error: "Invalid action",
      };
    }

    // Check if user is logged in before allowing agent_status change
    const workspace = await pool.query(
      "SELECT status FROM workspaces WHERE id = $1",
      [workspaceId]
    );

    if (workspace.rowCount === 0) {
      return {
        success: false,
        error: "Workspace not found",
      };
    }

    const currentStatus = workspace.rows[0].status;

    // Only allow agent_status change if status is "active" (logged in)
    if (currentStatus !== "active") {
      return {
        success: false,
        error: "Cannot change agent status when user is not logged in",
      };
    }

    const newAgentStatus = agentStatusMap[action];
    console.log(`Updating workspace ${workspaceId} agent_status to ${newAgentStatus}`);

    const result = await pool.query(
      "UPDATE workspaces SET agent_status = $1 WHERE id = $2 RETURNING *",
      [newAgentStatus, workspaceId]
    );

    if (result.rowCount === 0) {
      return {
        success: false,
        error: "Workspace not found",
      };
    }

    console.log("Updated workspace:", result.rows[0]);
    return {
      success: true,
      message: "Agent status updated successfully",
      data: result.rows[0],
    };
  } catch (error) {
    console.error("Error updating workspace agent status:", error);
    return {
      success: false,
      error: "Failed to update workspace",
    };
  }
}
