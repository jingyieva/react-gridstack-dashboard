import { Doughnut } from 'react-chartjs-2';
// import ChartDataLabels from 'chartjs-plugin-datalabels';
import * as R from 'ramda'

export default {
    component: (props) => <Doughnut {...props} />,
    formatData: ({ datas, label, xAxis, isArea, style }) => {
        let datasets = [];

        if (datas && datas.length > 0) {
            const isNeedExtend = datas.every((d) => R.is(Object, d));
            if (isNeedExtend) {
                datasets = datas.map(({ datas, label }) => ({
                    data: datas,
                    label,
                }))
            } else {
                datasets = [
                    {
                        data: datas,
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
        // scales: {
        //     x: {
        //         ticks: {
        //             autoSkip: false,
        //         },
        //     },
        //     y: {
        //         ticks: {
        //             autoSkip: false,
        //             precision: 0,
        //             beginAtZero: true,
        //         },
        //     },
        // },
    },
    // plugins: [ChartDataLabels],
};
