import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Airtable from 'airtable';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      firstName = '',
      lastName = '',
      email = '',
      country = '',
      role = '',
      portfolioUrl = '',
      whyAmplipath = '',
    } = body;

    if (!email || !firstName || !role) {
      return NextResponse.json(
        { success: false, message: 'First name, email, and role are required' },
        { status: 400 }
      );
    }

    const fullName = `${firstName} ${lastName}`.trim();
    const emailSubject = `New Job Application: ${role} — ${fullName}`;

    // 1. Email notification
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const notificationEmail = process.env.NOTIFICATION_EMAIL || 'hello@amplipath.com';

    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: { user: smtpUser, pass: smtpPass },
      });

      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          <div style="background: #1A56DB; padding: 20px; color: #ffffff;">
            <h2 style="margin: 0; font-size: 20px;">${emailSubject}</h2>
            <p style="margin: 4px 0 0; font-size: 13px; opacity: 0.85;">Applicant from ${country || 'Worldwide'}</p>
          </div>
          <div style="padding: 24px; background: #ffffff;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #64748b; font-weight: bold; width: 160px;">Role:</td><td style="padding: 8px 0; color: #0f172a; font-weight: bold;">${role}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Applicant Name:</td><td style="padding: 8px 0; color: #0f172a;">${fullName}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Email:</td><td style="padding: 8px 0; color: #0f172a;"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Country:</td><td style="padding: 8px 0; color: #0f172a;">${country}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Portfolio / LinkedIn:</td><td style="padding: 8px 0; color: #0f172a;"><a href="${portfolioUrl}" target="_blank">${portfolioUrl}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #64748b; font-weight: bold; vertical-align: top;">Why Amplipath?:</td><td style="padding: 8px 0; color: #0f172a; white-space: pre-wrap;">${whyAmplipath}</td></tr>
            </table>
          </div>
          <div style="background: #f8fafc; padding: 12px 24px; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; text-align: center;">
            AMPLIPATH Careers Pipeline
          </div>
        </div>
      `;

      try {
        await transporter.sendMail({
          from: `"AMPLIPATH Careers" <${smtpUser}>`,
          to: notificationEmail,
          replyTo: email,
          subject: emailSubject,
          html: emailHtml,
        });
      } catch (mailErr) {
        console.error('Career mail error:', mailErr);
      }
    }

    // 2. Save to Airtable "Job Applications" table
    const airtableApiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID_CAREERS || process.env.AIRTABLE_BASE_ID;

    if (airtableApiKey && baseId) {
      try {
        const base = new Airtable({ apiKey: airtableApiKey }).base(baseId);
        const fullNotes = [
          `Application for: ${role}`,
          `Full Name: ${fullName}`,
          `Email: ${email}`,
          country ? `Country: ${country}` : '',
          portfolioUrl ? `Portfolio / LinkedIn: ${portfolioUrl}` : '',
          whyAmplipath ? `Why Amplipath: ${whyAmplipath}` : '',
          `Applied At: ${new Date().toLocaleString()}`,
        ].filter(Boolean).join('\n');

        try {
          await base('Job Applications').create([
            {
              fields: {
                FullName: fullName,
                Email: email,
                Country: country,
                Role: role,
                PortfolioUrl: portfolioUrl,
                WhyAmplipath: whyAmplipath,
                AppliedAt: new Date().toISOString(),
              },
            },
          ]);
        } catch {
          // Fallback to default table
          try {
            await base(process.env.AIRTABLE_TABLE_NAME || 'tbl3f1eEvfOysBc0E').create([
              {
                fields: {
                  Name: `[Job App] ${fullName} - ${role}`,
                  Notes: fullNotes,
                },
              },
            ]);
          } catch (innerErr) {
            console.error('Careers fallback error:', innerErr);
          }
        }
      } catch (atErr) {
        console.error('Airtable careers error:', atErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Application received successfully',
    });
  } catch (error: any) {
    console.error('Error submitting job application:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
