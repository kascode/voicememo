import React from "react";
import "./Memo.css";

const Memo = ({ data }) => {
  return (
    <div className="Memo">
      <div className="Memo__title">{data.date}</div>
      <div className="Memo__content">
        <audio src={data.audio && window.URL.createObjectURL(data.audio)} controls></audio>
        Test text in place of real message
      </div>
    </div>
  );
};

export default Memo;
