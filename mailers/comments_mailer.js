const nodeMailer = require('../config/nodemailer');

// this is another way of exporting a method

exports.newComment = (comment) => {
    console.log('inside newComment mailer', comment);

    nodeMailer.transporter.sendMail({
        from: 'abes chat',
        to: comment.user.email,
        subject: "New Comment Published!",
        html: '<h1> yup your comment is now published!</h1>'
    }, (err, info) => {
        if (err) {
            console.log('error in sending mail', err)
        };
        return;
        console.log('message sent', info);
        return;
    });
}