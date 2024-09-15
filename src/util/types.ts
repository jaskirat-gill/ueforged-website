export interface VehicleConfig {
  id: string;
  lift: number;
  color: string;
  roughness: number;
  wheel_offset: number;
  rim: string;
  rim_color: string;
  rim_color_secondary: string;
  rim_diameter: number;
  rim_front_width: number;
  rim_rear_width: number;
  tire: string;
  tire_diameter: number;
  spare: boolean;
}

export interface WheelConfig {
  make: string;
  name: string;
  model: string;
  width: number;
  od: number;
  id?: number;
}

export interface VehicleConfigs {
  defaults: VehicleConfig;
  vehicles: Record<string, VehicleData>;
  wheels: {
    rims: Record<string, WheelConfig>;
    tires: Record<string, WheelConfig>;
  };
}

export interface VehicleData {
  name: string;
  make: string;
  model: string;
  wheel_offset: number;
  wheelbase: number;
  spare?: number[];
}
