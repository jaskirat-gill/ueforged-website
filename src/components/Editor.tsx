import React, { useEffect, useState } from "react";
import vehicleConfigs from "../util/vehicleConfig";
import EditorSection from "./EditorSection";
import VehicleIcon from "../assets/images/icons/Vehicle.svg?react";
import RimIcon from "../assets/images/icons/Rim.svg?react";
import TireIcon from "../assets/images/icons/Tire.svg?react";
import GearIcon from "../assets/images/icons/Gear.svg?react";
import { VehicleConfig } from "../util/types";

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

  // Group object by key.  
  const groupObjectByKey = (object: Record<string, any>, key: string) => {
    const groups: Record<string, string[]> = {};
    // Loop through object keys.
    for (const id of Object.keys(object)) {
      const type = object[id][key];
      // Create group key if it doesn't exist.
      if (!groups[type]) groups[type] = [];
      // Push item to group.
      groups[type].push(id);
    }
    return groups;
  };

  // Select list grouped by provided type.
  const GroupedSelect: React.FC<{
    value: string | undefined;
    itemList: Record<string, any>;
    groupBy: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  }> = ({ value, itemList, groupBy, ...restProps }) => {
    // Get list sorted by type.
    const groupedList = groupObjectByKey(itemList, groupBy);

    return (
      <select value={value || ""} {...restProps}>
        {Object.keys(groupedList).map((type) => (
          <optgroup key={type} label={type}>
            {groupedList[type].map((id) => (
              <option key={id} value={id}>
                {itemList[id].name}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    );
  };

  // Select list of different ranges in inches.
  const InchRangeSelect: React.FC<{
    value: number | undefined;
    min: number;
    max: number;
    displayMm?: boolean;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  }> = ({ value, min, max, displayMm, ...restProps }) => {
    let elements: JSX.Element[] = [];
    
    // Build options.
    for (let i = min; i <= max; i++) {
      const displayValue = displayMm ? (i * 25.4).toFixed(1) : i;
      elements.push(
        <option key={i} value={i}>
          {displayValue}
          {displayMm ? " mm" : '"'}
        </option>
      );
    }
   
    return (
      <select value={value || 0} {...restProps}>
        {elements}
      </select>
    );
  };
  
  const WheelWidthSelect: React.FC<{
    value: number | undefined;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  }> = ({value, ...restProps}) => {
    let elements: JSX.Element[] = []
    const options = [205, 225, 245, 255, 275, 285, 305, 315, 345]

    for(const option of options) {
      elements.push(
        <option key={option} value={option}>
          {option}
          mm
        </option>
      )
    }

    return (
      <select value={value} {...restProps}>
        {elements}
      </select>
    )
  }
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
              setVehicle({ id: e.target.value })
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
                setVehicle({ color: e.target.value })
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
              setVehicle({ rim: e.target.value }) 
            }}
          />
        </div>

        {/* Primary Rim Color */}
        <div className="field field-rim-color">
          <label>Color</label>
          <select
            value={currentVehicle.rim_color || ""}
            onChange={(e) => {
              setVehicle({ rim_color: e.target.value })
            }}
          >
            <option value="flat_black">Flat Black</option>
            <option value="gloss_black">Gloss Black</option>
            <option value="silver">Silver</option>
            <option value="chrome">Chrome</option>
            <option value="body">Body match</option>
          </select>
        </div>

        {/* Secondary Rim Color */}
        <div className="field field-rim-color">
          <label>Accent</label>
          <select
            value={currentVehicle.rim_color_secondary || ""}
            onChange={(e) =>
              setVehicle({ rim_color_secondary: e.target.value })
            }
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
            <label>Diameter</label>
            <InchRangeSelect
              value={currentVehicle.rim_diameter}
              min={14}
              max={24}
              onChange={(e) =>
                setVehicle({ rim_diameter: parseFloat(e.target.value) })
              }
            />
          </div>

          {/* Front Rim Width */}
          <div className="field field-rim-width">
            <label>Front Width</label>
            <WheelWidthSelect
             value={currentVehicle.rim_front_width}
             onChange={(e) =>
              setVehicle({ rim_front_width: (parseFloat(e.target.value)) })
            }
            />
          </div>
          {/* Front Rim Width */}
          <div className="field field-rim-width">
            <label>Rear Width</label>
            <WheelWidthSelect
             value={currentVehicle.rim_rear_width}
             onChange={(e) =>
              setVehicle({ rim_rear_width: (parseFloat(e.target.value)) })
            }
            />
          </div>
        </div>
      </EditorSection>

      {/* Tires */}
      <EditorSection title="Tires" icon={<TireIcon className="icon" />}>
        <div className="field field-tire-type">
          {/* Tire */}
          <div className="field field-tire-type">
            <label>Type</label>
            <GroupedSelect
              value={currentVehicle.tire || ""}
              itemList={vehicleConfigs.wheels.tires}
              groupBy="make"
              onChange={(e) => setVehicle({ tire: e.target.value })}
            />
          </div>

          {/* Tire Size */}
          <div className="field field-tire-size">
            <label>Size</label>
            <InchRangeSelect
              value={currentVehicle.tire_diameter}
              min={20}
              max={30}
              onChange={(e) =>
                setVehicle({ tire_diameter: parseFloat(e.target.value) })
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
