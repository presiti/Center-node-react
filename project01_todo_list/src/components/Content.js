import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import Accordion from "./Accordion";

function Content({ type, title, children, path }) {
  const { setSelectedPost, openPost, setOpenPost } = useContext(AppContext);

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
    <div onClick={selectedFunc}>&nbsp;&nbsp;&nbsp;&nbsp;📝{title}</div>
  );
}

export default Content;
