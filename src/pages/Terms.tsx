import React from 'react';
import { Card, CardHeader, CardBody } from '@heroui/react';

const Terms: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
        <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
          </CardHeader>
          <CardBody>
            <p>
              By accessing and using this website and our services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </CardBody>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-xl font-semibold">2. Services Description</h2>
          </CardHeader>
          <CardBody>
            <p className="mb-4">We provide the following services:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Web Development and Design</li>
              <li>Mobile Application Development</li>
              <li>Cybersecurity and Penetration Testing</li>
              <li>Data Management and Entry</li>
              <li>Network Design and Security</li>
              <li>Event Management Systems</li>
              <li>Technical Consultation</li>
            </ul>
          </CardBody>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-xl font-semibold">3. Payment Terms</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Payment Schedule:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>50% upfront payment required to begin work</li>
                  <li>Remaining 50% due upon project completion</li>
                  <li>Additional fees may apply for rush projects</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Payment Methods:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Bank Transfer</li>
                  <li>Mobile Banking</li>
                  <li>Digital Payment Platforms</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Late Payments:</h3>
                <p>A 5% late fee will be applied to payments received after the due date.</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-xl font-semibold">4. Project Terms</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Project Timeline:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Project timelines will be agreed upon before work begins</li>
                  <li>Delays may occur due to client feedback or scope changes</li>
                  <li>Rush projects may incur additional fees</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Revisions:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Two rounds of revisions included in standard packages</li>
                  <li>Additional revisions may incur extra charges</li>
                  <li>Major scope changes may require new project quote</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Client Responsibilities:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Provide timely feedback and approvals</li>
                  <li>Supply necessary content and materials</li>
                  <li>Maintain regular communication</li>
                </ul>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-xl font-semibold">5. Intellectual Property</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <p>
                Upon full payment, clients will own the final deliverables. However, we retain the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the work in our portfolio</li>
                <li>Display the work for marketing purposes</li>
                <li>Use the work for educational purposes</li>
              </ul>
              <p>
                Third-party assets (fonts, images, etc.) remain subject to their respective licenses.
              </p>
            </div>
          </CardBody>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-xl font-semibold">6. Confidentiality</h2>
          </CardHeader>
          <CardBody>
            <p>
              We maintain strict confidentiality regarding client information and project details. We will not disclose any confidential information to third parties without written consent, except as required by law.
            </p>
          </CardBody>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-xl font-semibold">7. Limitation of Liability</h2>
          </CardHeader>
          <CardBody>
            <p>
              Our liability is limited to the amount paid for services. We are not liable for any indirect, incidental, or consequential damages arising from the use of our services.
            </p>
          </CardBody>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-xl font-semibold">8. Warranty and Support</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Warranty Period:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>30 days warranty on all deliverables</li>
                  <li>Bug fixes and minor adjustments included</li>
                  <li>Major changes may require additional payment</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Support:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Support period varies by package</li>
                  <li>Emergency support available for premium packages</li>
                  <li>Extended support available for additional fees</li>
                </ul>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-xl font-semibold">9. Termination</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <p>Either party may terminate the agreement with written notice:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Client termination: 50% of remaining balance due</li>
                <li>Provider termination: Full refund of unused portion</li>
                <li>Immediate termination for breach of terms</li>
              </ul>
            </div>
          </CardBody>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-xl font-semibold">10. Governing Law</h2>
          </CardHeader>
          <CardBody>
            <p>
              These terms are governed by the laws of Bangladesh. Any disputes will be resolved through mediation or arbitration in Dhaka, Bangladesh.
            </p>
          </CardBody>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-xl font-semibold">11. Contact Information</h2>
          </CardHeader>
          <CardBody>
            <p className="mb-4">
              For questions about these terms, please contact us:
            </p>
            <div className="space-y-2">
              <p><strong>Email:</strong> legal@yeasinedewan.dev</p>
              <p><strong>Address:</strong> 146/5/a, Bank colony, 60 feet barekmolla mor, mirpur-2, Dhaka, Bangladesh</p>
            </div>
          </CardBody>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-xl font-semibold">12. Changes to Terms</h2>
          </CardHeader>
          <CardBody>
            <p>
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Continued use of our services constitutes acceptance of the modified terms.
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Terms; 