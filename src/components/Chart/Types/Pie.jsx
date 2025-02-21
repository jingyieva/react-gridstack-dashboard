import { Pie } from 'react-chartjs-2';
// import ChartDataLabels from 'chartjs-plugin-datalabels';
// import PiechartOutlabels from 'chartjs-plugin-piechart-outlabels';

// constant
// import { CHART_COLORS } from 'constants/chartConf';

export default {
    component: (props) => <Pie {...props} />,
    formatData: ({ datas, xAxis, backgroundColor, outlabelsDisplay }) => ({
        datasets: [
            {
                data: datas,
                // backgroundColor: backgroundColor || CHART_COLORS,
                // outlabels: {
                //     display: (ctx) => {
                //         // hide categorys which have no data
                //         if (outlabelsDisplay) {
                //             const { dataIndex, dataset: { data } } = ctx;
                //             return data[dataIndex] > 0;
                //         }
                //         return false;
                //     },
                //     text: '%l: %v (%p)', // label: value (percentage)
                //     borderRadius: 5,
                //     font: {
                //         minSize: 15,
                //         maxSize: 18,
                //     },
                // },
            },
        ],
        labels: xAxis,
    }),
    options: {
        maintainAspectRatio: false,
        plugins: {
            datalabels: {
                formatter: (value) => value,
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const percent = ((context.raw
                                / context.dataset.data.reduce((partialSum, cur) => partialSum + cur, 0)) * 100);
                        return `${context.label} : ${context.formattedValue} (${Math.round(percent)}%)`;
                    },
                },
            },
        },
    },
    plugins: [
        // ChartDataLabels,
    ],
};
