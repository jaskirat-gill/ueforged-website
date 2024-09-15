import { memo, useMemo, useEffect, useRef, FC } from 'react';
import { useGLTF } from '@react-three/drei';
import { Vector3, Group, Mesh } from 'three';
import useAnimateHeight from '../hooks/useAnimateHeight';
import vehicleConfigs from '../util/vehicleConfig';
import useMaterialProperties from '../hooks/useMaterialProperties';
import { VehicleConfig } from '../util/types';

// Define types for props and vehicle data.
interface WheelsProps {
  rim: string;
  rim_diameter: number;
  rim_front_width: number;
  rim_rear_width: number;
  rim_color: string;
  rim_color_secondary: string;
  tire: string;
  tire_diameter: number;
  offset: number;
  wheelbase: number;
  axleHeight: number;
  color: string;
  roughness: number;
}

interface BodyProps {
  id: string;
  height: number;
  color: string;
  roughness: number;
  setVehicle: (vehicle: Partial<VehicleConfig>) => void;
}

interface VehicleProps {
  currentVehicle: VehicleConfig
  setVehicle: (vehicle: Partial<VehicleConfig>) => void;
}

// Calculate point on line (a to b, at length).
const linePoint = (a: Vector3, b: Vector3, length: number): Vector3 => {
  const dir = b.clone().sub(a).normalize().multiplyScalar(length);
  return a.clone().add(dir);
}

// Model loader.
const Model: FC<{ path: string }> = memo(({ path, ...props }) => {
  const model = useGLTF(path);
  return <primitive object={model.scene} {...props} />;
});

// Wheels.
const Wheels: FC<WheelsProps> = memo(({
  rim, rim_diameter, rim_front_width, rim_rear_width, rim_color, rim_color_secondary,
  tire, tire_diameter, offset, wheelbase, axleHeight, color, roughness
}) => {
  const { setObjectMaterials } = useMaterialProperties();

  const converted_rim_front_width = rim_front_width / 25.4
  const converted_rim_rear_width = rim_rear_width / 25.4

  // Load models.
  const rimGltf = useGLTF(vehicleConfigs.wheels.rims[rim].model);
  const tireGltf = useGLTF(vehicleConfigs.wheels.tires[tire].model);

  // Scale tires for the front and rear.
  const frontTireGeometry = useMemo(() => {
    // Determine y scale for front tire.
    const wheelFrontWidth = (converted_rim_front_width * 2.54) / 100;
    const frontWidthScale = wheelFrontWidth / vehicleConfigs.wheels.tires[tire].width;

    return scaleTireGeometry(tireGltf, frontWidthScale, rim_diameter, tire_diameter, tire);
  }, [tireGltf, rim_diameter, converted_rim_front_width, tire, tire_diameter]);

  const rearTireGeometry = useMemo(() => {
    // Determine y scale for rear tire.
    const wheelRearWidth = (converted_rim_rear_width * 2.54) / 100;
    const rearWidthScale = wheelRearWidth / vehicleConfigs.wheels.tires[tire].width;

    return scaleTireGeometry(tireGltf, rearWidthScale, rim_diameter, tire_diameter, tire);
  }, [tireGltf, rim_diameter, converted_rim_rear_width, tire, tire_diameter]);

  // Calculate rim scale as a percentage of diameter.
  const odScale = useMemo(() => ((rim_diameter * 2.54) / 100 + 0.03175) / vehicleConfigs.wheels.rims[rim].od, [rim, rim_diameter]);

  // Set rim color.
  useEffect(() => {
    setObjectMaterials(rimGltf.scene, color, roughness, rim_color, rim_color_secondary);
  }, [rimGltf.scene, setObjectMaterials, rim_color, rim_color_secondary, color, roughness]);

  // Build wheel transforms for front and rear wheels.
  const wheelTransforms = useMemo(() => {
    const rotation = (Math.PI * 90) / 180;
    const steering = (Math.PI * -10) / 180;
    return [
      { key: 'FL', position: [offset, axleHeight, wheelbase / 2] as [number, number, number], rotation: [0, rotation + steering, 0] as [number, number, number], tireGeometry: frontTireGeometry, widthScale: converted_rim_front_width },
      { key: 'FR', position: [-offset, axleHeight, wheelbase / 2] as [number, number, number], rotation: [0, -rotation + steering, 0] as [number, number, number], tireGeometry: frontTireGeometry, widthScale: converted_rim_front_width },
      { key: 'RL', position: [offset, axleHeight, -wheelbase / 2] as [number, number, number], rotation: [0, rotation, 0] as [number, number, number], tireGeometry: rearTireGeometry, widthScale: converted_rim_rear_width },
      { key: 'RR', position: [-offset, axleHeight, -wheelbase / 2] as [number, number, number], rotation: [0, -rotation, 0] as [number, number, number], tireGeometry: rearTireGeometry, widthScale: converted_rim_rear_width },
    ];
  }, [offset, axleHeight, wheelbase, frontTireGeometry, rearTireGeometry, converted_rim_front_width, converted_rim_rear_width]);

  return (
    <group name='Wheels'>
      {wheelTransforms.map(({ key, position, rotation, tireGeometry, widthScale }) => (
        <group key={key} position={position} rotation={rotation}>
          <primitive name='Rim' object={rimGltf.scene.clone()} scale={[odScale, odScale, (widthScale / 25.4)]} />
          <mesh name='Tire' geometry={tireGeometry} castShadow>
            <meshStandardMaterial color='#121212' />
          </mesh>
        </group>
      ))}
    </group>
  );
});

