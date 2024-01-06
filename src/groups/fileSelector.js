import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import fileSelcss from "./fileSelector.module.css";
import FileUploader from "./fileUploader";
import { useDispatch} from "react-redux";
import { dataSliceActions } from "../store/data";

const FileSelector = (props) => {
  const dispatch = useDispatch();
  
  function backbuttonHandler() {
    dispatch(dataSliceActions.imageWindowLoader());
  }
  return (
    <div className={fileSelcss.container}>
      <div className={fileSelcss.backbtn}>
        <BsFillArrowLeftCircleFill
          className={fileSelcss.backbtnIcon}
          onClick={backbuttonHandler}
        ></BsFillArrowLeftCircleFill>
      </div>
     
      <div className={fileSelcss.FileSelector}>
        <FileUploader></FileUploader>
      </div>

      <div className={fileSelcss.input}></div>
    </div>
  );
};
export default FileSelector;
