const CSI = '[';
const SGR = 'm';

const NOR_ON = '0'; //
// // // // // // // // // // //
const BOL_ON = '1'; // BOLD / INCREASE_INTENSITY
const DIM_ON = '2'; // DIM / DECREASE_INTENSITY / FAINT
const ITA_ON = '3'; // ITALIC
const UND_ON = '4'; // UNDERLINE
const BLI_ON = '5'; // BLINK
const INV_ON = '7'; // INVERSE
const HID_ON = '8'; // HIDE / CONCEAL
const CRO_ON = '9'; // CROSSED_OUT / STRIKE
// // // // // // // // // // //
const BOL_OFF = '21'; // NOT_BOLD / DOUBLE_UNDERLINE
const DIM_OFF = '22'; // NOT_DIM / NORMAL_INTENSITY
const ITA_OFF = '23'; // NOT_ITALIC
const UND_OFF = '24'; // NOT_UNDERLINE
const BLI_OFF = '25'; // NOT_BLINK
const INV_OFF = '27'; // NOT_INVERSE
const HID_OFF = '28'; // NOT_HIDE / REVEAL
const CRO_OFF = '29'; // NOT_CROSSED_OUT / UNSTRIKE
// // // // // // // // // // //
const BLA_FORE = '30'; // BLACK
const RED_FORE = '31'; // RED
const GRE_FORE = '32'; // GREEN
const YEL_FORE = '33'; // YELLOW
const BLU_FORE = '34'; // BLUE
const MAG_FORE = '35'; // MAGENTA
const CYA_FORE = '36'; // CYAN
const WHI_FORE = '37'; // WHITE
// // // // // // // // // // //
const FORE_ON = '38';      // SET_FORECOLOR
const FORE_BYT = '38;5'; // SET_FORECOLOR (8 bit (1 byte))
const FORE_INI = '38;2'; // SET_FORECOLOR (24 bit (true-color))
const FORE_DEF = '39';  // DEFAULT_FORECOLOR
// // // // // // // // // // //
const BLA_BACK = '40'; // BLACK
const RED_BACK = '41'; // RED
const GRE_BACK = '42'; // GREEN
const YEL_BACK = '43'; // YELLOW
const BLU_BACK = '44'; // BLUE
const MAG_BACK = '45'; // MAGENTA
const CYA_BACK = '46'; // CYAN
const WHI_BACK = '47'; // WHITE
// // // // // // // // // // //
const BACK_ON = '48';      // SET_FORECOLOR
const BACK_BYT = '48;5'; // SET_FORECOLOR (8 bit (1 byte))
const BACK_INI = '48;2'; // SET_FORECOLOR (24 bit (true-color))
const BACK_DEF = '49';  // DEFAULT_FORECOLOR
// // // // // // // // // // //
const UND_INI = '58'; // SET_UNDERLINE_COLOR
const UND_DEF = '59'; // DEFAULT_UNDERLINE_COLOR
// // // // // // // // // // //
const BLA_LITE_FORE = '90'; // BLACK
const RED_LITE_FORE = '91'; // RED
const GRE_LITE_FORE = '92'; // GREEN
const YEL_LITE_FORE = '93'; // YELLOW
const BLU_LITE_FORE = '94'; // BLUE
const MAG_LITE_FORE = '95'; // MAGENTA
const CYA_LITE_FORE = '96'; // CYAN
const WHI_LITE_FORE = '97'; // WHITE
// // // // // // // // // // //
const BLA_LITE_BACK = '100'; // BLACK
const RED_LITE_BACK = '101'; // RED
const GRE_LITE_BACK = '102'; // GREEN
const YEL_LITE_BACK = '103'; // YELLOW
const BLU_LITE_BACK = '104'; // BLUE
const MAG_LITE_BACK = '105'; // MAGENTA
const CYA_LITE_BACK = '106'; // CYAN
const WHI_LITE_BACK = '107'; // WHITE

export { BACK_BYT, BACK_DEF, BACK_INI, BACK_ON, BLA_BACK, BLA_FORE, BLA_LITE_BACK, BLA_LITE_FORE, BLI_OFF, BLI_ON, BLU_BACK, BLU_FORE, BLU_LITE_BACK, BLU_LITE_FORE, BOL_OFF, BOL_ON, CRO_OFF, CRO_ON, CSI, CYA_BACK, CYA_FORE, CYA_LITE_BACK, CYA_LITE_FORE, DIM_OFF, DIM_ON, FORE_BYT, FORE_DEF, FORE_INI, FORE_ON, GRE_BACK, GRE_FORE, GRE_LITE_BACK, GRE_LITE_FORE, HID_OFF, HID_ON, INV_OFF, INV_ON, ITA_OFF, ITA_ON, MAG_BACK, MAG_FORE, MAG_LITE_BACK, MAG_LITE_FORE, NOR_ON, RED_BACK, RED_FORE, RED_LITE_BACK, RED_LITE_FORE, SGR, UND_DEF, UND_INI, UND_OFF, UND_ON, WHI_BACK, WHI_FORE, WHI_LITE_BACK, WHI_LITE_FORE, YEL_BACK, YEL_FORE, YEL_LITE_BACK, YEL_LITE_FORE };
