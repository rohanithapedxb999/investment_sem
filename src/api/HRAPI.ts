import {getNumber} from '../_metronic/helpers'
import {setupAxios} from '../app/modules/auth'
import {
  BandMasterInput,
  CallAllowanceMasterInput,
  ConfigurationsMasterInput,
  JobFamilyMasterInput,
  NSAMasterInput,
  OtherAllowanceMasterInput,
  SalaryMasterInput,
  ShiftAllowanceMasterInput,
} from '../types/HRModuleTypes'
import {api} from './apiMiddleware'
import API from './apiUrl'

export function getJobFamilies() {
  const {token} = setupAxios()
  return api.get(`/${API.JOB_FAMILY}/all`, token, false).then((res) => res)
}

export function getJobFamiliesById(id: string) {
  const {token} = setupAxios()
  return api.get(`/${API.JOB_FAMILY}/${id}`, token, false).then((res) => res)
}

export function deleteJobFamilies(id: string) {
  const {token} = setupAxios()
  return api.delete(`/${API.JOB_FAMILY}/${id}`, token, true).then((res) => res)
}

export function addJobFamilies(formField: JobFamilyMasterInput) {
  const {token} = setupAxios()
  return api
    .post(
      `/${API.JOB_FAMILY}`,
      token,
      {
        body: JSON.stringify({name: formField.jobName.trim()}),
      },
      true
    )
    .then((res) => res)
}

export function updateJobFamiliesById(formField: JobFamilyMasterInput, id: string) {
  const {token} = setupAxios()
  return api
    .put(
      `/${API.JOB_FAMILY}/${id}`,
      token,
      {
        body: JSON.stringify({name: formField.jobName.trim()}),
      },
      true
    )
    .then((res) => res)
}

export function getBands() {
  const {token} = setupAxios()
  return api.get(`/${API.BAND}/all`, token, false).then((res) => res)
}

export function getBandsById(id: string) {
  const {token} = setupAxios()
  return api.get(`/${API.BAND}/${id}`, token, false).then((res) => res)
}

export function deleteBands(id: string) {
  const {token} = setupAxios()
  return api.delete(`/${API.BAND}/${id}`, token, true).then((res) => res)
}

export function addBands(formField: BandMasterInput) {
  const {token} = setupAxios()
  return api
    .post(
      `/${API.BAND}`,
      token,
      {
        body: JSON.stringify({name: formField.bandName.trim()}),
      },
      true
    )
    .then((res) => res)
}

export function updateBandsById(formField: BandMasterInput, id: string) {
  const {token} = setupAxios()
  return api
    .put(
      `/${API.BAND}/${id}`,
      token,
      {
        body: JSON.stringify({name: formField.bandName.trim()}),
      },
      true
    )
    .then((res) => res)
}

export function getNSAMaster() {
  const {token} = setupAxios()
  return api.get(`/${API.NIGHT_SHIFT_ALLOWANCE}`, token, false).then((res) => res)
}

export function getNSAMasterById(id: string) {
  const {token} = setupAxios()
  return api.get(`/${API.NIGHT_SHIFT_ALLOWANCE}/${id}`, token, false).then((res) => res)
}

export function deleteNSAMaster(id: string) {
  const {token} = setupAxios()
  return api.delete(`/${API.NIGHT_SHIFT_ALLOWANCE}/${id}`, token, true).then((res) => res)
}

export function addNSAMaster(formField: NSAMasterInput) {
  const {token} = setupAxios()
  return api
    .post(
      `/${API.NIGHT_SHIFT_ALLOWANCE}`,
      token,
      {
        body: JSON.stringify({
          monthly: getNumber(formField.cost),
          country: {id: formField.country},
        }),
      },
      true
    )
    .then((res) => res)
}

export function updateNSAMasterById(formField: NSAMasterInput, id: string) {
  const {token} = setupAxios()
  return api
    .put(
      `/${API.NIGHT_SHIFT_ALLOWANCE}/${id}`,
      token,
      {
        body: JSON.stringify({
          monthly: getNumber(formField.cost),
          country: {id: formField.country},
        }),
      },
      true
    )
    .then((res) => res)
}

