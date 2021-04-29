import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Box, Container, FormControlLabel, Switch, withStyles} from "@material-ui/core";
import logo from "./logo.svg";
import Button from "@material-ui/core/Button";
import ResultDiagrams from "./ResultDiagrams";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
        height: "90%",
    },

    headerRow: {
        backgroundColor: 'lightgrey',
    },

    title: {
        color: 'primary',
        padding: theme.spacing(1),
    },

    logoInTable: {
        height: '30px',
    }
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const parseBuyFlag = (buyFlag) => {
    if (buyFlag) {return "Buy"}
    else {return "Sell"}
}

const parsePnl = (pnl) => {
    return parseFloat(pnl).toFixed(4)
}


 const ResultTable = ({rows, prices}) => {
     console.log("rows", rows)
    const classes = useStyles();
    const [openDiagram, setOpenDiagram] = useState(false);

    return (
        <div style={{padding: 20}}>
            <Box display="flex" style={{ width: '100%', paddingBottom: 20 }}>
                <Box display="flex" p={1} flexGrow={1}>
                    <img src={logo} className={classes.logoInTable}/>
                </Box>
                <Box display="flex" p={1}>
                    <FormControlLabel
                        control={<Switch size="small" checked={openDiagram} onChange={() => setOpenDiagram(!openDiagram)}
                                         name="showPrices" color="primary"/>}
                        label="Show Prices"/>
                </Box>
            </Box>

            {openDiagram &&
            <ResultDiagrams prices={prices}/>
            }

            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow className={classes.headerRow}>
                            <StyledTableCell>Trade No.</StyledTableCell>
                            <StyledTableCell align="left">Trade Time</StyledTableCell>
                            <StyledTableCell align="left">Position</StyledTableCell>
                            <StyledTableCell align="left">Trade Price</StyledTableCell>
                            <StyledTableCell align="left">Quantity</StyledTableCell>
                            <StyledTableCell align="left">Pnl Curr</StyledTableCell>
                            <StyledTableCell align="left">Net PnL</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows?.map((row) => (
                            <StyledTableRow key={row.tradeNumber}>
                                <StyledTableCell scope="row">{row.tradeNumber}</StyledTableCell>
                                <StyledTableCell align="left">{row.tradeTimestamp}</StyledTableCell>
                                <StyledTableCell align="left">{parseBuyFlag(row.buyFlag)}</StyledTableCell>
                                <StyledTableCell align="left">{row.executedPrice}</StyledTableCell>
                                <StyledTableCell align="left">{row.tradeQuantity}</StyledTableCell>
                                <StyledTableCell align="left">{parsePnl(row.pnlForCurrTrade)}</StyledTableCell>
                                <StyledTableCell align="left">{parsePnl(row.netPnl)}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default ResultTable;