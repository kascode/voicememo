import React from "react";
import Memo from "./Memo";
import "./MemoList.css";

const MemoList = ({ memos, deleteMemo }) => {
  return (
    <div className="MemoList">
      {memos.length ? memos.map(memo => {
        return <Memo
          data={memo}
          deleteMemo={deleteMemo}
          key={memo.date}
        />;
      }) : <div className="MemoList__empty">You don't have any memos. Record one.</div>}
    </div>
  );
};

export default MemoList;
