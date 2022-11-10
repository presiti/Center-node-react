import React, { useContext, useState } from "react";
import styled, { useTheme } from "styled-components";
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
  const {
    theme,
    setTheme,
    setOpenPost,
    setSelectedPost,
    selectedPost,
    postData,
    openPost,
  } = useContext(AppContext);

  const themeeee = useTheme();
  console.log(themeeee);

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
        <div>
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
        </div>

        <div>
          <div
            className={theme}
            onClick={() => {
              setTheme(theme === "dark" ? "light" : "dark");
            }}
          ></div>
        </div>
      </LeftBar>
      {selected !== null && listArr[selected] && (
        <LeftContent>
          <p>{listArr[selected]?.path}</p>
          {listArr[selected].content}
        </LeftContent>
      )}

      <RightWrap selected={selected}>
        <RightHeader visible={openPost.length !== 0 ? true : false}>
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

        <RightContent
          selected={selected}
          visible={openPost.length !== 0 ? true : false}
        >
          {(() => {
            const data = getPostOne(postData, selectedPost);

            return (
              data && (
                <>
                  <p>{data.path}</p>
                  <div>
                    <h1>{data.title}</h1>
                    <p>YunJin | {data.data?.date}</p>
                    <div>
                      {data.data?.tag?.map((one, index) => (
                        <span key={index}>{one}</span>
                      ))}
                    </div>
                    <div>{data?.data?.content}</div>
                  </div>
                </>
              )
            );
          })()}
        </RightContent>
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
    `${selected ? 3 : 0}px solid ${theme.color.textSelected}`};

  > svg {
    color: ${({ theme, selected }) =>
      theme.color[selected ? "textSelected" : "iconNoSelected"]};
  }
`;

const LeftBar = styled.div`
  width: 50px;
  min-width: 50px;
  height: 100%;
  background-color: ${({ theme }) => theme.color.leftBarBg};

  display: flex;
  justify-content: space-between;
  flex-direction: column;

  > div:last-child {
    padding-bottom: 70px;

    > div {
      height: 50px;
      width: 27px;
      border: 1px solid ${({ theme }) => theme.color.text};
      border-radius: 50px;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        top: 2px;
        left: 2px;

        width: 20px;
        height: 20px;
        border-radius: 20px;
        background-color: ${({ theme }) => theme.color.text};
        transition: 0.3s;
      }
      &.light::after {
        top: 24px;
        background-color: ${({ theme }) => theme.color.text};
      }
    }
  }
`;

const LeftContent = styled.div`
  width: 320px;
  min-width: 320px;
  height: 100%;
  /* background-color: #515c73; */
  background: linear-gradient(
    ${({ theme }) => theme.color.leftContentBg1},
    ${({ theme }) => theme.color.leftContentBg2}
  );
  padding: 10px;

  > p {
    padding-bottom: 10px;
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
  display: ${({ visible }) => (visible ? "flex" : "none")};
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
      color: ${({ theme }) => theme.color.textSelected};
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
  background-color: ${({ theme }) => theme.color.rightContentBg};
  width: 100%;
  height: ${({ visible }) => (visible ? "calc(100% - 50px)" : "100%")};
  padding: 10px 20px;

  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    width: 100%;
    color: white;
  }

  > div {
    width: 100%;
    max-width: 600px;
    > h1 {
      padding: 10px 0 20px 0;
    }
    > p {
      padding-bottom: 10px;
      color: white;
      padding-bottom: 30px;
      border-bottom: 2px solid ${({ theme }) => theme.color.subText};
    }

    > div:nth-child(3) {
      padding: 30px 0 20px 0;
      > span {
        padding: 5px 10px;
        margin-right: 10px;
        border-radius: 10px;
        background-color: ${({ theme }) => theme.color.leftContentBg1};
      }
    }
  }
`;

export default Main;
