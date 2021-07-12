/* eslint-disable jsx-a11y/img-redundant-alt */
// import { SelectOption } from "../../util/models";

// const genderRender = (data: SelectOption) => {
//     let genderString = data.gender;    
//     const lower = genderString && genderString.toLowerCase();    
//     return <span>{lower.charAt(0).toUpperCase() + lower.slice(1)}</span>;
// }

const cellRender = (data: any) => {
    const img_url = data && data.data && data.data.image_link;  
    return <img src={img_url} loading="lazy" width="50" height="50" alt="Image not found" />;
}

export const columns = [
    {
      id: 'gtin',
      dataType: 'number',
      index: 0,
      caption: 'ID',
      width: 13,
      allowSorting: true
    },
    { 
      id: 'title',
      dataType: 'string',
      index: 1,
      caption: 'Title',
      width: 30,
      allowSorting: true
    },
    {
      id: 'gender',
      dataType: 'string',
      index: 2,
      caption: 'Gender',
      width: 13,
      allowSorting: true,
      // calculateCellValue: (data: SelectOption) => genderRender(data)
    },
    {
      id: 'price',
      dataType: 'number',
      index: 3,
      caption: 'Price',
      width: 15,
      allowSorting: true
    },
    {
      id: 'sale_price',
      dataType: 'number',
      index: 4,
      caption: 'Sale price',
      width: 15,
      allowSorting: true
    },
    {
      id: 'Picture',
      dataType: 'any',
      index: 5,
      width: 10,
      caption:'Image',
      render: (data: any) => cellRender(data)
    }
];
  