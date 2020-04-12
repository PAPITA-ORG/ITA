require("dotenv").config();
const AirTable = require("airtable");
const baseID = process.env.API_BASE;
const airKey = process.env.API_KEY;
const base = new AirTable({ apiKey: airKey }).base(baseID);

module.exports = base;
