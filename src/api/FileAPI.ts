import {setupAxios} from '../app/modules/auth'
import {api} from './apiMiddleware'

export const uploadFiles = async (formdata: any) => {
  const {token} = setupAxios()
  return await api
    .post(
      `/files`,
      token,
      {
        body: formdata,
      },
      true,
      true
    )
    .then((res) => res)
}

export const deleteFiles = async (fileId: string | undefined) => {
  const {token} = setupAxios()
  return await api.delete(`/files/${fileId}`, token, true).then((res) => res)
}

export const getOpportunityFiles = async (optId: string | undefined) => {
  const {token} = setupAxios()
  return await api.get(`/opportunities/${optId}/files`, token, false).then((res) => res)
}

export const downloadFiles = async (fileId: string) => {
  const {token} = setupAxios()
  return await api.get(`/files/${fileId}`, token, false).then((res) => res)
}
