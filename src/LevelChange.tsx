import React from 'react'

export const LevelChange = ({isCheckedTheme, selectDifficulty}:{isCheckedTheme:boolean, selectDifficulty: (index: number)=> void}) => {
  const items = ['Random word', 'Easy: 4 letters', 'Medium: 5-6 letters', 'Hard: 7+ letters'];
  return (
    <ul className={`level-list ${!isCheckedTheme ? '' : 'dark-theme'}`}>

      {
        items.map((item, index)=> (
          <li key={index} onClick={() => selectDifficulty(index)} className={`${!isCheckedTheme ? '' : 'dark-theme'}`} >{item}</li>
        )) 
      }
    </ul>
  )
}
