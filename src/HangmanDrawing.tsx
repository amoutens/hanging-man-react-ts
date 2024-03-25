import React from 'react'

const HEAD = (
    <div style={{height:'50px',
     width: '50px',
      borderRadius:'100%',
       border: '10px solid black',
        position: 'absolute',
         top: '50px',
        right: '-30px'}}></div>
)
const BODY = (
    <div style={{height:'100px',
        width: '10px',
        background: 'black',
        position: 'absolute',
        top: '115px',
        right: '0px'}}></div>
)
const RIGHT_ARM = (
    <div style={{height:'10px',
        width: '100px',
        background: 'black',
        position: 'absolute',
        top: '150px',
        right: '-100px',
        rotate: '-30deg',
        transformOrigin:'left bottom'
    }}></div>
)
const LEFT_ARM = (
    <div style={{height:'10px',
        width: '100px',
        background: 'black',
        position: 'absolute',
        top: '150px',
        right: '10px',
        rotate: '30deg',
        transformOrigin:'right bottom'
    }}></div>
)
const RIGHT_LEG = (
    <div style={{height:'10px',
        width: '100px',
        background: 'black',
        position: 'absolute',
        top: '210px',
        right: '-100px',
        rotate: '60deg',
        transformOrigin:'left top'
    }}></div>
)
const LEFT_LEG = (
    <div style={{height:'10px',
        width: '100px',
        background: 'black',
        position: 'absolute',
        top: '290px',
        right: '-50px',
        rotate: '-60deg',
        transformOrigin:'left bottom'
    }}></div>
)
type HangmanDrawingProps = {
    numOfGuesses: number
}
const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG];

export const HangmanDrawing = ({numOfGuesses}: HangmanDrawingProps ) => {
  return (
    <div style={{position: 'relative'}}>
        {numOfGuesses > 0 && BODY_PARTS.slice(0, numOfGuesses)}

        <div style = {{height: '50px', width: '10px', background: 'black', position:'absolute', top: 0, right: 0}}></div>
        <div style = {{height: '10px', width: '200px', background: 'black', marginLeft: '120px'}}></div>
        <div style = {{height: '400px', width: '10px', background: 'black', marginLeft: '120px'}}></div>
        <div style = {{height: '10px', width: '250px', background: 'black'}}></div>

    </div>
  )
}
