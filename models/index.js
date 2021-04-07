// Dependencies
// Require all the models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Friend = require('./Friend');
​
// Define the relationships between the models
​
User.hasMany(Post, {
    foreignKey: 'user_id'
});
​
Post.belongsTo(User, {
    foreignKey: 'user_id'
});
​
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
    hooks:true
});
​
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'cascade',
    hooks: true
});
​
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
    hooks:true
});
​
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'cascade',
    hooks:true
});
​
User.belongsToMany(User, {
    as : "friend_user",
    through: Friend,
    foreignKey: 'friend_id'
});
​
User.belongsToMany(User, {
    as : "user_friend",
    through: Friend,
    foreignKey: 'user_id'
});
​
// Export the module
module.exports = { User, Post, Comment, Friend };