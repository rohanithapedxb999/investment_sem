import {AuthModel} from './_models'

const AUTH_LOCAL_STORAGE_KEY = 'kt-auth-react-v'
const getAuth = (): AuthModel | undefined => {
  if (!sessionStorage) {
    return
  }

  const lsValue: string | null = sessionStorage.getItem(AUTH_LOCAL_STORAGE_KEY)
  if (!lsValue) {
    return
  }

  try {
    const auth: AuthModel = JSON.parse(lsValue) as AuthModel
    if (auth) {
      return auth
    }
  } catch (error) {
    console.error('AUTH LOCAL STORAGE PARSE ERROR', error)
  }
}

const setAuth = (auth: AuthModel) => {
  if (!sessionStorage) {
    return
  }

  try {
    const lsValue = JSON.stringify(auth)
    sessionStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE SAVE ERROR', error)
  }
}

const removeAuth = () => {
  if (!sessionStorage) {
    return
  }

  try {
    sessionStorage.removeItem(AUTH_LOCAL_STORAGE_KEY)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error)
  }
}

export function setupAxios() {
  let token = ''
  let refreshToken = ''
  let id = ''

  const auth = getAuth()

  if (auth && auth.accessToken) {
    token = auth.accessToken
  }
  if (auth && auth.refreshToken) {
    refreshToken = auth.refreshToken
  }
  if (auth && auth.id) {
    id = auth.id
  }
  return {token, refreshToken, id}
}

export {getAuth, setAuth, removeAuth, AUTH_LOCAL_STORAGE_KEY}
