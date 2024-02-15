import {setupAxios} from '../app/modules/auth'
import {
  CityMasterInput,
  CountryMasterInput,
  JobFamilyRoleMasterInput,
  LocationMasterInput,
  OccupationMasterInput,
  ProductMasterInput,
  RoleMasterInput,
  SourceMasterInput,
  StateMasterInput,
  UserMasterInput,
} from '../types/AdminModuleTypes'
import {api} from './apiMiddleware'
import API from './apiUrl'

export function getOccupations() {
  const {token} = setupAxios()
  return api.get(`/${API.OCCUPATION}/all`, token, false).then((res) => res)
}

export function getOccupationsById(id: string) {
  const {token} = setupAxios()
  return api.get(`/${API.OCCUPATION}/${id}`, token, false).then((res) => res)
}


export function deleteOccupations(id: string) {
  const {token} = setupAxios()
  return api.delete(`/${API.OCCUPATION}/${id}`, token, true).then((res) => res)
}

export function addOccupations(formField: OccupationMasterInput) {
  const {token} = setupAxios()
  return api
    .post(
      `/${API.OCCUPATION}`,
      token,
      {
        body: JSON.stringify({name: formField.occupationName.trim()}),
      },
      true
    )
    .then((res) => res)
}

export function updateOccupationsById(formField: OccupationMasterInput, id: string) {
  const {token} = setupAxios()
  return api
    .put(
      `/${API.OCCUPATION}/${id}`,
      token,
      {
        body: JSON.stringify({name: formField.occupationName.trim()}),
      },
      true
    )
    .then((res) => res)
}

export function getSources() {
  const {token} = setupAxios()
  return api.get(`/${API.SOURCE}/all`, token, false).then((res) => res)
}

export function getSourcesById(id: string) {
  const {token} = setupAxios()
  return api.get(`/${API.SOURCE}/${id}`, token, false).then((res) => res)
}

export function addSources(formField: SourceMasterInput) {
  const {token} = setupAxios()
  return api
    .post(
      `/${API.SOURCE}`,
      token,
      {
        body: JSON.stringify({name: formField.sourceName.trim()}),
      },
      true
    )
    .then((res) => res)
}

export function updateSourcesById(formField: SourceMasterInput, id: string) {
  const {token} = setupAxios()
  return api
    .put(
      `/${API.SOURCE}/${id}`,
      token,
      {
        body: JSON.stringify({name: formField.sourceName.trim()}),
      },
      true
    )
    .then((res) => res)
}

export async function getCountry() {
  const {token} = setupAxios()
  return await api.get(`/${API.COUNTRY}/all`, token, false).then((res) => res)
}

