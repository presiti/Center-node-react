import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

*:not(svg, path) {
  color: ${({ theme }) => theme.color.text};
}

*::-webkit-scrollbar {
  width: 4px; /* 스크롤바의 너비 */
  height: 6px;
}

*::-webkit-scrollbar-thumb {
  height: 10%; /* 스크롤바의 길이 */
  width: 10px;
  background: #899cc2; /* 스크롤바의 색상 */

  border-radius: 10px;
}

*::-webkit-scrollbar-track {
  background: ${({ theme }) =>
    theme.color.rightContentBg}; /*스크롤바 뒷 배경 색상*/
}

`;
