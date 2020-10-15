const fs = require('fs');
const rfs = require("rotating-file-stream");
const path = require('path');   

const logDirectory = path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log' , {
    interval: '1d',
    path:logDirectory,
});

const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'ketanmehta1007',
            pass: '9412533733ketan'
        }
    },
    google_client_id: "350349092546-9ss9do8sh8v8ahggjvpn6cda881q9as4.apps.googleusercontent.com",
    google_client_secret: "rZ8Mp2-9AQ_qi9iH7FhqpN4T",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial',
    morgan:{
        mode:'dev',
        options:{stream:accessLogStream}
    }
}

const production = {
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.CODEIAL_GMAIL_USERNAME,
            pass: process.env.CODEIAL_GMAIL_PASSWORD
        }
    },
    google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.CODEIAL__GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.CODEIAL_CALL_BACK_URL,
    jwt_secret: process.env.CODEIAL_JWT_SECRET,
    morgan:{
        mode:'combined',
        options:{stream:accessLogStream}
    }
}
// npm install -g win-node-env use this to run the ===== npm run prod_start
module.exports = development;