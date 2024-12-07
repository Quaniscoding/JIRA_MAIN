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
} from '@mui/material';
import {
    FilterAlt as FilterAltIcon,
    Search as SearchIcon,
    MoreHoriz as MoreHorizRoundedIcon,
} from '@mui/icons-material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CreateProjectModal from '../Modal/CreateProjectModal';
function RowMenu({ id }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleEdit = () => {
        console.log(id);
        setAnchorEl(null);
    }
    const handleDelete = () => {
        setAnchorEl(null);
    }
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
                <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
                    Delete
                </MenuItem>
                <Divider />
            </Menu>
        </>

    );
}
function PaginationLaptopUp() {
    return (
        <Box
            className="Pagination-laptopUp"
            sx={{
                pt: 2,
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
            >
                Previous
            </Button>

            <Box sx={{ flex: 1 }} />
            {['1', '2', '3', '…', '8', '9', '10'].map((page) => (
                <IconButton
                    key={page}
                    size="small"
                    variant="outlined"
                    color="inherit"
                >
                    {page}
                </IconButton>
            ))}
            <Box sx={{ flex: 1 }} />
            <Button
                size="small"
                variant="outlined"
                color="inherit" // Neutral equivalent
                endIcon={<KeyboardArrowRightIcon />}
            >
                Next
            </Button>
        </Box>
    );
}// eslint-disable-next-line react/prop-types
function MainTable({ listProject }) {
    // console.log(listProject);
    const [selected, setSelected] = React.useState([]);
    return (
        <Paper sx={{ mt: 2, overflow: 'auto' }}>
            <Table stickyHeader>
                <TableHead sx={{ bgcolor: "background-default" }}>
                    <TableRow>
                        <TableCell padding="checkbox">
                            <Checkbox
                                indeterminate={
                                    selected.length > 0 && selected.length !== listProject.length
                                }
                                checked={selected.length === listProject.length}
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
                    {listProject.map((row) => (
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
                                <RowMenu id={row.id} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    )
}
// eslint-disable-next-line react/prop-types
export default function DashboardTable({ listProject }) {

    const [openDrawerCreateProject, setOpenDrawerCreateProject] = React.useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenDrawerCreateProject(open);
    };
    return (
        <>
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexWrap: 'wrap', gap: 1.5 }}>
                <FormControl size="small" sx={{ flex: 1 }}>
                    <TextField
                        size="small"
                        placeholder="Search"
                        InputProps={{
                            startAdornment: <SearchIcon sx={{ mr: 1 }} />,
                        }}
                    />
                </FormControl>
                <Button variant="outlined" size='small' onClick={toggleDrawer(true)}>Create project</Button>
                <Button variant="outlined" size='small'>Create task</Button>
            </Box>
            <MainTable listProject={listProject} />
            <PaginationLaptopUp />
            <CreateProjectModal openDrawerCreateProject={openDrawerCreateProject} toggleDrawer={toggleDrawer} setOpenDrawerCreateProject={setOpenDrawerCreateProject} />
        </>
    );
}
