// var nodemailer = require("nodemailer");

// const SendEmailUtility = async (EmailTo, EmailText, EmailSubject) => {
//   let transporter = nodemailer.createTransport({
//     host: "mail.teamrabbil.com",
//     port: 25,
//     secure: false,
//     auth: {
//       user: "info@teamrabbil.com",
//       pass: "~sR4[bhaC[Qs",
//     },
//     tls: {
//       rejectUnauthorized: false,
//     },
//   });

//   let mailOptions = {
//     from: "Billah Shop <info@teamrabbil.com>",
//     to: EmailTo,
//     subject: EmailSubject,
//     text: EmailText,
//   };

//   return await transporter.sendMail(mailOptions);
// };
// module.exports = SendEmailUtility;

var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");

const SendEmailUtility = async (EmailTo, EmailText, EmailSubject) => {
  var transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: "sinanrumi7733@gmail.com",
        pass: process.env.GMAIL_PASSWORD,
      },
    })
  );

  var mailOptions = {
    from: "sinanrumi7733@gmail.com",
    to: EmailTo,
    subject: EmailSubject,
    text: EmailText,
  };

  return await transporter.sendMail(mailOptions);
};

module.exports = SendEmailUtility;

// {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Email sent: " + info.response);
//   }
// });
