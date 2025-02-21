import { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

import CloseIcon from '@mui/icons-material/Close';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import { CHART_TYPES } from 'constants/chart';
import { CHART_AXIS_FIELDS } from 'constants/tickets';


const ChartSetting = ({ gridId, closeAction, updateAction, customStyles, gridConfig: { chartType = '', chartAxis = {}, name = '', chartStacked = 'true' } }) => {
    const [changedConfig, setChangedConfig] = useState({
        isStacked: true,
        axis: {},
        newChartType: '',
        name: ''
    });

    const close = () => {
        setChangedConfig({
            isStacked: true,
            axis: {},
            newChartType: '',
            name: ''
        });
        if(closeAction) closeAction();
    }

    useEffect(() => {
        setChangedConfig({
            isStacked: chartStacked,
            axis: chartAxis,
            newChartType: chartType,
            name
        })
    }, [chartType])

    return (
        <Card className={customStyles}>
            <CardHeader
                className="border-b h-1/12"
                action={
                    <IconButton
                        size="large"
                        aria-label="remove"
                        onClick={close}
                    >
                        <CloseIcon fontSize="small"/>
                    </IconButton>
                }
                title={(
                    <span className="text-base font-bold">{`${gridId} Chart Setting`}</span>
                )}
            />
            <CardContent className="flex flex-col space-y-4 h-5/6">
                <TextField
                    label="Chart Name"
                    value={changedConfig.name}
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    size="small"
                    onChange={(e) => {
                        setChangedConfig({
                            ...changedConfig,
                            name: e.target.value,
                        });
                    }}
                />
                <FormControl sx={{ minWidth: 120 }} size="small">
                    <InputLabel id="chartTypeLabel">Chart Type</InputLabel>
                    <Select
                        labelId="chartTypeLabel"
                        label="Chart Type"
                        id="chart-type-select"
                        value={changedConfig.newChartType}
                        onChange={(e) => {
                            setChangedConfig({
                                ...changedConfig,
                                newChartType: e.target.value,
                            })
                        }}
                    >
                        {
                            CHART_TYPES.map((chartConfig) => (
                                <MenuItem
                                    key={`menu-item-${chartConfig.text}`}
                                    value={chartConfig.type}
                                >
                                    {chartConfig.text}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                {
                    ['Bar', 'Area'].includes(changedConfig.newChartType) ? (
                        <FormControl sx={{ minWidth: 120 }} size="small">
                            <InputLabel id="isStackedLabel">Stackable</InputLabel>
                            <Select
                                labelId="isStackedLabel"
                                label="Stackable"
                                id="Stackable-select"
                                value={changedConfig.isStacked}
                                onChange={(e) => {
                                    setChangedConfig({
                                        ...changedConfig,
                                        isStacked: e.target.value,
                                    })
                                }}
                            >
                                <MenuItem value={true}>Stacked</MenuItem>
                                <MenuItem value={false}>Unstacked</MenuItem>
                            </Select>
                        </FormControl>
                    ) : null
                }
                <FormControl sx={{ minWidth: 120 }} size="small">
                    <InputLabel id="Aggregationlabel">Aggregation</InputLabel>
                    <Select
                        labelId="Aggregationlabel"
                        label="Aggregation"
                        id="aggregation-select"
                        value={'count'}
                    >
                        <MenuItem value='count'>Count</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 120 }} size="small">
                    <InputLabel id="horizontalFieldLabel">Horizontal Axis</InputLabel>
                    <Select
                        labelId="horizontalFieldLabel"
                        label="Horizontal Axis"
                        id="horizontal-select"
                        value={changedConfig?.axis?.x || ''}
                        onChange={(e) => {
                            setChangedConfig({
                                ...changedConfig,
                                axis: {
                                    ...changedConfig.axis,
                                    x: e.target.value,
                                }
                            });
                        }}
                    >
                        {
                            CHART_AXIS_FIELDS.map((f) => (
                                <MenuItem key={f.key} value={f.key}>{f.name}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                {
                    !['Matrix', 'Pie', 'Doughnut'].includes(changedConfig.newChartType) ? (
                        <FormControl sx={{ minWidth: 120 }} size="small">
                            <InputLabel id="breakdownFieldLabel">Breakdown</InputLabel>
                            <Select
                                labelId="breakdownFieldLabel"
                                label="Breakdown"
                                id="breakdown-field-select"
                                value={changedConfig?.axis?.dataset || ''}
                                onChange={(e) => {
                                    setChangedConfig({
                                        ...changedConfig,
                                        axis: {
                                            ...changedConfig.axis,
                                            dataset: e.target.value,
                                        }
                                    });
                                }}
                            >
                                {
                                    CHART_AXIS_FIELDS.map((f) => (
                                        <MenuItem key={f.key} value={f.key}>{f.name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    ) : null
                }
                {
                    ['Matrix'].includes(changedConfig.newChartType) ? (
                        <FormControl sx={{ minWidth: 120 }} size="small">
                            <InputLabel id="VerticalFieldlabel">Vertical Axis</InputLabel>
                            <Select
                                labelId="VerticalFieldlabel"
                                label="Vertical Axis"
                                id="vertical-select"
                                value={changedConfig?.axis?.y || ''}
                                onChange={(e) => {
                                    setChangedConfig({
                                        ...changedConfig,
                                        axis: {
                                            ...changedConfig.axis,
                                            y: e.target.value,
                                        }
                                    });
                                }}
                            >
                                {
                                    CHART_AXIS_FIELDS.map((f) => (
                                        <MenuItem key={f.key} value={f.key}>{f.name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    ) : null
                }
            </CardContent>
            <CardActions className="h-1/12">
                <Button
                    role={undefined}
                    size="medium"
                    variant="outlined"
                    color="primary"
                    onClick={close}
                    startIcon={<CloseIcon />}
                >
                    Dismiss
                </Button>
                <Button
                    role={undefined}
                    size="medium"
                    variant="contained"
                    color="primary"
                    disabled={!changedConfig?.axis?.x && !changedConfig?.axis?.y}
                    onClick={() => {
                        if (updateAction) updateAction({ gridId, changedConfig });
                    }}
                    startIcon={<PlayArrowIcon />}
                >
                    Update
                </Button>
            </CardActions>
        </Card>
    );

};

ChartSetting.propTypes = {
    gridId: PropTypes.string,
    closeAction:  PropTypes.func,
    updateAction:  PropTypes.func,
    customStyles: PropTypes.string,
    chartType:  PropTypes.string,
    chartAxis: PropTypes.object,
}

export default ChartSetting;