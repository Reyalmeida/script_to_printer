//pre: sheets colors and fonts is take from code.gs
//post: The settings are used to create new sheets one for Vehicle and one for 
// Parts.
function vehicleOrPart(){
  const ss =SpreadsheetApp.getActiveSpreadsheet();
  const mainSheet = ss.getSheetByName("Form Responses 1");
  const vehicleSheet = ss.getSheetByName("Vehicle");
  const partsSheet = ss.getSheetByName("Parts");
  const lastRow = mainSheet.getLastRow();
  const numColumns = mainSheet.getLastColumn();
  const data =mainSheet.getRange(2,1,lastRow-1,numColumns).getValues();
  //copy headers
  const headers = mainSheet.getRange(1,1,1,numColumns).getValues()[0];
  vehicleSheet.clearContents().appendRow(headers);
  partsSheet.clearContents().appendRow(headers);
  //Vehicles sheet
  const v_headerRange = vehicleSheet.getRange(1,1,1,headers.length);
  v_headerRange.setBackground("#5e4b8b");
  v_headerRange.setFontColor("#ffffff");
  v_headerRange.setFontWeight("bold");
  v_headerRange.setHorizontalAlignment("center");
  const p_headerRange = partsSheet.getRange(1,1,1,headers.length);
  // Parts sheet
  p_headerRange.setBackground("#5e4b8b");
  p_headerRange.setFontColor("#ffffff");
  p_headerRange.setFontWeight("bold");
  p_headerRange.setHorizontalAlignment("center");



  // for(let i =0; i< data.length; i++){
  //   const row = data[i];
  //   const type = row[5]?.toLowerCase();
  //   const copied =  row[6];
  //   if(type === "vehicle" && copied ==="📃") continue;
  //   if (type ==="vehicle" && copied !=="📃"){
  //     vehicleSheet.appendRow(row);
  //     if(type ==="part" && copied !=="📃"){
  //       partsSheet.appendRow(row)
  //     }
  //   }
  //   mainSheet.getRange(i + 2, 7).setValues("📃");
  // }
  //pre: last row is taken and looped through 
  // to find column that describe the type of work
  //post:Type of work is then appended into either Vehicle or parts sheets
  for(let i =0; i< data.length; i++){
    const row = data[i];
    const type = row[12]?.toLowerCase();
    const copied =  row[13];
    if(type === "vehicle" && copied ==="📃") continue;
    if(type ==="vehicle" && copied !=="📃"){
      vehicleSheet.appendRow(row);
      const newRow = vehicleSheet.getLastRow();
      const rowRange = vehicleSheet.getRange(newRow,1,1,row.length);
      rowRange.setFontWeight('Bold').setFontSize(30);
      const color= newRow % 2 ===0 ?"#66ff00" : "#ffff00"; 
      rowRange.setBackground(color);
      mainSheet.getRange(i + 2, 14).setValue("📃");
    }
    if(type ==="parts" && copied ==="📃") continue;
    if(type ==="parts" && copied !=="📃"){
        partsSheet.appendRow(row);
        const newRow = partsSheet.getLastRow();
        const rowRange = partsSheet.getRange(newRow,1,1,row.length);
        rowRange.setFontWeight('Bold').setFontSize(30);
      const color= newRow % 2 ===0 ?"#F5F5F5" : "#ADD8E6"; 
      rowRange.setBackground(color);
      mainSheet.getRange(i + 2, 14).setValue("📃");
    }
   
  }
  



}