import React, { useState } from "react";
import styled from "styled-components";
import { VscChevronRight } from "react-icons/vsc";
import { VscChevronDown } from "react-icons/vsc";

function Accordion({ title, children, isBold }) {
  const [expanded, setexpanded] = useState(false);

  return (
    <>
      <AccordionWrap
        onClick={() => {
          setexpanded(!expanded);
        }}
      >
        {expanded ? <VscChevronDown /> : <VscChevronRight />}
        <span>{isBold ? <strong>{title}</strong> : title}</span>
      </AccordionWrap>
      {
        <AccordionContentWrap expanded={expanded}>
          {children}
        </AccordionContentWrap>
      }
    </>
  );
}

export default Accordion;

const AccordionWrap = styled.div`
  display: flex;
  align-items: center;
  color: #caddff;
  font-size: 0.8rem;
  padding: 5px 0;
  cursor: pointer;

  > span {
    padding-left: 5px;
    user-select: none;
  }
`;

const AccordionContentWrap = styled.div`
  max-height: ${({ expanded }) => (expanded ? "1000px" : "0")};
  overflow: hidden;
  transition: ${({ expanded }) =>
    expanded ? "max-height 0.3s ease-in" : "max-height 0.15s ease-out"};

  user-select: none;
  margin-left: 15px;
  margin-bottom: 5px;
  cursor: pointer;
`;
