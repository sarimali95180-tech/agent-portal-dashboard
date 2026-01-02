import { NextResponse } from "next/server";

// GET /api/users
export async function GET() {
  return NextResponse.json({
    success: true,
    users: [
      { id: 1, name: "Ali" },
      { id: 2, name: "Sara" }
    ]
  });
}

// POST /api/users
export async function POST(request) {
  const body = await request.json();

  return NextResponse.json(
    {
      success: true,
      message: "User created",
      data: body
    },
    { status: 201 }
  );
}
