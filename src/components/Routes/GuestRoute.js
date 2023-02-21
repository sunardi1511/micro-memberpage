import {  useParams} from 'react-router-dom'




const GuestRoute = ({children}) => {

    const location = useParams()

    const ok = localStorage.getItem("BWAMICRO:token")
    const params = location?.search?.substring(1).split("&");
    const urlPath = params?.find((item) => item.indexOf("path") > 1);
    const redirect = urlPath?.split("=")?.[1];

    if (ok && redirect) {
        localStorage.setItem("BWAMICRO:redirect",redirect);
    }

  return children
   
}

export default GuestRoute