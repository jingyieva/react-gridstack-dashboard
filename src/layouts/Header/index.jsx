import Typography from '@mui/material/Typography';

const Header = ({ children }) => {


    return (
        <div className="box-border flex justify-start p-4 w-screen border-b border-gray">
            <div className="flex justify-center items-center h-100 space-x-1">
                {children}
            </div>
        </div>
    );
};

export default Header;