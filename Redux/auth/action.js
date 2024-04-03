// store Role
import api from "../../api";

export function authRole(role) {

    return({
        type : "ADD_ROLE",
        payload : role
    })
};

export function  authRedirectGoogle(data) {
    return({
        type : "GOOGLE_REDIRECT",
        payload : api.googleRedirect(data)
    })
}

export function  paymentStripe(data, token) {
    return({
        type : "STRIPE_PAYMENT",
        payload : api.stripePaymentStatus(data, token)
    })
}

export function  authRedirectFaceBook(data) {
    return({
        type : "FACEBOOK_REDIRECT",
        payload : api.faceBookRedirect(data)
    })
}


export function  authLoginUserWithGoogle(data) {
    return({
        type : "Login",
        payload : data
    })
}

export function authLogoutUser(token){
    return({
        type: "LOGOUT",
        payload : api.logoutUser(token)
    })
}

export function authResetPasswordUser(data){
    return({
        type: "RESET",
        payload : api.ResetPassword(data)
    })
}


export function authForgetPassword(data){
    return({
        type: "FORGET_PASSWORD",
        payload : api.forgetPassword(data)
    })
}

export  function authUserLogin(data){
    return({
        type : "Login",
        payload : api.loginUser(data)
    })
}

export function authUserRegister(data){
    return({
        type : "register",
        payload : api.registerUser(data)
    })
}

export function storeBookingId(data){
    return({
        type : "BOOKING_ID",
        payload : data
    })
}

export function removeStoreBookingId(){
    return({
        type : "REMOVE_BOOKING_ID",
        payload : null
    })
}

export function addTourWishList(data, token){
    return({
        type : "WISH_LIST_ADD_REMOVE",
        payload : api.addTourInWishList(data, token)
    })
}

export function  SearchByLocation(data){
    return({
        type : "By_Location",
        payload : api.searchByAddress(data)
    })
}

export function  SearchByVendor(data){
    return({
        type : "By_Vendor",
        payload : api.searchByVendor(data)
    })
}

export function userProfileUpdate(data , token) {
    return({
        type : "UPDATE_PROFILE",
        payload : api.updateUserProfile(data, token)
    })
}

export function userPasswordUpdate(data , token) {
    return({
        type : "UPDATE_PASSWORD",
        payload : api.updateUserPassword(data, token)
    })
}