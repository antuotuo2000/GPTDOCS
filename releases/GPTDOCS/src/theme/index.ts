import { createTheme } from '@mui/material/styles'

/** Shared design tokens and component defaults for both color schemes. */
export const theme = createTheme({
  cssVariables: { colorSchemeSelector: 'class' },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: '#0073E6', contrastText: '#ffffff' },
        secondary: { main: '#7659A6' },
        success: { main: '#287D50' },
        warning: { main: '#A56714' },
        error: { main: '#C23D45' },
        info: { main: '#3177AF' },
        background: { default: '#F6F8FC', paper: '#ffffff' },
        text: { primary: '#0F1924', secondary: '#5B6B7C' },
        divider: '#E2E8F0',
      },
    },
    dark: {
      palette: {
        primary: { main: '#66B2FF', contrastText: '#071A30' },
        secondary: { main: '#C7AEF0' },
        success: { main: '#80CEA2' },
        warning: { main: '#EDBB70' },
        error: { main: '#F299A0' },
        info: { main: '#8FC5EF' },
        background: { default: '#090D16', paper: '#101B2A' },
        text: { primary: '#F3F6F9', secondary: '#A9B7C9' },
        divider: '#27364B',
      },
    },
  },
  typography: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif',
    h1: { fontSize: '3rem', fontWeight: 750, lineHeight: 1.15, letterSpacing: '-0.04em' },
    h2: { fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.025em' },
    h3: { fontSize: '1.5rem', fontWeight: 700 },
    h4: { fontSize: '1.25rem', fontWeight: 700 },
    h5: { fontSize: '1.125rem', fontWeight: 650 },
    h6: { fontSize: '1rem', fontWeight: 650 },
    body1: { lineHeight: 1.75 },
    body2: { lineHeight: 1.65 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  spacing: 8,
  shape: { borderRadius: 12 },
  breakpoints: { values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 } },
  components: {
    MuiCssBaseline: { styleOverrides: { body: { minWidth: 320 }, '*': { boxSizing: 'border-box' } } },
    MuiButton: { defaultProps: { disableElevation: true }, styleOverrides: { root: { borderRadius: 8, padding: '10px 20px' } } },
    MuiPaper: { defaultProps: { elevation: 0 }, styleOverrides: { root: { backgroundImage: 'none' } } },
    MuiCard: { defaultProps: { variant: 'outlined' } },
    MuiTextField: { defaultProps: { variant: 'outlined', size: 'small' } },
    MuiOutlinedInput: { styleOverrides: { root: { borderRadius: 8 } } },
    MuiChip: { styleOverrides: { root: { fontWeight: 600, borderRadius: 6 } } },
    MuiTooltip: { defaultProps: { arrow: true } },
    MuiAlert: { styleOverrides: { root: { borderRadius: 8 } } },
    MuiLink: { defaultProps: { underline: 'hover' } },
  },
})
