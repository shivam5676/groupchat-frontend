
import { FaArrowCircleLeft } from "react-icons/fa";
import groupdetailcss from "./groupDetails.module.css"
const GroupDetails=(props)=>{
    const backbuttonHandler=()=>{
        props.closeDetailPage()
      }
    return(
<div className={groupdetailcss.pageDetails}>
          <div className={groupdetailcss.Backbtn}><FaArrowCircleLeft className={groupdetailcss.backbtnicon} onClick={backbuttonHandler}></FaArrowCircleLeft></div>
          <div className={groupdetailcss.pageData}>
            <div className={groupdetailcss.pageimg}></div>

            <div className={groupdetailcss.pageTitle}>group details</div>
          </div>
          <div  className={groupdetailcss.pageMemberTitle}>group member</div>
          <div className={groupdetailcss.pageMemberList}></div>
        </div>
    )
}
export default GroupDetails;