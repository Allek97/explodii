import { createGlobalStyle } from "styled-components";

import Poppins from "./Poppins-Black.ttf";
import Roboto from "./Roboto-Black.ttf";

export default createGlobalStyle`
    @font-face {
        font-family: 'Font Name';
        src: local('Font Name'), local('FontName'),
        url(${Poppins}) format('ttf'),
        url(${Roboto}) format('ttf');
        font-weight: 300;
        font-style: normal;
    }
`;
