const fs = require('fs'); // useful for navigating the file system
const parse = require('csv-parse/lib/sync'); // needed for parsing CSV file data

function linkBuyerToFacility() {
  // your solution goes here
  // 

  // read sam-accounts.csv
  fs.readFile('sam-accounts.csv', (err, samAccountsFile) => {
    // read existing-accounts.csv
    fs.readFile('existing-accounts.csv', (err, existingAccountsFile) => {
      
      const samAccountsFileLines = parse(samAccountsFile, {
        columns: true
      })

      const existingAccountsFileLines = parse(existingAccountsFile, {
        columns: true
      })

      // write efficient lookup that doesn't require all of existing-accounts.csv to be repeatedly read for every single entry in sam-accounts.csv (that would be incredibly slow at scale)
      var existingAccountsFileLookup = {};
      existingAccountsFileLines.forEach(function (existingLine){
        // ignore last 3 characters in existing-accounts
        // console.log("existingLine is:" + existingLine)
        // console.log("existingLine hooli ID is:" + existingLine["hooliId"])

        existingHooliID = existingLine["hooliId"].slice(0, -3);
        console.log("existingHooliID is:" + existingHooliID)

        existingAccountsFileLookup[existingHooliID] = true;
        // console.log("existingAccountsFileLookup[existingLine] we just created is:" + existingLine)    
      });
      
       // for every sam-accounts.csv entry that doesn't appear in existing-accounts.csv, add it to set-differences.csv
      samAccountsFileLines.forEach(function(samAccountsLine){
        samAccountsLine = samAccountsLine["accountHooliId"]
        // console.log("samAccountsLine is:" + samAccountsLine)
        // console.log("existingAccountsFileLookup[samAccountsLine] is:" + existingAccountsFileLookup[samAccountsLine])
        if(existingAccountsFileLookup[samAccountsLine] != true){
          fs.appendFileSync('set-differences.csv', samAccountsLine + '\n');
        }
      })

    })

  })
  

  

  

 
  
}

linkBuyerToFacility();
