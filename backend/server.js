import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

// Force watch reload: updated environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

// Helper function to send email via Resend API (HTTP Fetch) or Nodemailer SMTP
const sendMail = async ({ to, subject, html, text, replyTo, senderName }) => {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (resendApiKey && resendApiKey.trim() !== '' && !resendApiKey.includes('your_resend_api_key')) {
    console.log('📨 Sending email via Resend API...');
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey.trim()}`
      },
      body: JSON.stringify({
        from: 'KCFT Website <onboarding@resend.dev>',
        to: [to],
        reply_to: replyTo,
        subject: subject,
        html: html,
        text: text
      })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Resend API returned an error status ' + response.status);
    }
    console.log('✅ Email sent via Resend successfully, ID:', data.id);
    return data;
  }

  // Fallback to Nodemailer SMTP
  const emailService = process.env.EMAIL_SERVICE;
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (!emailUser || emailUser.includes('your_sender_email') || !emailPass || emailPass.trim() === '') {
    console.warn('⚠️ Warning: Email sender credentials are not configured in .env. Email logging simulation only:');
    console.log(`[SIMULATE EMAIL] To: ${to} | Subject: ${subject}`);
    return { simulated: true };
  }

  console.log('📨 Sending email via Nodemailer SMTP...');
  const transporter = nodemailer.createTransport({
    service: emailService,
    auth: {
      user: emailUser,
      pass: emailPass
    }
  });

  const mailOptions = {
    from: `"${senderName}" <${emailUser}>`,
    to,
    replyTo,
    subject,
    text,
    html
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('✅ Email sent via Nodemailer SMTP successfully:', info.messageId);
  return info;
};

// API route for contact/registration form submissions
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Missing required fields: name, email, message' });
  }

  console.log(`\n==========================================`);
  console.log(`Received contact form submission:`);
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Subject: ${subject || '(No Subject)'}`);
  console.log(`Message: ${message}`);
  console.log(`==========================================\n`);

  const receiverEmail = (process.env.KCFT_RECEIVER_EMAIL || 'kcft.tumakuru@gmail.com').toLowerCase();

  const textContent = `
You have a new submission from the KCFT website contact form:

Name: ${name}
Email: ${email}
Subject: ${subject || '(None)'}

Message:
------------------------------------------
${message}
------------------------------------------
  `;

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
    await sendMail({
      to: receiverEmail,
      subject: `KCFT Contact Form: ${subject || 'New Inquiry'}`,
      html: htmlContent,
      text: textContent,
      replyTo: email,
      senderName: name
    });
    return res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('❌ Email transmission error:', error);
    return res.status(500).json({ success: false, message: `Failed to send email: ${error.message}` });
  }
});

// API route for course registration form submissions
app.post('/api/register', async (req, res) => {
  const { name, email, phone, age, course, mode, message } = req.body;

  if (!name || !email || !phone || !course || !mode) {
    return res.status(400).json({ success: false, message: 'Missing required fields: name, email, phone, course, mode' });
  }

  console.log(`\n==========================================`);
  console.log(`Received Course Registration:`);
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Phone: ${phone}`);
  console.log(`Age: ${age || '(Not specified)'}`);
  console.log(`Course: ${course}`);
  console.log(`Mode: ${mode}`);
  console.log(`Message: ${message || '(No message)'}`);
  console.log(`==========================================\n`);

  const receiverEmail = (process.env.KCFT_RECEIVER_EMAIL || 'kcft.tumakuru@gmail.com').toLowerCase();

  const textContent = `
New Course Registration Details:

Name: ${name}
Email: ${email}
Phone: ${phone}
Age: ${age || 'N/A'}
Selected Course: ${course}
Preferred Mode: ${mode}

Additional Message/Questions:
------------------------------------------
${message || '(None)'}
------------------------------------------
  `;

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
    await sendMail({
      to: receiverEmail,
      subject: `KCFT Course Registration: ${course}`,
      html: htmlContent,
      text: textContent,
      replyTo: email,
      senderName: `${name} (Registration)`
    });
    return res.status(200).json({ success: true, message: 'Registration submitted successfully!' });
  } catch (error) {
    console.error('❌ Email transmission error:', error);
    return res.status(500).json({ success: false, message: `Failed to send email: ${error.message}` });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Express server running on port ${PORT}`);
});
