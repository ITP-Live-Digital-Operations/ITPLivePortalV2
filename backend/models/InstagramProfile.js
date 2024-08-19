const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class InstagramProfile extends Model {
    static associate(models) {
      InstagramProfile.belongsTo(models.Influencer, {
        foreignKey: "influencerId",
        as: "influencer",
      });
      InstagramProfile.hasMany(models.InstagramAudienceDemographic, {
        foreignKey: "instagramProfileId",
        as: "InstagramAudienceDemographic",
      });
      InstagramProfile.hasMany(models.InstagramInterest, {
        foreignKey: "instagramProfileId",
        as: "InstagramInterest",
      });
      InstagramProfile.hasMany(models.InstagramBrandAffinity, {
        foreignKey: "instagramProfileId",
        as: "InstagramBrandAffinity",
      });
      InstagramProfile.hasMany(models.InstagramHashtag, {
        foreignKey: "instagramProfileId",
        as: "InstagramHashtag",
      });
      InstagramProfile.hasMany(models.InstagramMention, {
        foreignKey: "instagramProfileId",
        as: "InstagramMention",
      });
      InstagramProfile.hasMany(models.InstagramStatHistory, {
        foreignKey: "instagramProfileId",
        as: "InstagramStatHistory",
      });
      InstagramProfile.hasMany(models.InstagramPost, {
        foreignKey: "instagramProfileId",
        as: "posts",
      });
    }
  }
  InstagramProfile.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      influencerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "influencer",
          key: "id",
        },
      },
      userId: DataTypes.STRING,
      username: DataTypes.STRING,
      fullName: DataTypes.STRING,
      profilePicture: DataTypes.STRING,
      bio: DataTypes.TEXT,
      isPrivate: DataTypes.BOOLEAN,
      isVerified: DataTypes.BOOLEAN,
      accountType: DataTypes.STRING,
      followerCount: DataTypes.INTEGER,
      followingCount: DataTypes.INTEGER,
      postCount: DataTypes.INTEGER,
      avgLikes: DataTypes.FLOAT,
      avgComments: DataTypes.FLOAT,
      avgReelsPlays: DataTypes.FLOAT,
      engagementRate: DataTypes.FLOAT,
      city: DataTypes.STRING,
      country: DataTypes.STRING,
      language: DataTypes.STRING,
      gender: DataTypes.STRING,
      ageGroup: DataTypes.STRING,
      paidPostPerformance: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "InstagramProfile",
      tableName: "instagram_profiles",
    }
  );
  return InstagramProfile;
};