import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button, Avatar } from '@heroui/react';

const blogPosts = [
  {
    title: 'Securing Your Web Application: Best Practices',
    excerpt: 'Learn about the latest techniques to protect your web applications from common vulnerabilities.',
    date: '2024-03-15',
    author: 'John Doe',
    category: 'Web Security',
  },
  {
    title: 'Introduction to Penetration Testing',
    excerpt: "Discover the basics of penetration testing and why it's crucial for your organization's security.",
    date: '2024-03-10',
    author: 'Jane Smith',
    category: 'Penetration Testing',
  },
  {
    title: 'The Rise of AI in Cybersecurity',
    excerpt: 'Explore how artificial intelligence is revolutionizing the field of cybersecurity.',
    date: '2024-03-05',
    author: 'John Doe',
    category: 'Cybersecurity Trends',
  },
];

const Blog: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post, index) => (
          <Card key={index} className="bg-content2">
            <CardHeader>
              <h2 className="text-xl font-semibold">{post.title}</h2>
            </CardHeader>
            <CardBody>
              <p className="text-foreground-600 mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between text-sm text-foreground-500">
                <span>{post.date}</span>
                <span>{post.category}</span>
              </div>
            </CardBody>
            <CardFooter className="flex justify-between items-center">
              <div className="flex items-center">
                <Avatar
                  src={`https://img.heroui.chat/image/avatar?w=32&h=32&u=${post.author}`}
                  size="sm"
                  className="mr-2"
                />
                <span className="text-sm">{post.author}</span>
              </div>
              <Button color="primary" variant="flat" size="sm">Read More</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Blog;