import { NextResponse } from "next/server";

// GET → test API
export async function GET() {
  return NextResponse.json({
    status: "OK",
    message: "Next.js REST API is working 🚀",
    time: new Date().toISOString()
  });
}

// POST → test API
export async function POST(request) {
  const data = await request.json();

  return NextResponse.json({
    status: "OK",
    message: "POST request received",
    receivedData: data
  });
}
