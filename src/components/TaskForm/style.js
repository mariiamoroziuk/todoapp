import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({

    paper: {
        marginTop: theme.spacing(7),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    button: {
        marginTop: 50,
        marginLeft: 40,
        color: 'green'
    },
}));
