import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import fetchJson from './action.js'
import ResultTable from "./ResultTable";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    List,
    Tooltip
} from "@material-ui/core";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
          margin: theme.spacing(1),
          width: '25ch'},
    },
    help: {
        position: 'fixed',
        bottom: theme.spacing(4),
        right: theme.spacing(4),
    }
}));

const BigTooltip = withStyles((theme) => ({
    tooltip: {
        boxShadow: theme.shadows[1],
        fontSize: 13,
    },
}))(Tooltip);


const App = () => {

    const classes = useStyles();
    const [m, setM] = useState("");
    const [n, setN] = useState("");
    const [results, setResults] = useState();
    const intervals = {m: m, n: n};
    const [prices, setPrices] = useState();

    const getPrices = () => {
        fetchJson('GET', 'http://localhost:8080/prices').then(res => setPrices(res))
    }

    useEffect( () => {
        getPrices()
    }, [])

    const tradeAndReset = async (intervals) => {
        await fetchJson('POST', 'http://localhost:8080/intervals', intervals)
        console.log("price is here", prices)
        fetchJson('GET', 'http://localhost:8080/results').then(res => setResults(res))
    }


    return (
    <div className="App">
        {!results &&
        <header className="App-header">
            <img src={logo} alt="digital-asset-logo"/>
        </header>
        }

        {results &&
        <ResultTable results = {results} prices={prices}/>
        }

        <form className={classes.root} noValidate autoComplete="off">
            <TextField id="m-input" label="m (in minutes)" value={m}
                       onChange={(e) => setM(e.target.value)}/>
            <TextField id="n-input" label="n (in minutes)" value={n}
                       error={parseInt(n) < parseInt(m)}
                       helperText={parseInt(n) < parseInt(m) ? 'n needs to be larger than m' : null}
                       onChange={(e) => setN(e.target.value)}/>
            <Button variant="contained" color="primary" onClick={() => tradeAndReset(intervals)}>
                Happy Trading!
            </Button>
        </form>
        <BigTooltip  title='Results are calculated based on Simple Moving Averages (SMA).
        m and n are intervals in minutes. The system will calculate and compare the average prices from the
        last m and n minutes. If the average price for the last m minutes is higher than that of
        n minutes, buy is executed; otherwise, sell is executed.'>
            <HelpOutlineIcon className={classes.help}/>
        </BigTooltip>
    </div>
    )
}

export default App;
