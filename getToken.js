const dotenv = require('dotenv');
const { google } = require('googleapis');

dotenv.config();

const GOOGLE_PROVIDER_CLIENT_ID = process.env.GOOGLE_PROVIDER_CLIENT_ID;
const GOOGLE_PROVIDER_CLIENT_SECRET = process.env.GOOGLE_PROVIDER_CLIENT_SECRET;

if (!GOOGLE_PROVIDER_CLIENT_ID || !GOOGLE_PROVIDER_CLIENT_SECRET) {
  throw new Error('Missing Google OAuth2 client ID or client secret in environment variables.');
}

const oauth2Client = new google.auth.OAuth2(GOOGLE_PROVIDER_CLIENT_ID, GOOGLE_PROVIDER_CLIENT_SECRET, 'http://localhost:3000/api/admin/oauth/callback/google');

// URL untuk authorize akses Gmail
const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://mail.google.com/'],
});

console.log('Authorize this app by visiting this url:', authUrl);

// Tambahkan kode di bawah setelah generateAuthUrl
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.question('Enter the code from the page here: ', async (code) => {
  const { tokens } = await oauth2Client.getToken(code);
  console.log('Tokens:', tokens);
  rl.close();
});
