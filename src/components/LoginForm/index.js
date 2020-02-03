import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator'
import {useStyles} from './style'
import { Dialog, Box, Typography } from '@material-ui/core'
import {useSelector, useDispatch} from "react-redux";
import * as modalActions from '../../store/actions/modal';
import AuthAPI from '../../services/authAPI'

export default function LoginForm({setLogin}){
    const {modal} = useSelector(state =>
        ({modal: state.modal.login})
    );
    const classes = useStyles();
    const dispatch = useDispatch();
    const [data, setData] = useState({'username': '', 'password': ''});

    const closeModal=()=>{
        modalActions.openLoginModal(false)(dispatch);
        setData({'username': '', 'password': ''});
    };

    const handleInputChange = event => {
        const {value, name} = event.target;
        setData({...data, ...{[name]: value}});
    };

    const onSubmit = event => {
        event.preventDefault();
        closeModal();
        const form = new FormData();
        form.append("username", data.username);
        form.append("password", data.password);
        (new AuthAPI())
            .postAuth(form)
            .then((res)=>{localStorage.setItem('token', res.message.token); setLogin(res.message.token)} );
        setData({'username': '', 'password': ''});
     };

    return (
        <>
        <Dialog
            open={modal}
            onClose={closeModal}
            fullWidth={true}
            maxWidth='xs'>
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5">Sign in</Typography>
                            <ValidatorForm onSubmit={onSubmit}>
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
                                    label="Password"
                                    onChange={handleInputChange}
                                    name="password"
                                    type="password"
                                    value={data.password}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                                <br/>
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

