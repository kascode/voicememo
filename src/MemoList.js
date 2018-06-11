import React from "react";
import Memo from "./Memo";
import "./MemoList.css";

const MemoList = ({ memos }) => {
  return (
    <div className="MemoList">
      {memos.map(memo => {
        return <Memo data={memo} />;
      })}
    </div>
  );
};

export default MemoList;
