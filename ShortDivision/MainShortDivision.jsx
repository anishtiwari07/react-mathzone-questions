
import React from 'react'
import ShortDivision from './ShortDivision'

export default function MainShortDivision({teacher,obj,meter}) {
 
  return (
    <ShortDivision state={obj} meter={meter} teacher={teacher} totalRows={obj?.rows||1} totalCols={obj?.cols||1}/>
  )
}
