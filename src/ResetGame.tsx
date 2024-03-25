import React from 'react'

export const ResetGame = ({handleReset}:{handleReset: ()=> void }) => {
    
  return (
    <button onClick={handleReset}>Reset</button>
  )
}
