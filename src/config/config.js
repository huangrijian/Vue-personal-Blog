const isProduction = process.env.NODE_ENV === 'production'
const baseUrl = isProduction ? 'http://112.124.52.188:4000/' : 'http://127.0.0.1:4000/'

export {
  baseUrl
}