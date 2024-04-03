import axios from "axios";
import {
    addTourWishList,
    authForgetPassword,
    authLogin,
    authLogout, authRedirectFaceBook,
    authRedirectGoogle,
    authRegister, authResetPassword, searchByLoction, stripePaymentStatus, wishListTours, updateUserProfile, updateUserPassword
} from "../constants/endpoint.constants";



const authorizationHeader  = (token) => {
    return {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
    };
}

const api  = {
    // Google callback
    googleRedirect : (data) => {
        return axios.get(authRedirectGoogle + `${data}`).then((response) => {
            return response
        }).catch(error => {
            return error;
        });
    },

    stripePaymentStatus : (data, token) => {
        return axios.post(stripePaymentStatus, data, {headers :  authorizationHeader(token)}).then((response) => {
            return response
        }).catch(error => {
            return error;
        });
    },
    faceBookRedirect : (data) => {
        return axios.get( authRedirectFaceBook+ `${data}`).then((response) => {
            return response
        }).catch(error => {
            return error;
        });
    },
//     logout api
   logoutUser: (token) => {
        return axios.get(authLogout, {headers :  authorizationHeader(token)}).then(response => {
            return response;
        }).catch(error => {
            return error;
        })
   },
//    Login Api

    loginUser : (data) => {
        return axios.post(authLogin, data).then(response => {
            return response
        }).catch(error => {
            return error;
        })
    },
//     register
    registerUser : (data) => {
        return axios.post(authRegister, data).then(response =>  {
            return response;
        }).catch(error =>{
            return error;
        });
    },
//     Forget password
    forgetPassword : (data) => {
        return axios.post(authForgetPassword, data).then(response => {
            return response
        }).catch(error => {
            return error;
        })
    },
//     reset Password
    ResetPassword : (data) => {
        return axios.post(authResetPassword, data).then(response => {
            return response;
        }).catch(error => {
            return error;
        })
    },

    addTourInWishList : (data, token) => {
        return axios.post(addTourWishList, data, {headers : authorizationHeader(token)}).then(response => {
            return response;
        }).catch(error => {
            return error;
        })
    },
    searchByAddress : (data) => {
        return axios.post(searchByLoction , data, ).then(response => {
            return response;
        }).catch(error => {
            return error;
        })
    },
    searchByVendor : (data) => {
        return axios.post(searchByLoction , data, ).then(response => {
            return response;
        }).catch(error => {
            return error;
        })
    },

    updateUserProfile : (data , token) => {
        return axios.post(updateUserProfile, data, {headers : authorizationHeader(token)}).then(response => {
            return response;
        }).catch(error => {
            return error;
        })
    },
    updateUserPassword : (data , token) => {
        return axios.post(updateUserPassword, data, {headers : authorizationHeader(token)}).then(response => {
            return response;
        }).catch(error => {
            return error;
        })
    },


}
export default api;