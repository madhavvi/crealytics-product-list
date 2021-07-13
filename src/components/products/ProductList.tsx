/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react';
import DataGrid, {
    Column,
    SearchPanel,
    Scrolling,
    Paging,
    Pager,
    Selection,
    MasterDetail,
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

  const renderGenderFilter = () => (
    <GenderFilter                                               // filter for gender, code in GenderFilter.tsx
        setFilterByGender={setFilterByGender}
        filterByGender={filterByGender}
        filterByPrice={filterByPrice}
        products={products}
        setProducts={setProducts}
    />
  );

  const renderPriceFilter = () => {
    return (
        <PriceFilter                                             // filter for price, code in PriceFilter.tsx
            setFilterByPrice={setFilterByPrice}
            filterByPrice={filterByPrice}
            filterByGender={filterByGender}
            products={products}
            setProducts={setProducts}
        />
    )
  };

  const renderResultsCounter = (e: any) => {                       // to display result counter 
    const resultsCount = e.component.totalCount();
    const recordsText = `Listing ${resultsCount} records`;
    
    return (
        <i>
            {resultsCount !== -1 && recordsText}
        </i>
    );
  };

  const rowRender = (e: any) =>  <RowRender rowInfo={e.data} />   // rendering additional images using RowRender

  const onRowClick = (e: any) => {                                //  to toggle expand/collapse for the row
    var key = e.component.getKeyByRowIndex(e.rowIndex);  
    var expanded = e.component.isRowExpanded(key);  
    if (expanded) {  
        e.component.collapseRow(key);  
    }  
    else {  
        e.component.expandRow(key);  
    }  
  }

  const onToolbarPreparing = (e: any) => {                           //  to render filter templates
      e.toolbarOptions.items.unshift({
        location: 'before',
        template: 'genderFilter'
      },
      {
        location: 'before',
        template: 'priceFilter'
      },
      {
        location: 'after',
        template: 'resultsCounter',
        component: e.component
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
                            onRowClick={(e: any) => onRowClick(e)}
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
                            <Template name="resultsCounter" render={(e: any) => renderResultsCounter(e)} />
                            <SearchPanel visible placeholder='Search...' />
                            <Selection mode="single" />
                            {columns
                                // .sort((a: HeadRow, b: HeadRow) => a.id - b.id)       // uncomment in case of sorting is required 
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
                                <MasterDetail enabled={false} render={(e: any) => rowRender(e)} />
                        </DataGrid>
                    </Paper>
                </Container>
            </Grid>
        </Grid>
      </>
  )
};
