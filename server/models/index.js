

const sequelize = require("../config/db");
const Document = require("./Document");
const Feedback = require("./Feedback");

const db = {};
db.Document = Document.initModel(sequelize);
db.Feedback = Feedback.initModel(sequelize);

db.sequelize = sequelize;
db.Sequelize = require("sequelize");

module.exports = db;