export function getSalaryMaster() {
  const {token} = setupAxios()
  return api.get(`/${API.SALARY}`, token, false).then((res) => res)
}

export function getSalaryMasterById(id: string) {
  const {token} = setupAxios()
  return api.get(`/${API.SALARY}/${id}`, token, false).then((res) => res)
}

export function deleteSalaryMaster(id: string) {
  const {token} = setupAxios()
  return api.delete(`/${API.SALARY}/${id}`, token, true).then((res) => res)
}

export function addSalaryMaster(formField: SalaryMasterInput) {
  const {token} = setupAxios()
  return api
    .post(
      `/${API.SALARY}`,
      token,
      {
        body: JSON.stringify({
          country: {id: formField.Country},
          jobFamily: {id: formField.JobFamily},
          band: {id: formField.Level},
          hourly: formField.SalaryType === 'hourly' ? Number(getNumber(formField.Hourly)) : null,
          monthly: formField.SalaryType === 'monthly' ? Number(getNumber(formField.Monthly)) : null,
          yearly: formField.SalaryType === 'yearly' ? Number(getNumber(formField.Yearly)) : null,
          fringePercentage: getNumber(formField.Fringe),
        }),
      },
      true
    )
    .then((res) => res)
}

export function updateSalaryMasterById(formField: SalaryMasterInput, id: string) {
  const {token} = setupAxios()
  return api
    .put(
      `/${API.SALARY}/${id}`,
      token,
      {
        body: JSON.stringify({
          country: {id: formField.Country},
          jobFamily: {id: formField.JobFamily},
          band: {id: formField.Level},
          hourly: formField.SalaryType === 'hourly' ? Number(getNumber(formField.Hourly)) : null,
          monthly: formField.SalaryType === 'monthly' ? Number(getNumber(formField.Monthly)) : null,
          yearly: formField.SalaryType === 'yearly' ? Number(getNumber(formField.Yearly)) : null,
          fringePercentage: getNumber(formField.Fringe),
        }),
      },
      true
    )
    .then((res) => res)
}

export function getCallAllowances() {
  const {token} = setupAxios()
  return api.get(`/${API.CALL_ALLOWANCE}`, token, false).then((res) => res)
}

export function getCallAllowancesById(id: string) {
  const {token} = setupAxios()
  return api.get(`/${API.CALL_ALLOWANCE}/${id}`, token, false).then((res) => res)
}

export function deleteCallAllowances(id: string) {
  const {token} = setupAxios()
  return api.delete(`/${API.CALL_ALLOWANCE}/${id}`, token, true).then((res) => res)
}

export function addCallAllowances(formField: CallAllowanceMasterInput) {
  const {token} = setupAxios()
  return api
    .post(
      `/${API.CALL_ALLOWANCE}`,
      token,
      {
        body: JSON.stringify({
          monthly: getNumber(formField.cost),
          country: {id: formField.country},
        }),
      },
      true
    )
    .then((res) => res)
}

export function updateCallAllowances(formField: CallAllowanceMasterInput, id: string) {
  const {token} = setupAxios()
  return api
    .put(
      `/${API.CALL_ALLOWANCE}/${id}`,
      token,
      {
        body: JSON.stringify({
          monthly: getNumber(formField.cost),
          country: {id: formField.country},
        }),
      },
      true
    )
    .then((res) => res)
}

export function getShiftAllowances() {
  const {token} = setupAxios()
  return api.get(`/${API.SHIFT_ALLOWANCE}`, token, false).then((res) => res)
}

export function getShiftAllowancesById(id: string) {
  const {token} = setupAxios()
  return api.get(`/${API.SHIFT_ALLOWANCE}/${id}`, token, false).then((res) => res)
}

