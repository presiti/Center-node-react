import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Accordion from "../components/Accordion";
import AppContext from "../context/AppContext";

function Search() {
  const { postData } = useContext(AppContext);
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

    function SearchTagFunc(nowPostData) {
      console.log(nowPostData);
    }

    setTagData([]);
  }, []);

  return (
    <Accordion title="Tags" initalexpanded isBold>
      <TagWrap>
        {tagData.map((one, index) => (
          <Tag key={index}>
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
