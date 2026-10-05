import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Airtable from 'airtable';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      formType = 'General',
      name = '',
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
      enquiryType = '',
      discussionTopic = '',
      monthlyBudget = '',
      projectBudget = '',
      sourcePage = ''
    } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    const SUPPORT_TYPE_MAP: Record<string, string> = {
      marketing: 'Ongoing marketing growth',
      website: 'Website / ecommerce development',
      app: 'Mobile app / software / AI development',
      hybrid: 'Marketing + technology together',
      unsure: 'Not sure yet'
    };

    const SERVICE_CAT_MAP: Record<string, string> = {
      search: 'Search & GEO/AEO (SEO, AI, Ads)',
      social: 'Social & Paid Ads (Meta, TikTok)',
      content: 'Content & Strategy (CRO, Email)',
      ai: 'AI & Tech (Chatbots, Automation)',
      web: 'Web & Apps (Custom, Ecommerce)',
      africa: 'Africa Market (Local SEO, Ads)',
      niche: 'Niche Growth (Gaming, Real Estate)'
    };

    const finalSupportType = SUPPORT_TYPE_MAP[supportType] || supportType;
    const finalServiceCategory = SERVICE_CAT_MAP[serviceCategory] || serviceCategory;
    const finalIndustry = (industry && industry !== 'Not specified' && industry !== 'undefined') ? industry.trim() : '';

    let displayFormType = formType;
    if (formType === 'RFP') displayFormType = 'Request for Proposal (RFP)';
    else if (formType === 'lead' || formType === 'LetsTalk') displayFormType = "Let's Talk";
    else if (formType === 'contact') displayFormType = 'Contact Us';
    else if (formType === 'free-audit') displayFormType = 'Free Audit Request';

    const fullName = name.trim() || `${firstName} ${lastName}`.trim() || 'Valued Prospect';
    const emailSubject = `New ${displayFormType} Submission — ${fullName} ${website ? `(${website})` : ''}`;

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
              <tr><td style="padding: 8px 0; color: #64748b; font-weight: bold; width: 160px;">Form Type:</td><td style="padding: 8px 0; color: #0f172a;">${displayFormType}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Full Name:</td><td style="padding: 8px 0; color: #0f172a;">${fullName}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Email:</td><td style="padding: 8px 0; color: #0f172a;"><a href="mailto:${email}">${email}</a></td></tr>
              ${phone ? `<tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Phone:</td><td style="padding: 8px 0; color: #0f172a;">${phone}</td></tr>` : ''}
              ${website ? `<tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Website URL:</td><td style="padding: 8px 0; color: #0f172a;"><a href="${website}" target="_blank">${website}</a></td></tr>` : ''}
              ${finalSupportType ? `<tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Support Type:</td><td style="padding: 8px 0; color: #0f172a;">${finalSupportType}</td></tr>` : ''}
              ${finalServiceCategory ? `<tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Service Category:</td><td style="padding: 8px 0; color: #0f172a;">${finalServiceCategory}</td></tr>` : ''}
              ${finalIndustry ? `<tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Industry:</td><td style="padding: 8px 0; color: #0f172a;">${finalIndustry}</td></tr>` : ''}
              ${discussionTopic ? `<tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Topic:</td><td style="padding: 8px 0; color: #0f172a;">${discussionTopic}</td></tr>` : ''}
              ${budget ? `<tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Budget:</td><td style="padding: 8px 0; color: #0f172a;">${budget}</td></tr>` : ''}
              ${monthlyBudget ? `<tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Monthly Budget:</td><td style="padding: 8px 0; color: #0f172a;">${monthlyBudget}</td></tr>` : ''}
              ${projectBudget ? `<tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Project Budget:</td><td style="padding: 8px 0; color: #0f172a;">${projectBudget}</td></tr>` : ''}
              ${enquiryType ? `<tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Enquiry Type:</td><td style="padding: 8px 0; color: #0f172a;">${enquiryType}</td></tr>` : ''}
              ${subject ? `<tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Subject:</td><td style="padding: 8px 0; color: #0f172a;">${subject}</td></tr>` : ''}
              ${message ? `<tr><td style="padding: 8px 0; color: #64748b; font-weight: bold; vertical-align: top;">Message:</td><td style="padding: 8px 0; color: #0f172a; white-space: pre-wrap;">${message}</td></tr>` : ''}
              ${sourcePage ? `<tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Source Page:</td><td style="padding: 8px 0; color: #0f172a;">${sourcePage}</td></tr>` : ''}
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
    const universalBaseId = process.env.AIRTABLE_BASE_ID || '';
    let baseId = '';
    if (formType === 'RFP') baseId = process.env.AIRTABLE_BASE_ID_RFP || universalBaseId;
    else if (formType === 'LetsTalk' || formType === 'lead' || formType === "Let's Talk") baseId = process.env.AIRTABLE_BASE_ID_LETSTALK || universalBaseId;
    else baseId = process.env.AIRTABLE_BASE_ID_CONTACT || universalBaseId;

    if (airtableApiKey && baseId) {
      try {
        const base = new Airtable({ apiKey: airtableApiKey }).base(baseId);
        const tableName = process.env.AIRTABLE_TABLE_NAME || 'Submissions';

        const fullNotes = [
          `Form Type: ${displayFormType}`,
          `Full Name: ${fullName}`,
          `Email: ${email}`,
          phone ? `Phone: ${phone}` : '',
          website ? `Website: ${website}` : '',
          finalSupportType ? `Support Type: ${finalSupportType}` : '',
          finalServiceCategory ? `Service Category: ${finalServiceCategory}` : '',
          discussionTopic ? `Topic: ${discussionTopic}` : '',
          budget ? `Budget: ${budget}` : (monthlyBudget || projectBudget ? `Monthly: ${monthlyBudget || 'N/A'}, Project: ${projectBudget || 'N/A'}` : ''),
          finalIndustry ? `Industry: ${finalIndustry}` : '',
          enquiryType ? `Enquiry Type: ${enquiryType}` : '',
          subject ? `Subject: ${subject}` : '',
          message ? `Message: ${message}` : '',
          sourcePage ? `Source Page: ${sourcePage}` : '',
          `Submitted At: ${new Date().toLocaleString()}`,
        ].filter(Boolean).join('\n');

        const tryInsert = async (targetTable: string) => {
          try {
            await base(targetTable).create([
              {
                fields: {
                  Name: fullName,
                  Email: email,
                  Phone: phone || '',
                  Website: website || '',
                  SupportType: finalSupportType || discussionTopic || '',
                  Budget: budget || (monthlyBudget ? `Monthly: ${monthlyBudget}, Project: ${projectBudget}` : ''),
                  Industry: finalIndustry || '',
                  ServiceCategory: finalServiceCategory || '',
                  Message: message || '',
                  SubmittedAt: new Date().toISOString(),
                  Notes: fullNotes,
                },
              },
            ]);
          } catch (fieldErr: any) {
            if (fieldErr.message && fieldErr.message.includes('Unknown field name')) {
              await base(targetTable).create([
                {
                  fields: {
                    Name: `${fullName} (${email})`,
                    Notes: fullNotes,
                  },
                },
              ]);
            } else {
              throw fieldErr;
            }
          }
        };

        try {
          await tryInsert(tableName);
        } catch (tableErr: any) {
          if (tableErr.message && (tableErr.message.includes('Table not found') || tableErr.message.includes('NOT_FOUND') || tableErr.message.includes('could not find table'))) {
            try {
              await tryInsert('tbl3f1eEvfOysBc0E');
            } catch {
              await tryInsert('Table 1');
            }
          } else {
            throw tableErr;
          }
        }
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