export function deleteShiftAllowances(id: string) {
  const {token} = setupAxios()
  return api.delete(`/${API.SHIFT_ALLOWANCE}/${id}`, token, true).then((res) => res)
}

export function addShiftAllowances(formField: ShiftAllowanceMasterInput) {
  const {token} = setupAxios()
  return api
    .post(
      `/${API.SHIFT_ALLOWANCE}`,
      token,
      {
        body: JSON.stringify({
          monthly: getNumber(formField.cost),
          country: {id: formField.country},
        }),
      },
      true
    )
    .then((res) => res)
}

export function updateShiftAllowances(formField: ShiftAllowanceMasterInput, id: string) {
  const {token} = setupAxios()
  return api
    .put(
      `/${API.SHIFT_ALLOWANCE}/${id}`,
      token,
      {
        body: JSON.stringify({
          monthly: getNumber(formField.cost),
          country: {id: formField.country},
        }),
      },
      true
    )
    .then((res) => res)
}

export function getOtherAllowances() {
  const {token} = setupAxios()
  return api.get(`/${API.Other_ALLOWANCE}`, token, false).then((res) => res)
}

export function getOtherAllowancesById(id: string) {
  const {token} = setupAxios()
  return api.get(`/${API.Other_ALLOWANCE}/${id}`, token, false).then((res) => res)
}

export function deleteOtherAllowances(id: string) {
  const {token} = setupAxios()
  return api.delete(`/${API.Other_ALLOWANCE}/${id}`, token, true).then((res) => res)
}

export function addOtherAllowances(formField: OtherAllowanceMasterInput) {
  const {token} = setupAxios()
  return api
    .post(
      `/${API.Other_ALLOWANCE}`,
      token,
      {
        body: JSON.stringify({
          name: formField.componentName,
          offRoll: getNumber(formField.offRoleCost),
          onRoll: getNumber(formField.onRoleCost),
        }),
      },
      true
    )
    .then((res) => res)
}

export function updateOtherAllowances(formField: OtherAllowanceMasterInput, id: string) {
  const {token} = setupAxios()
  return api
    .put(
      `/${API.Other_ALLOWANCE}/${id}`,
      token,
      {
        body: JSON.stringify({
          name: formField.componentName,
          offRoll: getNumber(formField.offRoleCost),
          onRoll: getNumber(formField.onRoleCost),
        }),
      },
      true
    )
    .then((res) => res)
}

export function getConfigurations() {
  const {token} = setupAxios()
  return api.get(`/${API.CONFIGURATION}`, token, false).then((res) => res)
}

export function getConfigurationsById(id: string) {
  const {token} = setupAxios()
  return api.get(`/${API.CONFIGURATION}/${id}`, token, false).then((res) => res)
}

export function deleteConfigurations(id: string) {
  const {token} = setupAxios()
  return api.delete(`/${API.CONFIGURATION}/${id}`, token, true).then((res) => res)
}

export function addConfigurations(formField: ConfigurationsMasterInput) {
  const {token} = setupAxios()
  return api
    .post(
      `/${API.CONFIGURATION}`,
      token,
      {
        body: JSON.stringify({
          country: formField.country === 'Global' ? null : {id: formField.country},
          option: formField.componentName.value,
          value: getNumber(formField.value),
          unit: formField.componentName.unit,
        }),
      },
      true
    )
    .then((res) => res)
}

export function updateConfigurations(formField: ConfigurationsMasterInput, id: string) {
  const {token} = setupAxios()
  return api
    .put(
      `/${API.CONFIGURATION}/${id}`,
      token,
      {
        body: JSON.stringify({
          country: formField.country === 'Global' ? null : {id: formField.country},
          option: formField.componentName.value,
          value: getNumber(formField.value),
          unit: formField.componentName.unit,
        }),
      },
      true
    )
    .then((res) => res)
}
export function getOccupationById(id: string) {
  const {token} = setupAxios()
  return api.get(`/${API.JOB_FAMILY}/${id}`, token, false).then((res) => res)
}
