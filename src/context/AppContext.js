import React from "react";

export default React.createContext({
  // 현재 선택된 게시물
  selectedPost: "test",
  setSelectedPost: () => {},

  // 열려 있는 게시물
  openPost: [],
  setOpenPost: () => {},

  // 게시물 데이터
  postData: [],

  // 테마 관련
  theme: [],
  setTheme: () => [],

  // 현재 선택된 태그
  selectTag: "",
  setSelectedTag: () => {},
});
