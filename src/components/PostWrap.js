import React, { useContext } from "react";
import styled from "styled-components";
import AppContext from "../context/AppContext";
import { MdClose } from "react-icons/md";

function PostWrap({ path, title, isClose }) {
  const {
    selectedPost,
    setSelectedPost,
    openPost,
    setOpenPost,
    setSelectedTag,
  } = useContext(AppContext);

  function selectedFunc() {
    setSelectedPost(path);
    setSelectedTag(null);
    if (!openPost.includes(path)) {
      setOpenPost([...openPost, path]);
    }
  }
  return (
    <PostWrapStyled
      onClick={selectedFunc}
      className={selectedPost === path ? "selected" : ""}
    >
      &nbsp;&nbsp;
      <MdClose
        className={isClose && selectedPost === path ? "visible" : ""}
        onClick={(e) => {
          e.stopPropagation(); //프론트에서 자주 씀. 이벤트 전파를 막음

          const openPostFilter = openPost.filter((one) => one !== path);

          setOpenPost(openPostFilter);

          setSelectedPost(
            openPostFilter.length !== 0 ? openPostFilter[0] : null
          );
        }}
      />
      &nbsp;&nbsp;📝{title}
    </PostWrapStyled>
  );
}

const PostWrapStyled = styled.div`
  padding: 5px 0;
  position: relative;
  cursor: pointer;

  &:not(.selected):hover {
    background-color: ${({ theme }) => theme.color.leftConHover};
  }

  &.selected {
    background-color: ${({ theme }) => theme.color.leftConSelect};
  }

  &:hover > svg {
    display: block;
  }

  svg {
    width: 13px;
    height: 13px;
    position: absolute;
    left: 5px;
    top: 10px;
    border-radius: 3px;
    display: none;

    &.visible {
      display: block;
    }
    &:hover {
      background-color: ${({ theme }) => theme.color.ConCloseHover};
    }
  }
`;
export default PostWrap;
