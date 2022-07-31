export type CountryType = {
  id: number,
  name: string,
  iso2: string,
}

export type StateType = {
  id: number,
  name: string,
  iso2: string,
}

export type CityType = {
  id: number,
  name: string,
}

export interface IGlobalCountries {
  countries: CountryType[],
  loading: string,
}

export interface IGlobalStates {
  states: StateType[],
  loading: string,
}

export interface IGlobalCities {
  cities: CityType[],
  loading: string,
}