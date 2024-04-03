// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }
//
// module.exports = nextConfig
//
// const withVideos = require('next-videos')
//
// module.exports = withVideos()

/** @type {import('next').NextConfig} */
const withVideos = require('next-videos');

const imagesURl = {
  domains : ['earth-birder-image-bucket.s3.amazonaws.com','blogs.earthbirder.com']
}
module.exports = withVideos({
  images : imagesURl,
  env: {
    GOOGLE_MAP_API_KEY: process.env.GOOGLE_MAP_API_KEY,
    baseUrl : process.env.baseUrl,
    PUSHER_APP_ID : process.env.PUSHER_APP_ID,
    PUSHER_APP_KEY : process.env.PUSHER_APP_KEY,
    PUSHER_SECRET_KEY : process.env.PUSHER_SECRET_KEY,
    PUSHER_CLUSTER : process.env.PUSHER_CLUSTER,
    GOOGLETRANSLATE : process.env.GOOGLETRANSLATE
  },

});