export async function getCountryById(id: string) {
  const {token} = setupAxios()
  return await api.get(`/${API.COUNTRY}/${id}`, token, false).then((res) => res)
}
export async function deleteCountry(id: string) {
  const {token} = setupAxios()
  return await api.delete(`/${API.COUNTRY}/${id}`, token, true).then((res) => res)
}
export async function addCountry(formField: CountryMasterInput) {
  const {token} = setupAxios()
  return await api
    .post(
      `/${API.COUNTRY}`,
      token,
      {
        body: JSON.stringify({
          name: formField.countryName.trim(),
          isPopular: formField.isPopular,
        }),
      },
      true
    )
    .then((res) => res)
}
export async function updateCountryById(formField: CountryMasterInput, id: string) {
  const {token} = setupAxios()
  return await api
    .put(
      `/${API.COUNTRY}/${id}`,
      token,
      {
        body: JSON.stringify({
          name: formField.countryName.trim(),
          isPopular: formField.isPopular,
        }),
      },
      true
    )
    .then((res) => res)
}
export async function getCities() {
  const {token} = setupAxios()
  return await api.get(`/${API.CITY}/all`, token, false).then((res) => res)
}
export async function getCitiesById(id: string) {
  const {token} = setupAxios()
  return await api.get(`/${API.CITY}/${id}`, token, false).then((res) => res)
}
export async function deleteCities(id: string) {
  const {token} = setupAxios()
  return await api.delete(`/${API.CITY}/${id}`, token, true).then((res) => res)
}
export async function addCities(formField: CityMasterInput) {
  const {token} = setupAxios()
  return await api
    .post(
      `/${API.CITY}`,
      token,
      {
        body: JSON.stringify({
          name: formField.cityName.trim(),
          state: {id: formField.state},
          country: {id: formField.country},
        }),
      },
      true
    )
    .then((res) => res)
}
export async function updateCitiesById(formField: CityMasterInput, id: string) {
  const {token} = setupAxios()
  return await api
    .put(
      `/${API.CITY}/${id}`,
      token,
      {
        body: JSON.stringify({
          name: formField.cityName.trim(),
          state: {id: formField.state},
          country: {id: formField.country},
        }),
      },
      true
    )
    .then((res) => res)
}
export async function getStates() {
  const {token} = setupAxios()
  return await api.get(`/${API.STATE}/all`, token, false).then((res) => res)
}
export async function getStatesById(id: string) {
  const {token} = setupAxios()
  return await api.get(`/${API.STATE}/${id}`, token, false).then((res) => res)
}
export async function deleteStates(id: string) {
  const {token} = setupAxios()
  return await api.delete(`/${API.STATE}/${id}`, token, true).then((res) => res)
}
export async function addStates(formField: StateMasterInput) {
  const {token} = setupAxios()
  return await api
    .post(
      `/${API.STATE}`,
      token,
      {
        body: JSON.stringify({
          name: formField.stateName.trim(),
          country: {id: formField.country},
        }),
      },
      true
    )
    .then((res) => res)
}
export async function updateStatesById(formField: StateMasterInput, id: string) {
  const {token} = setupAxios()
  return await api
    .put(
      `/${API.STATE}/${id}`,
      token,
      {
        body: JSON.stringify({
          name: formField.stateName.trim(),
          country: {id: formField.country},
        }),
      },
      true
    )
    .then((res) => res)
}
export async function getUsers() {
  const {token} = setupAxios()
  return await api.get(`/${API.USER}`, token, false).then((res) => res)
}
export async function getUsersById(id: string) {
  const {token} = setupAxios()
  return await api.get(`/${API.USER}/${id}`, token, false).then((res) => res)
}

export async function getUsersByRole(userRole: String) {
  const {token} = setupAxios()
  return await api.get(`/${API.USER}/module/${userRole}`, token, false).then((res) => res)
}

export async function getCommentsByID(id: string) {
  try {
    const {token} = setupAxios()
    const response = await api.get(`/${API.COMMENTS}/${id}`, token, false)
    return response.data // Assuming the response data is what you want to return
  } catch (error) {
    console.error('Error in getCommentsByID:', error)
    throw error // Re-throw the error to propagate it to the calling code
  }
}

export async function deleteUsers(id: string) {
  const {token} = setupAxios()
  return await api.delete(`/${API.USER}/${id}`, token, true).then((res) => res)
}
export async function addUsers(formField: UserMasterInput) {
  const {token} = setupAxios()
  let roles: any = []
  roles.push({
    role: {id: formField.primaryRole.value},
    type: 'primary',
  })
  if (formField.secondaryRole.length !== 0) {
    formField.secondaryRole.map((obj: {value: string; module: string}) => {
      roles.push({
        role: {id: obj.value},
        type: 'secondary',
      })
    })
  }
  return await api
    .post(
      `/register`,
      token,
      {
        body: JSON.stringify({
          firstName: formField.firstName.trim(),
          lastName: formField.lastName.trim(),
          email: formField.email,
          roles: roles,
          mobileNo: formField.contactNo.trim(),
          alternateMobileNo: formField.alternateMobileNo.trim(),
          addressLine1: formField.addressLine1.trim(),
          addressLine2: formField.addressLine2.trim(),
          pin: formField.pin,
          city: formField.city,
          state: formField.state,
          country: formField.country,
          nationality: formField?.nationality,
          gender: formField.gender,
          dob: formField.dob,
          maritalStatus: formField.maritalStatus,
          teamLead: {id: !formField?.teamLeader ? null : formField.teamLeader},
        }),
      },
      true
    )
    .then((res) => res)
}
export async function updateUsersById(formField: UserMasterInput, id: string) {
  const {token} = setupAxios()
  let roles: any = []
  roles.push({
    role: {id: formField.primaryRole.value},
    type: 'primary',
  })
  if (formField.secondaryRole.length !== 0) {
    formField.secondaryRole.map((obj: {value: string; module: string}) => {
      roles.push({
        role: {id: obj.value},
        type: 'secondary',
      })
    })
  }
  return await api
    .put(
      `/${API.USER}/${id}`,
      token,
      {
        body: JSON.stringify({
          firstName: formField.firstName.trim(),
          lastName: formField.lastName.trim(),
          email: formField.email,
          roles: roles,
          mobileNo: formField.contactNo.trim(),
          alternateMobileNo: formField.alternateMobileNo.trim(),
          addressLine1: formField.addressLine1.trim(),
          addressLine2: formField.addressLine2.trim(),
          pin: formField.pin,
          city: formField.city,
          state: formField.state,
          country: formField.country,
          nationality: formField?.nationality,
          gender: formField.gender,
          dob: formField.dob,
          maritalStatus: formField.maritalStatus,
          teamLead: {id: !formField?.teamLeader ? null : formField.teamLeader},
        }),
      },
      true
    )
    .then((res) => res)
}
export async function getCountryBYClusterId(clusterId: string) {
  const {token} = setupAxios()
  return await api
    .get(`/${API.CLUSTER}/${clusterId}/${API.COUNTRY}`, token, false)
    .then((res) => res)
}
export async function getLocationsByCityId(cityId: string) {
  const {token} = setupAxios()
  return await api.get(`/${API.CITY}/${cityId}/${API.LOCATION}`, token, false).then((res) => res)
}

