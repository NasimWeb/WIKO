import { createContext } from "react";

const authContext = createContext({
    isLogedin : false,
    uerInfo : {},
    login : () => {},
    logout : () => {}
})


export default authContext