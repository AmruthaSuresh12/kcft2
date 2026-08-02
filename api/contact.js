// Vercel Serverless Function: POST /api/contact
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Missing required fields: name, email, message' });
  }

  const receiverEmail = process.env.KCFT_RECEIVER_EMAIL || 'kcft.tumakuru@gmail.com';
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.log(`[SIMULATED CONTACT EMAIL] To: ${receiverEmail} | From: ${name} (${email}) | Subject: ${subject}`);
    return res.status(200).json({ success: true, message: 'Inquiry received successfully!' });
  }

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #fafafa;">
      <h2 style="color: #8C034E; border-bottom: 2px solid #F2798F; padding-bottom: 10px; margin-top: 0;">New Website Inquiry - KCFT</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr>
          <td style="padding: 8px 0; font-weight: bold; width: 100px; color: #555;">Name:</td>
          <td style="padding: 8px 0; color: #333;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
          <td style="padding: 8px 0; color: #333;"><a href="mailto:${email}">${email}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #555;">Subject:</td>
          <td style="padding: 8px 0; color: #333;">${subject || '(None)'}</td>
        </tr>
      </table>
      <div style="margin-top: 20px; padding: 15px; background-color: #fff; border-left: 4px solid #8C034E; border-radius: 4px;">
        <h4 style="margin: 0 0 10px 0; color: #555;">Message:</h4>
        <p style="margin: 0; line-height: 1.6; color: #444; white-space: pre-wrap;">${message}</p>
      </div>
      <footer style="margin-top: 30px; text-align: center; font-size: 11px; color: #888;">
        Sent automatically from Keerthana Creative Foundation Trust website.
      </footer>
    </div>
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`
      },
      body: JSON.stringify({
        from: 'KCFT Website <onboarding@resend.dev>',
        to: [receiverEmail],
        reply_to: email,
        subject: `KCFT Contact Form: ${subject || 'New Inquiry'}`,
        html: htmlContent
      })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Resend API error');
    }

    return res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ success: false, message: `Failed to send email: ${error.message}` });
  }
}
