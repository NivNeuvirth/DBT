import React, { useState } from "react";

const TruncatedText = ({ text, limit, onReadMore }) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const truncatedText =
    text.length > limit ? text.substring(0, limit) + "..." : text;

  return (
    <div>
      <p>{isTruncated ? truncatedText : text}</p>
      {text.length > limit && (
        <button onClick={isTruncated ? onReadMore : () => setIsTruncated(true)}>
          {isTruncated ? "Read More" : "Read Less"}
        </button>
      )}
    </div>
  );
};

export default TruncatedText;
