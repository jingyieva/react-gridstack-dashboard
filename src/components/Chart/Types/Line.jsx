import { Line } from 'react-chartjs-2';
// import ChartDataLabels from 'chartjs-plugin-datalabels';
import * as R from 'ramda'

export default {
    component: (props) => <Line {...props} />,
    formatData: ({ datas, label, xAxis, isArea, style }) => {
        let datasets = [];

        if (datas && datas.length > 0) {
            const isNeedExtend = datas.every((d) => R.is(Object, d));
            if (isNeedExtend) {
                datasets = datas.map(({ datas, label }) => ({
                    data: datas,
                    fill: isArea ? 'origin' : false,
                    label,
                }))
            } else {
                datasets = [
                    {
                        data: datas,
                        fill: isArea ? 'origin' : false,
                        label,
                    },
                ];
            }
        }

        return {
            datasets,
            labels: xAxis,
        };
    },

    options: {
        maintainAspectRatio: false,
        plugins: {
            datalabels: {
                formatter: (value, context) => value,
            },
        },
        scales: {
            x: {
                ticks: {
                    autoSkip: false,
                },
            },
            y: {
                ticks: {
                    autoSkip: false,
                    precision: 0,
                    beginAtZero: true,
                },
            },
        },
    },
    // plugins: [ChartDataLabels],
};
