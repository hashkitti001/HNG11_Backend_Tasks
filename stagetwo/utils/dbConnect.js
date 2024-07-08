require("dotenv").config()
const { Sequelize } = require('sequelize');
const process = require("node:process")
const {PG_PASSWORD ,PG_USER, PG_DATABASE } = process.env
const db = new Sequelize(`postgresql://${PG_USER}:${PG_PASSWORD}@dpg-cq6515aju9rs73e1a4ig-a.oregon-postgres.render.com/${PG_DATABASE}`, {
  dialect: 'postgres',
  ssl: true,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: true
    }
  },
  logging: false
});


async function dbConn() {
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');

    await db.sync();
    console.log('Models synced successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = { dbConn, db };
