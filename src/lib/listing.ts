import { User } from '@faf-cars/lib/user';

export interface ListingDto {
  id: string;
  brandName: string;
  modelName: string;
  updatedAt: string;
  createdAt: string;
  cityName: string;
  countryCode: string;
  imagesUrls: string[];
  price: number | null;
  bodyStyle: BodyStyle | null;
  horsepower: number | null;
  fuelType: FuelType | null;
  engineVolume: number | null;
  color: CarColor | null;
  clearance: number | null;
  wheelSize: number | null;
  mileage: number | null;
  productionYear: number | null;
  publisher: User;
  sellAddress: string | null;
  isFavorite: boolean | null;
  description: string | null;
  carStatus: CarStatus | null;
  transmission: CarTransmission | null;
  drivetrain: CarDrivetrain | null;
}

export interface CreateListingDto {
  brandName: string;
  modelName: string;
  countryCode: string;
  cityName: string;
  price: number | null;
  bodyStyle: BodyStyle | null;
  horsepower: number | null;
  fuelType: FuelType | null;
  engineVolume: number | null;
  color: CarColor | null;
  clearance: number | null;
  wheelSize: number | null;
  mileage: number | null;
  productionYear: number | null;
  sellAddress: string | null;
  images: File[];
  description: string | null;
  carStatus: CarStatus | null;
  transmission: CarTransmission | null;
  drivetrain: CarDrivetrain | null;
}

export type CreateListingField = keyof CreateListingDto;

export const enum CarColor {
  Black,
  White,
  Silver,
  Gray,
  Blue,
  Red,
  Brown,
  Green,
  Beige,
  Yellow,
  Gold,
  Orange,
  Purple,
  Pink,
  Burgundy,
  Turquoise,
  Ivory,
  Bronze,
  Teal,
  Navy,
}

export const CAR_COLORS: CarColor[] = [
  CarColor.Black,
  CarColor.White,
  CarColor.Silver,
  CarColor.Gray,
  CarColor.Blue,
  CarColor.Red,
  CarColor.Brown,
  CarColor.Green,
  CarColor.Beige,
  CarColor.Yellow,
  CarColor.Gold,
  CarColor.Orange,
  CarColor.Purple,
  CarColor.Pink,
  CarColor.Burgundy,
  CarColor.Turquoise,
  CarColor.Ivory,
  CarColor.Bronze,
  CarColor.Teal,
  CarColor.Navy,
];

export const CAR_COLOR_HEX_MAP = new Map<CarColor, string>([
  [CarColor.Black, '#000000'],
  [CarColor.White, '#FFFFFF'],
  [CarColor.Silver, '#C0C0C0'],
  [CarColor.Gray, '#808080'],
  [CarColor.Blue, '#0000FF'],
  [CarColor.Red, '#FF0000'],
  [CarColor.Brown, '#A52A2A'],
  [CarColor.Green, '#008000'],
  [CarColor.Beige, '#F5F5DC'],
  [CarColor.Yellow, '#FFFF00'],
  [CarColor.Gold, '#FFD700'],
  [CarColor.Orange, '#FFA500'],
  [CarColor.Purple, '#800080'],
  [CarColor.Pink, '#FFC0CB'],
  [CarColor.Burgundy, '#800020'],
  [CarColor.Turquoise, '#40E0D0'],
  [CarColor.Ivory, '#FFFFF0'],
  [CarColor.Bronze, '#CD7F32'],
  [CarColor.Teal, '#008080'],
  [CarColor.Navy, '#000080'],
]);

export const CAR_COLOR_NAME_MAP = new Map<CarColor, string>([
  [CarColor.Black, 'Black'],
  [CarColor.White, 'White'],
  [CarColor.Silver, 'Silver'],
  [CarColor.Gray, 'Gray'],
  [CarColor.Blue, 'Blue'],
  [CarColor.Red, 'Red'],
  [CarColor.Brown, 'Brown'],
  [CarColor.Green, 'Green'],
  [CarColor.Beige, 'Beige'],
  [CarColor.Yellow, 'Yellow'],
  [CarColor.Gold, 'Gold'],
  [CarColor.Orange, 'Orange'],
  [CarColor.Purple, 'Purple'],
  [CarColor.Pink, 'Pink'],
  [CarColor.Burgundy, 'Burgundy'],
  [CarColor.Turquoise, 'Turquoise'],
  [CarColor.Ivory, 'Ivory'],
  [CarColor.Bronze, 'Bronze'],
  [CarColor.Teal, 'Teal'],
  [CarColor.Navy, 'Navy'],
]);

export const enum BodyStyle {
  Sedan,
  SUV,
  Crossover,
  Van,
  Minivan,
  Hatchback,
  Wagon,
  Coupe,
  PickupTruck,
  Convertible,
  Other,
}

