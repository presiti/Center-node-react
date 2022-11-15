import React, { useContext, useState } from "react";
import styled, { useTheme } from "styled-components";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { HiOutlineSearch } from "react-icons/hi";
import { CgClose } from "react-icons/cg";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { xcode } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";

import Accordion from "../components/Accordion";
import Content from "../components/Content";
import AppContext from "../context/AppContext";
import { getPostOne } from "../common/common.function";
import PostWrap from "../components/PostWrap";
import Search from "./Search";

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
    selectedTag,
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
      content: <Search />,
    },
  ];

  const data = getPostOne(postData, selectedPost);

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
        {selectedTag ? (
          <RightTagContent>
            <div>
              <h2>
                {selectedTag.tagTitle} 관련 글 목록
                <span>({selectedTag.path.length} 개)</span>
              </h2>
              <div>
                {selectedTag.path.map((path) => {
                  const tagData = getPostOne(postData, path);
                  return (
                    <div
                      className="post"
                      onClick={() => {
                        selectedTag(tagData.path);
                        setSelectedPost(null);

                        if (!openPost.includes(path)) {
                          setOpenPost([...openPost, path]);
                        }
                      }}
                    >
                      <div>
                        <div></div>
                        <h3>{tagData.title}</h3>
                      </div>
                      <div>
                        {tagData.data.tag.map((one) => (
                          <span>#{one}</span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </RightTagContent>
        ) : (
          <>
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
                  <div>
                    <ReactMarkdown
                      children={data?.data?.content}
                      remarkPlugins={{ remarkGfm }}
                      components={{
                        code({ node, inline, className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || "");
                          return !inline && match ? (
                            <SyntaxHighlighter
                              children={String(children).replace(/\n$/, "")}
                              style={theme === "dark" ? nightOwl : xcode}
                              language={match[1]}
                              PreTag="div"
                              {...props}
                            />
                          ) : (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          );
                        },
                      }}
                    />
                  </div>
                </div>
              </>
            </RightContent>
          </>
        )}
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
      width: 28px;
      border: 1px solid ${({ theme }) => theme.color.text};
      background-color: ${({ theme }) => theme.color.leftContentBg1};

      border-radius: 50px;
      position: relative;
      margin-left: 10px;

      &::after {
        content: "";
        position: absolute;
        top: 2px;
        left: 3px;

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

const RightTagContent = styled.div`
  background-color: ${({ theme }) => theme.color.rightContentBg};
  width: 100%;
  height: ${({ visible }) => (visible ? "calc(100% - 50px)" : "100%")};
  padding: 10px 20px;

  display: flex;
  flex-direction: column;
  align-items: center;

  overflow-y: scroll;

  > div {
    width: 100%;
    max-width: 700px;
    > h2 {
      border-bottom: 2px solid ${({ theme }) => theme.color.subText};
      padding: 30px 0 10px 0;
      > span {
        font-size: 1.2rem;
        color: ${({ theme }) => theme.color.spacialText};
      }
    }

    > div {
      > div.post {
        padding: 5px 5px;
        margin-top: 20px;
        border-radius: 10px;
        background-color: ${({ theme }) => theme.color.leftBarBg};
        cursor: pointer;

        &:hover {
          background-color: ${({ theme }) => theme.color.text}90;
          transform: scale(1.05);
          transition: 0.2s;
        }

        > div:first-child {
          display: flex;
          > div {
            width: 50px;
            height: 50px;
            background-color: ${({ theme }) => theme.color.leftContentBg1};
            border-radius: 5px;
          }
          > h3 {
            padding-left: 10px;
          }
        }
        > div:last-child {
          padding-top: 5px;
          > span {
            display: inline-block;
            padding: 5px 10px;
            border-radius: 10px;
            margin-right: 10px;
            color: ${({ theme }) => theme.color.spacialText};
            background-color: ${({ theme }) => theme.color.rightContentBg};
          }
          span:hover {
            text-decoration: underline;
            cursor: pointer;
            color: ${({ theme }) => theme.color.subText};
          }
        }
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

  overflow-y: scroll;

  > div {
    width: 100%;
    max-width: 600px;
    > h1 {
      padding: 10px 0 20px 0;
    }
    > p {
      padding-bottom: 10px;
      color: ${({ theme }) => theme.color.subText};
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

    > div:last-child.markdown {
      h1 {
        color: yellow;
        padding: 10px 0 30px 0;
      }
    }
  }
`;

export default Main;
