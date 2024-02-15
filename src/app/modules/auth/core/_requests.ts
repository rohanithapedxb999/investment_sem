import {api} from '../../../../api/apiMiddleware'
import {setupAxios} from './AuthHelpers'

export const GET_USER_BY_ACCESSTOKEN_URL = `/verify_token`
export const LOGIN_URL = `/login`
export const REFRESHTOKEN_URL = `/refresh-token`
export const LOGOUT_URL = `/logout`
export const REGISTER_URL = `/register`
export const REQUEST_PASSWORD_URL = `/forgot_password`

export async function login(email: string, password: string, terminateSession: boolean) {
  const {token} = setupAxios()
  const res = await api.post(
    LOGIN_URL,
    token,
    {
      body: JSON.stringify({
        email: email,
        password: password,
        terminateSession: terminateSession,
      }),
    },
    false
  )
  return await res
}
export async function logoutUser() {
  const {token, id} = setupAxios()
  const res = await api.post(
    LOGOUT_URL,
    token,
    {
      body: JSON.stringify({
        userId: id,
      }),
    },
    false
  )
  return await res
}
