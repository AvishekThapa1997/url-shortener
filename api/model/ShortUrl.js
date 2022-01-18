import sequelize from "../utils/db/dbSetup.js";
import { Model, DataTypes } from "sequelize";
import { nanoid } from "nanoid";
class ShortUrl extends Model {
  static save(shortUrl) {
    return ShortUrl.create(shortUrl);
  }
  static findByOriginalURL(originalURL) {
    return ShortUrl.findOne({
      where: {
        fullUrl: originalURL,
      },
    });
  }
  static findByShortURL(shorturl) {
    return ShortUrl.findOne({
      where: {
        shortUrl: shorturl,
      },
    });
  }
}
ShortUrl.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: nanoid,
    },
  },
  {
    sequelize: sequelize,
  }
);
export default ShortUrl;
