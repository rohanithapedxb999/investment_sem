import {setupAxios} from '../app/modules/auth'
import {api} from './apiMiddleware'

export async function getPartners() {
  const {token} = setupAxios()
  return await api.get(`/partners`, token, false).then((res) => res)
}

export async function getC4CData() {
  const {token} = setupAxios()
  return await api.get(`/c4c-master`, token, false).then((res) => res)
}

export async function getActivityLogs(userEmail: string | undefined) {
  const {token} = setupAxios()
  return await api.get(`/activities/${userEmail}`, token, false).then((res) => res)
}

export async function getDashboardCount() {
  const {token} = setupAxios()
  return await api.get(`/masters/count`, token, false).then((res) => res)
}
