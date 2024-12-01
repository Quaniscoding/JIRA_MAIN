import { Box, Breadcrumbs, Link } from "@mui/material";
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DashboardTable from "./Table/DashboardTable";
import DashboardList from "./List/DashboardList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { callGetListProject } from './../../redux/reducers/projects/getAllProject';
import useRoute from "../../hook/useRoute";

export default function Dashboard() {
    const dispatch = useDispatch();
    const {
        searchParams: [searchParams, setSearchParams],
    } = useRoute();
    const keyWord = searchParams.get("keyWord") || "";
    const listProject = useSelector((state) => state.getAllProject.listProject);
    useEffect(() => {
        async function fetchData() {
            await dispatch(callGetListProject(keyWord));
        }
        fetchData();
    }, [dispatch, keyWord]);
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
                pb: { xs: 2, sm: 2, md: 4 },
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                minWidth: 0,
                height: '100dvh',
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
            <DashboardTable listProject={listProject} />
            <DashboardList listProject={listProject} />
        </Box>
    );
}