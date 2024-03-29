import React from 'react'
import MainOptMultPicEqn from '../optMultPicEqn/MainOptMultPicEqn'
import  MultipleOptionSelectChoice  from './MultipleOptionSelectChoice'


function MainMultipleOptionSelect({obj,meter,multipicselect}) {
let str=JSON.stringify(obj)
return !str.includes("mq-selectable")?<><MultipleOptionSelectChoice state={obj} totalRows={obj.row} meter={meter}/></>:<MainOptMultPicEqn obj={obj} meter={meter} multipicselect={multipicselect}/> 

}
export default MainMultipleOptionSelect;