import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import fetchJson from './action.js'
import * as ReactDOM from "react-dom";
import ResultButton from "./MainPage";
import ResultTable from "./ResultTable";
import {Grid} from "@material-ui/core";

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

const App = () => {

    const classes = useStyles();
    const [m, setM] = useState("");
    const [n, setN] = useState("");
    const [enableGetResults, setEnableGetResults] = useState(false);
    const [results, setResults] = useState();
    const intervals = {m: m, n: n};

    useEffect(() => {
        console.log("hahahahahahahah", results)
    })

    const tradeAndReset = async (intervals) => {
        await fetchJson('POST', 'http://localhost:8080/intervals', intervals)
        setEnableGetResults(!enableGetResults)
    }

    const getTradeResults = async () => {
        const response = await fetchJson('GET', 'http://localhost:8080/results')
        setResults(response)
        setEnableGetResults(!enableGetResults)
    }

    const changeClass = (results) => {
        return results? classes.bottom : classes.root
    }

    return (
    <div className="App">
        { !results &&
            (<header className="App-header">
            <img src={logo} alt="digital-asset-logo"/>
            </header>)
        }
        {results && <ResultTable rows = {results}/>}
        <form className={classes.root} noValidate autoComplete="off">
            <TextField id="m-input" label="Interval m (min)" value={m}
                       onChange={(e) => setM(e.target.value)}/>
            <TextField id="n-input" label="Interval n (min)" value={n}
                       onChange={(e) => setN(e.target.value)}/>
                <Button variant="contained" color="primary" onClick={() => tradeAndReset(intervals)}>
                    Happy Trading!
                </Button>
                <Button variant="contained" color="primary" onClick={() => getTradeResults()} disabled={!enableGetResults}>
                    Get Results!
                </Button>
        </form>
    </div>
    )
}

export default App;
