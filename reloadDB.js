const fs = require("fs");
const DataStore = require("nedb");

const DB_FOLDER_PATH = "database";
var count = 0;

const reload = (db, file) => {
  return new Promise((resolve, reject) => {
    db.loadDatabase((err) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      console.log(`${file} - index: ${count++}`);
      resolve();
    });
  });
};

categoryFolder = fs.readdirSync(DB_FOLDER_PATH);

for (category of categoryFolder) {
  console.log(`\n\nCategory ${category}`);
  brandFolder = fs.readdirSync(`${DB_FOLDER_PATH}/${category}`);

  for (brand of brandFolder) {
    console.log(`Brand ${brand}`);

    files = fs.readdirSync(`${DB_FOLDER_PATH}/${category}/${brand}`);

    files.forEach(async (file) => {
      const db = new DataStore(
        `${DB_FOLDER_PATH}/${category}/${brand}/${file}`
      );

      await reload(db, file);
    });
  }
}
