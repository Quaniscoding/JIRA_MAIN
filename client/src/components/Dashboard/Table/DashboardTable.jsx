import * as React from 'react';
import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    Modal,
    TextField,
    IconButton,
    Typography,
    Paper,
    Menu,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Tooltip,
    AvatarGroup,
} from '@mui/material';
import {
    FilterAlt as FilterAltIcon,
    Search as SearchIcon,
    MoreHoriz as MoreHorizRoundedIcon,
} from '@mui/icons-material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CreateProjectModal from '../Modal/CreateProjectModal';
import { useDispatch, useSelector } from 'react-redux';
import { callDeleteProject } from './../../../redux/reducers/projects/deleteProject';
import { callGetListProject } from '../../../redux/reducers/projects/getAllProject';
import CustomSnackbar from '../../CustomSnackbar/CustomSnackbar';
import { callGetListUser } from '../../../redux/reducers/users/getUser';
import { callAsignUserFromProject } from './../../../redux/reducers/users/asignUserFromProject';
import { callGetListProjectByPagination } from '../../../redux/reducers/projects/getProjectByPagination';
import EditProjectModal from '../Modal/EditProjectModal';
import CreateTaskModal from '../Modal/CreateTaskModal';
import { useNavigate } from 'react-router-dom';
function RowMenu({ projectId, setSnackbar, pageSize, pageIndex, toggleDrawer2 }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [openAddUser, setOpenAddUser] = React.useState(false);
    const [openConfirm, setOpenConfirm] = React.useState(false);
    const [listUser, setListUser] = React.useState([]);
    const [selectedUsers, setSelectedUsers] = React.useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleOpenConfirm = () => {
        setOpenConfirm(true);
    }
    const handleCloseConfirm = () => {
        setOpenConfirm(false);
        setAnchorEl(null);
    }
    const handleOpenAddUser = () => {
        setOpenAddUser(true);
    }
    const handleCloseAddUser = () => {
        setOpenAddUser(false);
        setAnchorEl(null);
        setSelectedUsers([]);
    }

    React.useEffect(() => {
        const fetchListUser = async () => {
            const result = await dispatch(callGetListUser());
            if (result.result) {
                setListUser(result.result);
            }
        };
        fetchListUser();
    }, [dispatch]);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleToggleUser = (userId) => {
        setSelectedUsers((prev) =>
            prev.includes(userId)
                ? prev.filter((id) => id !== userId) // Bỏ chọn nếu đã chọn trước đó
                : [...prev, userId] // Thêm vào danh sách nếu chưa chọn
        );
    };
    const handleDelete = async () => {
        const result = await dispatch(callDeleteProject(projectId));
        if (result.isDelete) {
            await dispatch(callGetListProjectByPagination(pageSize, pageIndex, ""))
            setSnackbar({
                open: true,
                message: result.message,
                severity: "success",
            });
        }
        else {
            setSnackbar({
                open: true,
                message: result.message,
                severity: "error",
            });
        }
        setAnchorEl(null);
    };
    const handleAssignUserToProject = async () => {
        if (selectedUsers.length === 0) {
            setSnackbar({
                open: true,
                message: "Please select at least one user to assign.",
                severity: "warning",
            });
            return;
        }

        let successCount = 0;
        let errorCount = 0;
        for (const userId of selectedUsers) {
            const result = await dispatch(callAsignUserFromProject({ projectId, userId }));
            if (result) {
                successCount++;
            } else {
                errorCount++;
            }
        }
        if (successCount > 0) {
            await dispatch(callGetListProjectByPagination(pageSize, pageIndex, ""))
            setSnackbar({
                open: true,
                message: `${successCount} user(s) assigned successfully.`,
                severity: "success",
            });
        }

        if (errorCount > 0) {
            setSnackbar({
                open: true,
                message: `${errorCount} user(s) failed to be assigned.`,
                severity: "error",
            });
        }

        handleCloseAddUser();
    };
    return (
        <>
            <IconButton
                size="small"
                color="default"
                onClick={handleClick}
                sx={{ variant: "plain", color: "neutral" }}
            >
                <MoreHorizRoundedIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    sx: { minWidth: 140 },
                }}
            >
                <MenuItem onClick={() => { toggleDrawer2(true)(projectId); setAnchorEl(null); }}>Edit</MenuItem>
                <MenuItem onClick={handleOpenConfirm} sx={{ color: "error.main" }}>
                    Delete
                </MenuItem>
                <Dialog
                    open={openConfirm}
                    onClose={handleCloseConfirm}
                    aria-labelledby="confirm-delete-title"
                    aria-describedby="confirm-delete-description"
                >
                    <DialogTitle id="confirm-delete-title">Confirm Delete</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="confirm-delete-description">
                            Are you sure you want to delete this project? This action cannot be undone.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseConfirm} color="primary">
                            Cancel
                        </Button>
                        <Button
                            onClick={async () => {
                                try {
                                    await handleDelete();
                                    handleCloseConfirm();
                                } catch (error) {
                                    console.error(error);
                                }
                            }}
                            color="error"
                            autoFocus
                        >
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
                <Divider />
                <MenuItem onClick={()=>navigate(`/projectDetails/${projectId}`)}>Project details</MenuItem>
                <MenuItem onClick={handleOpenAddUser}>Assign user to project</MenuItem>
                <Dialog open={openAddUser} onClose={handleCloseAddUser}>
                    <DialogTitle>Add users to project</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Select users from the list below to assign to this project.
                        </DialogContentText>
                        <List sx={{ maxHeight: 300, overflowY: 'auto' }}>
                            {listUser.map((user) => (
                                <ListItem key={user.id} button onClick={() => handleToggleUser(user.id)} sx={{ cursor: "pointer" }}>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={selectedUsers.includes(user.id)}
                                            tabIndex={-1}
                                            disableRipple
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={user.username} secondary={user.email} />
                                </ListItem>
                            ))}
                        </List>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseAddUser} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleAssignUserToProject} color="secondary">
                            Assign
                        </Button>
                    </DialogActions>
                </Dialog>
            </Menu>
        </>
    );
}

