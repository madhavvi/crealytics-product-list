/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, Dispatch, SetStateAction } from 'react';
import {
  Box,
  FormControl,
  Grid, IconButton, InputAdornment, InputLabel, makeStyles, MenuItem, Select,
} from '@material-ui/core';
import { SelectOption } from '../../util/models';
import ClearIcon from '@material-ui/icons/Clear';

interface OwnProps {
    setFilterByGender: Dispatch<SetStateAction<string>>,
    filterByGender: string,
    products: SelectOption[],
    filterByPrice: boolean,
    setProducts: Dispatch<SetStateAction<SelectOption[]>>,
}

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

const useStyles = makeStyles((theme) => ({
  selectAdornment: {
    '& .MuiButtonBase-root': {
      position: 'absolute',
      padding: 0,
      right: '25px',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
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
  filterByPrice,
  setProducts,
}: OwnProps) {
  const [val, setVal] = useState(filterByGender);
  const classes = useStyles();
  
  const priceFiltered = filterByPrice ? products.filter((item) => item.sale_price < item.price) : products;
  const handleChange = (value: any) => {    
      const option = genderOptions.find((e) => e.value === value);
      setVal(option ? option.value : '');
      setFilterByGender(option ? option.value : '');
      const filteredProductsList = priceFiltered.filter((e) => e.gender === value);
      setProducts(filteredProductsList);      
  };

  const handleClearSelection = () => {
    setVal('');
    setFilterByGender('');
    setProducts(priceFiltered);
  };

  return (
    <Box minWidth={120}>
      <Grid container item spacing={2}>
        <Grid item xs={12} md={12}>
          <Grid item md={12}>
          <FormControl className={classes.formControl}> 
            <InputLabel id="gender-filter-label">Gender</InputLabel>
            <Select
                labelId="gender-filter-label"
                fullWidth
                className={classes.select}
                value={val}
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
          </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
