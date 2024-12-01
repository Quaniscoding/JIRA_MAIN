import * as React from 'react';
import { Box, Avatar, Chip, Link, Divider, IconButton, Typography, List, ListItem, Menu, MenuItem, ListItemAvatar } from '@mui/material'
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const listItems = [
    {
        id: 'INV-1234',
        date: 'Feb 3, 2023',
        status: 'Refunded',
        customer: {
            initial: 'O',
            name: 'Olivia Ryhe',
            email: 'olivia@email.com',
        },
    },
    {
        id: 'INV-1233',
        date: 'Feb 3, 2023',
        status: 'Paid',
        customer: {
            initial: 'S',
            name: 'Steve Hampton',
            email: 'steve.hamp@email.com',
        },
    },
    {
        id: 'INV-1232',
        date: 'Feb 3, 2023',
        status: 'Refunded',
        customer: {
            initial: 'C',
            name: 'Ciaran Murray',
            email: 'ciaran.murray@email.com',
        },
    },
    {
        id: 'INV-1231',
        date: 'Feb 3, 2023',
        status: 'Refunded',
        customer: {
            initial: 'M',
            name: 'Maria Macdonald',
            email: 'maria.mc@email.com',
        },
    },
    {
        id: 'INV-1230',
        date: 'Feb 3, 2023',
        status: 'Cancelled',
        customer: {
            initial: 'C',
            name: 'Charles Fulton',
            email: 'fulton@email.com',
        },
    },
    {
        id: 'INV-1229',
        date: 'Feb 3, 2023',
        status: 'Cancelled',
        customer: {
            initial: 'J',
            name: 'Jay Hooper',
            email: 'hooper@email.com',
        },
    },
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
                sx={{ variant: 'plain', color: 'neutral' }} // Optional, adjust styles here if needed
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

export default function DashboardList() {
    return (
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
            {listItems.map((listItem) => (
                <List key={listItem.id} size="sm" sx={{ '--ListItem-paddingX': 0 }}>
                    <ListItem
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'start',
                        }}
                    >
                        <ListItem
                            sx={{
                                display: 'flex',
                                gap: 2,
                                alignItems: 'flex-start',
                            }}
                        >
                            <ListItemAvatar>
                                <Avatar>{listItem.customer.initial}</Avatar>
                            </ListItemAvatar>
                            <Box>
                                <Typography
                                    gutterBottom
                                    sx={{ fontWeight: 600 }}
                                >
                                    {listItem.customer.name}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {listItem.customer.email}
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        gap: 0.5,
                                        mb: 1,
                                    }}
                                >
                                    <Typography variant="body2">{listItem.date}</Typography>
                                    <Typography variant="body2">&bull;</Typography>
                                    <Typography variant="body2">{listItem.id}</Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        mb: 1,
                                    }}
                                >
                                    <Link component="button" underline="hover">
                                        Download
                                    </Link>
                                    <RowMenu />
                                </Box>
                            </Box>
                        </ListItem>
                        <Chip
                            variant="outlined"
                            size="small"
                            icon={
                                {
                                    Paid: <CheckRoundedIcon />,
                                    Refunded: <AutorenewRoundedIcon />,
                                    Cancelled: <BlockIcon />,
                                }[listItem.status]
                            }
                            color={
                                {
                                    Paid: 'success',
                                    Refunded: 'default',
                                    Cancelled: 'error',
                                }[listItem.status]
                            }
                            label={listItem.status}
                        />
                    </ListItem>
                    <Divider />
                </List>
            ))}
            <Box
                className="Pagination-mobile"
                sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', py: 2 }}
            >
                <IconButton
                    aria-label="previous page"
                    variant="outlined"
                    color="neutral"
                    size="sm"
                >
                    <KeyboardArrowLeftIcon />
                </IconButton>
                <Typography level="body-sm" sx={{ mx: 'auto' }}>
                    Page 1 of 10
                </Typography>
                <IconButton
                    aria-label="next page"
                    variant="outlined"
                    color="neutral"
                    size="sm"
                >
                    <KeyboardArrowRightIcon />
                </IconButton>
            </Box>
        </Box>
    );
}
