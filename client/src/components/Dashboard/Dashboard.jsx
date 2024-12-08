import { Box, Breadcrumbs, Link } from "@mui/material";
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DashboardTable from "./Table/DashboardTable";
import DashboardList from "./List/DashboardList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { callGetListProject } from './../../redux/reducers/projects/getAllProject';
import { callGetListProjectByPagination } from "../../redux/reducers/projects/getProjectByPagination";

export default function Dashboard() {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");
    const [pageSize, setPagesize] = useState(10)
    const [pageIndex, setpageIndex] = useState(1)

    const listProjectByPagination = useSelector((state) => state.callGetListProjectByPagination.listProjectByPagination);

    const pageCount = listProjectByPagination.pageCount
    const listProject = listProjectByPagination.result
    useEffect(() => {
        async function fetchData() {
            await dispatch(callGetListProjectByPagination(pageSize, pageIndex, searchQuery))
        }
        fetchData();
    }, [dispatch, searchQuery, pageIndex, pageSize]);
    return (
        <Box
            component="main"
            className="MainContent"
            sx={{
                px: { xs: 2, md: 6 },
                pt: {
                    xs: 'calc(12px + var(--Header-height))',
                    sm: 'calc(12px + var(--Header-height))',
                    md: 3,
                },
                // pb: { xs: 2, sm: 2, md: 4 },
                // flex: 1,
                // display: 'flex',
                // flexDirection: 'column',
                height: '100vh',
                gap: 1,
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Breadcrumbs
                    size="sm"
                    aria-label="breadcrumbs"
                    separator={<ChevronRightRoundedIcon fontSize="sm" />}
                    sx={{ pl: 0 }}
                >
                    <Link
                        underline="none"
                        color="neutral"
                        href="/"
                        aria-label="Home"
                    >
                        <HomeRoundedIcon />
                    </Link>
                    <Link
                        underline="hover"
                        color="neutral"
                        href="/dashboard"
                    >
                        Dashboard
                    </Link>
                </Breadcrumbs>
            </Box>
            <DashboardTable
                listProject={listProject}
                pageSize={pageSize}
                pageIndex={pageIndex}
                setpageIndex={setpageIndex}
                setPagesize={setPagesize}
                pageCount={pageCount}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />

            {/* <DashboardList listProject={listProject} /> */}
        </Box>
    );
}