import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    // Clear any authentication cookies or sessions
    const response = NextResponse.json(
      { success: true, message: "Logged out successfully" },
      { status: 200 }
    )

    // Clear auth cookies if you're using them
    response.cookies.delete("authToken")
    response.cookies.delete("session")

    return response
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json(
      { success: false, error: "Logout failed" },
      { status: 500 }
    )
  }
}
