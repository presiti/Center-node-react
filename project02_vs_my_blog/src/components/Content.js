import React, { useContext } from "react";
import styled from "styled-components";
import AppContext from "../context/AppContext";
import Accordion from "./Accordion";

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
    <PostWrap
      onClick={selectedFunc}
      className={selectedPost === path ? "selected" : ""}
    >
      &nbsp;&nbsp;&nbsp;&nbsp;📝{title}
    </PostWrap>
  );
}

const PostWrap = styled.div`
  padding: 5px 0;
  cursor: pointer;
  /* background-color: ${({ selected }) =>
    selected ? "#BABDD650" : "none"}; */

  &:not(.selected):hover {
    background-color: #8098e5;
    color: #555c71;
  }

  &.selected {
    background-color: #afb1eb70;
  }
`;

export default Content;
