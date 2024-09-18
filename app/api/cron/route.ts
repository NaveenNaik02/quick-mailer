import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  try {
    const sheetResponse = await fetch(
      `${process.env.BASE_URL}/api/google-sheet`
    );
    const sheetData = await sheetResponse.json();

    if (!sheetData || !sheetData.data) {
      throw new Error("Failed to fetch google sheet data");
    }

    const emailResponse = await fetch(`${process.env.BASE_URL}/api/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sheetData: sheetData.data }),
    });
    const emailResult = await emailResponse.json();

    return NextResponse.json({ success: true, emailResult }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
