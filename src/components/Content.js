import React, { useContext } from "react";
import styled from "styled-components";
import AppContext from "../context/AppContext";
import Accordion from "./Accordion";
import PostWrap from "./PostWrap";

function Content({ type, title, children, path }) {
  const { selectedPost, setSelectedPost, openPost, setOpenPost } =
    useContext(AppContext);

  function selectedFunc() {
    setSelectedPost(path);

    if (!openPost.includes(path)) {
      setOpenPost([...openPost, path]);
    }
  }

  return type === "directory" ? (
    <Accordion title={`📂${title}`}>
      {children?.map((one, index) => (
        <Content {...one} key={index} />
      ))}
    </Accordion>
  ) : (
    <PostWrap title={title} path={path} />
  );
}

// const PostWrap = styled.div`
//   padding: 5px 0;
//   cursor: pointer;

//   &:not(.selected):hover {
//     background-color: ${({ theme }) => theme.color.leftConHover};
//   }

//   &.selected {
//     background-color: ${({ theme }) => theme.color.leftConSelect};
//   }
// `;

export default Content;
