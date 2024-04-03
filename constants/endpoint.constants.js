import {baseUrl} from "./baseurl.constants";
export const authLogin = `${baseUrl}/auth/login`;
export const authRegister = `${baseUrl}/auth/register`;
export const authResetPassword = `${baseUrl}/auth/reset-password`;
export const authLogout = `${baseUrl}/auth/logout`;
export const authRedirectGoogle = `${baseUrl}/auth/google/callback`;
export const stripePaymentStatus = `${baseUrl}/payment/update-status`;
export const authRedirectFaceBook = `${baseUrl}/auth/facebook/callback`;
export const authForgetPassword = `${baseUrl}/auth/forget-password`;

export const allTours = `${baseUrl}/tour/all`;
export const allBlogs = `http://blogs.earthbirder.com/wp-json/wp/v2/posts`;
export const allCategories = `http://blogs.earthbirder.com/wp-json/wp/v2/categories`;
export const blogDetail = `${baseUrl}/blog/detail`;
export const allVendors = `${baseUrl}/auth/vendors`;
export const topVendors = `${baseUrl}/top-vendors`;
export const topToursApi = `${baseUrl}/tour/top`;
export const upcomingTour = `${baseUrl}/tour/upcoming`;
export const addTourWishList = `${baseUrl}/wishlist/tour`;
export const wishListTours = `${baseUrl}/wishlist/all`;

export const searchByLoction = `${baseUrl}/tour/search-by-vendor-or-location`;
export const updateUserProfile = `${baseUrl}/auth/update-profile`;
export const updateUserPassword = `${baseUrl}/auth/update-password`
export const sendChatMessage = `${baseUrl}/chat`;
export const allMessageProfile = `${baseUrl}/chat/list`;
export const allMessageofUser = `${baseUrl}/chat/message`;

export  const adminGetTerms = `${baseUrl}/terms-condition`;
