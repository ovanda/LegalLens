
class Document {
  static initModel(sequelize) {
    const { DataTypes } = require("sequelize");
    return sequelize.define("Documents", {
      title: { type: DataTypes.STRING, allowNull: false },
      content: { type: DataTypes.TEXT, allowNull: false },
      embedding: { type: DataTypes.JSON, allowNull: true },
    });
  }
}

module.exports = Document;
