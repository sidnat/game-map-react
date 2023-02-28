import { useState } from 'react'
import { color } from '@mui/system'
import { GithubPicker } from 'react-color'

const ColourPicker = (props) => {
  // implement onSwatchHover to show colour name, not just hex code
  // const colourName = (hexCode) => {
  //   if (hexCode === '#930000') {
  //     console.log('red')
  //     return 'Red'
  //   }
  // }

  const colors = ['#930000', '#c92a2a', '#fccb00', '#37d67a', '#008b02', '#1273de', '#006b76', '#e91e63', '#fa28ff', '#cec6ba', '#6b1614', '#db3e00', '#ff9800', '#8bc34a', '#23482f', '#1a237e', '#5300eb', '#9c27b0', '#613a00', '#2a2d2f']

  return (
    <GithubPicker colors={colors} width="250px" onSwatchHover={(colour, event) => {
      // console.log(colour)
      // console.log(event)
      // colourName(colour.hex)
    }} onChangeComplete={props.onColourChange}/>
  )
}

export default ColourPicker

// brown 613a00
// red-dark 6b1614
// red 930000
// red-light c92a2a
// orange db3e00
// orange-light ff9800
// yellow fccb00
// green-dark 23482f
// green 008b02
// green-light 8bc34a
// green-neon 37d67a
// blue-dark 1a237e
// blue-teal 006b76
// blue 1273de
// pink e91e63
// pink-neon fa28ff
// purple-light 9c27b0
// purple 5300eb
// black 2a2d2f
// white cec6ba