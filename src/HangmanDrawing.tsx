import React from 'react'


type HangmanDrawingProps = {
    numOfGuesses: number,
    isChecked : boolean
}


export const HangmanDrawing = ({numOfGuesses, isChecked}: HangmanDrawingProps ) => {
    const HEAD = (
        <div style={{height:'50px',
         width: '50px',
          borderRadius:'100%',
           border: `10px solid ${!isChecked? "black" : 'white'}`,
            position: 'absolute',
             top: '50px',
            right: '-30px',
            transition:'0.2s'}}></div>
    )
    const BODY = (
        <div style={{height:'100px',
            width: '10px',
            background: `${!isChecked? "black" : 'white'}`,
            position: 'absolute',
            top: '115px',
            right: '0px',
            transition:'0.2s'}}></div>
    )
    const RIGHT_ARM = (
        <div style={{height:'10px',
            width: '100px',
            background: `${!isChecked? "black" : 'white'}`,
            position: 'absolute',
            top: '150px',
            right: '-100px',
            rotate: '-30deg',
            transformOrigin:'left bottom',
            transition:'0.2s'
        }}></div>
    )
    const LEFT_ARM = (
        <div style={{height:'10px',
            width: '100px',
            background: `${!isChecked? "black" : 'white'}`,
            position: 'absolute',
            top: '150px',
            right: '10px',
            rotate: '30deg',
            transformOrigin:'right bottom',
            transition:'0.2s'
        }}></div>
    )
    const RIGHT_LEG = (
        <div style={{height:'10px',
            width: '100px',
            background: `${!isChecked? "black" : 'white'}`,
            position: 'absolute',
            top: '210px',
            right: '-100px',
            rotate: '60deg',
            transformOrigin:'left top',
            transition:'0.2s'
        }}></div>
    )
    const LEFT_LEG = (
        <div style={{height:'10px',
            width: '100px',
            background: `${!isChecked? "black" : 'white'}`,
            position: 'absolute',
            top: '290px',
            right: '-50px',
            rotate: '-60deg',
            transformOrigin:'left bottom',
             transition:'0.2s'
        }}></div>
    )
    const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG];
  return (
    <div style={{position: 'relative'}}>
        {numOfGuesses > 0 && BODY_PARTS.slice(0, numOfGuesses)}

        <div style = {{height: '50px', width: '10px', background: `${!isChecked? "black" : 'white'}`, position:'absolute', top: 0, right: 0, transition:'0.2s'}}></div>
        <div style = {{height: '10px', width: '200px', background: `${!isChecked? "black" : 'white'}`, marginLeft: '120px', transition:'0.2s'}}></div>
        <div style = {{height: '400px', width: '10px', background: `${!isChecked? "black" : 'white'}`, marginLeft: '120px', transition:'0.2s'}}></div>
        <div style = {{height: '10px', width: '250px', background: `${!isChecked? "black" : 'white'}`, transition:'0.2s'}}></div>

    </div>
  )
}