function Pagination({ setpageIndex, pageCount }) {
    const [pageIndex, setPageIndexState] = React.useState(1);

    const handlePageClick = (page) => {
        if (typeof page === 'number') {
            setPageIndexState(page);
            setpageIndex(page);
        }
    };

    const handlePrevious = () => {
        setPageIndexState((prev) => {
            const newIndex = Math.max(prev - 1, 1);
            setpageIndex(newIndex);
            return newIndex;
        });
    };

    const handleNext = () => {
        setPageIndexState((prev) => {
            const newIndex = Math.min(prev + 1, pageCount);
            setpageIndex(newIndex);
            return newIndex;
        });
    };

    return (
        <Box
            sx={{
                pt: 2,
                pb: 2,
                gap: 1,
                '& .MuiIconButton-root': { borderRadius: '50%' },
                display: {
                    xs: 'none',
                    md: 'flex',
                },
            }}
        >
            <Button
                size="small"
                variant="outlined"
                color="inherit"
                startIcon={<KeyboardArrowLeftIcon />}
                onClick={handlePrevious}
            >
                Previous
            </Button>

            <Box sx={{ flex: 1 }} />
            {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
                <IconButton
                    key={page}
                    size="small"
                    variant={pageIndex === page ? 'contained' : 'outlined'}
                    color={pageIndex === page ? 'primary' : 'inherit'}
                    onClick={() => handlePageClick(page)}
                    sx={{
                        bgcolor: pageIndex === page ? 'primary.main' : 'transparent',
                        color: pageIndex === page ? 'white' : 'inherit',
                        '&:hover': {
                            bgcolor: pageIndex === page ? 'primary.dark' : 'action.hover',
                        },
                        width: {
                            md: "30px"
                        },
                        height: {
                            md: "30px"
                        }
                    }}
                >
                    {page}
                </IconButton>
            ))}
            <Box sx={{ flex: 1 }} />
            <Button
                size="small"
                variant="outlined"
                color="inherit"
                endIcon={<KeyboardArrowRightIcon />}
                onClick={handleNext}
            >
                Next
            </Button>
        </Box>
    );
}
function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}
function stringAvatar(name) {
    if (name) {
        const nameParts = name?.split(' ');
        const initials = nameParts
            .slice(0, 2)
            .map(part => part[0].toUpperCase())
            .join('');

        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: initials,
        };
    }
    return null;
}


