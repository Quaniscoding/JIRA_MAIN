import {
    Box,
    TextField,
    MenuItem,
    Typography,
    Grid,
    IconButton,
    SwipeableDrawer,
    Button,
    Input,
    Slider,
    FormControl,
    FormHelperText,
    FormLabel,
    Autocomplete,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CustomSnackbar from "../../CustomSnackbar/CustomSnackbar";
import { callCreateProject } from "../../../redux/reducers/projects/createProject";
import { callGetListProject } from "../../../redux/reducers/projects/getAllProject";
import { useDispatch, useSelector } from "react-redux";
import CircularProgressWithLabel from "../../CircularProgressWithLabel/CircularProgressWithLabel";
import { callGetListProjectByPagination } from "../../../redux/reducers/projects/getProjectByPagination";
import { callGetListProjectByUserId } from './../../../redux/reducers/projects/getProjectByUserId';
import { getLocal } from "../../../utils/config";
import { DATA_USER } from "../../../utils/constant";
import { callGetListStatus } from "../../../redux/reducers/task/getAllStatus";
import { callGetListPriority } from "../../../redux/reducers/task/getAllPriority";
import { callGetListTaskType } from "../../../redux/reducers/task/getAllTaskType";
import { callGetListUser } from './../../../redux/reducers/users/getUser';
import { callCreateTask } from './../../../redux/reducers/task/createTask';

export default function CreateTaskModal({
    openDrawerCreateTask,
    toggleDrawer,
    setOpenDrawerCreateTask,
}) {
    const dispatch = useDispatch();
    const userId = getLocal(DATA_USER)?.id;

    // States
    const [progress, setProgress] = useState(10);
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        projectId: "",
        taskName: "",
        description: "",
        statusId: "",
        originalEstimate: "",
        timeTrackingSpent: "",
        timeTrackingRemaining: "",
        typeId: "",
        priorityId: "",
        listUserAssign: [],
    });
    const [listUser, setListUser] = React.useState([]);
    const [listProjectByUserId, setListProjectByUserId] = useState([]);
    const [errors, setErrors] = useState({});
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    // Selectors
    const listStatus = useSelector((state) => state.getAllStatus.listStatus);
    const listPriority = useSelector((state) => state.getAllPriority.listPriority);
    const listTaskType = useSelector((state) => state.getAllTaskType.listTaskType);
    // Fetch projects by user ID
    useEffect(() => {
        if (userId) {
            const fetchProjects = async () => {
                try {
                    const result = await dispatch(callGetListProjectByUserId(userId));
                    if (result) {
                        setListProjectByUserId(result);
                    }
                } catch (error) {
                    console.error("Error fetching projects:", error);
                }
            };
            fetchProjects();
        }
    }, [userId, dispatch]);

    // Fetch task-related data
    useEffect(() => {
        const fetchData = async () => {
            await dispatch(callGetListTaskType);
            await dispatch(callGetListPriority);
            await dispatch(callGetListStatus);
            const result = await dispatch(callGetListUser());
            if (result.result) {
                setListUser(result.result);
            }
        };
        fetchData();
    }, [dispatch]);

    // Handle form input change
    const handleChange = (e) => {
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

    const handleSliderChange = (event, newValue) => {
        setFormValues((prev) => ({
            ...prev,
            originalEstimate: newValue === '' ? 0 : Number(newValue)
        }))
    };
    const handleSliderChangeTimeTrackingSpent = (event, newValue) => {
        setFormValues((prev) => ({
            ...prev,
            timeTrackingSpent: newValue === '' ? 0 : Number(newValue)
        }))
    };
    const handleSliderChangeTimeTrackingRemain = (event, newValue) => {
        setFormValues((prev) => ({
            ...prev,
            timeTrackingRemaining: newValue === '' ? 0 : Number(newValue)
        }))
    };
    const handleChangeOriginalEstimate = (e) => {
        setFormValues((prev) => ({
            ...prev,
            originalEstimate: e.target.value === '' ? 0 : Number(e.target.value)
        }))
    }
    const handleChangeTimeTrackingSpent = (e) => {
        setFormValues((prev) => ({
            ...prev,
            timeTrackingSpent: e.target.value === '' ? 0 : Number(e.target.value)
        }))
    }
    const handleChangeTimeTrackingRemain = (e) => {
        setFormValues((prev) => ({
            ...prev,
            timeTrackingRemaining: e.target.value === '' ? 0 : Number(e.target.value)
        }))
    }
    // Validate form
    const validateForm = () => {
        const newErrors = {};

        if (!formValues.projectId) {
            newErrors.projectId = "Project is required";
        }

        if (!formValues.taskName?.trim()) {
            newErrors.taskName = "Task Name is required";
        }

        if (!formValues.description?.trim()) {
            newErrors.description = "Description is required";
        }

        if (formValues.statusId === undefined || formValues.statusId === null || formValues.statusId === "") {
            newErrors.statusId = "Status is required";
        }

        if (formValues.originalEstimate <= 0) {
            newErrors.originalEstimate = "Original Estimate must be greater than 0";
        }

        if (formValues.timeTrackingSpent > formValues.originalEstimate) {
            newErrors.timeTrackingSpent = "Time Tracking Spent must small than original estimate";
        }

        if (formValues.timeTrackingRemaining < 0) {
            newErrors.timeTrackingRemaining = "Time Tracking Remaining cannot be negative";
        }

        if (formValues.typeId === undefined || formValues.typeId === null || formValues.typeId === "") {
            newErrors.typeId = "Task type is required";
        }

        if (formValues.priorityId === undefined || formValues.priorityId === null || formValues.priorityId === "") {
            newErrors.priorityId = "Priority is required";
        }

        if (formValues.listUserAssign.length === 0) {
            newErrors.listUserAssign = "At least one user must be assigned";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    // Handle snackbar close
    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let isMounted = true;
        setLoading(true);

        if (!validateForm()) {
            setLoading(false);
            return;
        }
        try {
            const result = await dispatch(callCreateTask(formValues));

            if (result.isCreate) {
                for (let i = 15; i <= 90; i += 15) {
                    if (!isMounted) return;
                    await new Promise((resolve) => setTimeout(resolve, 100));
                    setProgress(i);
                }

                if (isMounted) setProgress(100);

                setSnackbar({
                    open: true,
                    message: result.message,
                    severity: "success",
                });

                setTimeout(() => {
                    if (isMounted) {
                        setFormValues({
                            projectId: "",
                            taskName: "",
                            description: "",
                            statusId: "",
                            originalEstimate: "",
                            timeTrackingSpent: "",
                            timeTrackingRemaining: "",
                            typeId: "",
                            priorityId: "",
                            listUserAssign: [],
                        });
                        setOpenDrawerCreateTask(false);
                        setProgress(0);
                    }
                }, 3000);
                await dispatch(callGetListProjectByPagination(10, 1, "", "asc"));
            } else {
                setSnackbar({
                    open: true,
                    message: result.message,
                    severity: "error",
                });
            }
        } catch (error) {
            setSnackbar({
                open: true,
                message: "An error occurred. Please try again later.",
                severity: "error",
            });
        } finally {
            if (isMounted) {
                setLoading(false);
                setTimeout(() => setProgress(0), 500);
            }
        }

        return () => {
            isMounted = false;
        };
    };

    return (
        <SwipeableDrawer
            anchor='right'
            open={openDrawerCreateTask}
            onClose={() => toggleDrawer(false)}
            onOpen={() => toggleDrawer(true)}
        >
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
                    Create Task
                </Typography>
                <Grid container spacing={2}>
                    {/* Project by id */}
                    <Grid item xs={12}>
                        <TextField
                            name='projectId'
                            label='Project'
                            variant='outlined'
                            select
                            fullWidth
                            value={formValues.projectId}
                            onChange={handleChange}
                            error={!!errors.projectId}
                            helperText={errors.projectId}
                        >
                            {listProjectByUserId.map(prj => (
                                <MenuItem key={prj.id} value={prj.id}>
                                    {prj.projectName}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    {/* Task Name */}
                    <Grid item xs={12}>
                        <TextField
                            name='taskName'
                            label='Task Name'
                            variant='outlined'
                            fullWidth
                            value={formValues.taskName}
                            onChange={handleChange}
                            error={!!errors.taskName}
                            helperText={errors.taskName}
                        />
                    </Grid>
                    {/* Description */}
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
                    {/* Status */}
                    <Grid item xs={12}>
                        <TextField
                            name='statusId'
                            label='Status'
                            variant='outlined'
                            select
                            fullWidth
                            value={formValues.statusId}
                            onChange={handleChange}
                            error={!!errors.statusId}
                            helperText={errors.statusId}
                        >
                            {listStatus.map(stt => (
                                <MenuItem key={stt.id} value={stt.id}>
                                    {stt.statusName}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    {/* Task type */}
                    <Grid item xs={12}>
                        <TextField
                            name='typeId'
                            label='Task type'
                            variant='outlined'
                            select
                            fullWidth
                            value={formValues.typeId}
                            onChange={handleChange}
                            error={!!errors.typeId}
                            helperText={errors.typeId}
                        >
                            {listTaskType.map(tt => (
                                <MenuItem key={tt.id} value={tt.id}>
                                    {tt.taskType}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    {/* Priority */}
                    <Grid item xs={12}>
                        <TextField
                            name='priorityId'
                            label='Priority'
                            variant='outlined'
                            select
                            fullWidth
                            value={formValues.priorityId}
                            onChange={handleChange}
                            error={!!errors.priorityId}
                            helperText={errors.priorityId}
                        >
                            {listPriority.map(pio => (
                                <MenuItem key={pio.id} value={pio.id}>
                                    {pio.priority}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    {/* Original Estimate */}
                    <Grid container item xs={12} sx={{ alignItems: 'center' }}>
                        <Grid item xs>
                            <FormControl fullWidth>
                                <FormLabel htmlFor="original-estimate-slider">Original Estimate</FormLabel>
                                <Slider
                                    id="original-estimate-slider"
                                    value={Number(formValues.originalEstimate)}
                                    onChange={handleSliderChange}
                                    aria-labelledby="original-estimate-slider"
                                    max={200}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <FormControl error={!!errors.originalEstimate} fullWidth>
                                <Input
                                    value={formValues.originalEstimate}
                                    name="originalEstimate"
                                    onChange={handleChangeOriginalEstimate}
                                    inputProps={{
                                        step: 5,
                                        min: 0,
                                        type: 'number',
                                        'aria-labelledby': 'input-slider',
                                    }}
                                />
                                {errors.originalEstimate && (
                                    <FormHelperText>{errors.originalEstimate}</FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                    </Grid>
                    {/* Time Tracking Spent */}
                    <Grid container item xs={12} sx={{ alignItems: 'center' }}>
                        <Grid item xs>
                            <FormControl fullWidth>
                                <FormLabel htmlFor="time-tracking-spent-slider">Time Tracking Spent</FormLabel>
                                <Slider
                                    id="time-tracking-spent-slider"
                                    value={Number(formValues.timeTrackingSpent)}
                                    onChange={handleSliderChangeTimeTrackingSpent}
                                    aria-labelledby="time-tracking-spent-slider"
                                    max={formValues.originalEstimate - formValues.timeTrackingRemaining}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <FormControl error={!!errors.timeTrackingSpent} fullWidth>
                                <Input
                                    value={formValues.timeTrackingSpent}
                                    name="timeTrackingSpent"
                                    onChange={handleChangeTimeTrackingSpent}
                                    inputProps={{
                                        step: 5,
                                        min: 0,
                                        max: formValues.originalEstimate - formValues.timeTrackingRemaining,
                                        type: 'number',
                                        'aria-labelledby': 'input-slider',
                                    }}
                                />
                                {errors.timeTrackingSpent && (
                                    <FormHelperText>{errors.timeTrackingSpent}</FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                    </Grid>
                    {/* Time Tracking remain */}
                    <Grid container item xs={12} sx={{ alignItems: 'center' }}>
                        <Grid item xs>
                            <FormControl fullWidth>
                                <FormLabel htmlFor="time-tracking-remain-slider">Time Tracking Remain</FormLabel>
                                <Slider
                                    id="time-tracking-remain-slider"
                                    value={Number(formValues.timeTrackingRemaining)}
                                    onChange={handleSliderChangeTimeTrackingRemain}
                                    aria-labelledby="time-tracking-Remain-slider"
                                    max={formValues.originalEstimate - formValues.timeTrackingSpent}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <FormControl error={!!errors.timeTrackingRemain} fullWidth>
                                <Input
                                    value={formValues.timeTrackingRemaining}
                                    name="timeTrackingRemain"
                                    onChange={handleChangeTimeTrackingRemain}
                                    inputProps={{
                                        step: 5,
                                        min: 0,
                                        max: formValues.timeTrackingRemaining - formValues.timeTrackingSpent,
                                        type: 'number',
                                        'aria-labelledby': 'input-slider',
                                    }}
                                />
                                {errors.timeTrackingRemain && (
                                    <FormHelperText>{errors.timeTrackingRemain}</FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                    </Grid>
                    {/* List user */}
                    <Grid item xs={12}>
                        <Autocomplete
                            multiple
                            options={listUser}
                            getOptionLabel={(option) => option.username}
                            value={formValues.listUserAssign?.map((id) =>
                                listUser?.find((user) => user.id === id) || null
                            )}
                            onChange={(event, selectedOptions) => {
                                setFormValues((prev) => ({
                                    ...prev,
                                    listUserAssign: selectedOptions.map((option) => option.id),
                                }));
                                if (selectedOptions.length > 0 && errors.listUserAssign) {
                                    setErrors((prev) => ({
                                        ...prev,
                                        listUserAssign: undefined,
                                    }));
                                }
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    name="listUserAssign"
                                    variant="outlined"
                                    label="Assign user"
                                    error={!!errors.listUserAssign}
                                    helperText={errors.listUserAssign}
                                />
                            )}
                        />

                    </Grid>
                    {/* Submit Button */}
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
