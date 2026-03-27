const mongoose = require('mongoose');
const data = require('./data.js');
const Listing = require('../models/listing.js');

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/StayScape');
  console.log('Mongodb working');
}

const initDB = async () => {
  await Listing.deleteMany({});
  data.data = data.data.map((obj) =>({...obj , owner: '69bfdf1b6dd3dc96f3cc7d86'}));
  await Listing.insertMany(data.data);
  console.log('data is inisitalised');
};

initDB();
