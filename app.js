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
app.post('/text_separator', testController.textSeparator);
app.post('/email_extractor', testController.EmailExtractor);
app.post('/extract-urls', testController.ExtractUrls);
app.post('/sizeOfText', testController.CalculateTextSize);
app.post('/removeDuplicateLine', testController.RemoveDuplitacteLines);
app.post('/TextToSpeech', testController.TextToSpeech);
app.post('/IDN-Punnycode-Converter', testController.IDNPunnycodeConverter);
app.post('/Convert-Case', testController.ConvertCase);
app.post('/Character-Count', testController.CharacterCount);
app.post('/Randomise-list', testController.RandomiseList);
app.post('/Reverse-Words', testController.ReverseWord);
app.post('/Reverse-letters', testController.ReverseLetters);
app.post('/Remove-Emojis', testController.RemoveEmojis);
app.post('/Reverse-List', testController.ReverseList);
app.post('/Alphabetic-List', testController.AlphabeticList);
app.post('/Up-Side-Down', testController.UpsideDown);
app.post('/Old-English', testController.OldEnglish);
app.post('/Cursive-Text', testController.CursiveText);
app.post('/Palindrome-Text', testController.PalindromText);

// write more routes here 

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});