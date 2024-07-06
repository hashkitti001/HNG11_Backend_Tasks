const { Sequelize } = require('sequelize');

// Replace with your PostgreSQL connection URI
const db = new Sequelize('postgresql://stagetwo_zf3u_user:Orr8G2qJUKcOkwijK0QxJmwFTCqOPpgq@dpg-cq4r0umehbks73bg4ql0-a.oregon-postgres.render.com/stagetwo_zf3u', {
  dialect: 'postgres',
  ssl: true, // Enable SSL
  dialectOptions: {
    ssl: {
      require: true, // This will reject unauthorized connections
    }
  },
  logging: false, // Disable logging SQL queries (optional)
});

// Test the connection
async function dbConn() {
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
 
module.exports = {dbConn, db}
