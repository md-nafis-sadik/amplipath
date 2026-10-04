import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Amplipath',
  description:
    'Learn how Amplipath collects, uses, and protects your personal information across our website and integrated growth services.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pg on" id="pg-privacy">
      <div className="hero">
        <div className="hero-bar"></div>
        <div className="h-tag">
          <div className="h-dot"></div>LEGAL & TRANSPARENCY
        </div>
        <h1 className="h-h1" style={{ fontSize: '38px' }}>
          Privacy Policy.
        </h1>
        <p className="h-sub">
          Effective Date: August 10, 2026 (08/10/2026) &bull; How we collect, use, and protect your information at Amplipath.
        </p>
      </div>

      <div className="s-white" style={{ minHeight: '600px', paddingBottom: '90px' }}>
        <div style={{ maxWidth: '900px', margin: '0', color: '#334155' }}>
          {/* Introduction Card */}
          <div
            style={{
              background: '#f8fafc',
              border: '1.5px solid #e2e8f0',
              borderLeft: '4px solid var(--ac)',
              borderRadius: '12px',
              padding: '24px 28px',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: 'var(--ac)',
                textTransform: 'uppercase',
                letterSpacing: '.06em',
                marginBottom: '8px',
              }}
            >
              Effective Date: 08/10/2026
            </div>
            <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#334155', margin: 0 }}>
              Amplipath (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy. This Privacy
              Policy explains what information we collect, how we use it, and the choices you have.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
            {/* 1. Information We Collect */}
            <section style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '32px' }}>
              <h2
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#0f172a',
                  marginBottom: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '28px',
                    height: '28px',
                    borderRadius: '7px',
                    background: 'var(--acl)',
                    color: 'var(--ac)',
                    fontSize: '14px',
                    fontWeight: 800,
                  }}
                >
                  1
                </span>
                Information We Collect
              </h2>
              <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#475569', marginBottom: '14px' }}>
                When you submit a form on our website (such as a Request for Proposal) or otherwise contact us, we may collect:
              </p>
              <ul style={{ listStyle: 'none', paddingLeft: 0, margin: '0 0 18px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14.5px', color: '#475569', lineHeight: 1.6 }}>
                  <span style={{ color: 'var(--ac)', fontWeight: 800, marginTop: '1px' }}>&bull;</span>
                  <span><strong>Contact details:</strong> Your name and contact details (email address, phone number).</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14.5px', color: '#475569', lineHeight: 1.6 }}>
                  <span style={{ color: 'var(--ac)', fontWeight: 800, marginTop: '1px' }}>&bull;</span>
                  <span><strong>Business details:</strong> Company name, website URL.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14.5px', color: '#475569', lineHeight: 1.6 }}>
                  <span style={{ color: 'var(--ac)', fontWeight: 800, marginTop: '1px' }}>&bull;</span>
                  <span><strong>Project needs:</strong> Information about the services you&apos;re interested in and your project requirements (support type, service category, estimated budget).</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14.5px', color: '#475569', lineHeight: 1.6 }}>
                  <span style={{ color: 'var(--ac)', fontWeight: 800, marginTop: '1px' }}>&bull;</span>
                  <span><strong>Additional communications:</strong> Any other information you choose to share with us.</span>
                </li>
              </ul>
              <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#64748b' }}>
                We may also automatically collect limited technical information when you visit our website, such as your browser type, device, and general usage data, through standard analytics tools.
              </p>
            </section>

            {/* 2. How We Use Your Information */}
            <section style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '32px' }}>
              <h2
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#0f172a',
                  marginBottom: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '28px',
                    height: '28px',
                    borderRadius: '7px',
                    background: 'var(--acl)',
                    color: 'var(--ac)',
                    fontSize: '14px',
                    fontWeight: 800,
                  }}
                >
                  2
                </span>
                How We Use Your Information
              </h2>
              <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#475569', marginBottom: '14px' }}>
                We use the information we collect to:
              </p>
              <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14.5px', color: '#475569', lineHeight: 1.6 }}>
                  <span style={{ color: '#22c55e', fontWeight: 700 }}>✓</span>
                  <span>Respond to your inquiries and proposal requests</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14.5px', color: '#475569', lineHeight: 1.6 }}>
                  <span style={{ color: '#22c55e', fontWeight: 700 }}>✓</span>
                  <span>Recommend relevant marketing and technology services</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14.5px', color: '#475569', lineHeight: 1.6 }}>
                  <span style={{ color: '#22c55e', fontWeight: 700 }}>✓</span>
                  <span>Communicate with you about your project or our services</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14.5px', color: '#475569', lineHeight: 1.6 }}>
                  <span style={{ color: '#22c55e', fontWeight: 700 }}>✓</span>
                  <span>Improve our website and services</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14.5px', color: '#475569', lineHeight: 1.6 }}>
                  <span style={{ color: '#22c55e', fontWeight: 700 }}>✓</span>
                  <span>Comply with legal obligations</span>
                </li>
              </ul>
            </section>

            {/* 3. How We Share Information */}
            <section style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '32px' }}>
              <h2
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#0f172a',
                  marginBottom: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '28px',
                    height: '28px',
                    borderRadius: '7px',
                    background: 'var(--acl)',
                    color: 'var(--ac)',
                    fontSize: '14px',
                    fontWeight: 800,
                  }}
                >
                  3
                </span>
                How We Share Information
              </h2>
              <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#475569', marginBottom: '14px' }}>
                <strong>We do not sell your personal information.</strong> We may share it with:
              </p>
              <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14.5px', color: '#475569', lineHeight: 1.6 }}>
                  <span style={{ color: 'var(--ac)', fontWeight: 800 }}>&bull;</span>
                  <span>Team members and contractors working on your project, where relevant</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14.5px', color: '#475569', lineHeight: 1.6 }}>
                  <span style={{ color: 'var(--ac)', fontWeight: 800 }}>&bull;</span>
                  <span>Service providers who help us operate our business (e.g., email, scheduling, or hosting tools), under confidentiality obligations</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14.5px', color: '#475569', lineHeight: 1.6 }}>
                  <span style={{ color: 'var(--ac)', fontWeight: 800 }}>&bull;</span>
                  <span>Authorities, if required by law</span>
                </li>
              </ul>
            </section>

            {/* 4. Data Retention */}
            <section style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '32px' }}>
              <h2
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#0f172a',
                  marginBottom: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '28px',
                    height: '28px',
                    borderRadius: '7px',
                    background: 'var(--acl)',
                    color: 'var(--ac)',
                    fontSize: '14px',
                    fontWeight: 800,
                  }}
                >
                  4
                </span>
                Data Retention
              </h2>
              <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#475569', margin: 0 }}>
                We retain your information for as long as needed to respond to your inquiry, deliver services, or as required by law. You may request deletion of your information at any time (see Section 6).
              </p>
            </section>

            {/* 5. Cookies */}
            <section style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '32px' }}>
              <h2
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#0f172a',
                  marginBottom: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '28px',
                    height: '28px',
                    borderRadius: '7px',
                    background: 'var(--acl)',
                    color: 'var(--ac)',
                    fontSize: '14px',
                    fontWeight: 800,
                  }}
                >
                  5
                </span>
                Cookies
              </h2>
              <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#475569', margin: 0 }}>
                Our website may use cookies or similar technologies to understand site usage and improve your experience. You can control cookies through your browser settings.
              </p>
            </section>

            {/* 6. Your Rights */}
            <section style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '32px' }}>
              <h2
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#0f172a',
                  marginBottom: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '28px',
                    height: '28px',
                    borderRadius: '7px',
                    background: 'var(--acl)',
                    color: 'var(--ac)',
                    fontSize: '14px',
                    fontWeight: 800,
                  }}
                >
                  6
                </span>
                Your Rights
              </h2>
              <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#475569', margin: 0 }}>
                Depending on your location, you may have the right to access, correct, or request deletion of your personal information. To make a request, contact us using the details below in Section 10.
              </p>
            </section>

            {/* 7. Data Security */}
            <section style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '32px' }}>
              <h2
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#0f172a',
                  marginBottom: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '28px',
                    height: '28px',
                    borderRadius: '7px',
                    background: 'var(--acl)',
                    color: 'var(--ac)',
                    fontSize: '14px',
                    fontWeight: 800,
                  }}
                >
                  7
                </span>
                Data Security
              </h2>
              <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#475569', margin: 0 }}>
                We take reasonable technical and organizational measures to protect your information from unauthorized access, loss, or misuse.
              </p>
            </section>

            {/* 8. Children's Privacy */}
            <section style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '32px' }}>
              <h2
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#0f172a',
                  marginBottom: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '28px',
                    height: '28px',
                    borderRadius: '7px',
                    background: 'var(--acl)',
                    color: 'var(--ac)',
                    fontSize: '14px',
                    fontWeight: 800,
                  }}
                >
                  8
                </span>
                Children&apos;s Privacy
              </h2>
              <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#475569', margin: 0 }}>
                Our services are intended for businesses and individuals aged 18 and older. We do not knowingly collect information from children.
              </p>
            </section>

            {/* 9. Changes to This Policy */}
            <section style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '32px' }}>
              <h2
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#0f172a',
                  marginBottom: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '28px',
                    height: '28px',
                    borderRadius: '7px',
                    background: 'var(--acl)',
                    color: 'var(--ac)',
                    fontSize: '14px',
                    fontWeight: 800,
                  }}
                >
                  9
                </span>
                Changes to This Policy
              </h2>
              <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#475569', margin: 0 }}>
                We may update this Privacy Policy from time to time. The &ldquo;Effective Date&rdquo; above reflects the most recent revision.
              </p>
            </section>

            {/* 10. Contact Us */}
            <section>
              <h2
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#0f172a',
                  marginBottom: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '28px',
                    height: '28px',
                    borderRadius: '7px',
                    background: 'var(--acl)',
                    color: 'var(--ac)',
                    fontSize: '14px',
                    fontWeight: 800,
                  }}
                >
                  10
                </span>
                Contact Us
              </h2>
              <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#475569', marginBottom: '16px' }}>
                If you have questions about this Privacy Policy or how your information is handled, contact us at:
              </p>
              <div
                style={{
                  background: '#f8fafc',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '20px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '18px' }}>📧</span>
                  <a
                    href="mailto:hello@amplipath.com"
                    style={{
                      fontSize: '15px',
                      fontWeight: 700,
                      color: 'var(--ac)',
                      textDecoration: 'none',
                    }}
                  >
                    hello@amplipath.com
                  </a>
                </div>
                <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6 }}>
                  <div>📍 <strong>US Office:</strong> 215 S Monroe St, Tallahassee, FL, US</div>
                  <div style={{ marginTop: '4px' }}>📍 <strong>Africa Office:</strong> 7 Igele Maroko St, Ondo State, NG</div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
