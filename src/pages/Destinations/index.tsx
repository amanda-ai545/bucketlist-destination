import { FC, useEffect, useState, useContext } from 'react';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import Select from 'react-select';

import { Box, Grid, Modal, Button, Typography } from '@mui/material';
import { useStyles } from './style';

import { services } from '../../services/destinations.service';
import { AppContext } from '../../contexts';
import { CountryTypes, StateTypes, OptionType, OptionTypeCity, ItemsTypes } from '../../types';

import DropZone from '../../components/DropZone';
import CardArea from '../../components/Card';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { DestinationSchema } from '../../models/destinations.model';

const DestinationsArea: FC = () => {
  const classes = useStyles();
  const { state, dispatch } = useContext(AppContext);
  const [bucketList, setBucketList] = useLocalStorage("bucketList");
  const [selectedCountry, setSelectedCountry] = useState<string | null>();
  const [selectedState, setSelectedState] = useState<string | null>();
  const [selectImage, setSelectImage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleCountries = async () => {
    try {
      const response = await services.getLocation("/countries");
      const countryOption = response.data.map((country: CountryTypes): OptionType => ({
        value: country.iso2,
        label: country.name,
      }));

      dispatch({
        type: "SET_COUNTRIES", payload: countryOption
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleStates = async () => {
    try {
      const response = await services.getLocation(`/countries/${selectedCountry}/states`);
      const stateOption = response.data.map((state: StateTypes): OptionType => ({
        value: state.iso2,
        label: state.name,
      }));

      dispatch({
        type: "SET_STATES", payload: stateOption
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCities = async () => {
    try {
      const response = await services.getLocation(`/countries/${selectedCountry}/states/${selectedState}/cities`);
      const cityOption = response.data.map((state: StateTypes): OptionTypeCity => ({
        value: state.id,
        label: state.name,
      }));

      dispatch({
        type: "SET_CITIES", payload: cityOption
      });
    } catch (error) {
      console.log(error);
    }
  };

  const { control, handleSubmit, reset, formState: { errors } } = useForm<ItemsTypes>({
    resolver: yupResolver(DestinationSchema),
    defaultValues: {
      country: {},
      state: {},
      city: {},
      isBookmark: false,
    },
  });

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => {
    reset();
    setIsOpen(false);
    setSelectedCountry(null);
    setSelectedState(null);
  };

  const handleBookmark = (id: number) => {
    let updatedItems = bucketList.map((item: ItemsTypes) => {
      if (item.id === id) {
        return {
          ...item,
          isBookmark: !item?.isBookmark,
        }
      } else {
        return item;
      }
    });

    setBucketList(updatedItems);
  };

  const onSubmit = (data: ItemsTypes) => {
    data.id = Date.now();
    data.image = selectImage;

    setBucketList([
      ...bucketList,
      data,
    ]);

    reset();
    setIsOpen(false);
    setSelectedCountry(null);
    setSelectedState(null);
  };

  useEffect(() => {
    handleCountries();
  });

  useEffect(() => {
    handleStates();
  }, [selectedCountry]);

  useEffect(() => {
    handleCities();
  }, [selectedState]);
  
  return (
    <>
      <Grid container justifyContent="space-between">
        <Grid item xs="auto">
          <Typography variant="h2" component="h2">
            Destinations
          </Typography>
        </Grid>
        <Grid item xs="auto">
          <Button variant="contained" onClick={handleOpen}>Add Destination</Button>
        </Grid>

        <Grid item xs={12}>
          <CardArea items={bucketList} toggleBookmark={handleBookmark} />
        </Grid>
      </Grid>

      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modal__box}>
          <Typography variant="h3" component="h3" marginBottom="20px">
            Add Destination
          </Typography>

          <form onSubmit={handleSubmit((data: ItemsTypes) => onSubmit(data))}>
            <DropZone name="image" getImage={(image: string) => setSelectImage(image)} />

            <Controller
              name="country"
              control={control}
              render={({ field: { onChange, value, name, ref } }) => <Select
                options={state.countries}
                value={state.countries.find((c: OptionType) => c.value === value.value)}
                onChange={(val: any) => {
                  setSelectedCountry(val.value)
                  onChange(val)
                }}
                isSearchable
              />}
            />

            <Typography variant="caption" className="text-red" display="block" paddingTop="4px" gutterBottom>
              {errors?.country?.value?.message}
            </Typography>

            {selectedCountry && <Controller
              name="state"
              control={control}
              render={({ field: { onChange, value, name, ref } }) => <Select
                className="mb-20"
                options={state.states}
                value={state.states.find((s: OptionType) => s.value === value?.value)}
                onChange={(val: any) => {
                  setSelectedState(val.value)
                  onChange(val)
                }}
                isSearchable
              />}
            />}

            {selectedState && <Controller
              name="city"
              control={control}
              render={({ field: { onChange, value, name, ref } }) => <Select
                options={state.cities}
                value={state.cities.find((c: OptionTypeCity) => c?.value === value?.value)}
                onChange={(val: any) => onChange(val)}
                isSearchable
              />}
            />}

            <Grid container justifyContent="end">
              <Grid item xs="auto">
                <Button type="button" onClick={handleClose}>Close</Button>
              </Grid>
              <Grid item xs="auto">
                <Button type="submit">Submit</Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </>
  )
}

export default DestinationsArea;