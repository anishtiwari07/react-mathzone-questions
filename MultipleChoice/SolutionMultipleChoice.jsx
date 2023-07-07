import React from "react";
import HtmlParser from "react-html-parser";
import styles from "../OnlineQuiz.module.css";
function SolutionMultipleChoice({ model, type, hideSolutionText }) {
  return (
    <div
      className={`${styles.solutionPage} ${styles.solutionPage2}`}
      style={{
        fontWeight: "initial",
        fontSize: "initial",
        lineHeight: "initial",
      }}
    >
      {!hideSolutionText && (
        <div className={styles.solutionText}>
          <u>Solution: </u>
        </div>
      )}
      {model?.map(
        (item, i) =>
          (item.correct ||
            String(type).trim() == "Fill in the blanks ".trim()) && (
            <>
              <div key={i}>{HtmlParser(item.choices)}</div>
              {item?.solution && <div>{HtmlParser(item?.solution)}</div>}
              {item?.solution_image && (
                <div>{<img src={item?.solution_image} />}</div>
              )}
              {item?.solution1 && <div>{HtmlParser(item?.solution1)}</div>}
              {item?.solution1_image && (
                <div>{<img src={item?.solution1_image} />}</div>
              )}
              {item?.solution2 && <div>{HtmlParser(item?.solution2)}</div>}
              {item?.solution2_image && (
                <div>{<img src={item?.solution2_image} />}</div>
              )}
            </>
          )
      )}
    </div>
  );
}
export default SolutionMultipleChoice;
