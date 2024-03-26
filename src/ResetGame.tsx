import React from 'react'

export const ResetGame = ({handleReset, isChecked}:{handleReset: ()=> void, isChecked : boolean }) => {
    
  return (
    <button className={`reset-btn ${!isChecked? '' : 'dark-theme'}`} onClick={handleReset}>Reset</button>
  )
}
