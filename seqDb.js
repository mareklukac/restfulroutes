import { Sequelize, Model, DataTypes, Op } from "sequelize";

const sequelize = new Sequelize("sqlite:memory");

class Book extends Model {}
Book.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    author: { type: DataTypes.STRING },
    pages: { type: DataTypes.INTEGER },
  },
  {
    sequelize,
    modelName: "Book",
    tableName: "Books",
    timestamps: false,
  }
);

class Tag extends Model {}
Tag.init(
  {},
  {
    sequelize,
    modelName: "Tag",
    tableName: "Tags",
    timestamps: false,
  }
);

Book.belongsToMany(Tag, { through: "book_id" });
Tag.belongsToMany(Book, { through: "book_id" });

export { Book, Tag, sequelize };
