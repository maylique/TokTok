import nodemailer from "nodemailer";

const mail = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

export const sendVerificationEmail = (email, verificationLink) => {
  const mailOptions = {
    from: process.env.MAILTRAP_USER,
    to:email,
    subject: "Verify your email",
    html: `
      <h1>Verify your email</h1>
      <p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`
  }

  mail.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  })
}