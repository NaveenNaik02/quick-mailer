import {
  cellStyle,
  groupHeaderStyle,
  rowStyle,
  secondHeaderCellStyle,
  tableStyle,
} from "@/Styles/tablesStyle";
import React from "react";

interface EmailTemplateProps {
  sheetData: any[][] | null | undefined;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  sheetData,
}) => {
  const columnHeaders = sheetData && sheetData[2];
  const rows = sheetData?.slice(3);

  return (
    <div style={{ padding: "16px" }}>
      <p style={{ marginBottom: "8px" }}>Dear All,</p>
      <p style={{ marginBottom: "8px" }}>I hope this email finds you well!</p>
      <p style={{ marginBottom: "8px" }}>
        Please find below the shelf life expiry details for our products:
      </p>
      <table style={tableStyle}>
        <thead>
          {/* Grouped header row */}
          <tr>
            <th colSpan={4} style={groupHeaderStyle}>
              Material details
            </th>
            <th colSpan={2} style={groupHeaderStyle}>
              SLE details
            </th>
            <th colSpan={3} style={groupHeaderStyle}>
              Location and Qty
            </th>
          </tr>
          {/* Second header row */}
          <tr>
            {columnHeaders?.map((header, index) => (
              <th key={index} style={secondHeaderCellStyle}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows?.map((rowData, index) => {
            return (
              <tr key={index} style={rowStyle}>
                {rowData?.map((item, rowKey) => (
                  <td key={rowKey} style={cellStyle}>
                    {item}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <p style={{ marginTop: "16px" }}>Best Regards,</p>
      <p>Kartik</p>
    </div>
  );
};
