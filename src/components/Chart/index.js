
import { Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    PointElement,
    LineElement,
    Colors,
    Legend,
    RadialLinearScale,
    Filler,
    Tooltip,
} from 'chart.js';
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    PointElement,
    LineElement,
    Colors,
    Legend,
    RadialLinearScale,
    MatrixController, MatrixElement,
    Filler,
    Tooltip
);

export { ChartContainer } from './Container';
