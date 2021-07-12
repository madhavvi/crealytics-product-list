/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Dispatch, SetStateAction } from 'react';
import { makeStyles } from '@material-ui/core';
import { SelectOption } from '../../util/models';

interface OwnProps {
    setShowImages: Dispatch<SetStateAction<boolean>>,
    showImages: boolean,
    rowInfo: SelectOption
}

const useStyles = makeStyles(() => ({
  td: {
    textAlign: 'right'
  }
}));

export default function RowRender({
  setShowImages,
  showImages,
  rowInfo,
}: OwnProps) {
  const rest_images = rowInfo.additional_image_link.split(', ');
  const classes = useStyles();
  
  const lower = typeof(rowInfo.gender) == 'string' ? rowInfo.gender.toLowerCase() : rowInfo.gender;
  const gender = lower.charAt(0).toUpperCase() + lower.slice(1);

  return (
    <tbody>
        <tr className="main-row" onClick={() => setShowImages(!showImages)}>
           <td className={classes.td}>{rowInfo.gtin}</td>
           <td>{rowInfo.title}</td>
           <td>{gender}</td>
           <td>{rowInfo.price}</td>
           <td>{rowInfo.sale_price}</td>
           <td colSpan={1}><img src={rowInfo.image_link} loading="lazy" width="50" height="50"  alt="Image not found" /></td>
        </tr>
        {showImages && (
            <tr className="notes-row">
              <td colSpan={6} style={{ textAlign: 'center'}}>
                {rest_images.map((img, index) => (
                    <img key={index} loading="lazy" style={{ margin: '0 30px'}} width="100" height="100" src={img} alt="Image not found" />
                ))}
              </td>
            </tr>
        )}
    </tbody>
    );
}


