//pre: phone number is submitted in any format to code.gs
// post: this function takes the phone converts to string and replaces any 
//aditional and only leaves the numbers.
function phoneNumberFormat(e){
  ms = SpreadsheetApp.getActiveSpreadsheet();
  sheet = ms.getSheetByName("Form Responses 1");
  lastRow = sheet.getLastRow();
  phone_column = sheet.getRange(lastRow,5);

  phoneNumber = phone_column.getValue().toString().replace(/\D/g, '');
  //pre: phone numnber is verified to be 10 or 11 for length, 10 for local
  //11 for international
  //post: returns the phone numbers spaced by a hipen and parenthesis in the 
  //proper places. 
  if(phoneNumber.length ===10){
    const formatNumber = `(${phoneNumber.slice(0,3)})-${phoneNumber.slice(3,6)}-${phoneNumber.slice(6)}`;
    phone_column.setValue(formatNumber);
  }
  else if (phoneNumber.length === 11 && phoneNumber.startsWith('1')) {
    // Format as +1(801)-615-0818
    const formatNumber = `+${phoneNumber.slice(0,1)}(${phoneNumber.slice(1,4)})-${phoneNumber.slice(4,7)}-${phoneNumber.slice(7)}`;
    phone_column.setValue(formatNumber);
  } else {
    // Invalid format (too short or wrong country code)
    phone_column.setValue("Invalid phone number");
  }
}