"use client";
import React, { useState } from "react";

type ClientSideComponentProps = {
  initialData: any[][] | null | undefined;
};

const ClientSideComponent: React.FC<ClientSideComponentProps> = ({
  initialData,
}) => {
  const [data, setData] = useState(initialData);
  const columnHeaders = initialData && initialData[2];
  const rows = initialData?.slice(3);
  console.log(data, "initial data");
  const tableStyle: React.CSSProperties = {
    minWidth: "100%",
    backgroundColor: "white",
    borderCollapse: "collapse",
    border: "1px solid #e5e7eb", // gray-200
  };

  const groupHeaderStyle: React.CSSProperties = {
    backgroundColor: "#9ca3af", // gray-400
    border: "1px solid #d1d5db", // gray-300
    padding: "8px",
    textAlign: "center",
    fontWeight: "bold",
  };

  const secondHeaderCellStyle: React.CSSProperties = {
    backgroundColor: "#9ca3af", // gray-400
    border: "1px solid #d1d5db", // gray-300
    padding: "8px",
    textAlign: "left",
  };

  const cellStyle: React.CSSProperties = {
    border: "1px solid #d1d5db", // gray-300
    padding: "8px",
  };

  const rowStyle: React.CSSProperties = {
    backgroundColor: "#f9fafb", // same background for all rows (gray-50)
  };
  return (
    <div style={{ padding: "16px" }}>
      <p style={{ fontSize: "16px", marginBottom: "8px" }}>Dear Someone,</p>
      <p style={{ marginBottom: "16px" }}>I hope this email finds you well!</p>
      <p style={{ marginBottom: "16px" }}>
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
            {columnHeaders?.map((header) => (
              <th style={secondHeaderCellStyle}>{header}</th>
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

export default ClientSideComponent;
