import {useState} from "react";
import ReactApexChart from "react-apexcharts";

const TradeDiagram = ({trades}) => {
    const parseTradePrice = (trade) => {return [trade.tradeTimeInMilliSecond, trade.executedPrice]}
    const getTradePriceAgainstTime = (buyFlag) => {
        let tradesForPosition = []
        trades.map(t => {
            if (t.buyFlag === buyFlag) {tradesForPosition.push(parseTradePrice(t))}
        })
        return tradesForPosition;
    }

    // useEffect( () => {
    //     parseTradePrices()
    //     console.log('show buy prices', buyPricesAgainstTime)
    //     console.log('show sell prices', sellPricesAgainstTime)
    // }, [trades])

        const state = {

            series: [{
                name: 'Buy Trade',
                data: getTradePriceAgainstTime(true)
            },
                {
                    name: 'Sell Trade',
                    data: getTradePriceAgainstTime(false)
                },
            ],
            options: {
                chart: {
                    height: 14,
                    type: 'scatter',
                    zoom: {
                        type: 'xy'
                    }
                },
                dataLabels: {
                    enabled: false
                },
                grid: {
                    xaxis: {
                        lines: {
                            show: true
                        }
                    },
                    yaxis: {
                        lines: {
                            show: true
                        }
                    },
                },
                xaxis: {
                    type: 'datetime',
                },
                yaxis: {
                    min: 3,
                    max: 15
                }
            },


        };

        return (
            <div id="chart">
                <ReactApexChart options={state.options} series={state.series} type="scatter" height={300} />
            </div>
        );
}

export default TradeDiagram;
