import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, // your SMTP username
    pass: process.env.SMTP_PASSWORD, // your SMTP password
  },
});

export async function sendResetPasswordEmail(to: string, resetLink: string) {
  const mailOptions = {
    from: process.env.EMAIL_FROM, // sender address
    to, // list of receivers
    subject: 'Password Reset Request', // Subject line
    text: `You requested a password reset. Please use the following link to reset your password: ${resetLink}`, // plain text body
    html: `<p>You requested a password reset. Please use the following link to reset your password:</p><p><a href="${resetLink}">Reset Password</a></p>`, // HTML body
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to ${to}`);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw new Error('Error sending password reset email');
  }
}
