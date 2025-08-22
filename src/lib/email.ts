import emailjs from "@emailjs/browser";

export async function sendResetPasswordEmail(toEmail: string, accessToken: string) {
    const resetLink = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/reset-password?token=${encodeURIComponent(accessToken)}`;


    try {
        const response = await emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
            {
                email: toEmail,
                link: resetLink,
            },
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
        );

        console.log("EmailJS response:", response);
        return true;
    } catch (error) {
        console.error("Error sending reset email via EmailJS:", error);
        throw new Error("Failed to send reset email");
    }
}
