import { FC, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import { Box, Grid, Modal, Button, Typography, FormControl } from '@mui/material';
import Card from '../../components/Card';
import DropZone from '../../components/DropZone';

import { getAllCountries } from '../../store/slices/countries';
import { AppDispatch } from '../../store';
import { CityType, CountryType, IGlobalCountries, StateType } from '../../models/index.model';
import { getAllStates } from '../../store/slices/states';
import { getAllCities } from '../../store/slices/cities';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type OptionType = {
  value: string,
  label: string
}

type OptionTypeCity = {
  value: number | null,
  label: string
}

type DatasType = {
  countryISO2: string,
  stateISO2: string,
}

interface IFormValues {
  id: number | null,
  country: OptionType,
  state: OptionType,
  city: OptionTypeCity,
  isBookmark: boolean,
}

const DestinationsArea: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [bucketList, setBucketList] = useState<any[]>(() => {
    const savedBucketList = localStorage.getItem('bucketList');

    if (savedBucketList) {
      return JSON.parse(savedBucketList)
    } else {
      return []
    }
  });
  const [countries, setCountries] = useState<any>();
  const [states, setStates] = useState<any>();
  const [cities, setCities] = useState<any>();

  const [open, setOpen] = useState(false);


  const [formValues, setFormValues] = useState<IFormValues>({
    id: null,
    country: { value: '', label: '' },
    state: { value: '', label: '' },
    city: { value: null, label: '' },
    isBookmark: false,
  })

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const loadCountries = async () => {
    const data = await dispatch(getAllCountries());

    setCountries({ status: data.meta.requestStatus, data: data.payload })
  };

  const handleCountry = async (values: OptionType) => {
    const data = await dispatch(getAllStates(values.value));

    setFormValues({
      ...formValues,
      country: values
    })

    setStates({ status: data.meta.requestStatus, data: data.payload });
  }

  const handleState = async (values: OptionType) => {
    setFormValues({
      ...formValues,
      state: values
    })

    const datas: DatasType = {
      countryISO2: formValues?.country?.value,
      stateISO2: values?.value
    }

    const data = await dispatch(getAllCities(datas));

    setCities({ status: data.meta.requestStatus, data: data.payload });
  }

  const handleCity = (values: OptionTypeCity) => {
    setFormValues({
      ...formValues,
      city: values
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    formValues.id = Date.now()

    if (formValues) {
      setBucketList([
        ...bucketList,
        formValues
      ])
    }
  }

  const handleBookmark = (id: any) => {
    console.log("id item", id);
    let updatedItems = bucketList.map((item: any) => {
      if (item.id === id) {
        return {
          ...item, isBookmark: !item.isBookmark
        }
      } else {
        return item
      }
    })

    setBucketList(updatedItems)
  }

  const countryOption = countries?.data?.map((country: CountryType): OptionType => ({
    value: country?.iso2,
    label: country?.name,
  }));

  const statesOption = states?.data?.map((state: StateType): OptionType => ({
    value: state?.iso2,
    label: state?.name,
  }));

  const cityOption = cities?.data?.map((city: CityType): OptionTypeCity => ({
    value: city?.id,
    label: city?.name,
  }));

  useEffect(() => {
    loadCountries();
    localStorage.setItem('bucketList', JSON.stringify(bucketList))
  }, [formValues, bucketList]);

  return (
    <>
      {localStorage.getItem('bucketList')}

      <Grid container justifyContent="right">
        <Grid item>
          <Button variant="contained" onClick={handleOpen}>Add Destination</Button>
        </Grid>
      </Grid>

      <Box>
        <Typography variant="h2" component="h2">
          Destinations
        </Typography>

        <Grid container spacing={5}>
          {bucketList.map((item: any) => (
            <Grid item md={4} key={item.id}>
              <Card item={item} toggleBookmark={handleBookmark} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={(e: FormEvent) => handleSubmit(e)}>
            <DropZone />

            <Select
              options={countryOption}
              onChange={(values: any) => handleCountry(values)}
              isLoading={countries?.status !== 'fulfilled'}
              isSearchable
            />

            {formValues.country.label.length > 0 &&
              <Select
                options={statesOption}
                onChange={(values: any) => handleState(values)}
                isLoading={states?.status !== 'fulfilled'}
                isSearchable
              />}

            {formValues.state.label.length > 0 &&
              <Select
                options={cityOption}
                isLoading={cities?.status !== 'fulfilled'}
                onChange={(values: any) => handleCity(values)}
                isSearchable
              />}

            <Button type="button" onClick={handleClose}>Close</Button>
            <Button type="submit">Submit</Button>
          </form>

          {JSON.stringify(formValues)}
        </Box>
      </Modal>
    </>
  )
}

export default DestinationsArea;