import { useContext, useEffect, useRef, useState } from "react";
import parse from "html-react-parser";
import styles from "../OnlineQuiz.module.css";  
import SolveButton from "../SolveButton";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import CustomAlertBoxMathZone from "../../CommonJSFiles/CustomAlertBoxMathZone";
import { student_answer } from "../../CommonJSFiles/ManupulateJsonData/oneDto2D";
import ConditionOnProgressBar from "../../CommonJsxComponent/ConditionOnProgressBar"; 
import SelectChoice from "../ChoicesType/SelectChoice/SelectChoice";
// export default function GenerateLine({question, start, end, choiceType,interval,questionContent, ansArray }){
export default function GenerateLine({question, meter }){
  var choiceType = question.choiceType;
  const {
    hasAnswerSubmitted,
    setHasAnswerSubmitted,
    setIsAnswerCorrect, 
    setQuestionWithAnswer,
    isStudentAnswerResponse,
  } = useContext(ValidationContext);
  const [studAns, setStudAnswers] = useState([]);
  const [answered, setAnswered] = useState(false)
  const [redAlert, setRedAlert] = useState(false) 
  let [totalEmptyBox, setTotalEmptyBox] = useState(0);
  var isDecimal = (parseFloat( question.interval)%1)>0 &&  (parseFloat(question.interval)%1)<1 ;  
  var start = isDecimal ? parseFloat(question.start): parseInt(question.start)
  var end = isDecimal ? parseFloat(question.end): parseInt(question.end)
  var interval = isDecimal ? parseFloat(question.interval): parseInt(question.interval)
  var choices = question.choices
  const [lines, setLines] = useState([])  
  var answers=[] ;

  const inputRef = useRef(new Array(totalEmptyBox));
  var numsDisplayed = question.numbersDisplayed;
  function handleSubmitAnswer(){ 
    var isWrong = false; 
    var empty = false
    if(choiceType=="keying") {
      answers = Array.from(document.getElementsByClassName("answers"))
      var solution = answers.map(ans => isDecimal?parseFloat(ans.value):parseInt(ans.value));
      solution = solution.sort((a,b)=>b-a)
      var ansArray = question.ansArray.sort((a,b)=>b-a)
      console.log(ansArray, solution)
      for(var i = 0; i<question.ansArray.length ;i++){ 
        if(isNaN(solution[i])) empty=true
        if(solution[i] !=ansArray[i] ) isWrong=true 
        // if(!question.ansArray.includes(solution[i]) ) isWrong=true
      }
    }else if(choiceType == "mapping"){  
      console.log("STUDAND",studAns)
      console.log(studAns.length!=question.ansArray.length)
      if(studAns.length!=question.ansArray.length) empty = true;
        studAns.forEach(ans=>{ 
          if(!question.ansArray.includes(ans)){
            console.log("WRONG")
            isWrong = true;
          }
        })
    }else{ 
    var selectedOption;
     for(var i = 0; i<inputRef.current.length;i++){ 
        if(inputRef.current[i].show) selectedOption = inputRef.current[i].value
     } 
     if(typeof selectedOption == "undefined" ) empty = true
     if(selectedOption != question.ansArray[0]) isWrong = true 
    } 
    if(empty){
      setRedAlert(true)
      return
    }
    else setRedAlert(false) 
    if (hasAnswerSubmitted) return; 
    // {empty? setRedAlert(true): isWrong ? alert("Wrong answer") : alert("Correct answer")}
    if(isWrong) setIsAnswerCorrect(false)
    else setIsAnswerCorrect(true)
    setHasAnswerSubmitted(true); 
    setAnswered(true)
    setQuestionWithAnswer({...question,[student_answer]:studAns}) 
  }
  
function setSelected(e){   
  if(choiceType === "keying" ) return
  var idOpt = e.target.dataset.option; 
  var pointer = document.getElementById(`pBox_${idOpt}`)   
  var ansVal = document.getElementById(`pValBox_${idOpt}`)   
 {choiceType == "mapping" && !answered&& Array.from(pointer.classList).forEach(cla=>{  
  console.log("CL:AS",cla)
  cla.includes("vertBar") ?  pointer.classList.add(`${styles.selected}`)  : pointer.classList.add(`${styles.vertBar}`) 
  pointer.classList.remove(cla); 
})  }
  var sol = isDecimal ? parseFloat(ansVal.textContent):parseInt(ansVal.textContent)
  console.log(sol)
  if(answers.includes(sol)){ 
    answers = answers.filter(ans => ans!=sol)
  }else{ 
    answers.push(sol)
  }   
  if(answers.length == 0) setRedAlert(true)
  else setRedAlert(false)
  setStudAnswers(answers)
}  
  useEffect(()=>{   
    var lineBlocks = []; 
    var index = 0; 
    var inp = 0; 
    var endIsThere = false;
    // for(var mark = (isDecimal?( start+.1):( start+1)); mark< end; (isDecimal ? mark+= parseFloat(interval):mark++ )){
    //   var idddd = `pBox_${index}`;  
    //   var idddd2 = `pValBox_${index}`;  
    //   var num = isDecimal ? Number(parseFloat(mark).toFixed(1)) : parseInt(mark)
    //   var ansSelected = studAns.includes(num);  
    //     if(isDecimal){ 
    //       console.log(mark,"------",parseFloat(mark).toFixed(1).length)
    //         var ptick = <>
    //         <div className={styles.botline}> 
    //           </div>
    //            <div className={styles.ticktext} data-option={index} onClick={(e)=>setSelected(e)}>
    //             <div  className={answered ? ansSelected ? styles.ansSelected : styles.answeredVertBar : choiceType == "mapping" ? styles.vertBar : styles.keyVertBar}  data-option={index} id={idddd} onClick={(e)=>setSelected(e)}></div>
                 
    //           {question.questionContent[index] ? 
    //               choiceType === "keying" 
    //                 ? <input inputmode="numeric"  maxLength={parseFloat(mark).toFixed(1).length} className={`${styles.checkNumLine}  answers`}      id={`pBox_${index}`} type="text"/>
    //                 : <p   value={mark} className={styles.mapBox} id={idddd2}>{isDecimal ? parseFloat(mark).toFixed(1) : parseInt(mark)}</p>
    //               : <p className={`${styles.mapBox} animation`}  id={idddd2}>{isDecimal ? parseFloat(mark).toFixed(1) : parseInt(mark)}</p>
    //           } 
    //            </div>  
    //            </>
    //           if(choiceType === "keying" ) inp++;
    //           lineBlocks.push(ptick) 
    //           index++;
    //     }else if(mark %  interval == 0 && !isDecimal){  
    //     var ptick = <>
    //       <div className={styles.botline}> 
    //           </div>
    //          <div className={styles.ticktext}   data-option={index} onClick={(e)=>setSelected(e)}>
    //          <div className={answered ? ansSelected ? styles.ansSelected : styles.answeredVertBar : choiceType == "mapping" ? styles.vertBar : styles.keyVertBar}  data-option={index} id={idddd} onClick={(e)=>setSelected(e)}></div>              
    //           {question.questionContent[index] ? 
    //               choiceType === "keying" 
    //                 ? <input inputmode="numeric" maxLength={mark.toString().length} className={`${styles.checkNumLine}  answers`}    id={`pBox_${index}`} type="text"/>
    //                 : <p  value={mark} className={styles.mapBox} id={idddd2}>{isDecimal ? parseFloat(mark).toFixed(1) : parseInt(mark)}</p>
    //               : <p className={styles.mapBox} id={idddd2}>{isDecimal ? parseFloat(mark).toFixed(1) : parseInt(mark)}</p>
    //             }

    //       </div>  
    //       </> 
    //           if(choiceType === "keying" ) inp++;
    //           lineBlocks.push(ptick) 
    //           index++;
    //     }
    //   }


    for(var mark = (isDecimal?( start):( start)); mark<=(isDecimal ?  parseFloat(end):  parseInt(end) ); (isDecimal ? mark+= parseFloat(interval):mark += parseInt(interval) )){
      var idddd = `pBox_${index}`;  
      var idddd2 = `pValBox_${index}`;  
      var num = isDecimal ? Number(parseFloat(mark).toFixed(1)) : parseInt(mark)
      var ansSelected = studAns.includes(num);  
      var ansLength = isDecimal?parseFloat(mark).toFixed(1).length:parseInt(mark).toString().length;  
      // console.log((isDecimal ? parseFloat(mark).toFixed(1) : parseInt(mark)) + " : " + (isDecimal ? parseFloat(end).toFixed(1) : parseInt(end)))
      
      if((isDecimal ? parseFloat(mark).toFixed(1) : parseInt(mark)) == (isDecimal ? parseFloat(end).toFixed(1) : parseInt(end)))  endIsThere = true;
      var ptick = <div  className={styles.section} data-option={index}  onClick={(e)=>setSelected(e)}  key={index} >
                      <div className={styles.botline}  data-option={index}></div>
                      <div className={styles.ticktext} 
                      // style={{   padding: question.ansArray.includes(isDecimal ? Number(parseFloat(mark).toFixed(1)) : parseInt(mark))? 0 : "0 .5rem"}} 
                      style={{ 
                        padding: (choiceType === "keying" && question.ansArray.includes(isDecimal ? Number(parseFloat(mark).toFixed(1)) : parseInt(mark))) ? 0 : "0 .5rem"
                    }}
                    
                      data-option={index}>
                          <div  data-option={index} className={answered ? ansSelected ? styles.ansSelected : styles.answeredVertBar : choiceType == "mapping" ? styles.vertBar : styles.keyVertBar} id={idddd}></div>  
                          { (question.ansArray.includes((isDecimal?Number(parseFloat(mark).toFixed(1)):parseInt(mark  ) ))
                            ? choiceType === "keying" 
                            ? <input  style={{ width: `${(ansLength * 12)}px` }}   data-option={index} maxLength={ansLength} className={`${styles.checkNumLine}  answers`}   id={idddd2} type="text"/>
                            // : (numsDisplayed || mark ==(isDecimal?Number(parseFloat(start).toFixed(1)):parseInt(start)) || Number(mark.toFixed(1)) == (isDecimal?Number(parseFloat(end).toFixed(1)):parseInt(end))) && <p   value={mark} className={styles.mapBox}  data-option={index} id={idddd2}>{isDecimal ? parseFloat(mark).toFixed(1) : parseInt(mark)}</p>
                            // : (numsDisplayed || mark ==(isDecimal?Number(parseFloat(start).toFixed(1)):parseInt(start)) || Number(mark.toFixed(1)) == (isDecimal?Number(parseFloat(end).toFixed(1)):parseInt(end))) && <p className={styles.mapBox}  data-option={index}  id={idddd2}    >{isDecimal ? parseFloat(mark).toFixed(1) : parseInt(mark)}</p>
                            :  choiceType == "selectchoice" ? <p className={styles.mapBox}  >?</p> : <p  value={mark} className={styles.mapBox}  data-option={index} style={{display:`${numsDisplayed || index == 0 ?"block":"none"}`}} id={idddd2}>{isDecimal ? parseFloat(mark).toFixed(1) : parseInt(mark)}</p>
                            : <p className={styles.mapBox}  data-option={index}  id={idddd2} style={{display:`${numsDisplayed || index == 0 || Number(mark.toFixed(1)) == (isDecimal?Number(parseFloat(end).toFixed(1)):parseInt(end))?"block":"none"}`}}   >{isDecimal ? parseFloat(mark).toFixed(1) : parseInt(mark)}</p>
                          
                            )} 
                      </div>  
                  </div>
        if(choiceType === "keying" ) inp++;
        lineBlocks.push(ptick) 
        index++;
    }  

    if(!endIsThere){ 
      console.log("END NOT THERE ")
      var idddd = `pBox_${index}`;  
      var idddd2 = `pValBox_${index}`;  
      var num = isDecimal ? Number(parseFloat(mark).toFixed(1)) : parseInt(mark)
      var ansSelected = studAns.includes(num);  
      var ptick = <div  className={styles.section}   data-option={index}  onClick={(e)=>setSelected(e)}  key={index}  >
                      <div className={styles.botline}   data-option={index}></div>
                      <div className={styles.ticktext}  data-option={index}  >
                        <div  className={answered ? ansSelected ? styles.ansSelected : styles.answeredVertBar : choiceType == "mapping" ? styles.vertBar : styles.keyVertBar}  data-option={index} id={idddd}  ></div>
                        {question.ansArray.includes((isDecimal?Number(parseFloat(end).toFixed(1)):parseInt(end) )) ? 
                          choiceType === "keying" 
                              ? <input inputmode="numeric" style={{ width: `${(ansLength * 12)}px` }}  data-option={index}     maxLength={parseFloat(mark).toFixed(1).length} className={`${styles.checkNumLine}  answers`}      id={`pBox_${index}`} type="text"/>
                              : <p data-option={index}   className={styles.mapBox} id={idddd2}>{isDecimal ? parseFloat(end).toFixed(1) : parseInt(end)}</p>
                            :   <p className={styles.mapBox}   id={idddd2}  data-option={index}     >{isDecimal ? parseFloat(end).toFixed(1) : parseInt(end)}</p>
                        } 
                      </div>  
                    </div>
        lineBlocks.push(ptick) 
    } 
      setLines(lineBlocks) 
     },[])  
     
    return <div >  
    {!isStudentAnswerResponse && (
        <SolveButton
          onClick={handleSubmitAnswer}
          answerHasSelected={hasAnswerSubmitted}
        />
      )}   
    {redAlert &&  <CustomAlertBoxMathZone/>   }  

    <div id="studentAnswerResponse"> 
    <div className={styles.questionName}>{parse(question?.questionName)}</div>
        {question?.upload_file_name && (
          <div>
            <img src={question?.upload_file_name} alt="image not found" />
          </div>
        )}
        <div className={styles.borderTopBottomMargin}>
          <ConditionOnProgressBar meter={meter} />
        </div> 
        <div className={styles.contentParent}> 
          <div className={styles.hori}  >
              <div id={styles.horizontal_line} >
                  <div  id="xline"  className={styles.xline}> 
                    <div className={styles.arrowLeft} > 
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 36" width="60" height="36">
                          <path fill="none" d="M0 0h60v36H0z"/>
                          <path d="M14 18l15-10M15 18l15 10" stroke="#888888" strokeWidth="2"/>
                      </svg>  
                      <div className={styles.arrowBotline}></div>
                       
                    </div>  
                    {lines.map((line)=><>{line}</>)} 
                    <div className={styles.arrowRight} > 
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 36" width="60" height="36">
                        <path fill="none" d="M0 0h60v36H0z"/>
                        <path transform="rotate(180 30 18)"  d="M14 18l15-10M15 18l15 10" stroke="#888888" strokeWidth="2"/>
                    </svg>    
                    <div className={styles.arrowBotline}></div>
                    </div>  
                  </div>
              </div> 
          </div> 
           
        <p>{choiceType=="keying" ? `Enter the ${question.ansArray.length > 1 ? "answers" : "answer"} in the ${question.ansArray.length > 1 ? "boxes" : "box"}` : choiceType=="mapping" ? `Click on the ${question.ansArray.length > 1 ? "numbers" : "number"} to select.` : "Select Answer from options"}</p>
        {choiceType == "selectchoice" && <SelectChoice   inputRef={inputRef} content={[]}   totalRows={question.rows} answerHasSelected={hasAnswerSubmitted} choices={choices} studentAnswer={studAns} choiceType={choiceType}  />}
        
   </div>  
      </div> 
    </div>
}
 