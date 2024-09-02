import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
        list-style: none;
    }
`;

export { GlobalStyle }