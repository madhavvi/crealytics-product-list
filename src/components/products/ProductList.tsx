import React, { useState } from 'react';
import DataGrid, {
    Column,
    SearchPanel,
    Scrolling,
    Paging,
    Pager,
} from 'devextreme-react/data-grid';
import { Template } from 'devextreme-react/core/template';
import { Paper, Container, Grid } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import 'devextreme/dist/css/dx.light.css';
import './products.css';
import { products } from '../../util/products';
import { HeadRow } from '../../util/models';
import { columns } from './CustomColumns';
import GenderFilter from '../filters/GenderFilter';
import RowRender from './RowRender';
import PriceFilter from '../filters/PriceFilter';

export default function ProductList() {
  const allowedPageSizes = [50, 100, 200];
  const [filterByGender, setFilterByGender] = useState('');
  const [filterByPrice, setFilterByPrice] = useState(false);
  const [filteredProducts, setProducts] = useState(products);
  const [showImages, setShowImages] = useState(false);

  const renderGenderFilter = () => (
    <GenderFilter
        setFilterByGender={setFilterByGender}
        filterByGender={filterByGender}
        filteredProducts={filteredProducts}
        products={products}
        setProducts={setProducts}
    />
  );

  const renderPriceFilter = () => {
    return (
        <PriceFilter
            setFilterByPrice={setFilterByPrice}
            filterByPrice={filterByPrice}
            filteredProducts={filteredProducts}
            products={products}
            setProducts={setProducts}
        />
    )
  };

  const rowRender = (rowInfo: any) => {
      return (
        <RowRender 
            showImages={showImages}
            setShowImages={setShowImages}
            rowInfo={rowInfo.data}
        />
      )
  };

  const onToolbarPreparing = (e: any) => {
      e.toolbarOptions.items.unshift({
        location: 'before',
        template: 'genderFilter'
      },
      {
        location: 'before',
        template: 'priceFilter'
      });
  };
 
  return (
      <>
        <Grid container className="grid-container" style={{ flexGrow: 1, margin: '30px', display: 'grid' }}>
            <Grid item className="grid-item"> 
                <CardHeader className="card-panel" title="Products"/>
            
                <Container className="container">
                    <Paper elevation={0} style={{ padding: 0 }}>
                        <DataGrid
                            id='gridContainer'
                            dataSource={filteredProducts}
                            noDataText={'No data'}
                            showBorders={true}
                            showRowLines={true}
                            style={{ height: '100%' }}
                            className="freespaced-table"
                            allowColumnReordering
                            repaintChangesOnly
                            onToolbarPreparing={onToolbarPreparing}
                            rowRender={(data) => rowRender(data)}
                            >
                            <Scrolling rowRenderingMode='virtual'></Scrolling>
                            <Paging defaultPageSize={100} />
                            <Pager
                                visible={true}
                                allowedPageSizes={allowedPageSizes}
                                displayMode='compact'
                                showPageSizeSelector='true'
                                showInfo='true'
                                showNavigationButtons='true' 
                            />
                            <Template name="genderFilter" render={renderGenderFilter} />
                            <Template name="priceFilter" render={renderPriceFilter} />
                            <SearchPanel visible placeholder='Search...' />
                            {columns
                                // .sort((a: HeadRow, b: HeadRow) => a.id - b.id)
                                .map((item: HeadRow) => (
                                <Column
                                    key={item.id}
                                    dataField={item.id}
                                    caption={item.caption}
                                    dataType={item.datatype}
                                    cellRender={item.render}
                                    width={`${item.width}%`}
                                    calculateCellValue={item.calculateCellValue}
                                    allowSorting={item.allowSorting}
                                    defaultSortOrder={item.defaultSortOrder}
                                />
                                ))}
                        </DataGrid>
                    </Paper>
                </Container>
            </Grid>
        </Grid>
      </>
  )
};
