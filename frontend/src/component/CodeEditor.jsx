import { Button } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { decode as base64_decode, encode as base64_encode } from "base-64";

const CodeEditor = () => {
  const navigate = useNavigate();

  const [langData, setLangData] = useState([]);
  const [code, setCode] = useState("");
  const [inputValues, setinputValues] = useState("");
  const [outputData, setoutputData] = useState("");
  const [id, setId] = useState(76);
  const [btnDisable, setBtnDisable] = useState(false);

  const [inputOutput, setInputoutput] = useState(true);
  const [userID, setUserID] = useState(null);

  const logoutFunc = async () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  useEffect(() => {
    if (!userID) {
      setUserID(JSON.parse(localStorage.getItem("userInfo"))._id);
      // setUserInfo()
    }
    checkLoginStatus();
    getLangData();
  }, []);

  const getLangData = async () => {
    try {
      let res = await axios.get("http://localhost:5000/api/langdata");
      console.log(res.data);
      setLangData(res.data.langs);
    } catch (error) {
      console.log(error);
      alert("error occured");
    }
  };

  const checkLoginStatus = async () => {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      navigate("/");
    }
  };
  const funct = (event) => {
    setId(Number(event.target.value));
  };

  const runCode = async () => {
    setBtnDisable(true);
    // console.log(base64_decode("aGVsbG8sIEp1ZGdlMAo= "));
    console.log(base64_decode("SGVsbG8sIFdvcmxkIQ==\n"));
    // let str =
    //   "bWFpbi5jcHA6MToxOiBlcnJvcjogdW5rbm93biB0eXBlIG5hbWUgJ2FiY2Rm\n" +
    //   "JwphYmNkZgpeCm1haW4uY3BwOjE6NjogZXJyb3I6IGV4cGVjdGVkIHVucXVh\n" +
    //   "bGlmaWVkLWlkCmFiY2RmCiAgICAgXgoyIGVycm9ycyBnZW5lcmF0ZWQuCg==\n";
    // console.log(base64_decode(str));
    // return;
    if (code.trim() == "") {
      alert("Write code first");
      return;
    }
    let encodedCode = base64_encode(code);
    let encodedInputValues = base64_encode(inputValues);
    console.log(userID, id, encodedCode, encodedInputValues);
    try {
      let res = await axios.post("http://localhost:5000/runCode", {
        userID,
        langID: id,
        encodedCode,
        encodedInputValues,
      });
      console.log(res.data);
      // console.log(res.data.output.source_code);

      if (res.data.ouput) {
        let str = res.data.output.stdout;
        setoutputData(base64_decode(str));
        setInputoutput(false);
      } else {
        alert("try again correctly, something went wrong!");
      }
    } catch (error) {
      alert("try again correctly, something went wrong!");
    }
    setBtnDisable(false);
  };

  return (
    <div className="code-editor">
      <div className="ce-header">
        <span>Judge0-API</span>
        <span className="select-lang">
          <select
            className="dropdown"
            onChange={funct}
            value={id}
            placeholder="List of Items"
          >
            {langData.map((item) => {
              return (
                <option key={item.id} value={item.id} className="option">
                  {item.name}
                </option>
              );
            })}
          </select>
        </span>
        <span className="runBTN">
          <button onClick={runCode} disabled={btnDisable}>
            Run Code
          </button>
        </span>
        <span className="logoutBTN">
          <button onClick={logoutFunc}>Logout</button>
        </span>
      </div>
      <div className="code-here">
        <textarea
          placeholder="#Enter Code Here"
          className="code-box"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>
      <div className="inout-output-tabs">
        <span className="input">
          <button onClick={() => setInputoutput(true)}>Input</button>
        </span>
        <span className="output">
          <button onClick={() => setInputoutput(false)}>Output</button>
        </span>
      </div>
      <div className="input-output">
        {inputOutput ? (
          <div className="inputOutput-div">
            <textarea
              placeholder=">Enter input values here."
              className="input-value-box"
              value={inputValues}
              onChange={(e) => setinputValues(e.target.value)}
            />
          </div>
        ) : (
          <div className="inputOutput-div">
            ouput:
            <br /> {outputData}
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeEditor;
