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
function RowMenu({ id, setSnackbar }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [openConfirm, setOpenConfirm] = React.useState(false);
    const handleOpenConfirm = () => {
        setOpenConfirm(true);
    }
    const handleCloseConfirm = () => {
        setOpenConfirm(false);
        setAnchorEl(null);
    }

    const dispatch = useDispatch();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleEdit = () => {
        setAnchorEl(null);
    }
    const handleDelete = async () => {
        const result = await dispatch(callDeleteProject(id));
        if (result.isDelete) {
            await dispatch(callGetListProject(""));
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

    return (
        <>
            <IconButton
                size="small"
                color="default"
                onClick={handleClick}
                sx={{ variant: 'plain', color: 'neutral' }}
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
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                <MenuItem onClick={handleOpenConfirm} sx={{ color: 'error.main' }}>
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


// eslint-disable-next-line react/prop-types
function MainTable({ listProject }) {
    const [selected, setSelected] = React.useState([]);
    const [snackbar, setSnackbar] = React.useState({
        open: false,
        message: "",
        severity: "success",
    });
    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };
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
                            <TableCell>{row.members}</TableCell>
                            <TableCell>{row.projectCategoryName}</TableCell>
                            <TableCell>
                                <RowMenu
                                    id={row.id}
                                    handleCloseSnackbar={handleCloseSnackbar}
                                    setSnackbar={setSnackbar}
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

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenDrawerCreateProject(open);
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
                <Button variant="outlined" size='small' onClick={toggleDrawer(true)}>Create project</Button>
                <Button variant="outlined" size='small'>Create task</Button>
            </Box>
            <MainTable listProject={listProject} />
            <Pagination setpageIndex={setpageIndex} pageCount={pageCount} />
            <CreateProjectModal openDrawerCreateProject={openDrawerCreateProject} toggleDrawer={toggleDrawer} setOpenDrawerCreateProject={setOpenDrawerCreateProject} />
        </>
    );
}
