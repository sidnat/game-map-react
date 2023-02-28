import {
  iconWarning,
  iconBrown,
  iconRedDark,
  iconRed,
  iconRedLight,
  iconOrange,
  iconOrangeLight,
  iconYellow,
  iconGreenDark,
  iconGreen,
  iconGreenLight,
  iconGreenNeon,
  iconBlueDark,
  iconBlueTeal,
  iconBlue,
  iconPink,
  iconPinkNeon,
  iconPurple,
  iconPurpleLight,
  iconBlack,
  iconWhite,
} from "./markerIcons";

const iconColourSelector = (colour) => {
  let iconColour = iconWarning

  if (colour === '#613a00') {
    iconColour = iconBrown
  }
  if (colour === '#6b1614') {
    iconColour = iconRedDark
  }
  if (colour === '#930000') {
    iconColour = iconRed
  }
  if (colour === '#c92a2a') {
    iconColour = iconRedLight
  }
  if (colour === '#db3e00') {
    iconColour = iconOrange
  }
  if (colour === '#ff9800') {
    iconColour = iconOrangeLight
  }
  if (colour === '#fccb00') {
    iconColour = iconYellow
  }
  if (colour === '#23482f') {
    iconColour = iconGreenDark
  }
  if (colour === '#008b02') {
    iconColour = iconGreen
  }
  if (colour === '#8bc34a') {
    iconColour = iconGreenLight
  }
  if (colour === '#37d67a') {
    iconColour = iconGreenNeon
  }
  if (colour === '#1a237e') {
    iconColour = iconBlueDark
  }
  if (colour === '#006b76') {
    iconColour = iconBlueTeal
  }
  if (colour === '#1273de') {
    iconColour = iconBlue
  }
  if (colour === '#e91e63') {
    iconColour = iconPink
  }
  if (colour === '#fa28ff') {
    iconColour = iconPinkNeon
  }
  if (colour === '#9c27b0') {
    iconColour = iconPurple
  }
  if (colour === '#5300eb') {
    iconColour = iconPurpleLight
  }
  if (colour === '#2a2d2f') {
    iconColour = iconBlack
  }
  if (colour === '#cec6ba') {
    iconColour = iconWhite
  }

  return iconColour
}

export default iconColourSelector

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