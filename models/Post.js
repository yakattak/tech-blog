const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Post model
class Post extends Model {
        static like(body, models) {
          return models.Like.create({
            user_id: body.user_id,
            post_id: body.post
        })
        .then(() => {
            return Post.findOne({
                 where: {
                 id: body.post
              },
              attributes: [
                'id',
                'post_title',
                'post_date'
                
                [sequelize.literal('(SELECT COUNT(*) FROM like WHERE post.id = like.post_id)'), 'like_count']
              ],
              // include: [

              //   [sequelize.literal('(SELECT COUNT(*) FROM like WHERE post.id = like.post_id)'), 'like_count']
              // //   {
              // //       model: models.User,
              // //       attributes: ['username']
              // //   }
              // ],
              // order: [
              //   [sequelize.literal('like_count'), 'DESC']
              // ]
            },
          )
      })
    }
  }

// create fields/columns for Post model
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    post_title: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    post_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    post_date: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
  }
);

module.exports = Post;