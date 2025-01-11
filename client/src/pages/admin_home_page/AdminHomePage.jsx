import { Box } from '@mui/material'
import React from 'react'
import Header from '../../Header/Header'
import Sidebar from '../../components/SideBar/SideBar'
import { Outlet } from 'react-router-dom'

function AdminHomePage() {
    return (
        <Box sx={{ display: "flex", height: "100vh" }}>
            <Sidebar />
            <Header />
            <Box
                component='main'
                sx={{
                    pt: { xs: "calc(12px + var(--Header-height))", md: 3 },
                    pb: { xs: 2, sm: 2, md: 3 },
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    minWidth: 0,
                    height: "100vh",
                    gap: 1,
                    overflow: "auto",
                    scrollbarWidth: "none",
                    "&::-webkit-scrollbar": {
                        display: "none",
                    }
                }}
            >
                <Outlet />
            </Box>
        </Box>
    )
}

export default AdminHomePage