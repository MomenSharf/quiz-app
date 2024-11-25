import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY)

const domain = "http://localhost:3000"

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmationLink = `${domain}/verify-email?token=${token}`

    const result = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: 'mwmnshrfaldinps3@gmail.com',
        subject: "Verify your email",
        html: `<p>Your verify code is ${token}.</p>`
    })  
}