export const BODY_STYLES: BodyStyle[] = [
  BodyStyle.Sedan,
  BodyStyle.SUV,
  BodyStyle.Crossover,
  BodyStyle.Van,
  BodyStyle.Minivan,
  BodyStyle.Hatchback,
  BodyStyle.Wagon,
  BodyStyle.Coupe,
  BodyStyle.PickupTruck,
  BodyStyle.Convertible,
  BodyStyle.Other,
];

export const BODY_STYLE_NAME_MAP = new Map<BodyStyle, string>([
  [BodyStyle.Sedan, 'Sedan'],
  [BodyStyle.SUV, 'SUV'],
  [BodyStyle.Crossover, 'Crossover'],
  [BodyStyle.Van, 'Van'],
  [BodyStyle.Minivan, 'Minivan'],
  [BodyStyle.Hatchback, 'Hatchback'],
  [BodyStyle.Wagon, 'Wagon'],
  [BodyStyle.Coupe, 'Coupe'],
  [BodyStyle.PickupTruck, 'Pickup'],
  [BodyStyle.Convertible, 'Convertible'],
  [BodyStyle.Other, 'Other'],
]);

export const enum FuelType {
  Petrol,
  Diesel,
  Hybrid,
  PluginHybrid,
  Electric,
  Other,
}

export const FUEL_TYPES: FuelType[] = [
  FuelType.Petrol,
  FuelType.Diesel,
  FuelType.Hybrid,
  FuelType.PluginHybrid,
  FuelType.Electric,
  FuelType.Other,
];

export const FUEL_TYPE_NAME_MAP = new Map<FuelType, string>([
  [FuelType.Petrol, 'Petrol'],
  [FuelType.Diesel, 'Diesel'],
  [FuelType.Hybrid, 'Hybrid'],
  [FuelType.PluginHybrid, 'Plug-in Hybrid'],
  [FuelType.Electric, 'Electric'],
  [FuelType.Other, 'Other'],
]);

export const enum ListingOrderBy {
  CreatedAtAsc = 'createdAtAsc',
  CreatedAtDesc = 'createdAtDesc',
  YearAsc = 'yearAsc',
  YearDesc = 'yearDesc',
  PriceAsc = 'priceAsc',
  PriceDesc = 'priceDesc',
}

export const LISTING_ORDER_BY_VALUES = new Map<ListingOrderBy, string>([
  [ListingOrderBy.PriceDesc, 'Expensive first'],
  [ListingOrderBy.PriceAsc, 'Cheap first'],
  [ListingOrderBy.CreatedAtDesc, 'New listings first'],
  [ListingOrderBy.CreatedAtAsc, 'Old listings first'],
  [ListingOrderBy.YearDesc, 'New cars first'],
  [ListingOrderBy.YearAsc, 'Old cars first'],
]);

export const enum CarStatus {
  New,
  Used,
  Rent,
}

export const CAR_STATUSES: CarStatus[] = [
  CarStatus.New,
  CarStatus.Used,
  CarStatus.Rent,
];

export const CAR_STATUS_NAME_MAP = new Map<CarStatus, string>([
  [CarStatus.New, 'New'],
  [CarStatus.Used, 'Used'],
  [CarStatus.Rent, 'Rent'],
]);

export const enum CarTransmission {
  Manual,
  Automatic,
  ContinuouslyVariable,
}

export const CAR_TRANSMISSIONS: CarTransmission[] = [
  CarTransmission.Manual,
  CarTransmission.Automatic,
  CarTransmission.ContinuouslyVariable,
];

export const CAR_TRANSMISSIONS_NAME_MAP = new Map<CarTransmission, string>([
  [CarTransmission.Automatic, 'Automatic'],
  [CarTransmission.Manual, 'Manual'],
  [CarTransmission.ContinuouslyVariable, 'Continuously variable'],
]);

export const enum CarDrivetrain {
  FrontWheelDrive,
  RearWheelDrive,
  AllWheelDrive,
  FourWheelDrive,
}

export const CAR_DRIVETRAINS: CarDrivetrain[] = [
  CarDrivetrain.FrontWheelDrive,
  CarDrivetrain.RearWheelDrive,
  CarDrivetrain.AllWheelDrive,
  CarDrivetrain.FourWheelDrive,
];

export const CAR_DRIVETRAIN_NAME_MAP = new Map<CarDrivetrain, string>([
  [CarDrivetrain.FrontWheelDrive, 'FWD'],
  [CarDrivetrain.RearWheelDrive, 'RWD'],
  [CarDrivetrain.AllWheelDrive, 'AWD'],
  [CarDrivetrain.FourWheelDrive, '4WD'],
]);