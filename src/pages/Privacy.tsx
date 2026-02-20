import React from 'react';
import { Card, CardHeader, CardBody } from '@heroui/react';

const Privacy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-xl font-semibold">1. Information We Collect</h2>
          </CardHeader>
          <CardBody>
            <p className="mb-4">
              We collect information you provide directly to us, such as when you:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Contact us through our website forms</li>
              <li>Request a quote or consultation</li>
              <li>Subscribe to our newsletter</li>
              <li>Apply for our services</li>
            </ul>
            <p className="mt-4">
              This information may include your name, email address, phone number, and project details.
            </p>
          </CardBody>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-xl font-semibold">2. How We Use Your Information</h2>
          </CardHeader>
          <CardBody>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide and improve our services</li>
              <li>Communicate with you about projects</li>
              <li>Send you updates and newsletters (with your consent)</li>
              <li>Respond to your inquiries and support requests</li>
              <li>Comply with legal obligations</li>
            </ul>
          </CardBody>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-xl font-semibold">3. Information Sharing</h2>
          </CardHeader>
          <CardBody>
            <p className="mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To trusted third parties who assist us in operating our website and conducting business</li>
              <li>When required by law or to protect our rights</li>
              <li>In connection with a business transfer or merger</li>
            </ul>
          </CardBody>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-xl font-semibold">4. Data Security</h2>
          </CardHeader>
          <CardBody>
            <p className="mb-4">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
            <p>
              However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </CardBody>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-xl font-semibold">5. Cookies and Tracking</h2>
          </CardHeader>
          <CardBody>
            <p className="mb-4">
              We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookie settings through your browser preferences.
            </p>
          </CardBody>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-xl font-semibold">6. Your Rights</h2>
          </CardHeader>
          <CardBody>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Withdraw consent for data processing</li>
              <li>Object to certain types of processing</li>
            </ul>
          </CardBody>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-xl font-semibold">7. Contact Us</h2>
          </CardHeader>
          <CardBody>
            <p className="mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="space-y-2">
              <p><strong>Email:</strong> privacy@yeasinedewan.dev</p>
              <p><strong>Address:</strong> 146/5/a, Bank colony, 60 feet barekmolla mor, mirpur-2, Dhaka, Bangladesh</p>
            </div>
          </CardBody>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-xl font-semibold">8. Changes to This Policy</h2>
          </CardHeader>
          <CardBody>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Privacy; 