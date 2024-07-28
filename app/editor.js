"use client";
import { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import HTMLReactParser from "html-react-parser";

function Editor() {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const toolbarOptions = [
    ["bold", "italic"],
    ["link", "image"],
  ];
  const mod = {
    toolbar: toolbarOptions,
  };
  useEffect(() => {
    console.log(content);
  }, [content]);
  return (
    <div>
      <h1>Welcome to Ageee Dev</h1>

      <ReactQuill
        modules={mod}
        theme="snow"
        ref={editor}
        value={content}
        onChange={(newContent) => setContent(newContent)}
      />

      <div>{HTMLReactParser(content)}</div>
    </div>
  );
}

export default Editor;
