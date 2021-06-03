export const rgbToInt = ([ r, g, b ]) => ( ( ( r & 0xFF ) << 16 ) + ( ( g & 0xFF ) << 8 ) + ( b & 0xFF ) )

