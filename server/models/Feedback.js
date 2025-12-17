
class Feedback {
  static initModel(sequelize) {
    const { DataTypes } = require("sequelize");
    return sequelize.define("Feedback", {
      question: { type: DataTypes.TEXT, allowNull: false },
      answer: { type: DataTypes.TEXT, allowNull: false },
      isCorrect: { type: DataTypes.BOOLEAN, allowNull: false },
      confidenceScore: { type: DataTypes.FLOAT, allowNull: true },
    });
  }
}

module.exports = Feedback;
