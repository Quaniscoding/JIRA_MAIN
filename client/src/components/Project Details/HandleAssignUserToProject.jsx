import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { callGetListUser } from '../../redux/reducers/users/getUser';
import { Avatar, AvatarGroup, Box, Button, Dialog, DialogContent, DialogTitle, Modal, TextField, Tooltip, Typography } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import StringAvatar from '../StringAvatar/StringAvatar';
import { callAsignUserProject } from '../../redux/reducers/users/asignUserProject';
import { callGetListProjectDetail } from '../../redux/reducers/projects/getProjectDetail';
import CustomSnackbar from './../CustomSnackbar/CustomSnackbar';
import { callDeleteUserFromProject } from '../../redux/reducers/users/deleteUserFromProject';

export default function HandleAssignUserToProject({ listProjectDetails, projectId, setListProjectDetails }) {
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [visibleUsers, setVisibleUsers] = useState(10);
    const dispatch = useDispatch();
    const [openModalAssign, setOpenModalAssign] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });
    const handleAssignUserClick = () => {
        setModalOpen(true);
    };
    const handleCloseModal = () => {
        setModalOpen(false);
    };
    const handleOpenModalDeleteUser = (id) => {
        setSelectedUser(id);
        setOpenModalDelete(true);
    }
    const handleCloseModalDeleteUser = () => {
        setOpenModalDelete(false);
        setSelectedUser(null);
    }

    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };
    const handleOpenModal = (id) => {
        setSelectedUser(id);
        setOpenModalAssign(true);
    };

    const handleCloseModalAssignUser = () => {
        setOpenModalAssign(false);
        setSelectedUser(null);
    };

    const handleConfirmAssign = () => {
        assignUserToProject(selectedUser);
        handleCloseModalAssignUser();
    };
    useEffect(() => {
        async function fetchData(keyword = "") {
            try {
                const result = await dispatch(callGetListUser(keyword));
                setFilteredUsers(result.result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, [dispatch]);
    const handleSearchChange = (event) => {
        const keyword = event.target.value;
        setSearchKeyword(keyword);
        async function fetchFilteredData() {
            try {
                const result = await dispatch(callGetListUser(keyword));
                setFilteredUsers(result.result.slice(0, 10));
                setVisibleUsers(10);
            } catch (error) {
                console.error("Error fetching filtered data:", error);
            }
        }
        fetchFilteredData();
    };
    const handleShowMore = () => {
        setVisibleUsers((prevVisible) => prevVisible + 10);
    };

    const assignUserToProject = async (user) => {
        const result = await dispatch(callAsignUserProject({ projectId: projectId, id: user }))
        if (result.isAssigned) {
            setSnackbar({
                open: true,
                message: "Assigned user to project successfully!",
                severity: "success",
            });
            const rs = await dispatch(callGetListProjectDetail(projectId));
            setListProjectDetails(rs);
        }
        else {
            setSnackbar({
                open: true,
                message: "Assigned user to project failed!",
                severity: "error",
            });
        }
        handleCloseModalAssignUser()
    }
    const deleteUserFromProject = async () => {
        const result = await dispatch(callDeleteUserFromProject({ projectId: projectId, id: selectedUser }))
        if (result.isDelete) {
            setSnackbar({
                open: true,
                message: "Delete user from project successfully!",
                severity: "success",
            });
            const rs = await dispatch(callGetListProjectDetail(projectId));
            setListProjectDetails(rs);
        }
        else {
            setSnackbar({
                open: true,
                message: "Delete user from project failed!",
                severity: "error",
            });
        }
        handleCloseModalDeleteUser()
    }
    return (
        <Box
            display="flex"
            flexDirection={"column"}
            alignItems={"start"}
            sx={{ p: 2 }}
        >
            <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold" }}
            >
                Board
            </Typography>
            <Box display="flex" flexWrap="wrap" alignItems={"center"} sx={{ gap: 1 }}>
                <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold" }}
                >
                    Members
                </Typography>
                <AvatarGroup
                    max={5}
                    spacing="medium"
                    sx={{
                        "& .MuiAvatar-root": {
                            border: "2px solid #fff",
                            width: 40,
                            height: 40,
                            fontSize: "1rem",
                        },
                    }}
                >
                    {listProjectDetails[0]?.members?.map((member, index) => (
                        <Tooltip key={index} title={member?.username}>
                            <Avatar {...StringAvatar(member?.username)} />
                        </Tooltip>
                    ))}
                </AvatarGroup>
                <Avatar
                    onClick={handleAssignUserClick}
                    sx={{
                        cursor: "pointer",
                        bgcolor: "primary.main",
                        "&:hover": {
                            bgcolor: "primary.dark",
                        },
                    }}
                >
                    <AddIcon sx={{ color: "white" }} />
                </Avatar>
            </Box>

            <Dialog
                open={isModalOpen}
                onClose={handleCloseModal}
                maxWidth="sm"
                fullWidth
            >
                <Box
                    sx={{
                        minHeight: {
                            xs: "300px", // Điều chỉnh chiều cao tối thiểu cho màn hình nhỏ
                            md: "400px", // Chiều cao lớn hơn cho màn hình lớn
                        },
                    }}
                >
                    <DialogTitle>
                        Add members to project {listProjectDetails[0]?.projectName}
                        <TextField
                            fullWidth
                            placeholder="Search users"
                            value={searchKeyword}
                            onChange={handleSearchChange}
                            variant="outlined"
                            size="small"
                            onKeyDown={(e) => e.stopPropagation()}
                            sx={{
                                mt: 2,
                                "& .MuiOutlinedInput-root": {
                                    bgcolor: "background.paper",
                                    "&:hover .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "primary.main",
                                    },
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "primary.main",
                                    },
                                },
                            }}
                        />
                    </DialogTitle>
                    <DialogContent sx={{
                        display: "flex", flexDirection: {
                            md: "row",
                            xs: "column",
                        }, gap: 3,
                        minHeight: {
                            xs: "400px",
                            md: "400px",
                        },
                    }}>
                        <Box
                            sx={{
                                flex: 1,
                                overflowY: "auto",
                                maxHeight: { xs: "200px", md: "400px" }, // Điều chỉnh chiều cao cuộn theo màn hình
                                pr: 2,
                            }}
                        >
                            <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: "bold", mb: 2 }}
                            >
                                Not added yet
                            </Typography>
                            {filteredUsers?.slice(0, visibleUsers).map((user, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        mb: 1,
                                    }}
                                    onClick={() => handleOpenModal(user.id)}
                                >
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Avatar {...StringAvatar(user.username)} />
                                        <Typography variant="body1" sx={{ ml: 2 }}>
                                            {user.username}
                                        </Typography>
                                    </Box>
                                    <Button variant="outlined" color="info">
                                        Add
                                    </Button>
                                </Box>
                            ))}
                            {visibleUsers < filteredUsers.length && (
                                <Button onClick={handleShowMore} sx={{ mt: 2 }}>
                                    Show more
                                </Button>
                            )}
                        </Box>
                        <Box
                            sx={{
                                flex: 1,
                                overflowY: "auto",
                                maxHeight: { xs: "200px", md: "400px" },
                                pr: 2,
                            }}
                        >
                            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
                                Already in project
                            </Typography>
                            {listProjectDetails[0]?.members?.map((member, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        mb: 1,
                                    }}
                                >
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Avatar {...StringAvatar(member.username)} />
                                        <Typography variant="body1" sx={{ ml: 2 }}>
                                            {member.username}
                                        </Typography>
                                    </Box>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => handleOpenModalDeleteUser(member.id)}
                                    >
                                        Remove
                                    </Button>
                                </Box>
                            ))}
                        </Box>
                    </DialogContent>
                </Box>
            </Dialog>
            <CustomSnackbar
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={handleCloseSnackbar}
            />
        </Box>

    )
}
