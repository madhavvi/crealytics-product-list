const genderValue = (gender: any) => {
    return typeof(gender) === 'number' ? 'NA' : gender; 
  };

export const columns = [
    {
      id: 'gtin',
      dataType: 'number',
      index: 0,
      caption: 'ID',
      width: 10,
      allowSorting: true
    },
    { 
      id: 'title',
      dataType: 'string',
      index: 1,
      caption: 'Title',
      width: 20,
      allowSorting: true
    },
    {
      id: 'gender',
      dataType: 'string',
      index: 2,
      caption: 'gender',
      width: 10,
      allowSorting: true,
      calculateCellValue: (data: any) => genderValue(data) || 'NA',
    },
    {
      id: 'sale_price',
      dataType: 'number',
      index: 3,
      caption: 'Sale price',
      width: 10,
      allowSorting: true
    },
    {
      id: 'price',
      dataType: 'number',
      index: 4,
      caption: 'Price',
      width: 10,
      allowSorting: true
    },
    {
      id: 'image_link',
      dataType: 'any',
      index: 5,
      width: 20,
      caption:'Image'
    }
];
  