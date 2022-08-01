import { FC, useCallback, useState, useEffect, SyntheticEvent } from 'react';
import { useDropzone } from 'react-dropzone';

import { Typography } from '@mui/material';
import { useStyles } from './style';


// import * as icoUpload from '../../assets/images/ico_upload_image';

const img = {
  display: 'block',
  width: '100%',
  // background: '#000'
};

type IProps = {
  name: string,
  getImage: (image: string) => void,
}

const DropZone: FC<IProps> = ({ name, getImage }) => {
  const classes = useStyles();

  const [image, setImage] = useState<any>([]);
  const [err, setErr] = useState<any>();

  const createBase64Image = (fileObject: any) => {
    if (fileObject) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        setImage(e.target.result);
      };

      reader.readAsDataURL(fileObject);
    }
    return;
  }

  const onDrop = useCallback((acceptedFiles: any, rejectedFiles: any) => {
    if (rejectedFiles.length) {
      setErr(rejectedFiles[0].errors[0].message);
    } else {
      createBase64Image(acceptedFiles[0]);
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    },
    maxFiles: 1,
  });

  useEffect(() => {
    getImage(image)
  }, [image])

  return (
    <>
      <div className={classes.dropzone} {...getRootProps()}>
        <input name={name} {...getInputProps()} />

        {isDragActive ? <p className={classes.dropzone__label}>Drop the files here ...</p>
          : <p className={classes.dropzone__label}>Drag 'n' drop some files here, or click to select files</p>
        }

        <img
          src={image}
          style={img}
          onLoad={() => { URL.revokeObjectURL(image) }}
        />

        {err && <Typography variant="caption" component="p">{err}</Typography>}
      </div>
    </>
  )
}

export default DropZone;