import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AdminLogin from './AdminLogin';
import TestBlogEditor from './TestBlogEditor';
import ErrorBoundary from './ErrorBoundary';
import { blogService } from '../../services/blogService';

const AdminContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  padding: 2rem;
`;

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem 0;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
`;

const DashboardTitle = styled.h1`
  color: white;
  font-size: 2.5rem;
  font-family: 'kenpixel', 'Press Start 2P', 'VT323', 'Share Tech Mono', 'Orbitron', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
`;

const LogoutButton = styled(motion.button)`
  padding: 0.8rem 1.5rem;
  background: rgba(255, 107, 107, 0.2);
  border: 2px solid rgba(255, 107, 107, 0.4);
  border-radius: 8px;
  color: #ff6b6b;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  font-family: "Handjet", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-variation-settings:
    "ELGR" 1,
    "ELSH" 2;

  &:hover {
    background: rgba(255, 107, 107, 0.3);
    border-color: rgba(255, 107, 107, 0.6);
    box-shadow: 0 0 20px rgba(255, 107, 107, 0.3);
  }
`;

const DashboardContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  background: rgba(26, 26, 26, 0.95);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  height: fit-content;
  backdrop-filter: blur(10px);
`;

const SidebarTitle = styled.h2`
  color: white;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-family: "Handjet", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-variation-settings:
    "ELGR" 1,
    "ELSH" 2;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
`;

const StatNumber = styled.div`
  color: white;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  font-family: "Handjet", sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-variation-settings:
    "ELGR" 1,
    "ELSH" 2;
`;

const QuickActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ActionButton = styled(motion.button)`
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  font-family: "Handjet", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-variation-settings:
    "ELGR" 1,
    "ELSH" 2;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
  }
`;

const MainContent = styled.div`
  background: rgba(26, 26, 26, 0.95);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  backdrop-filter: blur(10px);
`;

const ContentTitle = styled.h2`
  color: white;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  font-family: "Handjet", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-variation-settings:
    "ELGR" 1,
    "ELSH" 2;
`;

const PlaceholderText = styled.div`
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  padding: 3rem;
  font-family: "Handjet", sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-variation-settings:
    "ELGR" 1,
    "ELSH" 2;
  font-size: 1.2rem;
`;

const AdminDashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'create-post'>('dashboard');
  const [stats, setStats] = useState({
    totalPosts: 0,
    categories: 0,
    draftPosts: 0,
    totalViews: 15 // This could be tracked separately
  });
  
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if user is already authenticated
    const authTime = localStorage.getItem('adminLoginTime');
    const isAuth = localStorage.getItem('adminAuthenticated') === 'true';
    
    // Check if login is still valid (24 hours)
    if (authTime && isAuth) {
      const loginTime = parseInt(authTime);
      const now = Date.now();
      const hoursSinceLogin = (now - loginTime) / (1000 * 60 * 60);
      
      if (hoursSinceLogin > 24) {
        // Session expired
        localStorage.removeItem('adminAuthenticated');
        localStorage.removeItem('adminLoginTime');
        return false;
      }
    }
    
    return isAuth;
  });

  // Load stats when component mounts
  useEffect(() => {
    if (isAuthenticated) {
      const posts = blogService.getAllPosts();
      const categories = blogService.getCategories();
      
      setStats({
        totalPosts: posts.length,
        categories: categories.length - 1, // Subtract 'all' category
        draftPosts: 0, // Could be implemented later
        totalViews: 15 // Static for now
      });
    }
  }, [isAuthenticated]);

  const handleLogin = (authenticated: boolean) => {
    setIsAuthenticated(authenticated);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('adminLoginTime');
    setIsAuthenticated(false);
  };

  const handleSavePost = (post: any) => {
    console.log('Post saved:', post);
    // Post is already saved by the BlogPostEditor
    // Refresh stats
    const posts = blogService.getAllPosts();
    const categories = blogService.getCategories();
    
    setStats({
      totalPosts: posts.length,
      categories: categories.length - 1,
      draftPosts: 0,
      totalViews: stats.totalViews
    });
    
    alert('Blog post saved successfully!');
    setCurrentView('dashboard');
  };

  const handleCancelPost = () => {
    setCurrentView('dashboard');
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  if (currentView === 'create-post') {
    return (
      <ErrorBoundary>
        <AdminContainer>
          <DashboardHeader>
            <DashboardTitle>Create New Blog Post</DashboardTitle>
            <LogoutButton
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Logout
            </LogoutButton>
          </DashboardHeader>
          <TestBlogEditor 
            onSave={handleSavePost}
            onCancel={handleCancelPost}
          />
        </AdminContainer>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
    <AdminContainer>
      <DashboardHeader>
        <DashboardTitle>Admin Dashboard</DashboardTitle>
        <LogoutButton
          onClick={handleLogout}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Logout
        </LogoutButton>
      </DashboardHeader>

      <DashboardContent>
        <Sidebar>
          <SidebarTitle>Dashboard Overview</SidebarTitle>
          
          <StatsGrid>
            <StatCard>
              <StatNumber>{stats.totalPosts}</StatNumber>
              <StatLabel>Total Posts</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>{stats.categories}</StatNumber>
              <StatLabel>Categories</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>{stats.draftPosts}</StatNumber>
              <StatLabel>Draft Posts</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>{stats.totalViews}</StatNumber>
              <StatLabel>Total Views</StatLabel>
            </StatCard>
          </StatsGrid>

          <SidebarTitle>Quick Actions</SidebarTitle>
          <QuickActions>
            <ActionButton
              onClick={() => {
                console.log('Create New Post clicked');
                setCurrentView('create-post');
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Create New Post
            </ActionButton>
            <ActionButton
              onClick={() => {
                console.log('Manage Posts clicked');
                alert('Manage Posts feature coming soon!');
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Manage Posts
            </ActionButton>
            <ActionButton
              onClick={() => {
                console.log('Upload Images clicked');
                alert('Upload Images feature coming soon!');
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Upload Images
            </ActionButton>
            <ActionButton
              onClick={() => {
                console.log('View Analytics clicked');
                alert('View Analytics feature coming soon!');
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Analytics
            </ActionButton>
          </QuickActions>
        </Sidebar>

        <MainContent>
          <ContentTitle>Welcome to the Admin Panel</ContentTitle>
          <PlaceholderText>
            This is your content management dashboard. From here you can create new blog posts, 
            manage existing content, upload images, and monitor your website's performance.
            <br /><br />
            Use the quick actions in the sidebar to get started!
          </PlaceholderText>
        </MainContent>
      </DashboardContent>
    </AdminContainer>
    </ErrorBoundary>
  );
};

export default AdminDashboard;
