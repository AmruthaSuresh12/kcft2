// Vercel Serverless Function: POST /api/register
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { name, email, phone, age, course, mode, message } = req.body || {};

  if (!name || !email || !phone || !course || !mode) {
    return res.status(400).json({ success: false, message: 'Missing required fields: name, email, phone, course, mode' });
  }

  const receiverEmail = process.env.KCFT_RECEIVER_EMAIL || 'kcft.tumakuru@gmail.com';
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.log(`[SIMULATED REGISTER EMAIL] Course: ${course} | Name: ${name} (${phone})`);
    return res.status(200).json({ success: true, message: 'Registration submitted successfully!' });
  }

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #fafafa;">
      <h2 style="color: #8C034E; border-bottom: 2px solid #F2798F; padding-bottom: 10px; margin-top: 0;">New Course Registration</h2>
      <p style="color: #666; font-size: 14px;">A new enrollment request has been submitted from the KCFT website:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr>
          <td style="padding: 10px 0; font-weight: bold; width: 150px; color: #555; border-bottom: 1px solid #eee;">Full Name:</td>
          <td style="padding: 10px 0; color: #333; border-bottom: 1px solid #eee;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; font-weight: bold; color: #555; border-bottom: 1px solid #eee;">Email:</td>
          <td style="padding: 10px 0; color: #333; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px 0; font-weight: bold; color: #555; border-bottom: 1px solid #eee;">Phone Number:</td>
          <td style="padding: 10px 0; color: #333; border-bottom: 1px solid #eee;"><a href="tel:${phone}">${phone}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px 0; font-weight: bold; color: #555; border-bottom: 1px solid #eee;">Age of Student:</td>
          <td style="padding: 10px 0; color: #333; border-bottom: 1px solid #eee;">${age || 'Not specified'}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; font-weight: bold; color: #555; border-bottom: 1px solid #eee;">Selected Course:</td>
          <td style="padding: 10px 0; color: #8C034E; font-weight: bold; border-bottom: 1px solid #eee;">${course}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; font-weight: bold; color: #555; border-bottom: 1px solid #eee;">Preferred Mode:</td>
          <td style="padding: 10px 0; color: #333; border-bottom: 1px solid #eee;">${mode}</td>
        </tr>
      </table>
      
      <div style="margin-top: 20px; padding: 15px; background-color: #fff; border-left: 4px solid #8C034E; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
        <h4 style="margin: 0 0 10px 0; color: #555;">Message / Questions:</h4>
        <p style="margin: 0; line-height: 1.6; color: #444; white-space: pre-wrap;">${message || 'No additional questions.'}</p>
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
        subject: `KCFT Course Registration: ${course}`,
        html: htmlContent
      })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Resend API error');
    }

    return res.status(200).json({ success: true, message: 'Registration submitted successfully!' });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ success: false, message: `Failed to send email: ${error.message}` });
  }
}
