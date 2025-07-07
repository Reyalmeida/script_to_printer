function sendFormtoPrinter() {
  // clearFormTable();
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const sheetlength = sheet.getLastRow();
  const rows = sheet.getRange(2, 1, sheetlength - 1, 13).getValues();
  const printCol = 2;
 
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    Logger.log("ROW " + (i+2) + ":" + JSON.stringify(row));

    if(row[printCol-1] === "✅" )continue;
  
    const data = {
       timestamp:row[0], 
       customer_name: row[2],
        phone_number: row[3],
        year: row[4],
        make: row[5],
        model:row[6],
        modules:row[7],
        single_stage:row[8],
        dual_stage:row[9],
        third_stage:row[10],
        buckles: row[11],
        wwydoff:row[12],
        muteHttpExceptions:true
    
    };
  
    try{
     // const ngrokURL = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Settings").getRange("A1").getValue();
     //EXAMPLE BELOW MUST LOOK LIKE THIS const ngrokURL = "https://32a4-2605-a601-a91c-7a00-f898-f7d1-ec10-6505.ngrok-free.app/print";
     //"https://b59f-2607-fb91-3f8a-183a-b043-80e9-1c7d-560.ngrok-free.app/print"
      const ngrokURL = "https://safetyfixprinter.ngrok.io/print";

      const response = UrlFetchApp.fetch(ngrokURL, {

      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(data),
      
      muteHttpExceptions: false
      
    });
    const code = response.getResponseCode();
   
   
    if (code === 200){
      Logger.log(`row ${i + 2}running code for check mark ✅`);
      sheet.getRange(i + 2, printCol).setValue("✅");
      
      }
    }catch(error){
    Logger.log("❌ Failed to send:"+ error);
    }
   

 }
   Logger.log("🎯 Finished processing all rows.");
}
function clearFormTable(){
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow();
  if(lastRow >2){
    const numRowsToDelete = lastRow -2;

    sheet.deleteRows(2,numRowsToDelete);
  
  }
}