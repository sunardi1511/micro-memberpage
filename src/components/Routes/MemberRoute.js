import { useEffect } from "react";
import { Navigate, useLocation } from 'react-router-dom'


const MemberRoute = ({ children, path }) => {
    const location = useLocation()



    const ok = localStorage.getItem("BWAMICRO:token")

    localStorage.removeItem("BWAMICRO:redirect")

    if (ok) {
        return children
    } else if (path === "/joined/:class") {
        return <Navigate to={`/login?path=${location.pathname}`} />
    }


    return <Navigate to={`/private?path=${location.pathname}`} />

}

export default MemberRoute

