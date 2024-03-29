import React, { useState } from "react";

// Import React FilePond
import { FilePond, File, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { useSelector } from "react-redux";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const FileUploader = () => {
  const imageUrlPath = useSelector((state) => state.data.imageUploadPath);
  const [files, setFiles] = useState([]);
 

  return (
    <FilePond
      files={files}
      onupdatefiles={setFiles}
      allowMultiple={true}
      maxFiles={1}
      server={{
        url: imageUrlPath,
        process: {
          headers: { Authorization: localStorage.getItem("token") },
        },
      }}
      name="files" /* sets the file input name, it's filepond by default */
      labelIdle='Pick your Image  <span class="filepond--label-action">Browse</span>'
    />
  );
};
export default FileUploader;
