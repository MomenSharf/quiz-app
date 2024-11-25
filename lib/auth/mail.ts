import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (email: string, token: string) => {
    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${token}`; // Change this for your local dev URL

    const result = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Verify your email",
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
    });
};

export const sendVerificationEmailResetPassword = async (email: string, token: string) => {
    const resetPasswordUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/forgot-password?token=${token}`; // Update for your dev or production URL

    const result = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Reset Your Password",
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
    });

    console.log(result);
    
};


