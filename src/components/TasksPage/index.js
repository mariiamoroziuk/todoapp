import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as tasksActions from '../../store/actions/tasks';
import Loader from '../common/loader'
import {useStyles} from './style'
import * as modalActions from "../../store/actions/modal";
import TaskForm from '../TaskForm';
import AuthAPI from "../../services/authAPI";
import LoginForm from '../LoginForm';

export default function TaskPage() {
    const {loaded, tasks, count} = useSelector(state =>
        ({  tasks: state.tasks.tasks,
            loaded: state.tasks.loaded,
            count: state.tasks.count,})
    );

    const classes = useStyles();
    const dispatch = useDispatch();

    const [filter, setFilter] = useState('username');
    const [direction, setDirection] = useState('asc');
    const [pageNumber, setPageNumber] = useState(1);
    const [buttonText, setButtonText] = useState(true);
    const [pages, setPages] = useState([]);
    const [login, setLogin] = useState(localStorage.getItem('token'));
    const [message, setMessage] = useState('');

    const reloadTasks=()=>{
        tasksActions.getTasks(filter, direction, pageNumber)(dispatch)
    }

    const getPages=()=>{
        let lenght=(Math.ceil(count/3));
        let  pages = [];
        for (let page=1; page<=lenght; page++){
            pages.push(page)
        }
        setPages(pages);
    }

    useEffect(() => reloadTasks(), [filter, direction, pageNumber]);
    useEffect(() => getPages(), [count]);

    window.addEventListener('storage', function(event) {
        setLogin(localStorage.getItem('token'))
    });

    const changeDirection=()=>{
        direction==='asc'? setDirection('desc'):setDirection('asc');
        setButtonText(!buttonText)
    };
    const changePage=(page)=>{
        setPageNumber(page)
    };
    const handleChange = (event, newValue) => {
        setFilter(newValue);
    };
    const openTaskModal=(type)=>{
        modalActions.openTaskModal(type)(dispatch)
    };
    const openLoginModal=()=>{
        modalActions.openLoginModal(true)(dispatch)
    };
    const logout=()=>{
        (new AuthAPI()).logOut();
        setLogin('');
    };
    const showMessage=(message)=>{
        setTimeout(()=>setMessage(message), 700);
        setTimeout(()=>setMessage(''), 5000)
    };

    return (
        <>
            {loaded?
                (<>
                <BottomNavigation value={filter} onChange={handleChange} className={classes.root}>
                    <h3>sort by:</h3>
                    <BottomNavigationAction label="id" value="id" icon={<RestoreIcon />} />
                    <BottomNavigationAction label="username" value="username" icon={<FavoriteIcon />} />
                    <BottomNavigationAction label="email" value="email" icon={<LocationOnIcon />} />
                    <BottomNavigationAction label="status" value="status" icon={<FolderIcon />} />
                    {login?
                        <h3 className={classes.loginButton} onClick={logout}>LOGOUT</h3>
                        :<h3 className={classes.loginButton} onClick={openLoginModal}>SIGN IN</h3>}
                </BottomNavigation>
                <Button
                    className={classes.button}
                    variant="outlined"
                    type="submit"
                    onClick={changeDirection}
                >
                    {buttonText? <ExpandLessIcon/>: <ExpandMoreIcon/>}
                </Button>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Task</TableCell>
                                <TableCell align="right">id</TableCell>
                                <TableCell align="right">username</TableCell>
                                <TableCell align="right">email</TableCell>
                                <TableCell align="right">completed</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tasks.map(task => (
                                <TableRow key={task.id}>
                                    <TableCell component="th" scope="row">{task.text}</TableCell>
                                    <TableCell align="right">{task.id}</TableCell>
                                    <TableCell align="right">{task.username}</TableCell>
                                    <TableCell align="right">{task.email}</TableCell>
                                    <TableCell align="right">
                                    {task.status===0?
                                        <>
                                        {login? <div className={classes.noCompleted} onClick={()=>openTaskModal(task)}>update</div> :<div>not complete</div>}
                                        </>:
                                    (<div className={classes.completed}>completed</div>)
                                    }
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className={classes.pages}>
                    {pages.map((page)=>(
                        <>
                            {page === pageNumber ?
                                <span className={classes.activePageNumber} onClick={() => {
                                    changePage(page)
                                }}>{page}</span>
                                : <span className={classes.pageNumber} onClick={() => {
                                    changePage(page)
                                }}>{page}</span>
                            }
                        </>
                    ))}
                    </div>
                </TableContainer>
                <div className={classes.message} >{message}</div>
                <Button
                    className={classes.button}
                    variant="outlined"
                    onClick={()=>openTaskModal('create')}
                >
                    create new task
                </Button>
                </>)
                : <Loader/>}
            <TaskForm reloadTasks={reloadTasks} showMessage={showMessage}/>
            <LoginForm setLogin={setLogin}/>
        </>
    );
}