import Spacing from 'material-ui/styles/spacing'
import zIndex from 'material-ui/styles/zIndex'
import { deepOrange500, deepOrange700, lightBlack, redA200, grey100, grey500, darkBlack, white, grey300, cyan500 } from 'material-ui/styles/colors'

export default theme = {
  spacing: Spacing,
  zIndex: zIndex,
  fontFamily: "'Roboto', sans-serif",
  palette: {
    primary1Color: deepOrange500,
    primary2Color: deepOrange700,
    primary3Color: lightBlack,
    accent1Color: redA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,

    // DisabledColor: ColorManipulator.fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500
  }
}
