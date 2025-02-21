import { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

import Add from '@mui/icons-material/Add';
import { FILTER_FIELDS, MOCK_DATAS } from 'constants/tickets';

const AddFilterCondtionPanel = ({ setCondition }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [field, setField] = useState('');
    const [fieldValue, setFieldValue] = useState('');
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setField('');
        setFieldValue('');
    };

    const renderValueElement = (fieldConf) => {
        switch (fieldConf.type) {
            case 'Select':
                return (
                    <>
                        <InputLabel id="fieldlabel">Value</InputLabel>
                        <Select
                            labelId="fieldlabel"
                            label="Field"
                            id="field-select"
                            value={fieldValue}
                            onChange={(e) => {
                                setFieldValue(e.target.value);
                            }}
                        >
                            {
                                fieldConf.options.map((op) => (
                                    <MenuItem
                                        key={`select-options-${fieldConf.name}-${op.value}`}
                                        value={op.value}
                                    >
                                        {op.text}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </>
                );
            default:
                return (
                    <TextField
                        label="Value"
                        value={fieldValue}
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                        size="small"
                        onChange={(e) => {
                            setFieldValue(e.target.value);
                        }}
                    />
                 );
        }
    }

    return (
        <div>
            <Button
                role={undefined}
                size="medium"
                variant="outlined"
                color="primary"
                onClick={handleClick}
                startIcon={<Add />}
            >
                Add Filter
            </Button>
            <Popover
                id="filter-panel"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Container className="p-3 border-b border-gray font-extrabold">Add Filter</Container>
                <Container className="m-3 space-y-3 min-w-60">
                    <div className="space-x-2">
                        <FormControl sx={{ minWidth: 120 }} size="small">
                            <InputLabel id="fieldlabel">Field</InputLabel>
                            <Select
                                labelId="fieldlabel"
                                label="Field"
                                id="field-select"
                                value={field}
                                onChange={(e) => {
                                    setField(e.target.value);
                                    setFieldValue('');
                                }}
                            >
                                {
                                    FILTER_FIELDS.map((f) => (
                                        <MenuItem key={f.key} value={f.key}>{f.name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <FormControl sx={{ minWidth: 120 }} size="small">
                            {
                                field ? (
                                    renderValueElement(FILTER_FIELDS.find((f) => f.key === field))
                                ) : null
                            }
                        </FormControl>
                    </div>

                    <div className="flex justify-end space-x-1">
                        <Button
                            role={undefined}
                            size="medium"
                            color="primary"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            role={undefined}
                            size="medium"
                            variant="contained"
                            color="primary"
                            disabled={!field || !fieldValue}
                            onClick={() => {
                                setCondition({ field, value: fieldValue });
                                handleClose();
                            }}
                        >
                            Save
                        </Button>
                    </div>
                </Container>
            </Popover>
        </div>
    );
};

AddFilterCondtionPanel.propTypes = {
    setCondition: PropTypes.func
}

export default AddFilterCondtionPanel;