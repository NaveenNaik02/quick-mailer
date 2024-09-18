"use client";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { showToastError, showToastSuccess } from "@/utils/custom-toaster";
import LoadingButton from "@/utils/LoadingButton";

type googleSheetDataType = {
  data: any[][] | null | undefined;
};

export default function Home() {
  const [googleSheetData, setGoogleSheetData] = useState<
    googleSheetDataType | undefined
  >({
    data: null,
  });
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isGettingSheetData, setIsGettingSheetData] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  useToast();

  const handleOnGetSheetDataClick = async () => {
    setIsGettingSheetData(true);
    try {
      const response = await fetch("/api/google-sheet");
      const googleSheet = await response.json();
      setGoogleSheetData(googleSheet);
      setIsDataLoaded(true);
    } catch (error) {
      showToastError({});
      console.error("Error fetching Google sheet data:", error);
    } finally {
      setIsGettingSheetData(false);
    }
  };

  const handleSendEmail = async () => {
    setIsSendingEmail(true);
    try {
      await fetch("/api/send", {
        method: "POST",
        body: JSON.stringify({ sheetData: googleSheetData?.data }),
      });
      showToastSuccess({ description: "Your mail has been sent..!" });
    } catch (error) {
      showToastError({});
      console.error("Error sending email:", error);
    } finally {
      setIsSendingEmail(false);
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
          <LoadingButton
            onClick={handleOnGetSheetDataClick}
            isLoading={isGettingSheetData}
          >
            Import google sheet
          </LoadingButton>
          <LoadingButton
            onClick={handleSendEmail}
            isLoading={isSendingEmail}
            isDisabled={!isDataLoaded}
          >
            Send a mail
          </LoadingButton>
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
