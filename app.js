// app.js
const express = require('express');
const app = express();
const port = 3009;
const testController = require('./controller/test.controller');
const dnsLookupController = require('./controller/dnsLookup.controller');
// Middleware to parse JSON bodies
app.use(express.json());

// Basic route
app.post('/test', testController.testPost);
app.post('/dns-Lookup', dnsLookupController.dnsLookup);

// write more routes here 

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});