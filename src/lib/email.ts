import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail({
  email,
  name,
  url,
}: {
  email: string;
  name: string;
  url: string;
}) {
  console.log("[Email] Sending verification email to:", email);
  console.log("[Email] Verification URL:", url);

  const { data, error } = await resend.emails.send({
    from: "DevStash <onboarding@resend.dev>",
    to: email,
    subject: "Verify your DevStash account",
    html: `
      <p>Hi ${name || "there"},</p>
      <p>Click the link below to verify your email address:</p>
      <p><a href="${url}">${url}</a></p>
      <p>This link expires in 24 hours.</p>
      <p>If you didn&apos;t create an account, you can safely ignore this email.</p>
    `,
  });

  if (error) {
    console.error("[Email] Failed to send verification email:", error);
  } else {
    console.log("[Email] Verification email sent successfully:", data?.id);
  }
}
