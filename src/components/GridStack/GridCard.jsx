import { useState } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import MoreVert from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export const GridContainer = ({
    id = '',
    title = '',
    actionConfig = [],
    children,
    emptyElement,
}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Card className={`h-full`}>
            <CardHeader
                className="grid-draggable hover:bg-gray-300 !p-1 border-b text-center cursor-move"
                action={
                    <>
                        <IconButton
                            size="large"
                            aria-label="remove"
                            onClick={(event) => {
                                setAnchorEl(event.currentTarget);
                            }}
                        >
                            <MoreVert fontSize="small"/>
                        </IconButton>
                        <Menu
                            id="chart-type-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            {
                                actionConfig?.map((actionConfig) => {
                                    let isHide = false;

                                    if(R.is(Function, actionConfig.isHide)) {
                                        isHide = actionConfig.isHide(id);
                                    } else {
                                        isHide = actionConfig.isHide;
                                    }


                                    return (!isHide ? (
                                        <MenuItem
                                            key={`menu-item-${actionConfig.key}`}
                                            onClick={() => {
                                                actionConfig.action(id);
                                                setAnchorEl(null);
                                            }}
                                        >
                                            {actionConfig.name}
                                        </MenuItem>
                                    ) : null);
                                })
                            }
                        </Menu>
                    </>
                }
                title={(
                    <span className="text-base">{title}</span>
                )}
            />
            <CardContent className="h-[88%] flex justify-center items-center">
                {
                    children ? children : emptyElement
                }
            </CardContent>
        </Card>
    );
};

GridContainer.propTypes = {
    id:  PropTypes.string,
    title: PropTypes.string,
    actionConfig: PropTypes.array,
    children: PropTypes.node,
    emptyElement: PropTypes.node,
}