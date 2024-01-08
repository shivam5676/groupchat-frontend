import { useState } from "react";
import grouplistPrintcsss from"./groupListPrint.module.css"
import { useDispatch } from "react-redux";
import { dataSliceActions } from "../store/data";

const GroupListPrint=(props)=>{
    const [isActive, setActive] = useState(null);
    const dispatch = useDispatch();
    const [lastMessageTxt,setLastMessageTxt]=useState(props.lastmessage);
    // setLastMessageTxt()
// const isActive=props.group["id"]
const groupHandler = (group) => {
   
    dispatch(dataSliceActions.addGroupId(group.id));
    dispatch(dataSliceActions.addGroupName(group.groupName));
    dispatch(dataSliceActions.activateChatWindow());
    setActive(group.id);
  };

    return(
 <div
          className={`${grouplistPrintcsss.item} ${
            isActive === props.group.id ? grouplistPrintcsss.active : ""
          }`}
          key={props.group.id}
          onClick={() => groupHandler(props.group)}
        >
          <div className={grouplistPrintcsss.profileImg}></div>
          <div className={grouplistPrintcsss.groupInfo}>
            <div className={grouplistPrintcsss.groupName}>
              <p>{props.group.groupName}</p>
            </div>
            <div className={grouplistPrintcsss.lastMsg}>{props.lastmessage}</div>
          </div>

        </div>
    )
}
export default GroupListPrint