// Netlify Function: handles POST /api/contact
exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ success: false, message: 'Method Not Allowed' }) };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ success: false, message: 'Invalid JSON body' }) };
  }

  const { name, email, subject, message } = body;

  if (!name || !email || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, message: 'Missing required fields: name, email, message' })
    };
  }

  const receiverEmail = process.env.KCFT_RECEIVER_EMAIL || 'kcft.tumakuru@gmail.com';
  const resendApiKey = process.env.RESEND_API_KEY;

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

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Message sent successfully!' })
    };
  } catch (error) {
    console.error('Email error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: `Failed to send email: ${error.message}` })
    };
  }
};
