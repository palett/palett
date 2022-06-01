'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

const FORE_ON = '38'; // SET_FORECOLOR

const FORE_BYT = '38;5'; // SET_FORECOLOR (8 bit (1 byte))

const FORE_INI = '38;2'; // SET_FORECOLOR (24 bit (true-color))

const FORE_DEF = '39'; // DEFAULT_FORECOLOR
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

const BACK_ON = '48'; // SET_FORECOLOR

const BACK_BYT = '48;5'; // SET_FORECOLOR (8 bit (1 byte))

const BACK_INI = '48;2'; // SET_FORECOLOR (24 bit (true-color))

const BACK_DEF = '49'; // DEFAULT_FORECOLOR
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

exports.BACK_BYT = BACK_BYT;
exports.BACK_DEF = BACK_DEF;
exports.BACK_INI = BACK_INI;
exports.BACK_ON = BACK_ON;
exports.BLA_BACK = BLA_BACK;
exports.BLA_FORE = BLA_FORE;
exports.BLA_LITE_BACK = BLA_LITE_BACK;
exports.BLA_LITE_FORE = BLA_LITE_FORE;
exports.BLI_OFF = BLI_OFF;
exports.BLI_ON = BLI_ON;
exports.BLU_BACK = BLU_BACK;
exports.BLU_FORE = BLU_FORE;
exports.BLU_LITE_BACK = BLU_LITE_BACK;
exports.BLU_LITE_FORE = BLU_LITE_FORE;
exports.BOL_OFF = BOL_OFF;
exports.BOL_ON = BOL_ON;
exports.CRO_OFF = CRO_OFF;
exports.CRO_ON = CRO_ON;
exports.CSI = CSI;
exports.CYA_BACK = CYA_BACK;
exports.CYA_FORE = CYA_FORE;
exports.CYA_LITE_BACK = CYA_LITE_BACK;
exports.CYA_LITE_FORE = CYA_LITE_FORE;
exports.DIM_OFF = DIM_OFF;
exports.DIM_ON = DIM_ON;
exports.FORE_BYT = FORE_BYT;
exports.FORE_DEF = FORE_DEF;
exports.FORE_INI = FORE_INI;
exports.FORE_ON = FORE_ON;
exports.GRE_BACK = GRE_BACK;
exports.GRE_FORE = GRE_FORE;
exports.GRE_LITE_BACK = GRE_LITE_BACK;
exports.GRE_LITE_FORE = GRE_LITE_FORE;
exports.HID_OFF = HID_OFF;
exports.HID_ON = HID_ON;
exports.INV_OFF = INV_OFF;
exports.INV_ON = INV_ON;
exports.ITA_OFF = ITA_OFF;
exports.ITA_ON = ITA_ON;
exports.MAG_BACK = MAG_BACK;
exports.MAG_FORE = MAG_FORE;
exports.MAG_LITE_BACK = MAG_LITE_BACK;
exports.MAG_LITE_FORE = MAG_LITE_FORE;
exports.NOR_ON = NOR_ON;
exports.RED_BACK = RED_BACK;
exports.RED_FORE = RED_FORE;
exports.RED_LITE_BACK = RED_LITE_BACK;
exports.RED_LITE_FORE = RED_LITE_FORE;
exports.SGR = SGR;
exports.UND_DEF = UND_DEF;
exports.UND_INI = UND_INI;
exports.UND_OFF = UND_OFF;
exports.UND_ON = UND_ON;
exports.WHI_BACK = WHI_BACK;
exports.WHI_FORE = WHI_FORE;
exports.WHI_LITE_BACK = WHI_LITE_BACK;
exports.WHI_LITE_FORE = WHI_LITE_FORE;
exports.YEL_BACK = YEL_BACK;
exports.YEL_FORE = YEL_FORE;
exports.YEL_LITE_BACK = YEL_LITE_BACK;
exports.YEL_LITE_FORE = YEL_LITE_FORE;
