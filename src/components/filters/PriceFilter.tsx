/* eslint-disable react-hooks/exhaustive-deps */
import React, { Dispatch, SetStateAction } from 'react';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid, makeStyles,
} from '@material-ui/core';
import { SelectOption } from '../../util/models';

interface OwnProps {
    setFilterByPrice: Dispatch<SetStateAction<any>>,
    filterByPrice: boolean,
    products: SelectOption[],
    filteredProducts: SelectOption[],
    setProducts: Dispatch<SetStateAction<SelectOption[]>>,
}

const useStyles = makeStyles((theme) => ({

}));

export default function PriceFilter({
    setFilterByPrice,
    filterByPrice,
    products,
    setProducts,
    filteredProducts,
}: OwnProps) {
//   const classes = useStyles();
  
  const handleChange = (event: any) => {
      setFilterByPrice(event.target.checked);
      const filteredProductsList = event.target.checked ? (filteredProducts.filter((item) => item.sale_price < item.price)) : products;
      setProducts(filteredProductsList);      
  };

  return (
    <Box minWidth={120}>
      <Grid container item spacing={2}>
        <Grid item xs={12} md={12}>
          <Grid item md={12}>
            <FormControlLabel
                control={(
                    <div style={{ display: 'table-cell' }}>
                    <Checkbox
                        checked={filterByPrice}
                        onChange={handleChange}
                        value={filterByPrice}
                        color="default"
                        inputProps={{ 'aria-label': 'Sale price' }}
                    />
                    </div>
                )}
                label={'On Sale'}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
