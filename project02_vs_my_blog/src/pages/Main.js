import React, { useContext, useState } from "react";
import styled from "styled-components";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { HiOutlineSearch } from "react-icons/hi";
import Accordion from "../components/Accordion";
import Content from "../components/Content";
import AppContext from "../context/AppContext";
import { CgClose } from "react-icons/cg";
import { getPostOne } from "../common/common.function";
import PostWrap from "../components/PostWrap";

function Main() {
  const [selected, setSelected] = useState(0);
  const { setOpenPost, setSelectedPost, selectedPost, postData, openPost } =
    useContext(AppContext);

  const listArr = [
    {
      icon: <HiOutlineDocumentDuplicate size={24} />,
      path: "EXPLORER",
      content: (
        <>
          <Accordion title="OPEN POSTS" isBold={true} initalexpanded={true}>
            {openPost.map((one, index) => {
              const data = getPostOne(postData, one);
              return (
                <PostWrap
                  path={data.path}
                  title={data.title}
                  isClose={true}
                  key={index}
                />
              );
            })}
          </Accordion>
          <Accordion title="VSCODE" isBold={true}>
            {postData.map((one, index) => (
              <Content {...one} key={index} />
            ))}
          </Accordion>
        </>
      ),
    },
    {
      icon: <HiOutlineSearch size={22} />,
      path: "search",
      content: <p>101011101</p>,
    },
  ];

  return (
    <Wrap>
      <LeftBar>
        {listArr.map((one, index) => (
          <IconWrap
            selected={selected === index}
            onClick={() => {
              setSelected(selected === index ? null : index);
            }}
            key={index}
          >
            {one.icon}
          </IconWrap>
        ))}
      </LeftBar>
      {selected !== null && listArr[selected] && (
        <LeftContent>
          <p>{listArr[selected]?.path}</p>
          {listArr[selected].content}
        </LeftContent>
      )}

      <RightWrap selected={selected}>
        <RightHeader>
          {openPost.map((one, index) => {
            const data = getPostOne(postData, one);

            return (
              <div
                className={selectedPost === one ? "selected" : ""}
                onClick={() => {
                  setSelectedPost(data.path);
                }}
                key={index}
              >
                📝{data.title}
                <CgClose
                  onClick={(e) => {
                    e.stopPropagation(); //프론트에서 자주 씀. 이벤트 전파를 막음

                    const openPostFilter = openPost.filter(
                      (one) => one !== data.path
                    );

                    setOpenPost(openPostFilter);

                    setSelectedPost(
                      openPostFilter.length !== 0 ? openPostFilter[0] : null
                    );
                  }}
                />
              </div>
            );
          })}
          {/* {JSON.stringify(openPost)} */}
        </RightHeader>

        <RightContent selected={selected}>{selectedPost}</RightContent>
      </RightWrap>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  height: 100vh;
  /* background: linear-gradient(#222730, #363e4d, #434c5e, #515c73); */
`;

const IconWrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0 10px ${({ selected }) => (selected ? 0 : 3)}px;
  cursor: pointer;
  border-left: ${({ theme, selected }) =>
    `${selected ? 3 : 0}px solid ${theme.color.text2}`};

  > svg {
    color: ${({ selected }) => (selected ? "#B4CDFF" : "#9AA4BD")};
  }
`;

const LeftBar = styled.div`
  width: 50px;
  height: 100%;
  background-color: #6f7f9e;
`;

const LeftContent = styled.div`
  width: 320px;
  min-width: 320px;
  height: 100%;
  /* background-color: #515c73; */
  background: linear-gradient(#515c73, #666c91);
  padding: 10px;

  > p {
    padding-bottom: 10px;
    color: #caddff;
  }

  @media (max-width: 850px) {
    width: 100%;
  }
`;

const RightWrap = styled.div`
  width: ${({ selected }) =>
    selected === null ? "calc(100% - 50px)" : "calc(100% - 320px - 50px)"};

  @media (max-width: 540px) {
    display: ${({ selected }) => (selected === null ? "block" : "none")};
  }
`;

const RightHeader = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  overflow-x: scroll;
  background-color: #606880;

  ::-webkit-scrollbar-thumb {
    display: none;
  }

  &:hover::-webkit-scrollbar-thumb {
    display: block;
  }

  > div {
    position: relative;
    width: 150px;
    min-width: 150px;
    padding: 12px 10px;

    &:not(.selected) > svg {
      display: none;
    }

    &:hover {
      background-color: #7b819c;
    }

    &:hover > svg {
      display: block;
    }

    &.selected {
      background-color: #8a91a8;
      color: #b9dbff;
    }

    > svg {
      position: absolute;
      right: 15px;
      top: 12.5px;
      border-radius: 3px;
      &:hover {
        background-color: #b9dbff40;
      }
    }
  }
`;

const RightContent = styled.div`
  background-color: ${({ theme }) => theme.color.primary};
  width: 100%;
  height: calc(100% - 50px);
`;

export default Main;
