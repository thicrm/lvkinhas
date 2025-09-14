import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import Home from './components/Home';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Contact from './components/Contact';
import Blog from './components/Blog';
import Footer from './components/Footer';
import AdminDashboard from './components/Admin/AdminDashboard';
import GlobalStyles from './styles/GlobalStyles';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    // Add className to body based on current route
    document.body.className = location.pathname === '/' ? 'homepage' : '';
  }, [location]);

  return (
    <AppContainer>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      <Footer />
    </AppContainer>
  );
}

function App() {
  return (
    <Router>
      <GlobalStyles />
      <AppContent />
    </Router>
  );
}

export default App;
