import React, { useContext, useState } from "react";
import styled from "styled-components";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { HiOutlineSearch } from "react-icons/hi";
import Accordion from "../components/Accordion";
import Content from "../components/Content";
import AppContext from "../context/AppContext";
import { CgClose } from "react-icons/cg";

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
          <Accordion title="OPEN POSTS" isBold={true}>
            contentsssssss
          </Accordion>
          <Accordion title="VSCODE" isBold={true}>
            {postData.map((one, index) => (
              <Content {...one} key={index} />
            ))}
            <Accordion title="📂VSCODE">
              &nbsp;&nbsp;&nbsp;&nbsp;📝asdadsads
            </Accordion>
            <Accordion title="📂VSCODE">
              &nbsp;&nbsp;&nbsp;&nbsp;📝asdasd
            </Accordion>
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
            const pathArr = one.split("/").filter(Boolean);

            const data = pathArr.reduce((sum, current, index) => {
              const lastPath = pathArr.length - 1 === index;

              const target = sum.find((one) => {
                return (
                  one.title === current &&
                  one.type === (lastPath ? "post" : "directory")
                );
              });

              return lastPath ? target : target?.children;
            }, postData);

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
  background: linear-gradient(#434c5e, #666c91);
`;

const IconWrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0 10px ${({ selected }) => (selected ? 0 : 2)}px;
  cursor: pointer;
  border-left: ${({ selected }) => (selected ? 2 : 0)}px solid #b4cdff;

  > svg {
    color: ${({ selected }) => (selected ? "#B4CDFF" : "#9AA4BD")};
  }
`;

const LeftBar = styled.div`
  width: 50px;
  height: 100%;
  background-color: #5a6780;
`;

const LeftContent = styled.div`
  width: 320px;
  min-width: 320px;
  height: 100%;
  background-color: #515c73;
  padding: 10px;

  > p {
    padding-bottom: 10px;
    color: #caddff;
  }

  @media (max-width: 720px) {
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
  background-color: #5a6780;
  > div {
    position: relative;
    width: 150px;
    min-width: 150px;
    padding: 10px;
    &:hover {
      background-color: #7d839e50;
    }

    &.selected {
      background-color: #7d839e;
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
  background-color: #727b96;
  width: 100%;
  height: calc(100% - 50px);
`;

export default Main;
