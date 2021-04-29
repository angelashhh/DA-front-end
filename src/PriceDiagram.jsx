import React  from 'react'
import ReactHighcharts from 'react-highcharts/ReactHighstock.src'
import moment from 'moment'

const PriceDiagram = ({prices}) => {
    let pricesAgainstTime = [];
    const getPricesAgainstTime = (p) => {return [p.timeInMilliSeconds, p.price]}
    const parsePrices = () => {
        prices.map(p => pricesAgainstTime.push(getPricesAgainstTime(p)))
        return pricesAgainstTime
    }
        const options = {style: 'currency', currency: 'USD'};
        const numberFormat = new Intl.NumberFormat('en-US', options);
        const configPrice = {

            yAxis: [{
                opposite: false,
                offset: 0,
                labels: {
                    formatter: function () {return numberFormat.format(this.value)},
                    x: -15,
                    style: {"color": "#000", "position": "absolute"},
                    align: 'right'
                },
            },

            ],
            tooltip: {
                shared: true,
                formatter: function () {
                    return numberFormat.format(this.y, 0) +  '</b><br/>' + moment(this.x).format('MMMM Do YYYY, h:mm')
                }
            },
            plotOptions: {
                series: {
                    showInNavigator: true,
                    gapSize: 6,
                }
            },
            rangeSelector: {
                buttons: [{
                    type: 'day',
                    count: 1,
                    text: '1d',
                }, {
                    type: 'day',
                    count: 7,
                    text: '7d'
                }, {
                    type: 'month',
                    count: 1,
                    text: '1m'
                }, {
                        type: 'all',
                        text: 'All'
                    }],
                selected: 4
            },
            series: [{
                name: 'Price',
                type: 'spline',

                data: parsePrices(),
                tooltip: {
                    valueDecimals: 4
                },

            }
            ]
        };
        return (
            <div style={{padding: 10}}>
                <ReactHighcharts config = {configPrice}></ReactHighcharts>
            </div>
        )
}

export default PriceDiagram;