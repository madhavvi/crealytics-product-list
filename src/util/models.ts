export interface HeadRow {
    id: string;
    dataField?: string;
    caption: string;
    index: number;
    field?: string;
    datatype?: 'string' | 'number' | 'datetime' | 'boolean' | 'Date';
    renderType?: string;
    render?: (props: any) => React.ReactNode;
    groupIndex?: number;
    calculateCellValue?: (data: SelectOption) => any
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

export interface option {
    label: string;
    value: string
}