// Helper function to scale tire geometry
const scaleTireGeometry = (tireGltf: any, widthScale: number, rim_diameter: number, tire_diameter: number, label: string) => {
  const tireOD = vehicleConfigs.wheels.tires[label].od / 2;
  const tireID = vehicleConfigs.wheels.tires[label].id ? vehicleConfigs.wheels.tires[label].id / 2 : 0;

  const newOd = (tire_diameter * 2.54) / 10 / 2;
  const newId = (rim_diameter * 2.54) / 10 / 2;

  // Create a copy of the original geometry.
  const mesh = tireGltf.scene.children[0] as Mesh;
  const geometry = mesh.geometry.clone();

  // Scale to match wheel width.
  geometry.scale(1, 1, widthScale);

  // Get position attributes.
  const positionAttribute = geometry.getAttribute('position');
  const positionArray = positionAttribute.array;

  // Loop through vertices to adjust the shape based on rim and tire diameters.
  for (let i = 0, l = positionAttribute.count; i < l; i++) {
    const startVector = new Vector3().fromBufferAttribute(positionAttribute, i);
    const centerVector = new Vector3(0, 0, startVector.z);
    const centerDist = centerVector.distanceTo(startVector);
    const rimDist = centerDist - tireID;
    const percentOut = rimDist / (tireOD - tireID);
    const newRimDist = (percentOut * (newOd - newId) + newId) / 10;
    const setVector = linePoint(centerVector, startVector, newRimDist);
    positionArray[i * 3] = setVector.x;
    positionArray[i * 3 + 1] = setVector.y;
  }

  return geometry;
};



  
  
// Body.
const Body: FC<BodyProps> = memo(({ id, height, color, roughness }) => {
  const vehicle = useRef<Group>(null);
  const { setObjectMaterials } = useMaterialProperties();

  // Set body color.
  useEffect(() => {
    if (vehicle.current) {
      setObjectMaterials(vehicle.current, color, roughness);
     
    }
  }, [setObjectMaterials, color, roughness]);


  // Animate height.
  useAnimateHeight(vehicle, height, height + 0.1);

  return (
    <group ref={vehicle} name='Body' key={id}>
      <Model path={vehicleConfigs.vehicles[id].model} />
    </group>
  );
});

// Vehicle.
const Vehicle: FC<VehicleProps> = ({ currentVehicle, setVehicle }) => {
  const { id, color, roughness, lift, wheel_offset, rim, rim_diameter, rim_front_width, rim_rear_width, rim_color, rim_color_secondary, tire, tire_diameter } = currentVehicle;

  // Get wheel (axle) height.
  const axleHeight = useMemo(() => (tire_diameter * 2.54) / 100 / 2, [tire_diameter]);

  // Get lift height in meters.
  const liftHeight = useMemo(() => {
    const liftInches = lift || 0;
    return (liftInches * 2.54) / 100;
  }, [lift]);

  // Get vehicle height.
  const vehicleHeight = useMemo(() => axleHeight + liftHeight, [axleHeight, liftHeight]);

  const offset = vehicleConfigs.vehicles[id]['wheel_offset'] + wheel_offset;
  const wheelbase = vehicleConfigs.vehicles[id]['wheelbase'];

  return (
    <group name='Vehicle'>
      <Body id={id} height={vehicleHeight} color={color} roughness={roughness} setVehicle={setVehicle} />
      <Wheels
        rim={rim}
        rim_diameter={rim_diameter}
        rim_front_width={rim_front_width}
        rim_rear_width={rim_rear_width}
        rim_color={rim_color}
        rim_color_secondary={rim_color_secondary}
        tire={tire}
        tire_diameter={tire_diameter}
        offset={offset}
        axleHeight={axleHeight}
        wheelbase={wheelbase}
        color={color}
        roughness={roughness}
      />
    </group>
  );
};

export default Vehicle;
