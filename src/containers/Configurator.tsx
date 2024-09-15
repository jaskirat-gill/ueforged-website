import { useEffect, useReducer, useState } from "react";
import Header from "../components/Header";
import vehicleConfigs from "../util/vehicleConfig";
import { VehicleConfig } from "../util/types";
import ModelCanvas from "../components/Canvas";
import Editor from "../components/Editor";
import Actions from "../components/Actions";

function Configurator() {

  // Current vehicle config.
  const [currentVehicle, setVehicle] = useReducer(
    (currentVehicle: VehicleConfig, newState: Partial<VehicleConfig>) => ({
      ...currentVehicle,
      ...newState,
    }),
    vehicleConfigs.defaults
  );

  // Camera.
  const [cameraAutoRotate, setCameraAutoRotate] = useState<boolean>(false);

  useEffect(() => {
    // Get config from URL parameters.
    const urlParams = new URLSearchParams(window.location.search);
    const encodedConfig = urlParams.get("config");
    // Existing config.
    if (encodedConfig) {
      const jsonString = decodeURIComponent(encodedConfig);
      const config = JSON.parse(jsonString);
      // Overwrite current vehicle from URL parameter.
      setVehicle(config);
      // Clear URL parameters.
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  return (
    <div className="App">
      <Header/>
      <ModelCanvas
        currentVehicle={currentVehicle}
        setVehicle={setVehicle}
        cameraAutoRotate={cameraAutoRotate}
      />
      <Editor
        isActive={true}
        currentVehicle={currentVehicle}
        setVehicle={setVehicle}
        cameraAutoRotate={cameraAutoRotate}
        setCameraAutoRotate={setCameraAutoRotate}
      />
      <Actions
        currentVehicle={currentVehicle}
      />
    </div>
  );
}

export default Configurator;
