import { useRef } from "react";
import "./App.css";

export const FileUploader = ({ handleFile }) => {
  const hiddenFileInput = useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    handleFile(fileUploaded);
  };
  return (
    <>
      <button className="button-upload" onClick={handleClick}>
        Choose a file
      </button>
      <input
        type="file"
        onChange={handleChange}
        ref={hiddenFileInput}
        style={{ display: "none" }} // Make the file input element invisible
      />
    </>
  );
};
