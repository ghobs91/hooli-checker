const fs = require('fs'); // useful for navigating the file system
const parse = require('csv-parse/lib/sync'); // needed for parsing CSV file data

function linkBuyerToFacility() {
  // your solution goes here
  // 
  var ts = new Date();
  console.log("function has begun at" + ts.toISOString())

  // read sam-accounts.csv
  fs.readFile('sam-accounts.csv', (err, samAccountsFile) => {
    // read existing-accounts.csv
    fs.readFile('existing-accounts.csv', (err, existingAccountsFile) => {
      
      const samAccountsParsed = parse(samAccountsFile, {
        columns: true
      })
      const existingAccountsParsed = parse(existingAccountsFile, {
        columns: true
      })

      var ts1 = new Date();
      console.log("parsed files at" + ts1.toISOString())

      // write efficient dictionary lookup that doesn't require all of existing-accounts.csv to be repeatedly read for every single entry in sam-accounts.csv (that would be incredibly slow at scale)
      var existingAccountsLookup = {};
      existingAccountsParsed.forEach(function (existingEntry){
        // ignore last 3 characters in existing-accounts
        var existingHooliID = existingEntry["hooliId"].slice(0, -3);
        // create entry in lookup dict with respective HooliID
        existingAccountsLookup[existingHooliID] = true;
      });

      var ts2 = new Date();
      console.log("populated lookup dict at " + ts2.toISOString())
      
       // for every sam-accounts.csv entry that doesn't appear in existing-accounts.csv, add it to set-differences.csv
      samAccountsParsed.forEach(function(samAccountsEntry){
        if(existingAccountsLookup[samAccountsEntry["accountHooliId"]] != true){
          fs.appendFileSync('set-differences.csv', samAccountsEntry["accountHooliId"] + '\n');
        }
      })

      var ts3 = new Date();
      console.log("completed function at " + ts3.toISOString())

    })
  }) 
}

linkBuyerToFacility();