// eslint-disable-next-line react/prop-types
function MainTable({ listProject, pageSize, pageIndex, toggleDrawer2 }) {
    const [selected, setSelected] = React.useState([]);
    const [snackbar, setSnackbar] = React.useState({
        open: false,
        message: "",
        severity: "success",
    });
    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };
    const categories = [
        { id: 0, name: "Dự án phần mềm" },
        { id: 1, name: "Dự án web" },
        { id: 2, name: "Dự án di động" },
    ];
    return (
        <Paper sx={{ mt: 2, overflow: 'auto', minHeight: "750px" }}>
            <Table stickyHeader>
                <TableHead sx={{ bgcolor: "background-default" }}>
                    <TableRow>
                        <TableCell padding="checkbox">
                            <Checkbox
                                indeterminate={
                                    selected.length > 0 && selected.length !== listProject.length
                                }
                                checked={selected?.length === listProject?.length}
                                onChange={(event) => {
                                    setSelected(event.target.checked ? listProject.map((row) => row.id) : []);
                                }}
                            />
                        </TableCell>
                        <TableCell>ID</TableCell>
                        <TableCell>Project name</TableCell>
                        <TableCell>Creator</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Members</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* eslint-disable-next-line react/prop-types */}
                    {listProject?.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={selected.includes(row.id)}
                                    onChange={(event) => {
                                        if (event.target.checked) {
                                            setSelected((prev) => [...prev, row.id]);
                                        } else {
                                            setSelected((prev) => prev.filter((id) => id !== row.id));
                                        }
                                    }}
                                />
                            </TableCell>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.projectName}</TableCell>
                            <TableCell>{row.creator.username}</TableCell>
                            <TableCell>{row.description}</TableCell>
                            <TableCell sx={{
                                display: "flex",
                            }}>
                                <AvatarGroup max={4} spacing={"medium"}>
                                    {row.members && row.members.length > 0 ? row.members.map(user => (
                                        <Tooltip key={user.id} title={user?.username}>
                                            <Avatar {...stringAvatar(user?.username)} />
                                        </Tooltip>
                                    )) : null}
                                </AvatarGroup>
                            </TableCell>
                            <TableCell>
                                {categories.find(category => category.id === row.categoryId)?.name}
                            </TableCell>

                            <TableCell>
                                <RowMenu
                                    projectId={row.id}
                                    handleCloseSnackbar={handleCloseSnackbar}
                                    setSnackbar={setSnackbar}
                                    pageSize={pageSize}
                                    pageIndex={pageIndex}
                                    toggleDrawer2={toggleDrawer2}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <CustomSnackbar
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={handleCloseSnackbar}
            />
        </Paper>
    )
}
// eslint-disable-next-line react/prop-types
export default function DashboardTable({ listProject, pageSize, pageIndex, setpageIndex, setPagesize, pageCount,
    searchQuery, setSearchQuery }) {

    const [openDrawerCreateProject, setOpenDrawerCreateProject] = React.useState(false);
    const [openDrawerCreateTask, setOpenDrawerCreateTask] = React.useState(false);
    const [openDrawerEditProject, setOpenDrawerEditProject] = React.useState(false);
    const [projectId, setProjectId] = React.useState(0)
    const toggleDrawer1 = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenDrawerCreateProject(open);
    };
    const toggleDrawer2 = (open) => (projectId) => {
        setProjectId(projectId);
        setOpenDrawerEditProject(open);
    };
    const toggleDrawer3 = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenDrawerCreateTask(open);
    };
    const handleChangePageSize = (event) => {
        setPagesize(event.target.value);
    };
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value)
    }
    return (
        <>
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexWrap: 'wrap', gap: 1.5 }}>
                <FormControl size="small" sx={{ flex: 1 }}>
                    <TextField
                        size="small"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        InputProps={{
                            startAdornment: <SearchIcon sx={{ mr: 1 }} />,
                        }}
                    />
                </FormControl>
                <FormControl size="small">
                    <InputLabel >Page size</InputLabel>
                    <Select
                        value={pageSize}
                        defaultValue={pageIndex}
                        label="pageSize"
                        onChange={handleChangePageSize}
                    >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={30}>30</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="outlined" size='small' onClick={toggleDrawer1(true)}>Create project</Button>
                <Button variant="outlined" size='small' onClick={toggleDrawer3(true)}>Create task</Button>
            </Box>
            <MainTable
                listProject={listProject}
                pageSize={pageSize}
                pageIndex={pageIndex}
                toggleDrawer2={toggleDrawer2}
            />
            <Pagination
                setpageIndex={setpageIndex}
                pageCount={pageCount} />
            <CreateProjectModal
                openDrawerCreateProject={openDrawerCreateProject}
                toggleDrawer={toggleDrawer1}
                setOpenDrawerCreateProject={setOpenDrawerCreateProject} />
            <EditProjectModal
                openDrawerEditProject={openDrawerEditProject}
                toggleDrawer2={toggleDrawer2}
                setOpenDrawerEditProject={setOpenDrawerEditProject}
                projectId={projectId}
            />
            <CreateTaskModal
                openDrawerCreateTask={openDrawerCreateTask}
                toggleDrawer={toggleDrawer3}
                setOpenDrawerCreateTask={setOpenDrawerCreateTask} />
        </>
    );
}
