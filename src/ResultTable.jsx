import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
    Accordion, AccordionDetails,
    AccordionSummary,
    Box,
    Container,
    FormControlLabel,
    Grid,
    Switch,
    TextField, Typography,
    withStyles
} from "@material-ui/core";
import logo from "./logo.svg";
import Button from "@material-ui/core/Button";
import PriceDiagram from "./PriceDiagram";
import TradeDiagram from "./TradeDiagram";

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

const ResultSummary = ({classes, results}) => {
    console.log("tradeNumber", results[results.length-1]?.tradeNumber)
    return (
        <div style={{paddingBottom: 10}}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography variant="subtitle2" gutterBottom>Quick Summary</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TextField style={{marginRight: 10}} disabled id="tradeNumber" size="small"
                               label="Total Trade Number"  variant="outlined"
                               value={results[results.length-1]?.tradeNumber}
                    />
                    <TextField disabled id="netPnL"  size="small" label="Net PnL" variant="outlined"
                               value={parseFloat(results[results.length-1]?.netPnl).toFixed(4)}
                    />
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

const ResultTable = ({results, prices}) => {
    // console.log("results", results)
    const classes = useStyles();
    const [openDiagram, setOpenDiagram] = useState(false);

    return (
        <div style={{padding: 20}}>
            <Box display="flex" style={{ width: '100%'}}>
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
            <PriceDiagram prices={prices} />
            }

            <TradeDiagram trades={results} />

            <ResultSummary classes={classes} results={results} />
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
                        {results?.map((r) => (
                            <StyledTableRow key={results.tradeNumber}>
                                <StyledTableCell scope="row">{r.tradeNumber}</StyledTableCell>
                                <StyledTableCell align="left">{r.tradeTimestamp}</StyledTableCell>
                                <StyledTableCell align="left">{parseBuyFlag(r.buyFlag)}</StyledTableCell>
                                <StyledTableCell align="left">{r.executedPrice}</StyledTableCell>
                                <StyledTableCell align="left">{r.tradeQuantity}</StyledTableCell>
                                <StyledTableCell align="left">{parsePnl(r.pnlForCurrTrade)}</StyledTableCell>
                                <StyledTableCell align="left">{parsePnl(r.netPnl)}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default ResultTable;