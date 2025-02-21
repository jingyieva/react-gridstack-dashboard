import { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';
import * as R from 'ramda';

import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

// icons
import Add from '@mui/icons-material/Add';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RefreshIcon from '@mui/icons-material/Refresh';
// constants
import { CHART_TYPES } from 'constants/chart';
import { MOCK_DATAS } from 'constants/tickets';

import { generateTimesMatrixData } from 'utils/times';

// components
import Header from "layouts/Header";
import { GridstackItem, GridstackProvider, GridCard } from 'components/GridStack';
import { ChartContainer } from 'components/Chart';

// views
import ChartSetting from './ChartSetting';
import AddFilterCondtionPanel from './FilterPanel';

function getRandom(max, len = 1){
    const res = [];
    if (len === 1) {
        return Math.floor(Math.random() * max) + 1;
    }

    for(let i = 0 ; i < len; i ++) {
        res.push(Math.floor(Math.random() * max) + 1 )
    }
    return res;
};

const genMatrixData = (x, y) => {
    const res = [];

    x.forEach((i) => {
        y.forEach((j) => {
            res.push({
                x: i,
                y: j,
                v: getRandom(40),
            });
        })
    });

    return res;
}

const AddChart = ({ gridId, handleChoose }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = (chartType) => {
        if (chartType && handleChoose) handleChoose({ chartType, gridId });
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                id="add-chart-button"
                size="large"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <AddCircleOutline size="large" />
            </IconButton>
            <Menu
                id="chart-type-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => handleClose()}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {
                    CHART_TYPES.map((chartConfig) => (
                        <MenuItem
                            key={`menu-item-${chartConfig.text}`}
                            onClick={() => handleClose(chartConfig.type)}
                        >
                            <>
                                {chartConfig.text}
                            </>
                        </MenuItem>
                    ))
                }
            </Menu>
        </div>
    );
}

