const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class InstagramPost extends Model {
    static associate(models) {
      InstagramPost.belongsTo(models.InstagramProfile, {
        foreignKey: "instagramProfileId",
        as: "instagramProfile",
      });
    }
  }
  InstagramPost.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      instagramProfileId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "instagram_profiles",
          key: "id",
        },
      },
      postId: DataTypes.STRING,
      text: DataTypes.TEXT,
      url: DataTypes.STRING,
      created: DataTypes.DATE,
      thumbnail: DataTypes.STRING,
      likes: DataTypes.INTEGER,
      comments: DataTypes.INTEGER,
      views: DataTypes.INTEGER,
      type: DataTypes.STRING,
      mentions: DataTypes.JSON,
      hashtags: DataTypes.JSON,
      video: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "InstagramPost",
      tableName: "instagram_posts",
    }
  );
  return InstagramPost;
};