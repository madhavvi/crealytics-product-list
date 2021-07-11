export interface HeadRow {
    id: string;
    caption: string;
    index: number;
    field?: string;
    datatype?: 'string' | 'number' | 'datetime' | 'boolean' | 'Date';
    renderType?: string;
    render?: (props: any) => React.ReactNode;
    groupIndex?: number;
    calculateCellValue?: (data: any) => any
    width?: number;
    allowSorting?: boolean;
    defaultSortOrder?: 'asc' | 'desc';
  }

  export interface SelectOption {
    title: string; 
    gtin: number; 
    gender: any; 
    sale_price: string; 
    price: string; 
    image_link: string; 
    additional_image_link: string;
}