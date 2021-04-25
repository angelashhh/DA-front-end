import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import fetchJson from './action.js'

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
const intervals = {m: 2, n: 5}
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="digital-asset-logo" />
      </header>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="m-input" label="Interval m (min)" onChange={(event) => setM(event.target.value)}/>
        <TextField id="n-input" label="Interval n (min)" onChange={(event) => setN(event.target.value)}/>
        <Button variant="contained" color="primary" onClick={() => {fetchJson('POST', '/intervals', intervals)}}>
            Happy Trading!
        </Button>
      </form>
    </div>
  );
}

export default App;
