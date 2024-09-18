"use server";
import { generateEmailTemplate } from "@/components/email-template";
import { google } from "googleapis";
import { createTransport } from "nodemailer";

type GOOGLE_MAIL_SERVICE_KEYS =
  | "clientId"
  | "clientSecret"
  | "refreshToken"
  | "redirectUri"
  | "email";

const googleEmailConfig: Record<GOOGLE_MAIL_SERVICE_KEYS, string> = {
  clientId: process.env.GOOGLE_CLIENT_ID || "",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  refreshToken: process.env.GOOGLE_REFRESH_TOKEN || "",
  redirectUri: process.env.GOOGLE_REDIRECT_URI || "",
  email: process.env.GOOGLE_EMAIL || "",
};

async function getOAuth2AccessToken() {
  const OAuth2 = google.auth.OAuth2;
  const id = googleEmailConfig.clientId;
  const secret = googleEmailConfig.clientSecret;
  const myOAuth2Client = new OAuth2(id, secret);

  myOAuth2Client.setCredentials({
    refresh_token: googleEmailConfig.refreshToken,
  });

  const accessToken = await myOAuth2Client.getAccessToken();
  return accessToken;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const html = generateEmailTemplate(body.sheetData);
    const accessToken = await getOAuth2AccessToken();

    const transportOptions: any = {
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: googleEmailConfig.email,
        clientId: googleEmailConfig.clientId,
        refreshToken: googleEmailConfig.refreshToken,
        accessToken: accessToken.token,
      },
    };
    const smtpTransport = createTransport(transportOptions);

    const mailOptions = {
      from: {
        name: "Naveen Naik",
        address: googleEmailConfig.email,
      },
      to: ["naveennaik0202@gmail.com"],
      subject:
        "Attention - Shelf Life Expiry Details for the Next Three Months",
      html: html,
    };
    const data = await smtpTransport.sendMail(mailOptions);
    return Response.json(data);
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
