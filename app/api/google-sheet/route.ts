import { google } from "googleapis";

export async function GET(req: Request) {
  try {
    const getAuth = await google.auth.getClient({
      projectId: "lyrical-epigram-435516-c5",
      credentials: {
        type: "service_account",
        project_id: "lyrical-epigram-435516-c5",
        private_key_id: "1a512d9cde4842432bdca08b66d6929ae4ce730f",
        private_key: (process.env.GOOGLE_PRIVATE_KEY as string).replace(
          /\\n/g,
          "\n"
        ),
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        universe_domain: "googleapis.com",
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const glSheets = google.sheets({ version: "v4", auth: getAuth });
    const data = await glSheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "SLE details!B:J",
    });

    return Response.json({ data: data.data.values }, { status: 200 });
  } catch (error) {
    console.log(error);
    Response.json({ error }, { status: 500 });
  }
}
