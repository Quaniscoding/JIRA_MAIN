import {
    Box,
    TextField,
    MenuItem,
    Typography,
    Grid,
    IconButton,
    SwipeableDrawer,
    Button,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CustomSnackbar from "../../CustomSnackbar/CustomSnackbar";
import { callCreateProject } from "./../../../redux/reducers/projects/createProject";
import { callGetListProject } from "../../../redux/reducers/projects/getAllProject";
import { useDispatch } from "react-redux";
import CircularProgressWithLabel from "../../CircularProgressWithLabel/CircularProgressWithLabel";

export default function CreateProjectModal({
    openDrawerCreateProject,
    toggleDrawer,
    setOpenDrawerCreateProject,
}) {
    const categories = [
        { id: 0, name: "Dự án phần mềm" },
        { id: 1, name: "Dự án web" },
        { id: 2, name: "Dự án di động" },
    ];
    const [progress, setProgress] = useState(10);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [formValues, setFormValues] = React.useState({
        projectName: "",
        description: "",
        categoryId: "",
        alias: "",
    });
    const [errors, setErrors] = useState({});
    const [snackbar, setSnackbar] = React.useState({
        open: false,
        message: "",
        severity: "success",
    });
    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };
    const handleChange = e => {
        const { name, value } = e.target;
        setFormValues(prevValues => ({
            ...prevValues,
            [name]: value,
        }));
        if (String(value).trim() && errors[name]) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: undefined,
            }));
        }
    };
    const validateForm = () => {
        const newErrors = {};
        if (!formValues.projectName?.trim())
            newErrors.projectName = "Project Name is required";
        if (!formValues.description?.trim())
            newErrors.description = "Description is required";
        if (
            formValues.categoryId === undefined ||
            formValues.categoryId === null ||
            formValues.categoryId === ""
        ) {
            newErrors.categoryId = "Category is required";
        }
        if (!formValues.alias?.trim()) newErrors.alias = "Alias is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async e => {
        e.preventDefault();
        if (validateForm()) {
            const result = await dispatch(callCreateProject(formValues));
            if (result.isCreate) {
                setLoading(true);
                setProgress(0);
                const interval = setInterval(() => {
                    setProgress(prev => (prev >= 100 ? 0 : prev + 10));
                }, 3000);
                clearInterval(interval);
                setProgress(100);
                await dispatch(callGetListProject(""));
                setSnackbar({
                    open: true,
                    message: result.message,
                    severity: "success",
                });
                setTimeout(() => {
                    setFormValues({
                        projectName: "",
                        description: "",
                        categoryId: "",
                        alias: "",
                    });
                    setOpenDrawerCreateProject(false);
                    setLoading(false);
                    setProgress(0);
                }, 3000);
            } else {
                setSnackbar({
                    open: true,
                    message: result.message,
                    severity: "error",
                });
            }
        }
    };
    return (
        <SwipeableDrawer
            anchor='right'
            open={openDrawerCreateProject}
            onClose={() => toggleDrawer(false)}
            onOpen={() => toggleDrawer(true)}
        >
            {loading && (
                <Box
                    sx={{
                        position: "fixed", // Đảm bảo vị trí cố định ở giữa màn hình
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center", // Căn giữa theo chiều ngang
                        alignItems: "center", // Căn giữa theo chiều dọc
                        zIndex: 1300, // Đảm bảo nằm trên các thành phần khác
                    }}
                >
                    <CircularProgressWithLabel value={progress} />
                </Box>
            )}
            <IconButton
                onClick={toggleDrawer(false)}
                sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    cursor: "pointer",
                    zIndex: 3000,
                    color: "black",
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    border: "1px solid rgba(0, 0, 0, 0.2)",
                    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.3)",
                    backdropFilter: "blur(4px)",
                    ":hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        borderColor: "rgba(0, 0, 0, 0.4)",
                    },
                    transition: "background-color 0.3s ease, border-color 0.3s ease",
                }}
            >
                <CloseIcon sx={{ color: "black", fontSize: 24 }} />
            </IconButton>
            <Box
                component='form'
                sx={{
                    px: { xs: 2, md: 12 },
                    pt: {
                        xs: "calc(12px + var(--Header-height))",
                        sm: "calc(12px + var(--Header-height))",
                        md: 3,
                    },
                    pb: { xs: 2, sm: 2, md: 4 },
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    minWidth: 0,
                    maxWidth: 800,
                    height: "100dvh",
                    gap: 1,
                }}
            >
                <Typography variant='h5' textAlign='center'>
                    Create Project
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            name='projectName'
                            label='Project Name'
                            variant='outlined'
                            fullWidth
                            value={formValues.projectName}
                            onChange={handleChange}
                            error={!!errors.projectName}
                            helperText={errors.projectName}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name='description'
                            label='Description'
                            variant='outlined'
                            multiline
                            rows={4}
                            fullWidth
                            value={formValues.description}
                            onChange={handleChange}
                            error={!!errors.description}
                            helperText={errors.description}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name='categoryId'
                            label='Category'
                            variant='outlined'
                            select
                            fullWidth
                            value={formValues.categoryId}
                            onChange={handleChange}
                            error={!!errors.categoryId}
                            helperText={errors.categoryId}
                        >
                            {categories.map(category => (
                                <MenuItem key={category.id} value={category.id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name='alias'
                            label='Alias'
                            variant='outlined'
                            fullWidth
                            value={formValues.alias}
                            onChange={handleChange}
                            error={!!errors.alias}
                            helperText={errors.alias}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant='outlined'
                            color='info'
                            fullWidth
                            onClick={handleSubmit}
                        >
                            Create
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <CustomSnackbar
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={handleCloseSnackbar}
            />
        </SwipeableDrawer>
    );
}