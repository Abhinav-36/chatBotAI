import { Outlet } from 'react-router-dom'
import { ThemeContext } from './theme/ThemeContext';
import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { getThemePallete } from './theme/ThemePallete';
import { Grid2 } from '@mui/material'

function App() {

  const [mode, setMode] = useState(localStorage.getItem('theme') || 'light')
  const [chat, setChat] = useState([])
  const [menuOpen, setMenuOpen] = useState(false)

  //create theme
  const theme = React.useMemo(() => createTheme(getThemePallete(mode)), [mode]);

  //save theme mode in localstorage
  useEffect(() => {

    localStorage.setItem('theme', mode)

  }, [mode])

  return (
    <ThemeContext.Provider value={{ mode: mode, setMode: setMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Grid2 container sx={{ background: 'linear-gradient(rgba(215, 199, 244, 0.2), rgba(151, 133, 186, 0.2))' }} >
          <Grid2
            item 
            size={{xs:12,
            md:2}}
            sx={{
              bgcolor: 'primary.light',
              '@media (max-width:800px)': {
                width: '50%',
                transform: menuOpen ? 'translateX(0)' : 'translateX(-100%)',
                transition: 'transform 400ms ease',
              },
            }}
            position={{ xs: 'fixed', md: 'relative' }}
            height={'100vh'}
            zIndex={{ xs: 9999, md: 1 }}
            boxShadow={{ xs: menuOpen ? 10 : 0, md: 0 }}
          >
            <Sidebar setChat={setChat} closeMenu={() => setMenuOpen(false)} />
          </Grid2>
          <Grid2 item size={{xs:12,
            md:10}}>
            <Outlet context={{ chat: chat, setChat: setChat, handleMobileMenu: setMenuOpen }} />
          </Grid2>
        </Grid2>

      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;