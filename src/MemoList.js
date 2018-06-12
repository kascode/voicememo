import React from "react";
import Memo from "./Memo";
import "./MemoList.css";

const MemoList = ({ memos }) => {
  return (
    <div className="MemoList">
      {memos.length ? memos.map(memo => {
        return <Memo data={memo} key={memo.date} />;
      }) : <div className="MemoList__empty">You don't have any memos. Record one.</div>}
    </div>
  );
};

export default MemoList;
