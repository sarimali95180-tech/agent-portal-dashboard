import { NextRequest, NextResponse } from "next/server";
import {
  getAllWorkspaces,
  updateWorkspaceStatus,
  updateWorkspaceAgentStatus,
} from "@/lib/controllers/workspaceController";

// GET all workspaces
export async function GET(request: NextRequest) {
  const result = await getAllWorkspaces();

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ workspaces: result.data });
}

// POST to update a workspace
export async function POST(request: NextRequest) {
  try {
    const { workspaceId, action } = await request.json();

    if (!workspaceId || !action) {
      return NextResponse.json(
        { error: "Missing workspaceId or action" },
        { status: 400 }
      );
    }

    // Handle login/logout actions
    if (action === "login" || action === "logout") {
      const result = await updateWorkspaceStatus(workspaceId, action);

      if (!result.success) {
        const statusCode =
          result.error === "Workspace not found" ? 404 : 400;
        return NextResponse.json({ error: result.error }, { status: statusCode });
      }

      return NextResponse.json({
        message: result.message,
        workspace: result.data,
      });
    }
    // Handle ready/pause/in-call actions
    else if (action === "ready" || action === "pause" || action === "in-call") {
      const result = await updateWorkspaceAgentStatus(workspaceId, action);

      if (!result.success) {
        const statusCode =
          result.error === "Workspace not found" ? 404 : 400;
        return NextResponse.json({ error: result.error }, { status: statusCode });
      }

      return NextResponse.json({
        message: result.message,
        workspace: result.data,
      });
    } else {
      return NextResponse.json(
        { error: "Invalid action" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
