import { POPULATE_PROFILE } from "../../constants/types/users"



const initialState = {}

 const users = (state= initialState, action) => {
    switch (action.type) {
        case POPULATE_PROFILE:
            return ( action.payload)
    
        default:
            return  state
    }
}

export  default users