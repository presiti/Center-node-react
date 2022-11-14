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
import axios from "axios";
import { darkTheme, lightTheme } from "./style/theme";
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
  const [selectedTag, setSelectedTag] = useState(null);
  const [postData, setPostData] = useState([]);
  const [openPost, setOpenPost] = useState([]);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    async function fetch() {
      const { data: resPostData } = await axios.get(
        "http://localhost:4000/post/all"
      );

      setPostData(resPostData);
    }

    fetch();
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        // 첫 중괄호 : js를 쓰기 위한 중괄호, 두번째 중괄호 : 그냥 오브젝트를 의한 중괄호
        selectedPost,
        setSelectedPost,

        selectedTag,
        setSelectedTag,

        openPost,
        setOpenPost,

        postData,

        theme,
        setTheme,
      }}
    >
      <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
