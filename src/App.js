import React from 'react';
import './App.css';
import TasksPage from './components/TasksPage';

import {Container, CssBaseline} from "@material-ui/core";

export default function App() {
    return(
        <Container component="main" maxWidth="md">
            <CssBaseline/>
            <TasksPage/>
        </Container>
    )
}
