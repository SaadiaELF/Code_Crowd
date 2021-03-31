// Dependencies
const express = require('express');
const sequelize = require('./config/connection');

// Require app
const app = require(express());

// Port
const PORT = process.env.PORT || 8000;

// Make app listen on port
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});