export async function getStateBYCountry(id: string) {
  const {token} = setupAxios()
  return await api.get(`/${API.COUNTRY}/${id}/${API.STATE}`, token, false).then((res) => res)
}

export async function getCityBYCountry(id: string) {
  const {token} = setupAxios()
  return await api.get(`/${API.COUNTRY}/${id}/${API.CITY}`, token, false).then((res) => res)
}

export async function getCityBYState(id: string) {
  const {token} = setupAxios()
  return await api.get(`/${API.STATE}/${id}/${API.CITY}`, token, false).then((res) => res)
}
export async function getRoles() {
  const {token} = setupAxios()
  return await api.get(`/${API.ROLES}/all`, token, false).then((res) => res)
}
export async function getRolesById(id: string) {
  const {token} = setupAxios()
  return await api.get(`/${API.ROLES}/${id}`, token, false).then((res) => res)
}
export async function deleteRoles(id: string) {
  const {token} = setupAxios()
  return await api.delete(`/${API.ROLES}/${id}`, token, true).then((res) => res)
}
export async function addRoles(formField: RoleMasterInput, InputFeatures: any) {
  const {token} = setupAxios()
  let selected: Array<string> = []
  Object.keys(InputFeatures).forEach(async function (key, index) {
    if (InputFeatures[key]) selected.push(key)
  })
  return await api
    .post(
      `/${API.ROLES}`,
      token,
      {
        body: JSON.stringify({
          name: formField.roleName.toUpperCase().trim(),
          module: {id: formField.module},
          features: selected,
        }),
      },
      true
    )
    .then((res) => res)
}
export async function updateRolesById(formField: RoleMasterInput, id: string, InputFeatures: any) {
  const {token} = setupAxios()
  let selected: Array<string> = []
  Object.keys(InputFeatures).forEach(async function (key, index) {
    if (InputFeatures[key]) selected.push(key)
  })
  return await api
    .put(
      `/${API.ROLES}/${id}`,
      token,
      {
        body: JSON.stringify({
          name: formField.roleName.toUpperCase().trim(),
          module: {id: formField.module},
          features: selected,
        }),
      },
      true
    )
    .then((res) => res)
}

export async function getProducts() {
  const {token} = setupAxios()
  return await api.get(`/${API.PRODUCTS}/all`, token, false).then((res) => res)
}

export async function getProductsById(id: String) {
  const {token} = setupAxios()
  return await api.get(`/${API.PRODUCTS}/${id}`, token, false).then((res) => res)
}

export async function deleteProducts(id: string) {
  const {token} = setupAxios()
  return await api.delete(`/${API.PRODUCTS}/${id}`, token, true).then((res) => res)
}

