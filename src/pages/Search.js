import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Accordion from "../components/Accordion";
import AppContext from "../context/AppContext";

function Search() {
  const { postData, setSelectedTag } = useContext(AppContext);
  const [tagData, setTagData] = useState([
    {
      tagTitle: "Tech",
      count: 3,
      postArr: [],
    },
    {
      tagTitle: "일상",
      count: 1,
      postArr: [],
    },
  ]);

  useEffect(() => {
    const TagArr = [];

    SearchTagFunc(postData);

    // 태그 데이터 뽑은 함수
    function SearchTagFunc(nowPostDataArr) {
      nowPostDataArr.map((nowPostData) => {
        if (nowPostData.type === "post") {
          // 게시물일 경우 처리
          nowPostData.data.tag?.map((tag) => {
            // 임시 데이터에 태그가 존재하는지 검사
            // const existTag =(TagArr.some((temp) => one.tag.includes(temp)))  //.some() 하나라도 true면 true 반환
            const tempTarget = TagArr.find((temp) => tag === temp.tagTitle);

            if (tempTarget) {
              tempTarget.count += 1;
              tempTarget.postArr.push(nowPostData.path);

              tempTarget.postArr = [...new Set(tempTarget.postArr)];
            } else {
              TagArr.push({
                tagTitle: tag,
                count: 1,
                postArr: [nowPostData.path],
              });
            }
          });
        } else {
          // 디렉토리일 경우 처리
          nowPostData.children && SearchTagFunc(nowPostData.children);
        }
      });
    }
    setTagData(TagArr);
  }, [postData]);

  return (
    <Accordion title="Tags" initalexpanded isBold>
      <TagWrap>
        {tagData.map((one, index) => (
          <Tag
            key={index}
            onClick={() => {
              setSelectedTag({
                tagTitle: one.tagTitle,
                path: one.postArr,
              });
            }}
          >
            {one.tagTitle} <span>{one.count}</span>
          </Tag>
        ))}
      </TagWrap>
    </Accordion>
  );
}

const TagWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Tag = styled.div`
  padding: 10px;
  margin: 5px;
  border-radius: 10px;

  /* max-width: 150px;
  min-width: 70px;
  text-overflow: ellipsis; */

  background-color: ${({ theme }) => theme.color.leftBarBg};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.color.rightHeaderBg};
  }

  > span {
    color: ${({ theme }) => theme.color.subText};
  }
`;

export default Search;
