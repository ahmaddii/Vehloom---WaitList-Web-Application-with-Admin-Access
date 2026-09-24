import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/vehloom/Nav";
import { Footer } from "@/components/vehloom/Footer";

export const Route = createFileRoute("/privacy")(({
  head: () => ({
    meta: [
      { title: "Privacy Policy - Vehloom" },
      {
        name: "description",
        content: "Read Vehloom's privacy policy to understand how we handle your personal data.",
      },
    ],
  }),
  component: Privacy,
}));

function Privacy() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Nav />
      
      {/* Hero Section */}
      <section className="border-b border-border bg-gradient-to-b from-background to-background/80 px-5 py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Privacy Policy</h1>
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
              <h2 className="text-2xl font-bold tracking-tight mb-4">Introduction</h2>
              <p className="text-muted-foreground mb-3">
                Vehloom ("we" or "us" or "our") operates the Vehloom application and website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
              </p>
              <p className="text-muted-foreground">
                We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight mb-4">1. Information Collection and Use</h2>
              <p className="text-muted-foreground mb-3">
                We collect several different types of information for various purposes to provide and improve our Service to you.
              </p>
              
              <div className="mt-4 space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Personal Data:</h3>
                  <p className="text-muted-foreground mb-2">
                    While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). This may include, but is not limited to:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Email address and username</li>
                    <li>First name and last name</li>
                    <li>Profile picture and bio</li>
                    <li>Phone number (optional)</li>
                    <li>Uploaded artwork and media files</li>
                    <li>Chat messages and communications</li>
                    <li>Device information (device type, OS version)</li>
                    <li>IP address and location data</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Usage Data:</h3>
                  <p className="text-muted-foreground mb-2">
                    We automatically collect certain information when you use our Service, including:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Pages or features you access and the time spent</li>
                    <li>Search queries and interactions with artwork</li>
                    <li>Likes, comments, follows, and engagement metrics</li>
                    <li>App crash reports and error logs</li>
                    <li>Device identifiers and unique advertising IDs</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Device Permissions:</h3>
                  <p className="text-muted-foreground mb-2">
                    To provide certain features, we request access to:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li><strong>Camera & Photo Library:</strong> To allow you to upload and share artwork, take photos, and crop images for your profile.</li>
                    <li><strong>Push Notifications:</strong> To notify you about messages, interactions on your artwork, follows, and platform updates.</li>
                    <li><strong>Contacts:</strong> To help you find friends and other artists (optional).</li>
                    <li><strong>Location:</strong> To provide location-based features and analytics (optional).</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight mb-4">2. Third-Party Services</h2>
              <p className="text-muted-foreground mb-3">
                We use the following third-party services that may collect and process your data:
              </p>
              <div className="mt-4 space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Supabase (Backend & Authentication)</h3>
                  <p className="text-muted-foreground">
                    We use Supabase for database storage, authentication, and user management. Your personal data, uploaded artwork, and chat messages are processed by Supabase. Please review their privacy policy at{" "}
                    <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      supabase.com/privacy
                    </a>
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Firebase (Push Notifications & Analytics)</h3>
                  <p className="text-muted-foreground">
                    We use Firebase Cloud Messaging for push notifications and Firebase Analytics to understand how users interact with our app. Please review Google's privacy policy at{" "}
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      policies.google.com/privacy
                    </a>
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Google Generative AI (AI Features)</h3>
                  <p className="text-muted-foreground">
                    If you use AI-powered features for artwork generation or text assistance, your queries may be processed by Google's Generative AI services. Please review{" "}
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Google's AI Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight mb-4">3. How We Use Your Data</h2>
              <p className="text-muted-foreground mb-3">
                Vehloom uses the collected data for various purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>To create and maintain your account</li>
                <li>To store and display your artwork and profile information</li>
                <li>To enable chat and communication features between users</li>
                <li>To send push notifications about messages, interactions, and updates</li>
                <li>To provide and improve AI-powered features</li>
                <li>To personalize and enhance your experience</li>
                <li>To provide customer support and respond to your inquiries</li>
                <li>To detect, prevent, and address fraud and security issues</li>
                <li>To monitor and analyze usage patterns and app performance</li>
                <li>To comply with legal obligations and enforce our Terms of Service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight mb-4">4. Data Security</h2>
              <p className="text-muted-foreground mb-3">
                The security of your data is important to us. We implement industry-standard security measures including:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground mb-3">
                <li>Encryption of data in transit using TLS/SSL protocols</li>
                <li>Encryption of sensitive data at rest</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Access controls and authentication mechanisms</li>
              </ul>
              <p className="text-muted-foreground">
                However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight mb-4">5. Data Retention & Deletion</h2>
              <p className="text-muted-foreground mb-3">
                You have the right to request deletion of your account and all associated personal data. To request account deletion:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground mb-3">
                <li>Go to your account settings in the app</li>
                <li>Select "Delete Account"</li>
                <li>Follow the confirmation steps</li>
              </ol>
              <p className="text-muted-foreground mb-3">
                Upon deletion, we will:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground mb-3">
                <li>Permanently delete your personal information from our systems</li>
                <li>Remove your profile and uploaded artwork</li>
                <li>Delete your chat history</li>
                <li>Retain only anonymized usage data for analytics purposes</li>
              </ul>
              <p className="text-muted-foreground">
                Please note that some data may be retained if required by law or for legitimate business purposes (e.g., payment records for 7 years for tax compliance).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight mb-4">6. Your Privacy Rights</h2>
              <p className="text-muted-foreground mb-3">
                Depending on your location, you may have certain rights regarding your personal data, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-3">
                <li><strong>Right to Access:</strong> Request a copy of your personal data</li>
                <li><strong>Right to Correction:</strong> Request removal or modification of inaccurate data</li>
                <li><strong>Right to Deletion:</strong> Request deletion of your personal data ("Right to be Forgotten")</li>
                <li><strong>Right to Restrict Processing:</strong> Request limitation of how we use your data</li>
                <li><strong>Right to Data Portability:</strong> Receive your data in a machine-readable format</li>
                <li><strong>Right to Object:</strong> Object to certain processing activities</li>
                <li><strong>Right to Withdraw Consent:</strong> Opt out of certain data processing</li>
              </ul>
              <p className="text-muted-foreground">
                To exercise any of these rights, contact us at privacy@vehloom.com. We will respond within 30 days of your request.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight mb-4">7. Children's Privacy</h2>
              <p className="text-muted-foreground">
                Vehloom is not intended for users under the age of 13 (or the minimum digital age in your jurisdiction). We do not knowingly collect personal information from children under 13. If we discover that we have collected such information, we will promptly delete it. If you believe we have collected information from a child, please contact us immediately at privacy@vehloom.com.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight mb-4">8. Policy Changes</h2>
              <p className="text-muted-foreground mb-3">
                We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the updated policy in the app or via email.
              </p>
              <p className="text-muted-foreground">
                Your continued use of the Service following such changes constitutes your acceptance of the updated Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight mb-4">9. Contact Us</h2>
              <p className="text-muted-foreground mb-3">
                If you have any questions about this Privacy Policy or your personal data, please contact us:
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Email:</strong> privacy@vehloom.com
              </p>
              <p className="text-muted-foreground mt-2">
                <strong className="text-foreground">In-App Support:</strong> Use the "Help Center" or "Report a Problem" section within the app
              </p>
              <p className="text-muted-foreground mt-4 text-xs bg-card/50 border border-border rounded p-3">
                We aim to resolve privacy concerns within 30 days. If you're not satisfied, you may have the right to lodge a complaint with your local data protection authority.
              </p>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
