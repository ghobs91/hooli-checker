const fs = require('fs'); // useful for navigating the file system
const parse = require('csv-parse/lib/sync'); // needed for parsing CSV file data

function linkBuyerToFacility() {
  // your solution goes here

  // read sam-accounts.csv

  // read existing-accounts.csv

  // write efficient lookup that doesn't require all of existing-accounts.csv to be read for every single entry in sam-accounts.csv (that would be incredibly slow at scale)

  // for every sam-accounts.csv entry that doesn't appear in existing-accounts.csv, add it to set-differences.csv
  
}

linkBuyerToFacility();
