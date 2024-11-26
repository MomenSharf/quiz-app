import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS    
    },
});

// Send verification email
export const sendVerificationEmail = async (email: string, token: string) => {
    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${token}`;

    const mailOptions = {
        from: `"QuizzesUp Support" <${process.env.NODEMAILER_USER}>`, // Sender address
        to: email, // Recipient address
        subject: "Verify your email", // Subject line
        html: `
            <div style="font-family: 'Google Sans', sans-serif; color: #333; line-height: 1.6; text-align: center;">
                <h2 style="color: #7C3AED;">Welcome to QuizzesUp!</h2>
                <p>Thank you for joining QuizzesUp, where learning meets fun! To complete your account setup, please verify your email address by clicking the button below:</p>
                <a href="${verificationUrl}" style="display: inline-block; padding: 12px 24px; font-size: 16px; color: #fff; background-color: #7C3AED; text-decoration: none; border-radius: 6px; font-weight: bold;">Click to Verify</a>
                <p>If you didn’t request this email, you can safely ignore it.</p>
                <p>Need assistance? Contact our support team at <a href="mailto:support@quizzesup.com">support@quizzesup.com</a>.</p>
                <br>
                <p>Good luck, and may the quizzes be ever in your favor!</p>
                <p>The QuizzesUp Team</p>
            </div>
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Verification email sent: ", info.messageId);
    } catch (error) {
        console.error("Error sending verification email: ", error);
    }
};

// Send reset password email
export const sendVerificationEmailResetPassword = async (email: string, token: string) => {
    const resetPasswordUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/forgot-password?token=${token}`;

    const mailOptions = {
        from: `"QuizzesUp Support" <${process.env.NODEMAILER_USER}>`,  // Sender address
        to: email, // Recipient address
        subject: "Reset Your Password", // Subject line
        html: `
            <div style="font-family: 'Google Sans', sans-serif; color: #333; line-height: 1.6; text-align: center;">
                <h2 style="color: #7C3AED;">Reset Your Password</h2>
                <p>We received a request to reset your password for your QuizzesUp account. Click the button below to reset your password:</p>
                <a href="${resetPasswordUrl}" style="display: inline-block; padding: 12px 24px; font-size: 16px; color: #fff; background-color: #7C3AED; text-decoration: none; border-radius: 6px; font-weight: bold;">Reset Password</a>
                <p>If you didn’t request this email, you can safely ignore it. Your password will remain unchanged.</p>
                <p>Need assistance? Contact our support team at <a href="mailto:support@quizzesup.com">support@quizzesup.com</a>.</p>
                <br>
                <p>Thank you for using QuizzesUp!</p>
                <p>The QuizzesUp Team</p>
            </div>
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Reset password email sent: ", info.messageId);
    } catch (error) {
        console.error("Error sending reset password email: ", error);
    }
};
