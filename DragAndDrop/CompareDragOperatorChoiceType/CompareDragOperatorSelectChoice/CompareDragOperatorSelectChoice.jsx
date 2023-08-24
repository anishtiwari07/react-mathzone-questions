import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { useRef, useState } from "react";
import { ValidationContext } from "../../../../MainOnlineQuiz/MainOnlineQuizPage";
import styles from "../../../OnlineQuiz.module.css";
import HtmlParser from "react-html-parser";
export default function CompareDragOperatorSelectChoice({
  content,
  totalRows,
  dropRef,
  totalCols,
  state,
}) {
  let [rows, setRows] = useState([]);
  const [choices, setChoices] = useState([]);
  const prevRef = useRef(0);
  useEffect(() => {
    let rows = [];
    for (let i = 0; i < totalRows; i++) {
      let temp = [];
      content.map(
        (item, ind) =>
          String(item.row) == String(i) &&
          temp.push({ ...item, show: false, dropValue: "" })
      );
      rows.push(temp);
    }
    let arr = [];
    state?.choices?.map((item) => {
      let obj = { ...item, show: false };
      arr.push({ ...obj });
    });
    setChoices([...arr]);
    setRows(rows);
  }, []);

  const handleChoiceSelection = (i) => {
    if (hasAnswerSubmitted) return;
    choices[prevRef.current].show = false;
    choices[i].show = true;
    prevRef.current = i;
    setChoices([...choices]);
  };
  dropRef.current = [...choices];
  const { hasAnswerSubmitted } = useContext(ValidationContext);
  return (
    <div>
      <div>
        {rows?.map((items, i) => (
          <div
            key={i}
            totalCols={totalCols}
            className={styles.CompareDragOperatorSelectChoiceFlexBox2}
          >
            {items?.map((item, index) =>
              item.isMissed === "false" ? (
                <div key={index}>
                  {typeof item.value == "string"
                    ? HtmlParser(item?.value)
                    : item?.value}
                </div>
              ) : (
                <div>
                  <input disabled={true} style={InlineCss.Input} />
                </div>
              )
            )}
          </div>
        ))}
      </div>
      <div className={styles.CompareDragOperatorSelectChoiceFlexBox}>
        {choices?.map((value, i) => (
          <div
            key={i}
            onClick={() => handleChoiceSelection(i)}
            className={`${value?.show ? styles.selectedChoiceType : ""}`}
          >
            <div>{String.fromCharCode(65 + i)}</div>
            <div key={i}>{HtmlParser(value.value)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const InlineCss = {
  Input: {
    minHeight: "50px",
    minWidth: "140px",
    wordBreak: "break-all",
    textAlign: "center",
  },
};
