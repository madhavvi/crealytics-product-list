import React, { useCallback, useState } from 'react';
import { products } from '../../util/products';
import { HeadRow } from '../../util/models';
import { columns } from './custom-columns';
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
import './products.css';
import 'devextreme/dist/css/dx.light.css';
import GenderFilter from '../filters/GenderFilter';
import { useEffect } from 'react';


export default function ProductList() {
  const allowedPageSizes = [50, 100, 200];
  const [filterByGender, setFilterByGender] = useState('');
  const [productss, setProducts] = useState(products);


  const renderGenderFilter = useCallback(() => (
    <GenderFilter
      setFilterByGender={setFilterByGender}
      filterByGender={filterByGender}
      products={products}
      setProducts={setProducts}
    />
  ), [filterByGender, products]);

  const onToolbarPreparing = (e: any) => {
      e.toolbarOptions.items.unshift({
        location: 'before',
        template: 'genderFilter',
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
                            dataSource={productss}
                            noDataText={'No data'}
                            showBorders={true}
                            showRowLines={true}
                            style={{ height: '100%' }}
                            className="freespaced-table"
                            //   scrolling={{ mode: 'virtual', rowRenderingMode: 'virtual' }}
                            allowColumnReordering
                            repaintChangesOnly
                            onToolbarPreparing={onToolbarPreparing}
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
                            {/* <Template name="resultsCounter" render={ds.renderResultsCounter} /> */}
                            <SearchPanel visible placeholder='Search...' />
                            {/* <Editing
                                refreshMode="reshape"
                                mode="cell"
                            /> */}
                            {columns
                                // .sort((a: HeadRow, b: HeadRow) => a.id - b.id)
                                .map((item: HeadRow) => (
                                <Column
                                    key={item.id}
                                    dataField={item.id}
                                    caption={item.caption}
                                    dataType={item.datatype || 'string'}
                                    cellRender={item.render}
                                    width={`${item.width}%`}
                                    // calculateCellValue={item.calculateCellValue}
                                    allowSorting={item.allowSorting}
                                    defaultSortOrder={item.defaultSortOrder}
                                />
                                ))}
                            {/* {buttons && <Column type="buttons" buttons={buttons} />} */}
                        </DataGrid>
                    </Paper>
                </Container>
            </Grid>
        </Grid>
      </>
  )
};
