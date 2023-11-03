import axios from "axios";
import { useEffect } from "react";

const HomePage=()=>{
    useEffect(() => {
   

        // axios
        //   .get(`http://localhost:4000/user/getmsg`, {
        //     headers: { Authorization: localStorage.getItem("token") },
        //   })
        //   .then((response) => {
        //     console.log(response);
        //     localStorage.setItem("chat", JSON.stringify(response.data));
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
     
         
        
        
        
        const intervalId = setInterval(() => {
const chatArray = JSON.parse(localStorage.getItem("chat"));
     
     let lastMessageId;
     if(chatArray){
        lastMessageId=chatArray[chatArray.length-1].id;
     }
console.log(lastMessageId);
            console.log("chatArray")
          axios
            .get(`http://localhost:4000/user/getmsg?lastmsgId=${lastMessageId}`, {
              headers: { Authorization: localStorage.getItem("token") },
            })
            .then((response) => {
              console.log("array",response.data);
              //chatarray length is 6 annd new array length is 7
              if(chatArray){
                console.log("chatarray",chatArray)
               let mergedarray=chatArray.concat(response.data)
            console.log("mergedarray",mergedarray)
            localStorage.setItem("chat",JSON.stringify(mergedarray))
              }
              else{
                localStorage.setItem("chat", JSON.stringify(response.data))
              }
              
            
           
            })
            .catch((err) => {
    
              console.log(err);
            });
        }, 3000);
        return () => {
          clearInterval(intervalId);
        };
      }, []);

}
export default HomePage
