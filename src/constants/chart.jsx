import LineChart  from '@mui/icons-material/LineAxis';
import PieChart  from '@mui/icons-material/PieChart';
import BarChart  from '@mui/icons-material/BarChart';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
export const CHART_TYPES = [
    {
        type: 'Bar',
        text: 'Bar',
        icon: <BarChart />
    },
    {
        type: 'Line',
        text: 'Line',
        icon: <LineChart />
    },
    {
        type: 'Area',
        text: 'Area',
        icon: <LineChart />
    },
    {
        type: 'Pie',
        text: 'Pie',
        icon: <PieChart />
    },
    {
        type: 'Doughnut',
        text: 'Doughnut',
        icon: <DonutLargeIcon />
    },
    {
        type: 'Radar',
        text: 'Radar',
    },
    {
        type: 'Matrix',
        text: 'Matrix',
    },

];