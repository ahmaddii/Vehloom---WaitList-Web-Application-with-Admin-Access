import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/vehloom/Nav";
import { Footer } from "@/components/vehloom/Footer";

export const Route = createFileRoute("/terms")(({
  head: () => ({
    meta: [
      { title: "Terms and Conditions - Vehloom" },
      {
        name: "description",
        content: "Read Vehloom's terms and conditions.",
      },
    ],
  }),
  component: Terms,
}));

function Terms() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Nav />
      
      {/* Hero Section */}
      <section className="border-b border-border bg-gradient-to-b from-background to-background/80 px-5 py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Terms and Conditions</h1>
          <p className="mt-3 text-muted-foreground">
            Last updated: September 2026
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-5 py-12 md:py-16">
        <div className="mx-auto max-w-3xl prose prose-invert">
          <div className="space-y-8 text-foreground">
            <section>
              <h2 className="text-2xl font-bold tracking-tight mb-4">1. Agreement to Terms</h2>
              <p className="text-muted-foreground mb-3">
                By accessing and using Vehloom ("the Service"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight mb-4">2. User Eligibility</h2>
              <p className="text-muted-foreground mb-3">
                You must be at least 13 years old (or the minimum digital age in your jurisdiction) to use Vehloom. By using the Service, you represent and warrant that you meet this requirement. Parents or guardians of users under 18 are responsible for supervising their use of the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight mb-4">3. User-Generated Content (UGC) - Ownership & License</h2>
              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">Content Ownership:</strong> You retain all intellectual property rights to any content you upload, create, or submit on Vehloom, including artwork, images, text, and comments ("User Content").
              </p>
              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">License Grant:</strong> By uploading or submitting User Content to Vehloom, you grant Vehloom a worldwide, non-exclusive, royalty-free license to:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground mb-3">
                <li>Store, reproduce, and display your User Content</li>
                <li>Distribute your User Content to other users of the Service</li>
                <li>Create derivative works or modifications for platform functionality</li>
                <li>Use your User Content for marketing and promotional purposes (with your permission)</li>
              </ul>
              <p className="text-muted-foreground">
                <strong className="text-foreground">No Compensation:</strong> You acknowledge that you will not receive any compensation or royalties for Vehloom's use of your User Content beyond access to the platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight mb-4">4. Prohibited Content & Activities</h2>
              <p className="text-muted-foreground mb-3">
                You agree NOT to upload, create, share, or engage in any of the following on Vehloom:
              </p>
              <div className="mt-4 space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Content Violations:</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li><strong>Copyright Infringement:</strong> Stolen, plagiarized, or unauthorized artwork</li>
                    <li><strong>Explicit Content:</strong> Sexually explicit, obscene, or NSFW material (such material may result in immediate account suspension)</li>
                    <li><strong>Hate Speech & Harassment:</strong> Content promoting discrimination, violence, or harassment based on race, ethnicity, religion, gender, sexual orientation, disability, or other protected characteristics</li>
                    <li><strong>Misinformation:</strong> Deliberately false, misleading, or deceptive content</li>
                    <li><strong>Spam & Scams:</strong> Phishing links, malware, pyramid schemes, or fraudulent offers</li>
                    <li><strong>Violence & Illegal Content:</strong> Content promoting illegal activities, violence, self-harm, or terrorism</li>
                    <li><strong>Personal Information:</strong> Sharing others' private information without consent (doxing)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Behavioral Violations:</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Bullying, stalking, or harassment of other users</li>
                    <li>Engaging in abusive, threatening, or defamatory communication</li>
                    <li>Spam messaging or unsolicited promotional content</li>
                    <li>Impersonation or catfishing other users</li>
                    <li>Circumventing account bans or platform restrictions</li>
                    <li>Attempting to hack, exploit, or interfere with Vehloom's infrastructure</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight mb-4">5. Chat & Community Guidelines</h2>
              <p className="text-muted-foreground mb-3">
                Vehloom provides chat functionality to enable communication between artists and creators. When using chat, you agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-3">
                <li>Communicate respectfully and professionally</li>
                <li>Not engage in harassment, threats, or abusive language</li>
                <li>Not spam or send unsolicited commercial messages</li>
                <li>Respect others' privacy and personal boundaries</li>
                <li>Not share malicious links, viruses, or malware</li>
                <li>Not attempt to scam or mislead other users</li>
              </ul>
              <p className="text-muted-foreground">
                Vehloom reserves the right to monitor chat for violations of these guidelines and may restrict or terminate access to chat features.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight mb-4">6. Reporting & Moderation</h2>
              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">Reporting Violations:</strong> If you encounter content or behavior that violates these Terms of Service, you can:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground mb-3">
                <li>Click the "Report" button on any post or profile</li>
                <li>Use the "Report a Problem" feature in the app's help section</li>
                <li>Contact our support team at support@vehloom.com</li>
              </ul>
              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">Content Moderation:</strong> Vehloom employs a team of moderators to review reported content and behavioral violations. We commit to:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground mb-3">
                <li>Reviewing reports within 24 hours</li>
                <li>Taking action on confirmed violations (removal of content, account suspension, or termination)</li>
                <li>Providing transparency regarding moderation decisions when possible</li>
              </ul>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Blocking Users:</strong> You can block any user from your account settings. Blocked users will not be able to message you, view your profile, or interact with your content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight mb-4">7. AI-Generated Content Disclaimer</h2>
              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">AI Features:</strong> Vehloom may provide AI-powered tools and features (such as artwork generation, text suggestions, or image enhancement) powered by Google Generative AI or similar services.
              </p>
              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">Content Ownership:</strong> AI-generated content created through Vehloom's features is owned by you. However, you understand and accept that:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground mb-3">
                <li>AI may produce unexpected, inaccurate, or biased results</li>
                <li>AI-generated content may contain errors or quality issues</li>
                <li>Vehloom and third-party AI providers are not liable for AI-generated content</li>
                <li>You are solely responsible for reviewing and validating AI-generated content before sharing</li>
              </ul>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Copyright Considerations:</strong> You are responsible for ensuring that AI-generated content does not infringe on third-party copyrights or intellectual property rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight mb-4">8. Account Termination & Suspension</h2>
              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">Vehloom reserves the right, at its sole discretion, to suspend or terminate your account immediately if you:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground mb-3">
                <li>Violate these Terms of Service or any other policies</li>
                <li>Engage in prohibited activities or conduct</li>
                <li>Harass, threaten, or abuse other users</li>
                <li>Upload copyright-infringing or illegal content</li>
                <li>Attempt to exploit or compromise Vehloom's security</li>
                <li>Engage in fraudulent, deceptive, or illegal activities</li>
              </ul>
              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">Suspension:</strong> Account suspension means you temporarily lose access to your account and content. Your content remains visible to others during suspension.
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Termination:</strong> Account termination means permanent deletion of your account, profile, and associated content. Termination is irreversible.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight mb-4">9. Disclaimers & Liability Limitations</h2>
              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">Service "As-Is":</strong> Vehloom is provided on an "as-is" basis without warranties of any kind, express or implied, including warranties of merchantability, fitness for a particular purpose, or non-infringement.
              </p>
              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">No Guarantee:</strong> We do not guarantee that:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground mb-3">
                <li>The Service will be error-free or uninterrupted</li>
                <li>Defects will be corrected</li>
                <li>Your data is completely secure</li>
                <li>The Service will meet your expectations</li>
              </ul>
              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">Limitation of Liability:</strong> In no event shall Vehloom, its founders, or its service providers be liable for indirect, incidental, special, consequential, or punitive damages arising from your use of the Service, including loss of data, revenue, or profits, even if advised of such damages.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight mb-4">10. Acceptable Use & Conduct</h2>
              <p className="text-muted-foreground mb-3">
                You agree not to use Vehloom for any purpose that is unlawful or prohibited by these terms. You specifically agree not to:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Violate any applicable laws or regulations</li>
                <li>Interfere with or disrupt the Service's functionality</li>
                <li>Attempt to gain unauthorized access to Vehloom's systems</li>
                <li>Collect or scrape user data without consent</li>
                <li>Use automated tools or bots to interact with the Service (except as permitted)</li>
                <li>Engage in price gouging or exploitation of other users</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight mb-4">11. Policy Changes & Updates</h2>
              <p className="text-muted-foreground mb-3">
                Vehloom reserves the right to modify these Terms of Service at any time. We will notify you of significant changes by posting the updated Terms in the app or via email. Your continued use of Vehloom following such changes constitutes your acceptance of the updated Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight mb-4">12. Governing Law & Dispute Resolution</h2>
              <p className="text-muted-foreground mb-3">
                These Terms of Service are governed by and construed in accordance with the laws of the jurisdiction in which Vehloom is located, without regard to its conflict of law principles.
              </p>
              <p className="text-muted-foreground mb-3">
                Any disputes arising from these Terms or your use of Vehloom shall be resolved through binding arbitration or mediation before pursuing litigation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight mb-4">13. Contact Information</h2>
              <p className="text-muted-foreground mb-3">
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Email:</strong> support@vehloom.com
              </p>
              <p className="text-muted-foreground mt-2">
                <strong className="text-foreground">In-App Support:</strong> Use the "Help Center" or "Report a Problem" section within the app
              </p>
              <p className="text-muted-foreground mt-4 text-xs bg-card/50 border border-border rounded p-3">
                <strong>NOTE FOR APP STORE COMPLIANCE:</strong> These Terms include mandatory requirements for moderating User-Generated Content and handling abuse reports. Failure to implement the reporting, moderation, and blocking mechanisms described herein may result in app rejection from the Apple App Store or Google Play Store.
              </p>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
