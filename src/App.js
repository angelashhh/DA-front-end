import logo from './logo.svg';
import _ from 'lodash';
import './App.css';
import React, {useEffect, useState} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import fetchJson from './action.js'
import * as ReactDOM from "react-dom";
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
import TradingDialog from "./Dialog";

const useStyles = makeStyles((theme) => ({
    root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    },
    bottom: {
      position: 'absolute',
      bottom: 0,
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    }
}));

const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
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
        console.log("price is there", prices)
        fetchJson('GET', 'http://localhost:8080/results').then(res => setResults(res))
    }


    return (
    <div className="App">
        {!results && (<header className="App-header">
        <img src={logo} alt="digital-asset-logo"/>
        </header>)}
        {results &&
        <ResultTable results = {results} prices={prices}/>
        }
        <form className={classes.root} noValidate autoComplete="off">
            <TextField id="m-input" label="m (in minutes)" value={m}
                       onChange={(e) => setM(e.target.value)}/>
            <TextField id="n-input" label="n (in minutes)" value={n}
                       onChange={(e) => setN(e.target.value)}/>
            <LightTooltip title='Results are calculated using Simple Moving Averages (SMA)'>
                <Button variant="contained" color="primary" onClick={() => tradeAndReset(intervals)}>
                    Happy Trading!
                </Button>
            </LightTooltip>
        </form>
    </div>
    )
}

export default App;
