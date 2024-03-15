const nodemailer = require('nodemailer');
// adds

// Create a transporter using Brevo's SMTP server
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "contact@grocient.com",
    pass: "mcbp cyfk tjvy xni",
  },
});

// Function to send email
function sendEmail(to, subject, text, otp) {
    const mailOptions = {
        from: 'ZIVON',
        to: to,
        subject: subject,
        text: text,
        html: '<div style="font-family: Helvetica, Arial, sans-serif; min-width: 1000px; overflow: auto; line-height: 2;">' +
            '<div style="margin: 10px auto; width: 80%; padding: 10px 0;">' +
            '<div style="border-bottom: 1px solid #eee;">' +
            '<a href="" style="font-size: 1.4em; color: #00466a; text-decoration: none; font-weight: 600;">ZIVON</a>' +
            '</div>' +
            '<p style="font-size: 1.1em;">Hi,</p>' +
            `<p> ${text} </p>` +
            `<h2 style="background: #00466a; margin: 0 auto; width: max-content; padding: 0 10px; color: #fff; border-radius: 4px;"> ${otp} </h2>` +
            '<p style="font-size: 0.9em;">Regards,<br />ZIVON</p>' +
            '<hr style="border: none; border-top: 1px solid #eee;" />' +
            '<div style="float: right; padding: 8px 0; color: #aaa; font-size: 0.8em; line-height: 1; font-weight: 300;">' +
            '</div>' +
            '</div>' +
            '</div>'
    };
    

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            if (callback) {
                callback(error);
            }
        } else {
            console.log('Email sent:', info.response);
            console.log('Email sent successfully.');
            if (callback) {
                callback(null, info);
            }
        }
    });
}

module.exports = { sendEmail };
