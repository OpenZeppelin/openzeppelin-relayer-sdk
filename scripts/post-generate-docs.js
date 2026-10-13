const fs = require('fs');
const path = require('path');

// The markdown generator emits `](../Models/.md)` for the TransactionStatus enum.
const filePath = path.join(__dirname, '../docs/Apis/RelayersApi.md');
if (!fs.existsSync(filePath)) {
  process.exit(0);
}

const original = fs.readFileSync(filePath, 'utf8');
const fixed = original.replaceAll('](../Models/.md)', '](../Models/TransactionStatus.md)');
if (fixed !== original) {
  fs.writeFileSync(filePath, fixed);
  console.log('Fixed TransactionStatus doc link in RelayersApi.md');
}
