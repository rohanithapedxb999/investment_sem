import {getNumber} from '../_metronic/helpers'
import {setupAxios} from '../app/modules/auth'
import {
  ConnectivityMasterInput,
  ITMasterInput,
  ReimbursementMasterInput,
} from '../types/ITModuleTypes'
import {api} from './apiMiddleware'
import API from './apiUrl'

export async function getITMasters() {
  const {token} = setupAxios()
  return await api.get(`/${API.IT_MASTER}/all`, token, false).then((res) => res)
}

export async function deleteITMasters(id: string) {
  const {token} = setupAxios()
  return await api.delete(`/${API.IT_MASTER}/${id}`, token, true).then((res) => res)
}

export async function updateITMastersById(formField: ITMasterInput, id: string) {
  const {token} = setupAxios()
  return await api
    .put(
      `/${API.IT_MASTER}/${id}`,
      token,
      {
        body: JSON.stringify({
          name: !formField.resourceName ? null : formField.resourceName.trim(),
          type: formField.resourceType,
          cost: getNumber(formField.cost),
          description: formField.description.trim(),
          component: formField.componentName,
        }),
      },
      true
    )
    .then((res) => res)
}

export async function getITMastersById(id: string) {
  const {token} = setupAxios()
  return await api.get(`/${API.IT_MASTER}/${id}`, token, false).then((res) => res)
}

export async function addITMasters(formField: ITMasterInput) {
  const {token} = setupAxios()
  return await api
    .post(
      `/${API.IT_MASTER}`,
      token,
      {
        body: JSON.stringify({
          name: !formField.resourceName ? null : formField.resourceName.trim(),
          type: formField.resourceType,
          cost: getNumber(formField.cost),
          description: formField.description.trim(),
          component: formField.componentName,
        }),
      },
      true
    )
    .then((res) => res)
}

export async function getPhoneReimbursements() {
  const {token} = setupAxios()
  return await api.get(`/${API.REIMBURSEMENT}`, token, false).then((res) => res)
}

export async function deletePhoneReimbursements(id: string) {
  const {token} = setupAxios()
  return await api.delete(`/${API.REIMBURSEMENT}/${id}`, token, true).then((res) => res)
}

export async function addPhoneReimbursements(formField: ReimbursementMasterInput) {
  const {token} = setupAxios()
  return await api
    .post(
      `/${API.REIMBURSEMENT}`,
      token,
      {
        body: JSON.stringify({
          cost: getNumber(formField.Cost),
          reimbursement: formField.reimbursementType,
          type:
            formField.reimbursementType === 'handset'
              ? 'onetime'
              : formField.reimbursementType === 'phone'
              ? 'monthly'
              : '',
          country: {id: formField.country},
        }),
      },
      true
    )
    .then((res) => res)
}

export async function getPhoneReimbursementsById(id: string) {
  const {token} = setupAxios()
  return await api.get(`/${API.REIMBURSEMENT}/${id}`, token, false).then((res) => res)
}

export async function updatePhoneReimbursements(formField: ReimbursementMasterInput, id: string) {
  const {token} = setupAxios()
  return await api
    .put(
      `/${API.REIMBURSEMENT}/${id}`,
      token,
      {
        body: JSON.stringify({
          cost: getNumber(formField.Cost),
          reimbursement: formField.reimbursementType,
          type:
            formField.reimbursementType === 'handset'
              ? 'onetime'
              : formField.reimbursementType === 'phone'
              ? 'monthly'
              : '',
          country: {id: formField.country},
        }),
      },
      true
    )
    .then((res) => res)
}

export async function getConnectivityMasters() {
  const {token} = setupAxios()
  return await api.get(`/${API.CONNECTIVITY}`, token, false).then((res) => res)
}

export async function deleteConnectivityMasters(id: string) {
  const {token} = setupAxios()
  return await api.delete(`/${API.CONNECTIVITY}/${id}`, token, true).then((res) => res)
}

export async function updateConnectivityMastersById(
  formField: ConnectivityMasterInput,
  id: string
) {
  const {token} = setupAxios()
  return await api
    .put(
      `/${API.CONNECTIVITY}/${id}`,
      token,
      {
        body: JSON.stringify({
          name: formField.serviceName.trim(),
          type: formField.costType,
          cost: getNumber(formField.cost),
        }),
      },
      true
    )
    .then((res) => res)
}

export async function getConnectivityMastersById(id: string) {
  const {token} = setupAxios()
  return await api.get(`/${API.CONNECTIVITY}/${id}`, token, false).then((res) => res)
}

export async function addConnectivityMasters(formField: ConnectivityMasterInput) {
  const {token} = setupAxios()
  return await api
    .post(
      `/${API.CONNECTIVITY}`,
      token,
      {
        body: JSON.stringify({
          name: formField.serviceName.trim(),
          type: formField.costType,
          cost: getNumber(formField.cost),
        }),
      },
      true
    )
    .then((res) => res)
}
