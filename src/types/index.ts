export type ItemsTypes = {
  id: number,
  country: OptionType,
  state: OptionType,
  city: OptionTypeCity,
  image: string,
  isBookmark: boolean,
}

export type OptionType = {
  value: string,
  label: string
}

export type OptionTypeCity = {
  value: number | null,
  label: string
}

export type CardTypes = {
  items: ItemsTypes[],
  toggleBookmark: (id: number) => void,
};

export type ResTypes = {
  id: number,
  name: string,
  iso2: string,
};

export type CountryTypes = {
  id: number,
  name: string,
  iso2: string,
};

export type StateTypes = {
  id: number,
  name: string,
  iso2: string,
};

export type FormTypes = {
  id: number | null,
  country: OptionType,
  state: OptionType,
  city: OptionTypeCity,
  isBookmark: boolean,
}