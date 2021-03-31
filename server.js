// Dependencies
const express = require('express');

// Require app
const app = require(express());

// Port
const PORT = process.env.PORT || 8000;

// Make app listen on port
app.listen(PORT, () => console.log(`Now listening on ${PORT}`));