## Available Scripts

In the project directory, you can run:

### `npm start` or `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Implementation
1. Web page will display table with toolbar for gender filter, sale price filter, total count for prodcuts and search panel.
2. On row click, row will expand and show the rest of the images form additional_image_link field. Toggle rowClick is implemented.
3. To search, enter text in search panel, result will appear as user enters text. Matching text will be highlighted in table.
4. To filter by Gender, select option form dropdown and result will appear dynamically.
4. To filter by price, check the checkbox for On sale. If checked, products which are on sale will be reflected inside table.
5. Initial limit for pagination is set to 100. User can select from pagination dropdown for limit 50, 100 and 200.
6. Page navigation and page selector buttons are provided at end of the table.
7. Column sorting, click on column title to sort the data with the selected column. Except Image column are all sortable. 
8. Select multiple filters( gender, price and search) to reflect data accordingly. Try different scenarios with filters(Hopefully all will work).
9. To load images in Image column, lazy laoding attribute is added in img tag.
10. Images in additional_image_links are cached.
11. Result counter besides search panel will display the count of products from the selection of various filters like Gender filter, On sale price filter and search panel. 
