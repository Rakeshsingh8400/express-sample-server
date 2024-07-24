const gtts = require('google-tts-api');
exports.testPost = async (req, res) => {
    const { data } = req.body;
    try {
        // Process the data as needed
        res.status(200).json({ message: 'Test post successful', data });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.textSeparator = async (req, res) => {
    const { data } = req.body;
    const separator = '|'||','||'.'; // Change this separator as needed

    try {
        // Split the incoming data based on the separator
        const parts = data.split(separator);

        // Process the parts or perform any other operations as needed

        res.status(200).json({ message: 'Text separation successful', parts });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.EmailExtractor = async (req, res) => {
    const { text } = req.body;
try{
    // Regular expression to find email addresses
    const emailRegex = /[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}/g;

    // Extract emails from the text using the regex
    const extractedEmails = text.match(emailRegex) || [];

    // Send extracted emails as JSON response
    res.status(200).json({ emails: extractedEmails,msg:"your email is successfully extracted." });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.ExtractUrls = async (req, res) => {
    const { text } = req.body;
try{
    const urlRegex = /https?:\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;

    // Extract URLs from the text using the regex
    const extractedUrls = text.match(urlRegex) || [];

    // Send extracted URLs as JSON response
    res.status(200).json({ urls: extractedUrls,msg:"your urls is successfully extracted."  });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.CalculateTextSize = async (req, res) => {
    const { text } = req.body;
try{
    const charCount = text.length;

    // Calculate text size in words (assuming words are separated by spaces)
    const wordCount = text.trim().split(/\s+/).length;

    // Calculate text size in bytes (assuming each character is one byte, which is not always true for non-ASCII characters)
    const byteCount = Buffer.byteLength(text, 'utf8');

    // Send calculated sizes as JSON response
    res.status(200).json({
        charCount,
        wordCount,
        byteCount
    ,msg:"your text size is calculated Successfully"});
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.RemoveDuplitacteLines= async (req, res) => {
    const { text } = req.body;
try{

    // Split text into lines
    const lines = text.split(/\r?\n/);

    // Use a Set to keep track of unique lines
    const uniqueLines = new Set(lines);

    // Convert Set back to an array and join into a single string
    const deduplicatedText = Array.from(uniqueLines).join('\n');

    // Send deduplicated text as JSON response
    res.status(200).json({ deduplicatedText,msg:"your text size is calculated Successfully"});
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


async function generateTextToSpeech(text) {
    try {
        // Generate TTS audio URL
        const url = await gtts.getAudioUrl(text, {
            lang: 'en',
            slow: false // Adjust speed as needed
        });
        return url;
    } catch (error) {
        console.error('Error generating text-to-speech:', error);
        throw new Error('Failed to generate text-to-speech URL');
    }
}


exports.TextToSpeech= async (req, res) => {
    const { text} = req.body;
try{
    const ttsUrl = await generateTextToSpeech(text);

    // Send the generated URL as a response
    res.json({ url: ttsUrl });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.IDNPunnycodeConverter= async (req, res) => {
    const { domain } = req.body;

    try {
        // Convert IDN (Unicode) to Punycode manually
        const punycodeDomain = domain
            .split('.')
            .map(part => {
                try {
                    return part === decodeURIComponent(part) ?
                        part :
                        'xn--' + encodeURIComponent(part).split('%').join('-').toUpperCase();
                } catch {
                    return part;
                }
            })
            .join('.');

        // Send the converted Punycode domain as a response
        res.status(200).json({ punycodeDomain });
    } catch (error) {
        console.error('Error converting IDN to Punycode:', error);
        res.status(500).json({ error: 'Failed to convert IDN to Punycode' });
    }
};



exports.ConvertCase= async (req, res) => {
    const { text, caseType } = req.body;
try{
    if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: 'Text is required and must be a string' });
    }

    let convertedText;
    switch (caseType) {
        case 'lowercase':
            convertedText = text.toLowerCase();
            break;
        case 'uppercase':
            convertedText = text.toUpperCase();
            break;
        case 'titlecase':
            convertedText = text.replace(/\b\w/g, char => char.toUpperCase());
            break;
        default:
            return res.status(400).json({ error: 'Invalid case type. Supported types: lowercase, uppercase, titlecase' });
    }

    res.status(200).json({ originalText: text, convertedText, caseType });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.CharacterCount= async (req, res) => {
    const { text} = req.body;
try{
    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }

    const characterCount = text.length;
    res.json({ characterCount,msg:"Your Character Count is Successfully" });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.RandomiseList= async (req, res) => {
    const {list} = req.body;
try{
    if (!list || !Array.isArray(list)) {
        return res.status(400).json({ error: 'List is required and must be an array' });
    }

    // Shuffle the list (Fisher-Yates shuffle algorithm)
    for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
    }

    res.json({ randomizedList: list,msg:"Randomise list Successfully created" });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.ReverseWord= async (req, res) => {
    const {text} = req.body;
try{
    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }

    // Split the text into words, reverse the array, and join back into a string
    const reversedText = text.split(' ').reverse().join(' ');

    res.json({ reversedText,msg:"Reverse Word Successfully created" });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.ReverseLetters= async (req, res) => {
    const {text} = req.body;
try{
    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }

    // Reverse the text by splitting it into an array of characters, reversing the array, and joining back into a string
    const reversedText = text.split('').reverse().join('');

    res.json({ reversedText,msg:"Reverse Letter Successfully created" });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.RemoveEmojis= async (req, res) => {
    const {text} = req.body;
try{
    if (!text) {
        return res.status(400).json({ error: 'No text provided' });
    }
    
    // Remove emojis using regular expression
    const cleanedText = text.replace(/[\u{1F600}-\u{1F64F}]/gu, '')
                           .replace(/[\u{1F300}-\u{1F5FF}]/gu, '')
                           .replace(/[\u{1F680}-\u{1F6FF}]/gu, '')
                           .replace(/[\u{2600}-\u{26FF}]/gu, '')
                           .replace(/[\u{2700}-\u{27BF}]/gu, '');
    
    return res.json({ cleaned_text: cleanedText,msg:"Removed Emoji Successfully" });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.ReverseList= async (req, res) => {
    const {list} = req.body;
try{
    if (!list || !Array.isArray(list)) {
        return res.status(400).json({ error: 'Invalid list provided' });
    }

    const reversedList = list.reverse();

    return res.json({ reversed_list: reversedList,msg:"Reverse List Successfully" });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.AlphabeticList= async (req, res) => {
    const {list} = req.body;
try{
    if (!list || !Array.isArray(list)) {
        return res.status(400).json({ error: 'Please provide a valid list of strings.' });
    }

    const sortedList = list.sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));

    res.json({ sortedList,msg:"Sorted List Successfully in Alphabet" });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// create a function generate Up side Down Text

function generateUpsideDownText(text) {
    const normalChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890,.!?()[]{}<>_\'"\\/+=-*$@%&';
    const upsideDownChars = 'ɐqɔpǝɟƃɥıɾʞlɯuodbɹsʇnʌʍxʎzɐƃɔpǝɟƃɥıɾʞlɯuodbɹsʇnʌʍxʎz¡,¿)(][}{><‾\'"\\∕+=-*$@%⅋';
    
    const normalToUpsideDown = {};
    for (let i = 0; i < normalChars.length; i++) {
        normalToUpsideDown[normalChars[i]] = upsideDownChars[i];
    }

    let upsideDownText = '';
    for (let char of text) {
        upsideDownText += normalToUpsideDown[char] || char;
    }

    return upsideDownText.split('').reverse().join('');
}



exports.UpsideDown= async (req, res) => {
    const {text} = req.body;
try{
    if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: 'Please provide a valid text string.' });
    }
    const upsideDownText = generateUpsideDownText(text);
    res.json({ upsideDownText,msg:"Successfully convert into Up Side Down" });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// create a function generate Old English Text

function generateOldEnglishText(text) {
    const normalChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const oldEnglishChars = 'ᗺƆᗡƎℲƃHᐴᒋᒧᐪIJʞᒣNØԀᗰƧԳᗺɅɈʁɼɈʍXϽʎZ';

    const normalToOldEnglish = {};
    for (let i = 0; i < normalChars.length; i++) {
        normalToOldEnglish[normalChars[i]] = oldEnglishChars[i];
    }

    let oldEnglishText = '';
    for (let char of text) {
        oldEnglishText += normalToOldEnglish[char] || char;
    }

    return oldEnglishText;
}


exports.OldEnglish= async (req, res) => {
    const {text} = req.body;
try{
    if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: 'Please provide a valid text string.' });
    }

    const oldEnglishText = generateOldEnglishText(text);
    
    res.json({ oldEnglishText,msg:"Successfully convert into Old Alphabet" });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Create Cursive text from normal text

function generateCursiveText(text) {
    const normalChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const cursiveChars = '𝒜𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎ℤ𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎';
    
    const normalToCursive = {};
    for (let i = 0; i < normalChars.length; i++) {
        normalToCursive[normalChars[i]] = cursiveChars[i];
    }

    let cursiveText = '';
    for (let char of text) {
        cursiveText += normalToCursive[char] || char;
    }

    return cursiveText;
}

exports.CursiveText= async (req, res) => {
    const {text} = req.body;
try{
    if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: 'Please provide a valid text string.' });
    }
    const cursiveText = generateCursiveText(text);
    res.json({ cursiveText,msg:"Successfully convert int Cursive Alphabet" });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// for palindromic

function isPalindrome(text) {
    // Remove non-alphanumeric characters and convert to lowercase
    const cleanedText = text.toLowerCase().replace(/[\W_]/g, '');
    // Check if the cleaned text equals its reverse
    return cleanedText === cleanedText.split('').reverse().join('');
}


exports.PalindromText= async (req, res) => {
    const {text} = req.body;
try{
    if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: 'Please provide a valid text string.' });
    }
    const result = isPalindrome(text);
    res.json({ isPalindrome: result,msg:"Text is Palindrom" });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'Server error' });
    }
};







































