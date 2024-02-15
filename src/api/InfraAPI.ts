import {getNumber} from '../_metronic/helpers'
import {setupAxios} from '../app/modules/auth'
import {SeatMasterInput, TransportMasterInput} from '../types/InfraModuleTypes'
import {api} from './apiMiddleware'
import API from './apiUrl'

export async function getSeatMasters() {
  const {token} = setupAxios()
  return api.get(`/${API.SEAT_MASTER}`, token, false).then((res) => res)
}

export async function deleteSeatMasters(id: string) {
  const {token} = setupAxios()
  return api.delete(`/${API.SEAT_MASTER}/${id}`, token, true).then((res) => res)
}

export async function addSeatMasters(formField: SeatMasterInput) {
  const {token} = setupAxios()
  return api
    .post(
      `/${API.SEAT_MASTER}`,
      token,
      {
        body: JSON.stringify({
          country: {id: formField.country},
          city: {id: formField.city},
          location: {id: formField.location},
          cost: getNumber(formField.cost),
          active: formField.active === 'true' ? true : false,
          seat: getNumber(formField.seats),
        }),
      },
      true
    )
    .then((res) => res)
}

export async function getSeatMastersById(id: string) {
  const {token} = setupAxios()
  return api.get(`/${API.SEAT_MASTER}/${id}`, token, false).then((res) => res)
}

export async function updateSeatMasters(formField: SeatMasterInput, id: string) {
  const {token} = setupAxios()
  return api
    .put(
      `/${API.SEAT_MASTER}/${id}`,
      token,
      {
        body: JSON.stringify({
          country: {id: formField.country},
          city: {id: formField.city},
          location: {id: formField.location},
          cost: getNumber(formField.cost),
          active: formField.active === 'true' ? true : false,
          seat: getNumber(formField.seats),
        }),
      },
      true
    )
    .then((res) => res)
}

export async function getTransportMasters() {
  const {token} = setupAxios()
  return api.get(`/${API.TRANSPORT_MASTER}`, token, false).then((res) => res)
}

export async function deleteTransportMasters(id: string) {
  const {token} = setupAxios()
  return api.delete(`/${API.TRANSPORT_MASTER}/${id}`, token, true).then((res) => res)
}

export async function addTransportMasters(formField: TransportMasterInput) {
  const {token} = setupAxios()
  return api
    .post(
      `/${API.TRANSPORT_MASTER}`,
      token,
      {
        body: JSON.stringify({
          country: {id: formField.country},
          city: {id: formField.city},
          cost: getNumber(formField.cost),
        }),
      },
      true
    )
    .then((res) => res)
}

export async function getTransportMastersById(id: string) {
  const {token} = setupAxios()
  return api.get(`/${API.TRANSPORT_MASTER}/${id}`, token, false).then((res) => res)
}

export async function updateTransportMasters(formField: TransportMasterInput, id: string) {
  const {token} = setupAxios()
  return api
    .put(
      `/${API.TRANSPORT_MASTER}/${id}`,
      token,
      {
        body: JSON.stringify({
          country: {id: formField.country},
          city: {id: formField.city},
          cost: getNumber(formField.cost),
        }),
      },
      true
    )
    .then((res) => res)
}
