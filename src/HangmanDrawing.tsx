import React from 'react'


type HangmanDrawingProps = {
    numOfGuesses: number,
    isChecked : boolean
}


export const HangmanDrawing = ({numOfGuesses, isChecked}: HangmanDrawingProps ) => {
    const HEAD = (
        <div className='head' style={{
           border: `7px solid ${!isChecked? "black" : 'white'}`
           }}></div>
    )
    const BODY = (
        <div className='body' style={{
            background: `${!isChecked? "black" : 'white'}`}}></div>
    )
    const RIGHT_ARM = (
        <div className='right-hand' style={{
            background: `${!isChecked? "black" : 'white'}`
        }}></div>
    )
    const LEFT_ARM = (
        <div className='left-hand' style={{
            background: `${!isChecked? "black" : 'white'}`
        }}></div>
    )
    const RIGHT_LEG = (
        <div className='right-leg' style={{
            background: `${!isChecked? "black" : 'white'}`
        }}></div>
    )
    const LEFT_LEG = (
        <div className='left-leg' style={{
            background: `${!isChecked? "black" : 'white'}`
        }}></div>
    )
    const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG];
  return (
    <div className='hangman-drawing-container' style={{position: 'relative'}}>
        {numOfGuesses > 0 && BODY_PARTS.slice(0, numOfGuesses)}

        <div style = {{height: '37.5px', width: '7.5px', background: `${!isChecked? "black" : 'white'}`, position:'absolute', top: 0, right: 0, transition:'0.2s'}}></div>
        <div style = {{height: '7.5px', width: '150px', background: `${!isChecked? "black" : 'white'}`, marginLeft: '120px', transition:'0.2s'}}></div>
        <div style = {{height: '300px', width: '7.5px', background: `${!isChecked? "black" : 'white'}`, marginLeft: '120px', transition:'0.2s'}}></div>
        <div style = {{height: '7.5px', width: '187.5px', background: `${!isChecked? "black" : 'white'}`, transition:'0.2s'}}></div>

    </div>
  )
}
