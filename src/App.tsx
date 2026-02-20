import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HeroUIProvider } from '@heroui/react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Services from './pages/Services';
import Blog from './pages/Blog';
import PentestingLab from './pages/PentestingLab';
import Contact from './pages/Contact';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './components/ThemeProvider';

const App: React.FC = () => {
  return (
    <HeroUIProvider>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/pentesting-lab" element={<PentestingLab />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/admin" element={<AdminPanel />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </HeroUIProvider>
  );
};

export default App;