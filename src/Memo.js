import React from "react";
import "./Memo.css";

const Memo = ({ data }) => {
  return (
    <div className="Memo">
      <div className="Memo__title">{data.date.getUTCDate()}</div>
      <div className="Memo__content">
        Test text in place of real message
      </div>
    </div>
  );
};

export default Memo;
