import { Palette } from "@mui/material";
import { TypographyOptions } from "@mui/material/styles/createTypography";

export const typography: TypographyOptions | ((palette: Palette) => TypographyOptions) | undefined = {
    fontFamily: [
        'ManropeBold',
        'ManropeRegular',
    ].join(','),

    button: {
        fontSize: '12px',

    },

    h1: {
        fontSize: 45,
        fontWeight: 'bold',
        fontFamily: 'ManropeBold'

    },
    h2: {
        fontSize: 40,
        fontWeight: 'bold',
        fontFamily: 'ManropeBold'

    },
    h3: {
        fontSize: 37,
        fontWeight: 'bold',
        fontFamily: 'ManropeBold'

    },
    h4: {
        fontSize: 26,
        fontWeight: 'bold',
        fontFamily: 'ManropeBold'

    },
    h5: {
        fontSize: 23,
        fontWeight: 'bold',
        fontFamily: 'ManropeBold'

    },
    h6: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'ManropeBold'

    },

    subtitle1: {
        fontSize: 13,
        fontWeight: 'bold',
        fontFamily: 'ManropeBold'

    },
    subtitle2: {
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: 'ManropeBold'

    },

    body1: {
        fontSize: 13,
        fontFamily: 'ManropeRegular'
    },
    body2: {
        fontSize: 12,
        fontFamily: 'ManropeRegular'
    },
    caption: {
        fontSize: 12,
        fontFamily: 'ManropeRegular'
    }
}