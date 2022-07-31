import { Typography } from '@mui/material';
import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

import { useStyles } from './style';

const img = {
  display: 'block',
  width: '100%',
  height: '100%',
  background: '#000'
};

const DropZone = () => {
  const classes = useStyles();
  const [image, setImage] = useState<any>([]);
  const [err, setErr] = useState<any>();

  const onDrop = useCallback((acceptedFiles: any, rejectedFiles: any) => {
    // Do something with the files

    console.log("------> acceptedFiles", acceptedFiles)
    console.log("------> rejectedFiles", rejectedFiles)
    console.log("------> image", image)

    if (rejectedFiles.length) {
      setErr(rejectedFiles[0].errors[0].message);
    } else {
      setImage(acceptedFiles.map((file: any) => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    },
    maxFiles: 1,
  })

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop some files here, or click to select files</p>
        }

        <img
          src={image[0]?.preview}
          style={img}
          onLoad={() => { URL.revokeObjectURL(image[0]?.preview) }}
        />

        {err && <Typography variant="caption" component="p">{err}</Typography>}
      </div>
    </>
  )
}

export default DropZone;