const Dashboard = () => {
    const [stackItems, setStackItems] = useState([]);
    const [stackItemCount, setStackItemCount] = useState(0);
    const [openChartSetting, setOpenChartSetting] = useState(false);
    const [dates, setDates] = useState({
        start_date: DateTime.now().set({ hours: 0, minutes: 0, seconds: 0 }).toSeconds(),
        end_date: DateTime.now().toSeconds(),
    });
    const [curEditingGrid, setCurEditingGrid] = useState({});
    const [querys, setQuerys] = useState({});

    // 處理位置變更
    const handlePositionChange = useCallback((newPositions) => {
        setStackItems(prev => {
            // 只有當位置真的改變時才更新
            const hasChanges = newPositions.some(newPos => {
                const oldItem = prev.find(item => item.id === newPos.id);
                return !oldItem ||
                        oldItem.x !== newPos.x ||
                        oldItem.y !== newPos.y ||
                        oldItem.w !== newPos.w ||
                        oldItem.h !== newPos.h;
            });

            if (!hasChanges) return prev;

            return prev.map(item => {
                const newPos = newPositions.find(pos => pos.id === item.id);
                if (newPos) {
                    return { ...item, ...newPos };
                }
                return item;
            });
        });
    }, []);

    const handleChooseChart = ({ gridId, chartType }) => {
        // set chart type
        setStackItems(stackItems.map(item => {

            if (item.id === gridId) {
                return {
                    ...item,
                    chartType,
                };
            }
            return item;
        }));
        setCurEditingGrid({
            id: gridId,
            name: stackItems.find((g) => g.id === gridId)?.name,
            chartType,
            // chartAxis: stackItems.find((g) => g.id === gridId)?.axis,
        });
        setOpenChartSetting(true);
    };

    const updateChartSetting = ({ gridId, changedConfig }) => {
        const { newChartType, isStacked, axis, name } = changedConfig;
        let temp = {}
        let scaleConfig = {};
        // TODO get chart data from api in the future (with axis, oid?, filter conds)
        switch (newChartType) {
            case 'Area':
            case 'Bar':
            case 'Line':
            case 'Radar':
                temp = {
                    xAxis: MOCK_DATAS[axis.x],
                    datas: axis.dataset ? MOCK_DATAS[axis.dataset].map((v) => ({
                        datas: getRandom(40, MOCK_DATAS[axis.x].length),
                        label: v
                    })) : getRandom(40, MOCK_DATAS[axis.x].length),
                    label: 'Demo chart',
                    isArea: ['Area', 'Radar'].includes(newChartType)
                }
                scaleConfig = {
                    scales: {
                        x: {
                            stacked: isStacked
                        },
                        y: {
                            stacked: isStacked
                        }
                    }
                }
                break;
            case 'Pie':
            case 'Doughnut':
                temp = {
                    xAxis: MOCK_DATAS[axis.x],
                    datas: getRandom(40, MOCK_DATAS[axis.x].length),
                }
                break;
            case 'Matrix':
                temp = {
                    datas:  genMatrixData(MOCK_DATAS[axis.x], MOCK_DATAS[axis.y]),
                };
                scaleConfig = {
                    scales: {
                        x: {
                            type: 'category',
                            labels: MOCK_DATAS[axis.x],
                            ticks: {
                                stepSize: 1
                              },
                              grid: {
                                display: false
                              }
                        },
                        y: {
                            type: 'category',
                            labels: MOCK_DATAS[axis.y],
                            offset: true,
                            ticks: {
                                stepSize: 1
                              },
                              grid: {
                                display: false
                              }
                        }
                    }
                }
                break;
            default:
                return null;
        }

        // set data
        setStackItems(stackItems.map(item => {
            if (item.id === gridId) {
                return {
                    ...item,
                    name: name,
                    chartType: newChartType,
                    chartData: temp,
                    chartAxis: axis,
                    chartStacked: isStacked,
                    chartOptions: scaleConfig
                };
            }
            return item;
        }));
        setOpenChartSetting(false);
    }

    const renderChart = (item) => {
        if (!item.chartType || !item.chartData) return null;
        console.log(item)
        return (
            <ChartContainer
                type={item.chartType}
                data={item.chartData}
                filled={['Area', 'Radar'].includes(item.chartType)}
                options={item.chartOptions}
            />
        );
    };

    return (
        <div>
            <Header>
                <DateTimePicker
                    label="Start Date"
                    slotProps={{ textField: { size: 'small' } }}
                    value={DateTime.fromSeconds(dates.start_date)}
                    format="yyyy/MM/dd HH:mm"
                    onChange={(e) => {
                        setDates({
                            ...dates,
                            start_date: e.ts / 1000,
                        })
                    }}
                />
                <ArrowForwardIcon />
                <DateTimePicker
                    label="End Date"
                    slotProps={{ textField: { size: 'small' } }}
                    value={DateTime.fromSeconds(dates.end_date)}
                    format="yyyy/MM/dd HH:mm"
                    onChange={(e) => {
                        setDates({
                            ...dates,
                            end_date: e.ts / 1000,
                        })
                    }}
                />
                <AddFilterCondtionPanel
                    setCondition={({ field, value }) => {
                        setQuerys({
                            ...querys,
                            [`${field}`]: value,
                        })
                    }}
                />
                <Button
                    role={undefined}
                    size="medium"
                    variant="contained"
                    color="primary"
                    onClick={() => {}}
                    startIcon={<RefreshIcon />}
                >
                    Refresh
                </Button>
                <Button
                    variant="contained"
                    role={undefined}
                    size="medium"
                    color="primary"
                    onClick={() => {
                        const curCount = stackItemCount + 1;
                        setStackItems([
                            ...stackItems,
                            {
                                id: `dashboard-grid-item-${curCount}`,
                                name: `dashboard-grid-item-${curCount}`,
                                h: 4,
                                w: 4,
                            },
                        ]);
                        setStackItemCount(curCount);
                    }}
                    startIcon={<Add />}
                >
                    Add Grid
                </Button>
            </Header>

            <Collapse in={Object.keys(querys).length > 0}>
                <div className="px-2 pt-2 pb-4 space-y-4 border-b border-gray">
                    <div>
                        <Stack direction="row" spacing={1}>
                        {
                            Object.keys(querys).map((k) => (
                                <Chip
                                    key={k}
                                    color="primary"
                                    variant="outlined"
                                    label={`${k}: ${querys[k]}`}
                                    onDelete={() => {
                                        const temp = {...querys};
                                        delete temp[k];
                                        setQuerys(temp);
                                    }}
                                />
                        ))}
                        </Stack>
                    </div>
                </div>
            </Collapse>
            <div className="flex">
                <div className="flex-1">
                    <GridstackProvider
                        items={stackItems}
                        onPositionChange={handlePositionChange}
                    >
                        {stackItems?.map((widget) => {
                            if (!widget.id) {
                                return null;
                            }

                            return (
                                <GridstackItem key={widget.id} id={widget.id}>
                                    <GridCard
                                        id={widget.id}
                                        title={widget.name}
                                        headerAction={(id) => {
                                            setStackItems(stackItems.reduce((prev, cur) => {
                                                if (cur.id !== id) {
                                                    return ([
                                                        ...prev,
                                                        cur,
                                                    ]);
                                                }
                                                return prev;
                                            }, []))
                                        }}
                                        actionConfig={[{
                                            key: 'edit',
                                            name: 'Edit',
                                            isHide: (id) => {
                                                const { chartData } = stackItems.find((g) => g.id === id);
                                                return R.isNil(chartData);
                                            },
                                            action: (id) => {
                                                const { chartType,
                                                    chartAxis,
                                                    name,
                                                    chartStacked
                                                } = stackItems.find((g) => g.id === id);

                                                setCurEditingGrid({
                                                    id,
                                                    name,
                                                    chartStacked,
                                                    chartType,
                                                    chartAxis
                                                });
                                                setOpenChartSetting(true);
                                            }
                                        }, {
                                            key: 'remove',
                                            name: 'Remove',
                                            action: (id) => {
                                                setStackItems(stackItems.reduce((prev, cur) => {
                                                    if (cur.id !== id) {
                                                        return ([
                                                            ...prev,
                                                            cur,
                                                        ]);
                                                    }
                                                    return prev;
                                                }, []));
                                                if(openChartSetting) setOpenChartSetting(false);
                                            }
                                        }]}
                                        emptyElement={(
                                            <AddChart
                                                gridId={widget.id}
                                                handleChoose={handleChooseChart}
                                            />
                                        )}
                                    >
                                        {renderChart(widget)}
                                    </GridCard>
                                </GridstackItem>
                            );
                        })}
                    </GridstackProvider>
                </div>
                <Drawer
                    anchor={'right'}
                    open={openChartSetting}
                    onClose={() => {
                        setOpenChartSetting(false);
                    }}
                    variant="temporary"
                    ModalProps={{
                        keepMounted: false,
                    }}
                >
                    <ChartSetting
                        gridId={curEditingGrid.id}
                        gridConfig={curEditingGrid}
                        customStyles="w-96 h-full flex flex-col justify-between !shadow-none"
                        closeAction={() => {
                            setOpenChartSetting(false);
                        }}
                        updateAction={updateChartSetting}
                    />
                </Drawer>
            </div>
        </div>
    );
};

AddChart.propTypes = {
    gridId: PropTypes.string,
    handleChoose: PropTypes.func,
}





export default Dashboard;
