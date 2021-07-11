/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, Dispatch, SetStateAction } from 'react';
import {
  Box,
  Grid, IconButton, InputAdornment, InputLabel, makeStyles, MenuItem, Select,
} from '@material-ui/core';
import { SelectOption } from '../../util/models';
import ClearIcon from '@material-ui/icons/Clear';

interface OwnProps {
    setFilterByGender: Dispatch<SetStateAction<string>>,
    filterByGender: string,
    products: SelectOption[],
    setProducts: Dispatch<SetStateAction<SelectOption[]>>,
}

const useStyles = makeStyles(() => ({
  selectAdornment: {
    '& .MuiButtonBase-root': {
      position: 'absolute',
      padding: 0,
      right: '25px',
    },
  },
  select: {
    '& .MuiSelect-select.MuiSelect-select': {
      paddingRight: '34px',
    },
  },
  menuPaper: {
    maxHeight: '50vh'
  }
}));

export default function GenderFilter({
  setFilterByGender,
  filterByGender,
  products,
  setProducts,
}: OwnProps) {
  const [val, setVal] = useState(filterByGender);
  const classes = useStyles();
  const inputLabel = React.useRef<HTMLLabelElement>(null);

  const genderOptions = [
        {
            label: 'Female',
            value: 'female'
        },
        {
            label: 'Male',
            value: 'male'
        },
        {
            label: 'Unisex',
            value: 'unisex'
        },
  ];
  
  const handleChange = (value: any) => {
      const option = genderOptions.find((e) => e.value === value);
      setVal(option ? option.value : '');
      setFilterByGender(option ? option.value : '');
      const filteredProducts = products.filter((e) => e.gender === value);
      setProducts(filteredProducts);      
  };

  const handleClearSelection = () => {
    setVal('');
    setFilterByGender('');
    setProducts(products);
  };

  return (
    <Box minWidth={120}>
      <Grid container item spacing={2}>
        <Grid item xs={12} md={12}>
          <Grid item md={12}>
            <InputLabel ref={inputLabel} id="demo-mutiple-name-label">Gender</InputLabel>
            <Select
                fullWidth
                ref={inputLabel}
                className={classes.select}
                value={val}
                label={'Gender'}
                onChange={(event: any) => {
                    handleChange(event.target.value);
                }}
                endAdornment={(
                    <InputAdornment position="end" className={classes.selectAdornment}>
                      <IconButton
                        aria-label="delete"
                        size="small"
                        onClick={handleClearSelection}
                        style={{ right: 18 }}
                      >
                        {val
                      && <ClearIcon fontSize="inherit" />}
                      </IconButton>
                    </InputAdornment>
                )}
                MenuProps={{ classes: { paper: classes.menuPaper } }}
                >
                {genderOptions.map(({ label, value: v }, key) => (
                    <MenuItem key={label + key} value={v}>
                        {label}
                    </MenuItem>
                ))}
            </Select>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
