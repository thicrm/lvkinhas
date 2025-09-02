import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.6;
    color: #333;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 3.5rem;
    font-weight: 700;
  }

  h2 {
    font-size: 2.5rem;
  }

  h3 {
    font-size: 2rem;
  }

  p {
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: all 0.3s ease;
  }



  button {
    cursor: pointer;
    border: none;
    outline: none;
    font-family: inherit;
  }



  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .section {
    padding: 5rem 0;
  }

  .btn {
    display: inline-block;
    padding: 0.75rem 2rem;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border-radius: 5px;
    font-weight: 500;
    transition: all 0.3s ease;
    border: 2px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
  }

  .btn:hover {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border-color: rgba(255, 255, 255, 0.6);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
  }

  .btn-outline {
    background: transparent;
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.5);
  }

  .btn-outline:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
  }

  @media (max-width: 768px) {
    html {
      font-size: 14px;
    }
    
    .container {
      padding: 0 1rem;
    }
    
    .section {
      padding: 3rem 0;
    }
    
    h1 {
      font-size: 2.5rem;
    }
    
    h2 {
      font-size: 2rem;
    }
  }
`;

export default GlobalStyles;
