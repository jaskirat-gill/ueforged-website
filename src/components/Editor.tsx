import React from "react";
import vehicleConfigs from "../util/vehicleConfig";
import EditorSection from "./EditorSection";
import VehicleIcon from "../assets/images/icons/Vehicle.svg?react";
import RimIcon from "../assets/images/icons/Rim.svg?react";
import TireIcon from "../assets/images/icons/Tire.svg?react";
import GearIcon from "../assets/images/icons/Gear.svg?react";
import { VehicleConfig } from "../util/types";
import {
  GroupedSelect,
  InchRangeSelect,
  TireAspectSelect,
  WheelWidthSelect,
} from "../helpers/editorHelpers";

// Define types for props
interface EditorProps {
  isActive: boolean;
  currentVehicle: VehicleConfig;
  setVehicle: (vehicle: Partial<VehicleConfig>) => void;
  cameraAutoRotate: boolean;
  setCameraAutoRotate: (autoRotate: boolean) => void;
}

// Define the Editor component
const Editor: React.FC<EditorProps> = (props) => {
  // Get props.
  const {
    isActive,
    currentVehicle = { ...props.currentVehicle, id: null },
    setVehicle,
    cameraAutoRotate,
    setCameraAutoRotate,
  } = props;

  return (
    <div id="editor" className={isActive ? "visible" : ""}>
      {/* Vehicle */}
      <EditorSection
        title="Vehicle"
        icon={<VehicleIcon className="icon" />}
        defaultActive={true}
      >
        {/* Vehicle */}
        <div className="field field-vehicle">
          <label>Model</label>
          <GroupedSelect
            value={currentVehicle.id || ""}
            itemList={vehicleConfigs.vehicles}
            groupBy="make"
            onChange={(e) => {
              setVehicle({ id: e.target.value });
            }}
          />
        </div>

        {/* Paint */}
        <div className="field field-paint">
          <div className="field field-vehicle-color">
            <label>Paint</label>
            <input
              type="color"
              value={currentVehicle.color || ""}
              onChange={(e) => {
                setVehicle({ color: e.target.value });
              }}
            />
          </div>

          {/* Roughness */}
          <div className="field field-vehicle-roughness">
            <label style={{ visibility: "hidden" }}>Finish</label>
            <select
              value={currentVehicle.roughness || 0}
              onChange={(e) =>
                setVehicle({ roughness: parseFloat(e.target.value) })
              }
            >
              <option value="0.6">Matte</option>
              <option value="0.2">Semi Gloss</option>
              <option value="0">High Gloss</option>
            </select>
          </div>
        </div>

        {/* Vehicle Lift */}
        <div className="field field-vehicle-lift">
          <label>Lift</label>
          <InchRangeSelect
            value={currentVehicle.lift}
            min={-2}
            max={8}
            onChange={(e) => setVehicle({ lift: parseFloat(e.target.value) })}
          />
        </div>
      </EditorSection>

      {/* Rims */}
      <EditorSection title="Rims" icon={<RimIcon className="icon" />}>
        {/* Rim */}
        <div className="field field-rim">
          <label>Type</label>
          <GroupedSelect
            value={currentVehicle.rim || ""}
            itemList={vehicleConfigs.wheels.rims}
            groupBy="make"
            onChange={(e) => {
              setVehicle({ rim: e.target.value });
            }}
          />
        </div>

        {/* Primary Rim Color */}
        <div className="field field-rim-color">
          <label>Color</label>
          <select
            value={currentVehicle.rim_color || ""}
            onChange={(e) => {
              setVehicle({ rim_color: e.target.value });
            }}
          >
            <option value="flat_black">Flat Black</option>
            <option value="gloss_black">Gloss Black</option>
            <option value="silver">Silver</option>
            <option value="chrome">Chrome</option>
            <option value="body">Body match</option>
          </select>
        </div>
        {/* Rim Size */}
        <div className="field field-rim-size">
          <div className="field field-rim-diameter">
            <label>Front Diameter</label>
            <InchRangeSelect
              value={currentVehicle.rim_front_diameter}
              min={14}
              max={24}
              onChange={(e) =>
                setVehicle({ rim_front_diameter: parseFloat(e.target.value) })
              }
            />
          </div> 
        </div>
        {/* Rim Size */}
        <div className="field field-rim-size">
          <div className="field field-rim-diameter">
            <label>Rear Diameter</label>
            <InchRangeSelect
              value={currentVehicle.rim_rear_diameter}
              min={14}
              max={24}
              onChange={(e) =>
                setVehicle({ rim_rear_diameter: parseFloat(e.target.value) })
              }
            />
          </div> 
        </div>
      </EditorSection>

      {/* Tires */}
      <EditorSection title="Tires" icon={<TireIcon className="icon" />}>
        <div className="field field-tire-type">
          {/* Front Rim Width */}
          <div className="field field-rim-width">
            <label>Front Width</label>
            <WheelWidthSelect
              value={currentVehicle.rim_front_width}
              onChange={(e) =>
                setVehicle({ rim_front_width: parseFloat(e.target.value) })
              }
            />
          </div>
          {/* Front Rim Width */}
          <div className="field field-rim-width">
            <label>Rear Width</label>
            <WheelWidthSelect
              value={currentVehicle.rim_rear_width}
              onChange={(e) =>
                setVehicle({ rim_rear_width: parseFloat(e.target.value) })
              }
            />
          </div>

          {/* Tire Size */}
          <div className="field field-tire-size">
            <label>Aspect Ratio</label>
            <TireAspectSelect
              value={currentVehicle.tire_aspectRatio}
              onChange={(e) =>
                setVehicle({ tire_aspectRatio: parseFloat(e.target.value) })
              }
            />
          </div>
        </div>
      </EditorSection>

      {/* Scene */}
      <EditorSection title="Options" icon={<GearIcon className="icon" />}>
        {/* Auto Rotate */}
        <div className="field field-camera-autorotate">
          <input
            type="checkbox"
            id="camera-autorotate"
            checked={cameraAutoRotate}
            onChange={(e) => setCameraAutoRotate(e.target.checked)}
          />
          <label htmlFor="camera-autorotate">Auto Rotate</label>
        </div>
      </EditorSection>
    </div>
  );
};

export default Editor;
