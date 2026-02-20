import React, { useState } from 'react';
import { Input, Textarea, Button, Card, CardBody } from '@heroui/react';
import { Icon } from '@iconify/react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('Failed to send message.');
      }
    } catch (error) {
      setStatus('Error sending message.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Contact Me</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-content2">
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Name"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                label="Email"
                name="email"
                placeholder="your.email@example.com"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Input
                label="Subject"
                name="subject"
                placeholder="What's this about?"
                value={formData.subject}
                onChange={handleChange}
                required
              />
              <Textarea
                label="Message"
                name="message"
                placeholder="Your message here..."
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
              />
              <Button type="submit" color="primary">
                Send Message
              </Button>
              {status && <p className="mt-4 text-center">{status}</p>}
            </form>
          </CardBody>
        </Card>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="mb-6">
            Feel free to reach out if you have any questions about my services or if you'd like to discuss a potential project.
          </p>
          <div className="space-y-4">
            <div className="flex items-center">
              <Icon icon="lucide:mail" className="text-primary mr-2" width="24" height="24" />
              <span>yeasinedewanshawon@gmail.com</span>
            </div>
            <div className="flex items-center">
              <Icon icon="lucide:phone" className="text-primary mr-2" width="24" height="24" />
              <span>+880 (179) 324-4543</span>
            </div>
            <div className="flex items-center">
              <Icon icon="lucide:map-pin" className="text-primary mr-2" width="24" height="24" />
              <span>146/5/a, Bank colony, 60 feet barekmolla mor, mirpur-2, Dhaka, Bangladesh</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
