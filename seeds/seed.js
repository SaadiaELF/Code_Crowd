const sequelize = require('../config/connection');
const { User, Post, Comment} = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');
// const fileData = require('./fileData.json');
// const imageData = require('./imageData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // await Post.bulkCreate(postData, {
  //   individualHooks: true,
  //   returning: true,
  // });
  // await Comment.bulkCreate(commentData, {
  //   individualHooks: true,
  //   returning: true,
  // });
  
  // await File.bulkCreate(fileData, {
  //   individualHooks: true,
  //   returning: true,
  // });

  // await Image.bulkCreate(imageData, {
  //   individualHooks: true,
  //   returning: true,
  // });


  process.exit(0);
};

seedDatabase();
