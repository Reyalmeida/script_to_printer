//code.gs WAS PROVIDED BY CUSTOMER
function sendEmailOnFormSubmit(e) {
  const sheet = e
    ? e.source.getActiveSheet()
    : SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();

  const rowRange = sheet.getRange(lastRow, 1, 1, lastCol);
  const rowData = rowRange.getValues()[0];
  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  const data = sheet.getRange(2,1,lastRow,lastCol);
  // const organize_Data = data.getValues();
  // for(let i=0; i<organize_Data.length;i++){
  //   for(let j=0;j<lastCol;j++){

  //     const dataToClean = sheet.getRange(i+2,j+1);
  //     dataToClean.setHorizontalAlignment('left');

  //   }
  // }
  const dataLastCustomeOrganized = sheet.getRange(lastRow,1,1,lastCol);
  dataLastCustomeOrganized.setHorizontalAlignment('left');

  // Format the new row: bold + larger font
  rowRange.setFontWeight('bold').setFontSize(30);

  // Extract Customer Name from data
  const customerNameIndex = headers.findIndex(h => h.toLowerCase().trim() === 'customer name');
  const customerName = customerNameIndex !== -1 ? rowData[customerNameIndex] : 'New Customer';

  // Format current date as YYYY-MM-DD HH:mm:ss
  const now = new Date();
  const formattedDate = Utilities.formatDate(now, Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");

  // Subject line
  const subject = `SafetyFix - ${customerName} - ${formattedDate}`;

  // Email body
  let htmlBody = "<p>The following is your new customer and job:</p><br/>";
  for (let i = 0; i < headers.length; ++i) {
    const value = rowData[i].toString().trim();
    if (value && value !== "0") {
      htmlBody += `<p><b>${headers[i]}</b>: ${value}</p>`;
    }
  }

  // Send the email
  const recipient = "";//client email goes here
  MailApp.sendEmail({ to: recipient, subject, htmlBody });
}