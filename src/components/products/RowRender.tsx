/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { CircularProgress, Grid } from '@material-ui/core';
import { SelectOption } from '../../util/models';
import { useState } from 'react';
import { useEffect } from 'react';
import imageCaching from '../../util/imageCaching';


interface OwnProps {
    rowInfo: SelectOption
}

export default function RowRender({
  rowInfo,
}: OwnProps) {
  const [loading, setLoading] = useState(true);
  const rest_images = rowInfo.additional_image_link.split(', ');

  useEffect(() => {
    imageCaching(rest_images);
    setLoading(false);
  }, [])
  
  return (
    <>
      <Grid style={{ textAlign: 'center'}}>
            {!loading && (
            <>
              {rest_images.map((img, index) => (
                <img key={index} loading="lazy" style={{ margin: '10px 20px'}} width="100" height="100" src={img} alt="Image not found" />
              ))}
            </>
            )}
            {loading && (
              <CircularProgress />
            )}
      </Grid>
    </>
    );
}


