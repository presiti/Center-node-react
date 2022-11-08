import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Test from "./tset";

function App() {
  // const [count, setCount] = useState(0); // ES6 문법, []를 통해 한번에 여러 변수를 선언 및 할당 가능

  // useEffect(() => {
  //   setCount(10);
  // }, []);

  const [text, setText] = useState("");
  const [textArr, setTextArr] = useState([]);

  return (
    <div className="App">
      {/* <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          setCount(count - 1);
        }}
      >
        -
      </button>

      <Test count={count} /> */}
      <input
        type="text"
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <button
        onClick={() => {
          setTextArr([...textArr, text]);
        }}
      >
        추가
      </button>

      {textArr.map((one) => (
        <div>{one}</div>
      ))}
      {/* {textArr.map((one) => {
         return <div>{one}</div>
      })} */}
    </div>
  );
}

export default App;
