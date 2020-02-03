import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator'
import {useStyles} from './style'
import { Dialog, Box, Typography, FormControlLabel, Checkbox } from '@material-ui/core'
import {useSelector, useDispatch} from "react-redux";
import * as modalActions from '../../store/actions/modal';
import TasksAPI from "../../services/tasksAPI";

export default function CreateTask({reloadTasks, showMessage}){
    const {modal} = useSelector(state =>
        ({modal: state.modal.task})
    );
    const classes = useStyles();
    const dispatch = useDispatch();
    const [data, setData] = useState({'username': '', 'email': '', 'text': '', 'status': ''});

    const closeModal=()=>{
        modalActions.openTaskModal(false)(dispatch);
        setData({'username': '', 'email': '', 'text': '', 'status': ''})
    };

    const handleInputChange = event => {
        const {value, name} = event.target;
        setData({...data, ...{[name]: value}});
    };

    const onSubmit = event => {
        event.preventDefault();

        if (modal==='create') {
            const form = new FormData();
            form.append("username", data.username);
            form.append("email", data.email);
            form.append("text", data.text);
            (new TasksAPI())
                .addTask(form)
                .then(() => reloadTasks());
            showMessage('new task was created')
        } else {
            if(!localStorage.getItem('token')){
                modalActions.openLoginModal(true)(dispatch);
            }else {
                const form = new FormData();
                form.append("token", localStorage.getItem('token'));
                form.append("status", data.status || modal.status);
                form.append("text", data.text || modal.text);
                (new TasksAPI())
                    .updateTask(form, modal.id)
                    .then(() => reloadTasks());
                showMessage('task was updated')
            }
        }
        closeModal();
        setData({'username': '', 'email': '', 'text': '', 'status': ''})
    };

    return (
        <>
            <Dialog
                open={modal}
                onClose={closeModal}
                fullWidth={true}
                maxWidth='xs'>
                <div className={classes.paper}>
                    {modal==='create'?
                    <Typography component="h1" variant="h5">CREATE NEW TASK</Typography>
                        :   <Typography component="h1" variant="h5">UPDATE TASK</Typography>}
                    <ValidatorForm onSubmit={onSubmit}>
                        {modal==='create'?
                            <>
                        <TextValidator
                            label="User name"
                            onChange={handleInputChange}
                            name="username"
                            type="text"
                            value={data.username}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <br/>
                        <TextValidator
                            label="Email"
                            onChange={handleInputChange}
                            name="email"
                            type="email"
                            value={data.email}
                            validators={['required', 'isEmail']}
                            errorMessages={['this field is required', 'email is not valid']}
                        />
                        <br/>
                        <TextValidator
                            label="Task"
                            onChange={handleInputChange}
                            name="text"
                            type="text"
                            value={data.text}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <br/>
                            </>
                            :
                            <>
                                <Typography component="h5" variant="h5">username:{modal.username}</Typography>
                                <Typography component="h5" variant="h5">email:{modal.email}</Typography>
                                <TextValidator
                                    label="Task"
                                    onChange={handleInputChange}
                                    name="text"
                                    type="text"
                                    value={data.text}
                                />
                                <br/>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            onChange={handleInputChange}
                                            name="status"
                                            value={10}
                                            color='default'
                                        />
                                    }
                                    label={'completed'}
                                />
                            </>}
                        <Button
                            className={classes.button}
                            variant="outlined"
                            type="submit"
                        >
                            Submit
                        </Button>
                    </ValidatorForm>
                </div>
                <Box mt={8}>
                </Box>
            </Dialog>
        </>
    )
}

