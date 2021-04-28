import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {withStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
        height: "90%",
    },

    headerRow: {
        backgroundColor: 'lightgrey',
    }
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
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
    if (buyFlag) {return "buy"}
    else {return "sell"}
}

const parsePnl = (pnl) => {
    return parseFloat(pnl).toFixed(4)
}


 const ResultTable = ({rows}) => {
     console.log("rows", rows)
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow className={classes.headerRow}>
                        <StyledTableCell>Trade Number</StyledTableCell>
                        <StyledTableCell align="right">tradeTimestamp</StyledTableCell>
                        <StyledTableCell align="right">buyFlag</StyledTableCell>
                        <StyledTableCell align="right">executedPrice</StyledTableCell>
                        <StyledTableCell align="right">tradeQuantity</StyledTableCell>
                        <StyledTableCell align="right">pnlForCurrTrade</StyledTableCell>
                        <StyledTableCell align="right">netPnl</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows?.map((row) => (
                        <StyledTableRow key={row.tradeNumber}>
                            <StyledTableCell component="th" scope="row">
                                {row.tradeNumber}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.tradeTimestamp}</StyledTableCell>
                            <StyledTableCell align="right">{parseBuyFlag(row.buyFlag)}</StyledTableCell>
                            <StyledTableCell align="right">{row.executedPrice}</StyledTableCell>
                            <StyledTableCell align="right">{row.tradeQuantity}</StyledTableCell>
                            <StyledTableCell align="right">{parsePnl(row.pnlForCurrTrade)}</StyledTableCell>
                            <StyledTableCell align="right">{parsePnl(row.netPnl)}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ResultTable;