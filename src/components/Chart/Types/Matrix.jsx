import { Chart } from 'react-chartjs-2';
// import ChartDataLabels from 'chartjs-plugin-datalabels';

import * as helpers from 'chart.js/helpers';
export default {
    component: (props) => <Chart type="matrix" {...props} />,
    formatData: ({ datas }) => {
        let datasets = [];
        if (datas && datas.length > 0) {

            datasets = [
                {
                    data: datas,
                    backgroundColor(context) {
                        const value = context.dataset.data[context.dataIndex].v;
                        const alpha = (value - 5) / 30;
                        return helpers.color({ r: 25, g:118, b:210 }).alpha(alpha).rgbString();
                    },
                    borderColor(context) {
                        const value = context.dataset.data[context.dataIndex].v;
                        const alpha = (value - 5) / 30;
                        return helpers.color({ r: 29, g:70, b:110 }).alpha(alpha).rgbString();
                    },
                    width: ({chart}) => (chart.chartArea || {}).width / chart.scales.x.ticks.length - 3,
                    height: ({chart}) =>(chart.chartArea || {}).height / chart.scales.y.ticks.length - 3
                },
            ];
        }

        return {
            datasets,
        };
    },

    options: {
        maintainAspectRatio: false,
        plugins: {
            datalabels: {
                formatter: (value, context) => value,
            },
            legend: false,
            tooltip: {
                callbacks: {
                  title() {
                    return '';
                  },
                  label(context) {
                    const v = context.dataset.data[context.dataIndex];
                    return ['x: ' + v.x, 'y: ' + v.y, 'v: ' + v.v];
                  }
                }
              }
        },
        scales: {
            x: {
                ticks: {
                  stepSize: 1
                },
                grid: {
                  display: false
                }
              },
              y: {
                offset: true,
                ticks: {
                  stepSize: 1
                },
                grid: {
                  display: false
                }
              }
        }
    },
    // plugins: [ChartDataLabels],
};
