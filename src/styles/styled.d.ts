import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      white: string;
      green: string;
      gray: string;
      black: string;
      blackMedio: string;
      red: string;
    };
  }
}
