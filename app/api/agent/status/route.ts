import { NextResponse } from "next/server";

// Mock DB for example (replace with real DB logic)
let workspaces = [
  { id: "ws_1", status: "active" },
  { id: "ws_2", status: "suspended" },
  // ... more
];

export async function POST(request: Request) {
  const { workspaceId, action } = await request.json();

  if (!workspaceId || !action) {
    return NextResponse.json({ error: "Missing workspaceId or action" }, { status: 400 });
  }

  const workspace = workspaces.find((w) => w.id === workspaceId);
  if (!workspace) {
    return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
  }

  if (action === "login") {
    workspace.status = "active";
  } else if (action === "logout") {
    workspace.status = "suspended";
  } else {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  return NextResponse.json({ success: true, status: workspace.status });
}
