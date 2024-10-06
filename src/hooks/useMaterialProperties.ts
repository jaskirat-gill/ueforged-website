import { useCallback } from "react";
import { Mesh, Color, MeshStandardMaterial, Object3D } from "three";

// Define colors.
const COLORS = {
  WHITE: new Color(1, 1, 1),
  LIGHT_GREY: new Color(0.8, 0.8, 0.8),
  MED_GREY: new Color(0.5, 0.5, 0.5),
  DARK_GREY: new Color(0.2, 0.2, 0.2),
  BLACK: new Color(0.025, 0.025, 0.025),
};

// Define the material types.
type MaterialType = MeshStandardMaterial & { name?: string; color?: Color };

// Set vehicle materials.
const setMaterials = (
  material: MaterialType,
  color: string,
  roughness: number,
  rimColor?: string,
  rimColorSecondary?: string
): void => {
  // Switch material name.
  switch (true) {
    case material.name.startsWith("body"):
      material.color?.setStyle(color);
      material.metalness = 0.4;
      material.roughness = roughness;
      break;
    case material.name.startsWith("chrome"):
    case material.name === "mirror":
      material.metalness = 1;
      material.roughness = 0;
      material.color?.set(COLORS.WHITE);
      break;
    case material.name === "glass":
      material.transparent = true;
      material.metalness = 1;
      material.roughness = 0;
      material.opacity = 0.2;
      material.color?.set(COLORS.LIGHT_GREY);
      break;
    case material.name.startsWith("glass_tint"):
      material.transparent = true;
      material.metalness = 1;
      material.roughness = 0;
      material.opacity = 0.4;
      material.color?.set(COLORS.MED_GREY);
      break;
    case material.name.startsWith("glass_dark"):
      material.transparent = true;
      material.metalness = 1;
      material.roughness = 0;
      material.opacity = 0.8;
      material.color?.set(COLORS.DARK_GREY);
      break;
    case material.name.startsWith("rubber"):
      material.metalness = 0.5;
      material.roughness = 0.9;
      (material as MeshStandardMaterial).flatShading = true;
      material.color?.set(COLORS.BLACK);
      break;
    case material.name.startsWith("black"):
      material.metalness = 0;
      material.roughness = 0.5;
      material.color?.set(COLORS.BLACK);
      break;
    case material.name.startsWith("rim"):
    case material.name === "rim_secondary":
      // Switch rim color / secondary rim color.
      switch (
        material.name === "rim_secondary" ? rimColorSecondary : rimColor
      ) {
        case "silver":
          material.metalness = 0.6;
          material.roughness = 0.1;
          material.color?.set(COLORS.LIGHT_GREY);
          break;
        case "chrome":
          material.metalness = 0.8;
          material.roughness = 0;
          material.color?.set(COLORS.WHITE);
          break;
        case "gloss_black":
          material.metalness = 1;
          material.roughness = 0.1;
          material.color?.set(COLORS.BLACK);
          break;
        case "flat_black":
          material.metalness = 0.2;
          material.roughness = 1;
          material.color?.set(COLORS.BLACK);
          break;
        case "body":
          material.metalness = 0.4;
          material.roughness = roughness;
          material.color?.setStyle(color);
          break;
        default:
      }
      break;
    default:
  }
};

// Custom hook to use material properties.
export default function useMaterialProperties() {
  // Set object materials.
  const setObjectMaterials = useCallback(
    (
      object: Object3D | null,
      color: string,
      roughness: number,
      rimColor?: string,
      rimColorSecondary?: string
    ): void => {
      if (!object) return;

      // Traverse object.
      object.traverseVisible((child) => {
        if (child instanceof Mesh) {
          // Cast shadows from mesh.
          child.castShadow = true;

          // Ensure that the material is always an array.
          const materials = Array.isArray(child.material)
            ? child.material
            : [child.material];

          // Set material properties for each material.
          materials.forEach((material) => {
            setMaterials(
              material as MaterialType,
              color,
              roughness,
              rimColor,
              rimColorSecondary
            );
          });
        }
      });
    },
    []
  );

  return { setObjectMaterials };
}
