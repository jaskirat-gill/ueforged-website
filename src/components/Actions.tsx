import { useCallback } from "react";
import Swal from "sweetalert2";
import { VehicleConfig } from "../util/types";

interface ActionsProps {
  currentVehicle: VehicleConfig;
}
const Actions = ({ currentVehicle }: ActionsProps) => {
  // Share current config.
  const shareVehicle = useCallback(() => {
    // Generate shareable URL.
    const jsonString = JSON.stringify(currentVehicle);
    const encodedConfig = encodeURIComponent(jsonString);
    const shareableUrl = `${window.location.origin}?config=${encodedConfig}`;
    // Notify user with the link element and copy button.
    Swal.fire({
      title: "Share Your Vehicle",
      text: "Copy this link to save or share your vehicle configuration:",
      html: `<a href="${shareableUrl}">Shareable link</a>`,
      showCancelButton: true,
      confirmButtonText: "Copy Link",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // Copy the shareable URL to the clipboard.
        navigator.clipboard
          .writeText(shareableUrl)
          .then(() => {
            // Notify the user that the link has been copied.
            Swal.fire(
              "Copied!",
              "The shareable link has been copied to your clipboard.",
              "success"
            );
          })
          .catch((error) => {
            // Handle error.
            Swal.fire(
              "Error",
              "An error occurred while copying the link to the clipboard." +
                error,
              "error"
            );
          });
      }
    });
  }, [currentVehicle]);

  // Trigger screenshot.
  const takeScreenshot = () => {
    window.dispatchEvent(new Event("takeScreenshot"));
  };

  return (
    <div id="actions">
      <button onClick={shareVehicle}>Share</button>
      <button onClick={takeScreenshot}>Screenshot</button>
    </div>
  );
};

export default Actions;
