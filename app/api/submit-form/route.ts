import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Airtable from 'airtable';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      formType = 'General',
      firstName = '',
      lastName = '',
      email = '',
      website = '',
      supportType = '',
      budget = '',
      serviceCategory = '',
      industry = '',
      phone = '',
      subject = '',
      message = '',
      discussionTopic = '',
      monthlyBudget = '',
      projectBudget = ''
    } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    const fullName = `${firstName} ${lastName}`.trim() || 'Valued Prospect';
    const emailSubject = `New ${formType} Submission — ${fullName} ${website ? `(${website})` : ''}`;

    // 1. Send Email Notification via Nodemailer
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const notificationEmail = process.env.NOTIFICATION_EMAIL || 'hello@amplipath.com';

    let emailSent = false;
    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          <div style="background: #1A56DB; padding: 20px; color: #ffffff;">
            <h2 style="margin: 0; font-size: 20px;">${emailSubject}</h2>
            <p style="margin: 4px 0 0; font-size: 13px; opacity: 0.85;">Received on ${new Date().toLocaleString()}</p>
          </div>
          <div style="padding: 24px; background: #ffffff;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #64748b; font-weight: bold; width: 160px;">Form Type:</td><td style="padding: 8px 0; color: #0f172a;">${formType}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Full Name:</td><td style="padding: 8px 0; color: #0f172a;">${fullName}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Email:</td><td style="padding: 8px 0; color: #0f172a;"><a href="mailto:${email}">${email}</a></td></tr>
              ${phone ? `<tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Phone:</td><td style="padding: 8px 0; color: #0f172a;">${phone}</td></tr>` : ''}
              ${website ? `<tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Website URL:</td><td style="padding: 8px 0; color: #0f172a;"><a href="${website}" target="_blank">${website}</a></td></tr>` : ''}
              ${supportType ? `<tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Support Type:</td><td style="padding: 8px 0; color: #0f172a;">${supportType}</td></tr>` : ''}
              ${budget ? `<tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Budget:</td><td style="padding: 8px 0; color: #0f172a;">${budget}</td></tr>` : ''}
              ${monthlyBudget ? `<tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Monthly Budget:</td><td style="padding: 8px 0; color: #0f172a;">${monthlyBudget}</td></tr>` : ''}
              ${projectBudget ? `<tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Project Budget:</td><td style="padding: 8px 0; color: #0f172a;">${projectBudget}</td></tr>` : ''}
              ${serviceCategory ? `<tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Service Category:</td><td style="padding: 8px 0; color: #0f172a;">${serviceCategory}</td></tr>` : ''}
              ${industry ? `<tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Industry:</td><td style="padding: 8px 0; color: #0f172a;">${industry}</td></tr>` : ''}
              ${discussionTopic ? `<tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Topic:</td><td style="padding: 8px 0; color: #0f172a;">${discussionTopic}</td></tr>` : ''}
              ${subject ? `<tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Subject:</td><td style="padding: 8px 0; color: #0f172a;">${subject}</td></tr>` : ''}
              ${message ? `<tr><td style="padding: 8px 0; color: #64748b; font-weight: bold; vertical-align: top;">Message:</td><td style="padding: 8px 0; color: #0f172a; white-space: pre-wrap;">${message}</td></tr>` : ''}
            </table>
          </div>
          <div style="background: #f8fafc; padding: 12px 24px; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; text-align: center;">
            Sent automatically by AMPLIPATH Website Form Engine
          </div>
        </div>
      `;

      try {
        await transporter.sendMail({
          from: `"AMPLIPATH Web" <${smtpUser}>`,
          to: notificationEmail,
          replyTo: email,
          subject: emailSubject,
          html: emailHtml,
        });
        emailSent = true;
      } catch (mailErr) {
        console.error('Nodemailer error:', mailErr);
      }
    } else {
      console.log('[Dev Mode] SMTP credentials not set. Simulated email:', { to: notificationEmail, emailSubject });
    }

    // 2. Save to Airtable Database
    const airtableApiKey = process.env.AIRTABLE_API_KEY;
    let baseId = '';
    if (formType === 'RFP') baseId = process.env.AIRTABLE_BASE_ID_RFP || '';
    else if (formType === 'LetsTalk') baseId = process.env.AIRTABLE_BASE_ID_LETSTALK || '';
    else baseId = process.env.AIRTABLE_BASE_ID_CONTACT || '';

    if (airtableApiKey && baseId) {
      try {
        const base = new Airtable({ apiKey: airtableApiKey }).base(baseId);
        // Table name is typically 'Submissions' or 'Table 1'
        await base('Submissions').create([
          {
            fields: {
              Name: fullName,
              Email: email,
              Phone: phone || '',
              Website: website || '',
              SupportType: supportType || discussionTopic || '',
              Budget: budget || `Monthly: ${monthlyBudget}, Project: ${projectBudget}`,
              Industry: industry || '',
              ServiceCategory: serviceCategory || '',
              Message: message || '',
              SubmittedAt: new Date().toISOString(),
            },
          },
        ]);
      } catch (atErr) {
        console.error('Airtable insertion error:', atErr);
      }
    } else {
      console.log('[Dev Mode] Airtable API key or Base ID not set. Record logged.');
    }

    return NextResponse.json({
      success: true,
      message: 'Form submitted successfully',
      emailSent,
    });
  } catch (error: any) {
    console.error('Error submitting form:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
