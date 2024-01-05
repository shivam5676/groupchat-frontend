import { useState } from "react";

const useCustomDomain = () => {
  const [url, setUrl] = useState("http://localhost:4000");

  return url;
};
export default useCustomDomain;
