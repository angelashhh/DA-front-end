import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import fetchJson from './action.js'
import * as ReactDOM from "react-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function App() {
    const classes = useStyles();
    const [m, setM] = useState("");
    const [n, setN] = useState("");
    const intervals = {m: m, n: n};

    const tradeAndReset = (intervals) => {
        fetchJson('POST', 'http://localhost:8080/intervals', intervals)
        setM("")
        setN("")
    }

    const page = (
    <div className="App">
        <header className="App-header">
            <img src={logo} alt="digital-asset-logo"/>
        </header>
        <form className={classes.root} noValidate autoComplete="off">
            <TextField id="m-input" label="Interval m (min)" onChange={(event) => setM(event.target.value)}/>
            <TextField id="n-input" label="Interval n (min)" onChange={(event) => setN(event.target.value)}/>
            <Button variant="contained" color="primary" onClick={() => tradeAndReset(intervals)}>
                Happy Trading!
            </Button>
        </form>
    </div>
    )

    return page
}

export default App;
