import React, { useContext, useEffect, useRef } from "react";
import parse from "html-react-parser";

import { useState } from "react";
import styles from "../../../OnlineQuiz.module.css";
import HtmlParser from "react-html-parser";
import { ValidationContext } from "../../../../MainOnlineQuiz/MainOnlineQuizPage";
import HtmlParserComponent from "../../../../CommonJSFiles/HtmlParserComponent";
import { optionSelectStaticMathField } from "../../../HorizontalFillUpsEquationType/replaceDomeNode/ReplaceDomNode";
export default function ContentPlaceValueTableSelect({
  content,
  inputRef,
  questionHead,
  totalCols,
  choices,
  studentAnswer,
}) {

  let [choicesState, setChoicesState] = useState([]);
  let prev = useRef(0);
  useEffect(() => {
    let arr = [];
    choices?.map((item) => {
      let obj = { ...item, show: false }; 
      obj.value = obj.value?.replaceAll("\n","");
      obj.value = obj.value?.replaceAll("  ","");
      arr.push({ ...obj });
    });
    setChoicesState([...arr]);
  }, []);
  const { hasAnswerSubmitted, isStudentAnswerResponse } =
    useContext(ValidationContext);
  const handleChoiceSelection = (i) => {
    if (hasAnswerSubmitted || isStudentAnswerResponse) return;
    choicesState[prev.current].show = false;
    choicesState[i].show = true;
    setChoicesState([...choicesState]);
    prev.current = i;
  };
  inputRef.current = [...choicesState];
 
  return (
    <div>
      <div style={GridPlaceValueTable}>
        <div
          className={styles.PlaceValueTableSelectTypeSelectChoiceFlexBox}
          style={HeaderRowPlaceValueTable}
        >
       {questionHead?.map((item, i) => (
  <div key={i}>
    {JSON.stringify(item?.value).includes("mq-selectable") ? 
      parse(item?.value, optionSelectStaticMathField) : 
      <HtmlParserComponent value={item?.value} />}
  </div>
))}
        </div>
        {content?.map((items, index) => (
          <div
            key={index}
            className={styles.PlaceValueTableSelectTypeSelectChoiceFlexBox}
          >
            {items.map((item, i) =>
              item?.isMissed !== "true" ? (
                <div key={i}>
                  {JSON.stringify(item?.value).includes("mq-selectable") ? 
      parse(item?.value, optionSelectStaticMathField) : 
      <HtmlParserComponent value={item?.value} />}
                </div>
              ) : (
                <div>
                  <input disabled={true} value="?" />
                </div>
              )
            )}
          </div>
        ))}
      </div>
      <div className={styles.PlaceValueTableSelectTypeSelectChoiceFlexBox2}>
        {choicesState?.map((value, i) => (
          <div
            className={`${styles.flex}  ${
              isStudentAnswerResponse &&
              String(value?.value)?.trim() === String(studentAnswer)?.trim()
                ? styles.selectedChoiceType
                : value.show
                ? styles.selectedChoiceType
                : styles.prevSelectionAnswerSelection
            }`}
            style={{ padding: `${value?.choice_image ? 0.5 : 1}rem 1rem` }}
            key={i}
            onClick={() => handleChoiceSelection(i)}
          >
            <div className="mathzone-circle-selectbox">
              {" "}
              <b>{String.fromCharCode(65 + i)}</b>
            </div>
            <div>{<div key={i}>
             

              {JSON.stringify(value?.value).includes("mq-selectable") ? 
      parse(value?.value, optionSelectStaticMathField) : 
      HtmlParser(value?.value)}
              </div>}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const GridPlaceValueTable = {
  maxWidth: 850,
  display: "table",
  width: "fit-content",
  textAlign: "center",
};

export const HeaderRowPlaceValueTable = {
  backgroundColor: "orange",
  color: "white",
};
