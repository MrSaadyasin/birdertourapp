const userAuthInitialState = {
    access_token : "",
    userData : "",
    role : "",
    booking_id : null
}

export default function userAuthReducer(state = userAuthInitialState , action) {
    switch (action.type) {
        case "ADD_ROLE":
            return({
                ...state,
                role: action.payload
            });

        case "Login":
            if(action.payload.status === 200 && action.payload?.data?.user?.role === "user"){
                return({
                    userData: action.payload?.data?.user,
                    access_token : action.payload?.data?.token
                })
            }
        case 'LOGOUT':
            return {
                ...state,
                access_token: '',
                userData : {}
            }
        case "BOOKING_ID":
            return {
                ...state,
                booking_id: action.payload?._id
            }
        case "REMOVE_BOOKING_ID":
            return {
                ...state,
                booking_id: null
            }
            case "UPDATE_PROFILE" :
            if(action.payload.status === 200 && action.payload?.data?.user?.role == "user"){
                return({
                    ...state,
                    userData: action.payload?.data?.user,
                })
            }
        default :
            return  state;
    }
}