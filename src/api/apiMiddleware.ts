import {toast} from 'react-toastify'
import Swal from 'sweetalert2'
import {Message} from '../_metronic/helpers'
import {AUTH_LOCAL_STORAGE_KEY} from '../app/modules/auth'
import {API_BASE_URL} from '../contants'

let isLoggingOut = false
let isError = false
let userMessage = async (url: string) => {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn')
  if (isLoggedIn) {
    if (isLoggingOut) {
      await new Promise((resolve) => setTimeout(resolve, 5000)) // You can adjust the wait time as needed
    }

    if (url === '/logout') {
      setTimeout(() => {
        isLoggingOut = false
        sessionStorage.removeItem(AUTH_LOCAL_STORAGE_KEY)
        sessionStorage.removeItem('currentUserRole')
        sessionStorage.removeItem('isLoggedIn')
        sessionStorage.removeItem('isUserLoggedOut')
        window.location.replace(process.env.REACT_APP_FRONTEND_URL ?? '')
        Swal.close()
      }, 900)
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Your session has expired. So logging out',
        heightAuto: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading()
        },
      })

      // Set the flag to true to indicate logout API call in progress
      isLoggingOut = true
      setTimeout(() => {
        isLoggingOut = false
        sessionStorage.removeItem(AUTH_LOCAL_STORAGE_KEY)
        sessionStorage.removeItem('currentUserRole')
        sessionStorage.removeItem('isLoggedIn')
        sessionStorage.removeItem('isUserLoggedOut')
        window.location.replace(process.env.REACT_APP_FRONTEND_URL ?? '')
        Swal.close()
      }, 1200)
    }
  }
}

let getContent = (contentNotNeeded: boolean | undefined, token: string | null) => {
  let header = {}
  if (contentNotNeeded) {
    header = {headers: {Authorization: `Bearer ${token}`}}
  } else {
    header = {headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`}}
  }
  return header
}

let getResponse = async (response: any, url: string, isMessageRequired: boolean) => {
  let responseJson: any = await response.json()
  if (responseJson.statusCode === 401) {
    userMessage(url)
  } else {
    if (responseJson.statusCode !== 200 && isMessageRequired !== false) {
      Message(responseJson.message, 'error')
    } else if (responseJson.statusCode === 200 && isMessageRequired !== false) {
      toast.success(responseJson.message)
    }
    return responseJson
  }
}

let getError = async (url: string, error?: any) => {
  console.log('in error')
  if (error) {
    if (error.message === 'Failed to fetch') {
      if (isError) {
        if (url === '/logout') {
          await new Promise((resolve) => setTimeout(resolve, 50))
        } else {
          await new Promise((resolve) => setTimeout(resolve, 100000000))
        } // You can adjust the wait time as needed
      }
      isError = true
      Swal.fire({
        icon: 'warning',
        title: 'Something Went wrong',
        heightAuto: false,
        allowOutsideClick: false,
        confirmButtonText: 'Try Again',
        allowEscapeKey: false,
      }).then((result) => {
        if (result) {
          isError = false
          window.location.reload()
        }
      })
    } else {
    }
    return Promise.reject(error)
  } else {
    Swal.fire({
      icon: 'warning',
      title: 'Check your Internet',
      heightAuto: false,
      confirmButtonText: 'Try Again',
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result) {
        window.location.reload()
      }
    })
  }
}

export const api = {
  // Add other HTTP methods as needed
  get: async (
    url: string,
    token: string | null,
    isMessageRequired: boolean,
    options?: Object,
    contentNotNeeded?: boolean
  ) => {
    let header = getContent(contentNotNeeded, token)
    let internetConnection = window.navigator.onLine ? true : false
    if (internetConnection) {
      return await fetch(API_BASE_URL + url, {
        method: 'GET',
        ...options,
        ...header,
      })
        .then(async (response) => {
          return getResponse(response, url, isMessageRequired)
        })
        .catch((error) => {
          // Handle response error
          return getError(url, error)
        })
    } else {
      getError(url)
    }
  },
  post: async (
    url: string,
    token: string | null,
    options: Object,
    isMessageRequired: boolean,
    contentNotNeeded?: boolean
  ) => {
    let header = getContent(contentNotNeeded, token)
    let internetConnection = window.navigator.onLine ? true : false
    if (internetConnection) {
      return await fetch(API_BASE_URL + url, {
        method: 'POST',
        ...options,
        ...header,
      })
        .then(async (response) => {
          return getResponse(response, url, isMessageRequired)
        })
        .catch((error) => {
          // Handle response error
          return getError(url, error)
        })
    } else {
      getError(url)
    }
  },
  put: async (
    url: string,
    token: string | null,
    options: Object,
    isMessageRequired: boolean,
    contentNotNeeded?: boolean
  ) => {
    let header = getContent(contentNotNeeded, token)
    let internetConnection = window.navigator.onLine ? true : false
    if (internetConnection) {
      return await fetch(API_BASE_URL + url, {
        method: 'PUT',
        ...options,
        ...header,
      })
        .then(async (response) => {
          return getResponse(response, url, isMessageRequired)
        })
        .catch((error) => {
          // Handle response error
          return getError(url, error)
        })
    } else {
      getError(url)
    }
  },
  delete: async (
    url: string,
    token: string | null,
    isMessageRequired: boolean,
    options?: Object,
    contentNotNeeded?: boolean
  ) => {
    let header = getContent(contentNotNeeded, token)
    let internetConnection = window.navigator.onLine ? true : false
    if (internetConnection) {
      return await fetch(API_BASE_URL + url, {
        method: 'DELETE',
        ...options,
        ...header,
      })
        .then(async (response) => {
          return getResponse(response, url, isMessageRequired)
        })
        .catch((error) => {
          // Handle response error
          return getError(url, error)
        })
    } else {
      getError(url)
    }
  },
}
