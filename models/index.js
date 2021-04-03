// Dependencies
// Require all the models
const User = require('./User');
const Post = require('./Post');
const File = require('./File');
const Image = require('./Image');
const Comment = require('./Comment');
const Friend = require('./Friend');

// Define the relationships between the models

User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
    hooks:true
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'cascade',
    hooks: true
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
    hooks:true
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'cascade',
    hooks:true
});

Post.hasMany(File, {
    foreignKey: 'post_id',
    onDelete: 'cascade',
    hooks:true
});

File.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'cascade',
    hooks:true
});

Post.hasMany(Image, {
    foreignKey: 'post_id',
    onDelete: 'cascade',
    hooks:true
});

Image.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'cascade',
    hooks:true
});

User.belongsToMany(User, {
    through: Friend,
    foreignKey: 'friend_id',
    as : "User_Friend"
});

User.belongsToMany(User, {
    through: Friend,
    foreignKey: 'user_id',
    as : "Friend"
});

// Export the module
module.exports = { User, Post, File, Image, Comment, Friend };