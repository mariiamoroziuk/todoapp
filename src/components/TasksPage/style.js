import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({

    root: {
        marginTop: 20,
        width: '100%',
        backgroundColor: '#DCDCDC',
    },
    button: {
        width: '100%',
        marginTop: 20,
        marginBottom: 20,
        height: 50
    },
    completed: {
        color: 'red'
    },
    noCompleted: {
        '&:hover': {
            cursor: 'pointer',
            color: 'blue'
        },
    },
    pageNumber: {
        margin: 5,
        '&:hover': {
            cursor: 'pointer',
            color: 'blue'
        },
    },
    activePageNumber: {
        color: 'blue',
        fontSize: 20
    },
    message: {
        color: 'lightgrey',
        backgroundColor: 'blue',
        position: 'absolute',
        borderRadius: 4,
        top: 550,
        right: 300,
        fontSize: 30
    },
    pages: {
        margin: 20,
    },
    loginButton:{
        marginLeft: 0,
        '&:hover': {
            cursor: 'pointer',
            color: 'blue'
        },
    },
}));
