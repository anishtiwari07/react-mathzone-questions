import React from "react";
import DisabledNumberBond from "./DisabledNumberBond";
// let obj = {
//   operation: "addition",
//   type: "number_bond",
//   rows: "1",
//   cols: "5",
//   questionName: "Find the missing number.&nbsp;",
//   questionContent: [
//     { row: 0, col: 0, value: "6", isMissed: "false" },
//     { row: 0, col: 1, value: "+", isMissed: "false" },
//     { row: 0, col: 2, value: "12", isMissed: "false" },
//     { row: 0, col: 3, value: "=", isMissed: "false" },
//     { row: 0, col: 4, value: "18", isMissed: "true" },
//     { row: 1, col: 0 },
//     { row: 1, col: 1 },
//     { row: 1, col: 2 },
//     { row: 2, col: 0 },
//     { row: 2, col: 1 },
//     { row: 2, col: 2 },
//     { row: 3, col: 0 },
//     { row: 3, col: 1 },
//     { row: 3, col: 2 },
//     { row: 4, col: 0 },
//     { row: 4, col: 1 },
//     { row: 4, col: 2 },
//     { row: 5, col: 0 },
//     { row: 5, col: 1 },
//     { row: 5, col: 2 },
//     { row: 6, col: 0 },
//     { row: 6, col: 1 },
//     { row: 6, col: 2 },
//   ],
//   questionContentText: "",
//   isTableView: "false",
//   solution: {
//     model: [{ val: "6 + 12 = 18" }],
//     sidebyside: [],
//     srows: null,
//     scols: null,
//   },
//   choices: ["18", "17", "6", "15"],
//   choiceType: "selectchoice",
//   choiceCount: 4,
// };
// let obj2 = {
//   operation: "addition",
//   type: "number_bond",
//   rows: "1",
//   cols: "5",
//   questionName: "this is test by developer 1",
//   questionContent: [
//     { row: 0, col: 0, value: "1", isMissed: "false" },
//     { row: 0, col: 1, value: "+", isMissed: "false" },
//     { row: 0, col: 2, value: "2", isMissed: "true" },
//     { row: 0, col: 3, value: "=", isMissed: "false" },
//     { row: 0, col: 4, value: "3", isMissed: "false" },
//     { row: 1, col: 0, value: "1", isMissed: "false" },
//     { row: 1, col: 1, value: "+", isMissed: "false" },
//     { row: 1, col: 2, value: "0", isMissed: "true" },
//     { row: 2, col: 0, value: "1", isMissed: "false" },
//     { row: 2, col: 1, value: "+", isMissed: "false" },
//     { row: 2, col: 2, value: "1", isMissed: "false" },
//     { row: 3, col: 0, value: "5", isMissed: "false" },
//     { row: 3, col: 1, value: "+", isMissed: "false" },
//     { row: 3, col: 2, value: "6", isMissed: "false" },
//     { row: 4, col: 0 },
//     { row: 4, col: 1 },
//     { row: 4, col: 2 },
//     { row: 5, col: 0, value: "9", isMissed: "true" },
//     { row: 5, col: 1, value: "+", isMissed: "false" },
//     { row: 5, col: 2, value: "7", isMissed: "false" },
//     { row: 6, col: 0, value: "1", isMissed: "false" },
//     { row: 6, col: 1, value: "+", isMissed: "false" },
//     { row: 6, col: 2, value: "5", isMissed: "false" },
//   ],
//   questionContentText: "this is question content text",
//   isTableView: "false",
//   solution: {
//     model: [{ val: "test solution" }],
//     sidebyside: [],
//     srows: null,
//     scols: null,
//   },
//   choices: ["9", "2", "0"],
//   choiceType: "selectchoice",
//   choiceCount: 3,
// };
// let obj3 = {
//   operation: "addition",
//   type: "number_bond",
//   rows: "1",
//   cols: "5",
//   questionName: "Find the missing number.&nbsp;",
//   questionContent: [
//     { row: 0, col: 0, value: "12", isMissed: "false" },
//     { row: 0, col: 1, value: "+", isMissed: "false" },
//     { row: 0, col: 2, value: "15", isMissed: "true" },
//     { row: 0, col: 3, value: "=", isMissed: "false" },
//     { row: 0, col: 4, value: "27", isMissed: "false" },
//     { row: 1, col: 0 },
//     { row: 1, col: 1 },
//     { row: 1, col: 2 },
//     { row: 2, col: 0 },
//     { row: 2, col: 1 },
//     { row: 2, col: 2 },
//     { row: 3, col: 0 },
//     { row: 3, col: 1 },
//     { row: 3, col: 2 },
//     { row: 4, col: 0 },
//     { row: 4, col: 1 },
//     { row: 4, col: 2 },
//     { row: 5, col: 0 },
//     { row: 5, col: 1 },
//     { row: 5, col: 2 },
//     { row: 6, col: 0 },
//     { row: 6, col: 1 },
//     { row: 6, col: 2 },
//   ],
//   questionContentText: "",
//   isTableView: "true",
//   solution: {
//     model: [{ val: "12 + 15 = 27" }],
//     sidebyside: [],
//     srows: null,
//     scols: null,
//   },
//   choices: ["15"],
//   choiceType: "selectchoice",
//   choiceCount: 1,
// };
export default function DisabledMainNumberBond({obj,meter}) {
  return <DisabledNumberBond obj={obj} meter={meter}/>;
}
