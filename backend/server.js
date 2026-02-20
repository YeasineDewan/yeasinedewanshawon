import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

let messages = [];
let portfolioRatings = [];

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yeasinedewanshawon@gmail.com',
    pass: 'your-email-password' // Replace with your email password or app password
  }
});

// Endpoint to receive contact form submissions
app.post('/api/contact', (req, res) => {
  const { name, email, message, subject } = req.body;
  if (!name || !email || !message || !subject) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newMessage = { id: messages.length + 1, name, email, subject, message, date: new Date() };
  messages.push(newMessage);

  // Send email notification
  const mailOptions = {
    from: 'yeasinedewanshawon@gmail.com',
    to: 'yeasinedewanshawon@gmail.com',
    subject: `New Contact Message from ${name} - ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    } else {
      console.log('Email sent:', info.response);
      return res.status(200).json({ message: 'Message received and email sent' });
    }
  });
});

// Endpoint to get all contact messages
app.get('/api/messages', (req, res) => {
  res.json(messages);
});

// Endpoint to submit portfolio rating and comment
app.post('/api/portfolio-rating', (req, res) => {
  const { rating, comment } = req.body;
  if (!rating) {
    return res.status(400).json({ error: 'Rating is required' });
  }
  const newRating = { id: portfolioRatings.length + 1, rating, comment, date: new Date() };
  portfolioRatings.push(newRating);
  res.status(200).json({ message: 'Rating submitted' });
});

// Endpoint to get all portfolio ratings and comments
app.get('/api/portfolio-ratings', (req, res) => {
  res.json(portfolioRatings);
});

// Blog Posts APIs
app.get('/api/blog-posts', (req, res) => {
  res.json(blogPosts);
});

app.post('/api/blog-posts', (req, res) => {
  const { title, date, status, content } = req.body;
  if (!title || !date || !status || !content) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const newPost = { id: blogPosts.length + 1, title, date, status, content };
  blogPosts.push(newPost);
  res.status(201).json(newPost);
});

app.put('/api/blog-posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, date, status, content } = req.body;
  const postIndex = blogPosts.findIndex(post => post.id === id);
  if (postIndex === -1) {
    return res.status(404).json({ error: 'Blog post not found' });
  }
  blogPosts[postIndex] = { id, title, date, status, content };
  res.json(blogPosts[postIndex]);
});

app.delete('/api/blog-posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const postIndex = blogPosts.findIndex(post => post.id === id);
  if (postIndex === -1) {
    return res.status(404).json({ error: 'Blog post not found' });
  }
  blogPosts.splice(postIndex, 1);
  res.status(204).send();
});

// Projects APIs
app.get('/api/projects', (req, res) => {
  res.json(projects);
});

app.post('/api/projects', (req, res) => {
  const { name, description, status, startDate, endDate } = req.body;
  if (!name || !description || !status || !startDate || !endDate) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const newProject = { id: projects.length + 1, name, description, status, startDate, endDate };
  projects.push(newProject);
  res.status(201).json(newProject);
});

app.put('/api/projects/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, description, status, startDate, endDate } = req.body;
  const projectIndex = projects.findIndex(project => project.id === id);
  if (projectIndex === -1) {
    return res.status(404).json({ error: 'Project not found' });
  }
  projects[projectIndex] = { id, name, description, status, startDate, endDate };
  res.json(projects[projectIndex]);
});

app.delete('/api/projects/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const projectIndex = projects.findIndex(project => project.id === id);
  if (projectIndex === -1) {
    return res.status(404).json({ error: 'Project not found' });
  }
  projects.splice(projectIndex, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
