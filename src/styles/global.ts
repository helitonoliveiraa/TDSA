import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }



  html {
    font-size: 62.5%; /* 1rem to equal 10px */
  }

  body {
    font-family: 'Lato' ,Helvetica, Arial, Lucida, sans-serif;
    background: ${({ theme }) => theme.colors.white};
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'Lato' ,Helvetica, Arial, Lucida, sans-serif;
    font-size: 1.6rem;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }
`;
