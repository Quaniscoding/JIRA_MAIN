import { Box, Breadcrumbs, Link } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { callGetListProjectDetail } from '../../redux/reducers/projects/getProjectDetail';
import CircularProgressWithLabel from '../CircularProgressWithLabel/CircularProgressWithLabel';

export default function ProjectDetails() {
  const { id: projectId } = useParams();
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  const [listProjectDetails, setListProjectDetails] = useState([])
  // Debounce searchQuery
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);
  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      setLoading(true);
      setProgress(15);
      try {
        for (let i = 10; i <= 90; i += 15) {
          await new Promise((resolve) => setTimeout(resolve, 100)); // Giả lập tiến trình
          if (isMounted) setProgress(i);
        }

        const result = await dispatch(callGetListProjectDetail(projectId));
        setListProjectDetails(result)

        if (isMounted) setProgress(100);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
          setTimeout(() => setProgress(0), 500); // Đưa `progress` về 0 sau khi hoàn tất
        }
      }
    }
    fetchData();

    return () => {
      isMounted = false; // Cleanup khi component unmount
    };
  }, [dispatch, debouncedSearchQuery])
  return (
    <Box
      component="main"
      className="MainContent"
      sx={{
        px: { xs: 2, md: 6 },
        pt: {
          xs: "calc(12px + var(--Header-height))",
          sm: "calc(12px + var(--Header-height))",
          md: 3,
        },
        height: "100vh",
        gap: 1,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {loading && (
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1300,
              backgroundColor: "rgba(255, 255, 255, 0.8)", // Hiệu ứng mờ nền
            }}
          >
            <CircularProgressWithLabel value={progress} />
          </Box>
        )}
        {listProjectDetails.map((item, index) => {
          return (
            <Box>
              <Breadcrumbs
                size="sm"
                aria-label="breadcrumbs"
                separator={<ChevronRightRoundedIcon fontSize="sm" />}
                sx={{ pl: 0 }}
              >
                <Link underline="none" color="neutral" href="/" aria-label="Home">
                  <HomeRoundedIcon />
                </Link>
                <Link underline="hover" color="neutral" href="/task">
                  Tasks
                </Link>
              </Breadcrumbs>
            <h1>{item.projectName}</h1>
            </Box>
          )
        })}

      </Box>
    </Box>
  )
}
