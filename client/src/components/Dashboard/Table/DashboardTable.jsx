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

const rows = [

];
function RowMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleEdit = () => {
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
    console.log(listProject);

    const [selected, setSelected] = React.useState([]);
    return (
        <Paper sx={{ mt: 2, overflow: 'auto' }}>
            <Table stickyHeader>
                <TableHead sx={{ bgcolor: "background-default" }}>
                    <TableRow>
                        <TableCell padding="checkbox">
                            <Checkbox
                                indeterminate={
                                    selected.length > 0 && selected.length !== rows.length
                                }
                                checked={selected.length === rows.length}
                                onChange={(event) => {
                                    setSelected(event.target.checked ? rows.map((row) => row.id) : []);
                                }}
                            />
                        </TableCell>
                        <TableCell>ID</TableCell>
                        <TableCell>Project name</TableCell>
                        <TableCell>Creator</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* eslint-disable-next-line react/prop-types */}
                    {listProject.map((row) => (
                        <TableRow key={row._id}>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={selected.includes(row._id)}
                                    onChange={(event) => {
                                        if (event.target.checked) {
                                            setSelected((prev) => [...prev, row._id]);
                                        } else {
                                            setSelected((prev) => prev.filter((id) => id !== row._id));
                                        }
                                    }}
                                />
                            </TableCell>
                            <TableCell>{row._id}</TableCell>
                            <TableCell>{row.projectName}</TableCell>
                            <TableCell>{row.creator.username}</TableCell>
                            <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Typography>{row.description}</Typography>
                                    {/* <Box>
                                        <Typography>{row.customer.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {row.customer.email}
                                        </Typography>
                                    </Box> */}
                                </Box>
                            </TableCell>
                            <TableCell>
                                <RowMenu />
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

    const [open, setOpen] = React.useState(false);

    const renderFilters = () => (
        <>
            <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Status</InputLabel>
                <Select label="Status" defaultValue="">
                    <MenuItem value="paid">Paid</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="refunded">Refunded</MenuItem>
                    <MenuItem value="cancelled">Cancelled</MenuItem>
                </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Category</InputLabel>
                <Select label="Category" defaultValue="">
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="refund">Refund</MenuItem>
                    <MenuItem value="purchase">Purchase</MenuItem>
                    <MenuItem value="debit">Debit</MenuItem>
                </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Customer</InputLabel>
                <Select label="Customer" defaultValue="">
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="olivia">Olivia Rhye</MenuItem>
                    <MenuItem value="steve">Steve Hampton</MenuItem>
                    <MenuItem value="ciaran">Ciaran Murray</MenuItem>
                </Select>
            </FormControl>
        </>
    );

    return (
        <>
            <Box sx={{ display: { xs: 'flex', sm: 'none' }, my: 1, gap: 1 }}>
                <TextField
                    size="small"
                    placeholder="Search"
                    InputProps={{
                        startAdornment: <SearchIcon sx={{ mr: 1 }} />,
                    }}
                    sx={{ flexGrow: 1 }}
                />
                <IconButton size="small" color="default" onClick={() => setOpen(true)}>
                    <FilterAltIcon />
                </IconButton>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <Box
                        sx={{
                            bgcolor: 'background.paper',
                            width: '90%',
                            maxWidth: 400,
                            mx: 'auto',
                            my: '20vh',
                            p: 3,
                            borderRadius: 2,
                        }}
                    >
                        <Typography variant="h6">Filters</Typography>
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {renderFilters()}
                            <Button color="primary" onClick={() => setOpen(false)}>
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </Box>
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
                {renderFilters()}
            </Box>
            <MainTable listProject={listProject} />
            <PaginationLaptopUp />
        </>
    );
}
