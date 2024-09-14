"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSheetData } from "@/service/google-spreadsheet";
import { Loader2 } from "lucide-react";
import { useState } from "react";

// eslint-disable-next-line
type googleSheetDataType = {
  data: any[][] | null | undefined;
};

export default function Home() {
  const [googleSheetData, setGoogleSheetData] = useState<googleSheetDataType>({
    data: null,
  });
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMailSending, setIsMailSending] = useState(false);
  const handleOnGetSheetDataClick = async () => {
    try {
      setIsLoading(true);
      const response = await getSheetData();
      setGoogleSheetData(response);
      setIsDataLoaded(true);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsDataLoaded(false);
      console.log(error, "you cant...!");
    }
  };

  const handleSendEmail = async () => {
    try {
      setIsMailSending(true);
      const response = await fetch("/api/send", {
        method: "POST",
        body: JSON.stringify({ sheetData: googleSheetData?.data }),
      });
      setIsMailSending(false);
    } catch (error) {
      setIsMailSending(false);
      console.error("Error sending email:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="bg-zinc-950 dark:bg-white">
        <CardHeader>
          <CardTitle className="text-white">
            Quick Mailing <span className="ml-4">📩</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex gap-20">
          <Button onClick={handleOnGetSheetDataClick}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                please wait
              </>
            ) : (
              <>Import google sheet</>
            )}
          </Button>
          <Button disabled={!isDataLoaded} onClick={handleSendEmail}>
            {isMailSending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                sending..!
              </>
            ) : (
              <>Send a mail</>
            )}
          </Button>
        </CardContent>
        <CardFooter className="text-white text-sm">
          {!isDataLoaded ? (
            <>Please import google sheet to send a mail..!</>
          ) : (
            <>Google sheet is imported..!</>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
