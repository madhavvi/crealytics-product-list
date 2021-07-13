/* eslint-disable react-hooks/exhaustive-deps */
import React, { Dispatch, SetStateAction } from 'react';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
} from '@material-ui/core';
import { SelectOption } from '../../util/models';

interface OwnProps {
    setFilterByPrice: Dispatch<SetStateAction<any>>,
    filterByPrice: boolean,
    products: SelectOption[],
    filterByGender: string,
    setProducts: Dispatch<SetStateAction<SelectOption[]>>,
}

export default function PriceFilter({
    setFilterByPrice,
    filterByPrice,
    products,
    setProducts,
    filterByGender,
}: OwnProps) {
  
  const handleChange = (event: any) => {
    const genderFiltered = filterByGender ? products.filter((e) => e.gender === filterByGender) : products;
    
    setFilterByPrice(event.target.checked);
    if (event.target.checked) {
        const priceFiltered = products.filter((item) => item.sale_price < item.price);
        const onSaleProducts = filterByGender ? genderFiltered.filter((item) => item.sale_price < item.price) : priceFiltered;
        setProducts(onSaleProducts); 
    } else {
      setProducts(genderFiltered);
    }


  };

  return (
    <Box minWidth={120} style={{ padding: '8px 12px' }}>
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
