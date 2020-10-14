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
    jwt_secret: 'codeial,'
}

const production = {
    name: 'production'
}

module.exports = development;