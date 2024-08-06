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
        as: "audienceDemographics",
      });
      InstagramProfile.hasMany(models.InstagramInterest, {
        foreignKey: "instagramProfileId",
        as: "interests",
      });
      InstagramProfile.hasMany(models.InstagramBrandAffinity, {
        foreignKey: "instagramProfileId",
        as: "brandAffinity",
      });
      InstagramProfile.hasMany(models.InstagramHashtag, {
        foreignKey: "instagramProfileId",
        as: "hashtags",
      });
      InstagramProfile.hasMany(models.InstagramMention, {
        foreignKey: "instagramProfileId",
        as: "mentions",
      });
      InstagramProfile.hasMany(models.InstagramStatHistory, {
        foreignKey: "instagramProfileId",
        as: "statHistory",
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
      avgViews: DataTypes.FLOAT,
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