export async function addProducts(formField: ProductMasterInput) {
  const {token} = setupAxios()
  return await api
    .post(
      `/${API.PRODUCTS}`,
      token,
      {
        body: JSON.stringify({
          category: formField.category,
          productName: formField.productName.trim(),
          productTicketSize: formField.productTicketSize,
          profitPlan: formField.profitPlan,
          profitPercent: formField.profitPer,
        }),
      },
      true
    )
    .then((res) => res)
}
export async function updateProductsById(formField: ProductMasterInput, id: string) {
  const {token} = setupAxios()
  return await api
    .put(
      `/${API.PRODUCTS}/${id}`,
      token,
      {
        body: JSON.stringify({
          category: formField.category,
          productName: formField.productName.trim(),
          productTicketSize: formField.productTicketSize,
          profitPlan: formField.profitPlan,
          profitPercent: formField.profitPer,
        }),
      },
      true
    )
    .then((res) => res)
}

export async function getLevelFisrtProducts() {
  const {token} = setupAxios()
  return await api.get(`/${API.PRODUCTS}/level-first`, token, false).then((res) => res)
}

export async function getProductsByLeProductId(name: String) {
  const {token} = setupAxios()
  return await api
    .post(
      `/${API.PRODUCTS}/level-first`,
      token,
      {
        body: JSON.stringify({
          name: name,
        }),
      },
      false
    )
    .then((res) => res)
}

export async function getLocations() {
  const {token} = setupAxios()
  return await api.get(`/${API.LOCATION}`, token, false).then((res) => res)
}
export async function getLocationsById(id: string) {
  const {token} = setupAxios()
  return await api.get(`/${API.LOCATION}/${id}`, token, false).then((res) => res)
}
export async function deleteLocations(id: string) {
  const {token} = setupAxios()
  return await api.delete(`/${API.LOCATION}/${id}`, token, true).then((res) => res)
}
export async function addLocations(formField: LocationMasterInput) {
  const {token} = setupAxios()
  return await api
    .post(
      `/${API.LOCATION}`,
      token,
      {
        body: JSON.stringify({
          name: formField.locationName.trim(),
          city: {id: formField.city},
        }),
      },
      true
    )
    .then((res) => res)
}
export async function updateLocationsById(formField: LocationMasterInput, id: string) {
  const {token} = setupAxios()
  return await api
    .put(
      `/${API.LOCATION}/${id}`,
      token,
      {
        body: JSON.stringify({
          name: formField.locationName.trim(),
          city: {id: formField.city},
        }),
      },
      true
    )
    .then((res) => res)
}

export async function getParticulars() {
  const {token} = setupAxios()
  return await api.get(`/${API.JOB_FAMILY_ROLES}/all`, token, false).then((res) => res)
}
export async function getParticularsById(id: string) {
  const {token} = setupAxios()
  return await api.get(`/${API.JOB_FAMILY_ROLES}/${id}`, token, false).then((res) => res)
}
export async function deleteParticulars(id: string) {
  const {token} = setupAxios()
  return await api.delete(`/${API.JOB_FAMILY_ROLES}/${id}`, token, true).then((res) => res)
}
export async function addParticulars(formField: JobFamilyRoleMasterInput) {
  const {token} = setupAxios()
  return await api
    .post(
      `/${API.JOB_FAMILY_ROLES}`,
      token,
      {
        body: JSON.stringify({
          name: formField.jobFamilyRoleName.trim(),
          jobFamily: {id: formField.jobFamily},
          band: {id: formField.band},
        }),
      },
      true
    )
    .then((res) => res)
}
export async function updateParticularsById(formField: JobFamilyRoleMasterInput, id: string) {
  const {token} = setupAxios()
  return await api
    .put(
      `/${API.JOB_FAMILY_ROLES}/${id}`,
      token,
      {
        body: JSON.stringify({
          name: formField.jobFamilyRoleName.trim(),
          jobFamily: {id: formField.jobFamily},
          band: {id: formField.band},
        }),
      },
      true
    )
    .then((res) => res)
}

export async function getModules() {
  const {token} = setupAxios()
  return await api.get(`/${API.MODULE}`, token, false).then((res) => res)
}
export async function getFeaturesByModuleId(id: string) {
  const {token} = setupAxios()
  return await api.get(`/${API.MODULE}/${id}/features`, token, false).then((res) => res)
}
