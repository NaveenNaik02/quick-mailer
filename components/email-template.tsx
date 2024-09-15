export const generateEmailTemplate = (
  sheetData: any[][] | null | undefined
) => {
  const columnHeaders = sheetData && sheetData[2];
  const rows = sheetData?.slice(3);

  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Shelf Life Expiry Details</title>
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            padding: 8px;
            text-align: left;
            border: 1px solid #d1d5db;
          }
          th {
            background-color: #f2f2f2;
          }
          .group-header {
            background-color: #e0e0e0;
            font-weight: bold;
            text-align: center;
          }
          .container {
            padding: 16px;
          }
          p {
            margin-bottom: 8px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <p>Dear All,</p>
          <p>I hope this email finds you well !!</p>
          <p>Please find below the <strong>shelf life expiry</strong> details for our products:</p>
          <table>
            <thead>
              <!-- Grouped header row -->
              <tr>
                <th colspan="3" class="group-header">Material details</th>
                <th colspan="2" class="group-header">SLE details</th>
                <th colspan="4" class="group-header">Location and Qty</th>
              </tr>
              <!-- Second header row -->
              <tr>
                ${columnHeaders?.map((header) => `<th>${header}</th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${rows
                ?.map(
                  (rowData) => `
                  <tr>
                    ${rowData?.map((item) => `<td>${item}</td>`).join("")}
                  </tr>
                `
                )
                .join("")}
            </tbody>
          </table>
          <p style="margin-top: 16px;">Best Regards,</p>
          <p>Kartik</p>
        </div>
      </body>
      </html>
    `;
};
