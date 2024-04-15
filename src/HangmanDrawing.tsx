import React from 'react'


type HangmanDrawingProps = {
    numOfGuesses: number,
    isChecked : boolean
}


export const HangmanDrawing = ({numOfGuesses, isChecked}: HangmanDrawingProps ) => {
    const HEAD = (
        <div style={{height:'37.5px',
         width: '37.5px',
          borderRadius:'100%',
           border: `7px solid ${!isChecked? "black" : 'white'}`,
            position: 'absolute',
             top: '30px',
            right: '-23.5px',
            transition:'0.2s'}}></div>
    )
    const BODY = (
        <div style={{height:'75px',
            width: '7.5px',
            background: `${!isChecked? "black" : 'white'}`,
            position: 'absolute',
            top: '80px',
            right: '0px',
            transition:'0.2s'}}></div>
    )
    const RIGHT_ARM = (
        <div style={{height:'7.5px',
            width: '75px',
            background: `${!isChecked? "black" : 'white'}`,
            position: 'absolute',
            top: '100px',
            right: '-75px',
            rotate: '-30deg',
            transformOrigin:'left bottom',
            transition:'0.2s'
        }}></div>
    )
    const LEFT_ARM = (
        <div style={{height:'7.5px',
            width: '75px',
            background: `${!isChecked? "black" : 'white'}`,
            position: 'absolute',
            top: '103px',
            right: '5px',
            rotate: '30deg',
            transformOrigin:'right bottom',
            transition:'0.2s'
        }}></div>
    )
    const RIGHT_LEG = (
        <div style={{height:'7.5px',
            width: '75px',
            background: `${!isChecked? "black" : 'white'}`,
            position: 'absolute',
            top: '150px',
            right: '-75px',
            rotate: '60deg',
            transformOrigin:'left top',
            transition:'0.2s'
        }}></div>
    )
    const LEFT_LEG = (
        <div style={{height:'7.5px',
            width: '75px',
            background: `${!isChecked? "black" : 'white'}`,
            position: 'absolute',
            top: '210px',
            right: '-37.5px',
            rotate: '-60deg',
            transformOrigin:'left bottom',
             transition:'0.2s'
        }}></div>
    )
    const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG];
  return (
    <div style={{position: 'relative'}}>
        {numOfGuesses > 0 && BODY_PARTS.slice(0, numOfGuesses)}

        <div style = {{height: '37.5px', width: '7.5px', background: `${!isChecked? "black" : 'white'}`, position:'absolute', top: 0, right: 0, transition:'0.2s'}}></div>
        <div style = {{height: '7.5px', width: '150px', background: `${!isChecked? "black" : 'white'}`, marginLeft: '120px', transition:'0.2s'}}></div>
        <div style = {{height: '300px', width: '7.5px', background: `${!isChecked? "black" : 'white'}`, marginLeft: '120px', transition:'0.2s'}}></div>
        <div style = {{height: '7.5px', width: '187.5px', background: `${!isChecked? "black" : 'white'}`, transition:'0.2s'}}></div>

    </div>
  )
}
