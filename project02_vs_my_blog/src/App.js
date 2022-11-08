import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Main from "./pages/Main";
import ThemeContext from "./context/AppContext";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "./style/theme";
import { GlobalStyle } from "./style/GlobalStyle";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Main />}>
      {/* <Route path="dashboard" element={<Dashboard />} /> */}
      {/* ... etc. */}
    </Route>
  )
);

function App() {
  const [selectedPost, setSelectedPost] = useState("");
  const [postData, setPostData] = useState([]);
  const [openPost, setOpenPost] = useState([]);

  useEffect(() => {
    setPostData([
      {
        type: "directory",
        title: "일상",
      },
      {
        type: "directory",
        title: "Tech",
        children: [
          {
            type: "post",
            title: "Tech1",
            path: "/Tech/Tech1",
          },
          {
            type: "post",
            title: "Tech2",
            path: "/Tech/Tech2",
          },
          {
            type: "directory",
            title: "Tech3",
            children: [
              {
                type: "post",
                title: "Tech31",
                path: "/Tech/Tech3/Tech31",
              },
              {
                type: "post",
                title: "Tech32",
                path: "/Tech/Tech3/Tech32",
              },
            ],
          },
        ],
      },
    ]);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        // 첫 중괄호 : js를 쓰기 위한 중괄호, 두번째 중괄호 : 그냥 오브젝트를 의한 중괄호
        selectedPost,
        setSelectedPost,

        openPost,
        setOpenPost,

        postData,
      }}
    >
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
