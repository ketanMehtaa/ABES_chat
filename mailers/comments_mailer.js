const nodeMailer = require('../config/nodemailer');
// this is another way of exporting a method

exports.newComment = (comment) => {
    console.log('inside newComment mailer', comment);
    let htmlString = nodeMailer.renderTemplate({
        comment: comment
    }, '/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from: 'abes chat',
        to: comment.user.email,
        subject: "New Comment Published!",
        // html: '<h1> yup your comment is now published!</h1>', // this method is to directly send from here
        html: htmlString
    }, (err, info) => {
        if (err) {
            console.log('error in sending mail', err)
        };
        console.log('message sent', info);
        return;
    });
}