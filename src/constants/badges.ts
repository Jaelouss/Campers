import {
  AirConditioning,
  BlocksFour,
  BlocksNine,
  BlocksThree,
  CupHot,
  Diagram,
  Fridge,
  GasStove,
  IonWater,
  Microwave,
  Radio,
  Shower,
  Tv,
} from "@assets";

export const FEATURES = [
  "AC",
  "bathroom",
  "TV",
  "kitchen",
  "microwave",
  "radio",
  "transmission",
  "gas",
  "water",
  "refrigerator",
] as const;

export const FILTERS_BADGES = {
  EQUIPMENT: ["AC", "refrigerator", "kitchen", "TV", "bathroom"],
  VEHICLE_TYPE: [
    { label: "Van", value: "panelTruck" },
    { label: "Fully Integrated", value: "fullyIntegrated" },
    { label: "Alcove", value: "alcove" },
  ],
} as const;

export const VEHICLE_DETAILS = [
  "Form",
  "Length",
  "Width",
  "Height",
  "Tank",
  "Consumption",
] as const;

export const BADGES_ICONS: Record<
  string,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  AC: AirConditioning,
  TV: Tv,
  bathroom: Shower,
  gas: GasStove,
  kitchen: CupHot,
  microwave: Microwave,
  radio: Radio,
  refrigerator: Fridge,
  transmission: Diagram,
  water: IonWater,
  panelTruck: BlocksThree,
  fullyIntegrated: BlocksFour,
  alcove: BlocksNine,
};
