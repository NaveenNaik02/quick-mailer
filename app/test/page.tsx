import { getSheetData } from "@/service/google-spreadsheet";
import ClientSideComponent from "./ClientSideComponent";

const page = async () => {
  const googleSheetData = await getSheetData();

  return (
    <div>
      <ClientSideComponent initialData={googleSheetData.data} />
    </div>
  );
};

export default page;
