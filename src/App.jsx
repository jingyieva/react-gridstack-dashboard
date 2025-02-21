
// import 'gridstack/dist/gridstack-extra.css';
import 'gridstack/dist/gridstack.min.css';
import Dashboard from 'views/Dashboard';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'

function App() {

    return (
        <LocalizationProvider dateAdapter={AdapterLuxon}>
            <Dashboard />
        </LocalizationProvider>
    )
};

export default App;
