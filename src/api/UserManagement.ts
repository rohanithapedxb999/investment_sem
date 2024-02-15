import {setupAxios} from '../app/modules/auth'
import {api} from './apiMiddleware'

export async function forgotPassword(email: string) {
  let {token} = setupAxios()
  return await api
    .post(
      '/users/forgot-password',
      token,
      {
        body: JSON.stringify({
          email: email + '@tatacommunications.com',
        }),
      },
      false
    )
    .then((res) => res)
}

export async function resetPassword(password: string, userId: string) {
  let {token} = setupAxios()
  return await api
    .put(
      `/user/${userId}/first-time-password-reset`,
      token,
      {
        body: JSON.stringify({
          password: password,
        }),
      },
      false
    )
    .then((res) => res)
}

export async function getUserByRole(userRoleId: string | undefined) {
  let {token} = setupAxios()
  return await api.get(`/users/filter?role=${userRoleId}`, token, false).then((res) => res)
}
