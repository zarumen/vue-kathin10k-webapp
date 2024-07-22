import axios from 'axios'

const baseURL = import.meta.env.VITE_BASE_URL
// const baseURL2 = import.meta.env.VUE_APP_APIURL2

const instance = axios.create({
  baseURL: baseURL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    'X-Api-Key': process.env.VUE_APP_APIKEY
  }
})

// const instance2 = axios.create({
//   baseURL: baseURL2,
//   timeout: 60000,
//   headers: {
//     'Content-Type': 'application/json',
//     'X-Api-Key': process.env.VUE_APP_APIKEY2
//   }
// })

export default {
  getData (action) {
    let url = `${baseURL}`
    url += action
    console.log(url)
    return instance.get(url)
  },
  postData (action, data) {
    let url = `${baseURL}`
    url += action
    return instance.post(url, data)
  },
  putData (action, data) {
    let url = `${baseURL}`
    url += action
    return instance.put(url, data)
  },
  deleteData (action) {
    let url = `${baseURL}`
    url += action
    return instance.delete(url)
  }
}

// export const apiRGT = {
//   getData (action) {
//     let url = `${baseURL2}`
//     url += action
//     return instance2.get(url)
//   },
//   postData (action, data) {
//     let url = `${baseURL2}`
//     url += action
//     return instance2.post(url, data)
//   },
// }
