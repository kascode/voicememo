import React from "react";
import "./Memo.css";

const Memo = ({ data }) => {
  return (
    <div className="Memo">
      <div className="Memo__title">{data.date}</div>
      <div className="Memo__content">
        {data.audio ? <audio src={data.audio && window.URL.createObjectURL(data.audio)} controls></audio> : null}
      </div>
    </div>
  );
};

export default Memo;
