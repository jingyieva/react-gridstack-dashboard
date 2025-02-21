import PropTypes from 'prop-types';
import { useRef } from 'react';

import { chart as chartType } from 'components/Chart/Types'

export const ChartContainer = ({
    type,
    data,
    options = {},
}) => {
    const chartConf = chartType[type];
    const DisplayChart = chartConf.component;
    const dueData = chartConf.formatData(data);
    const chartRef = useRef(null);

    return (
        <>
            <DisplayChart
                ref={chartRef}
                data={dueData}
                options={{
                    ...chartConf.options,
                    ...options,
                }}
                plugins={chartConf.plugins ? chartConf.plugins : []}
            />
        </>
    );
};

ChartContainer.propTypes = {
    type: PropTypes.string,
    data: PropTypes.object,
    options: PropTypes.object,
    filled: PropTypes.bool,
};