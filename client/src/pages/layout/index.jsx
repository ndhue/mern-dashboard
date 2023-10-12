import React, { useMemo, useState } from 'react';
import { CssBaseline, ThemeProvider, useMediaQuery, createTheme, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { themeSettings } from "@/theme";
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';

import { useGetUserQuery } from '@/controllers/api';

export const Layout = () => {
  const mode = useSelector(state => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const userId = useSelector(state => state.global.userId);
  const { data } = useGetUserQuery(userId);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box display={isNonMobile ? "flex" : "block"} width="99%" height="100%">
        <Sidebar 
          user={data || {}}
          isNonMobile={isNonMobile}
          drawerWidth="250px"
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Box flexGrow={1}>
          <Navbar 
            user={data || {}}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  )
}
