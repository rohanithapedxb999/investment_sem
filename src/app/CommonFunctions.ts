import Swal, {SweetAlertResult} from 'sweetalert2'
import {clearInputError} from '../_metronic/helpers'
import {
  getCities,
  getCityBYCountry,
  getCityBYState,
  getCountry,
  getLocationsByCityId,
  getOccupations,
  getSources,
  getStateBYCountry,
  getStates,
  getUsersByRole,
} from '../api/AdminAPI'
import {getBands, getJobFamilies} from '../api/HRAPI'

import {getAdvisorsByRole, getProspects} from '../api/InvestmentAPI'
import {api} from '../api/apiMiddleware'
import {DELETE_MESSAGE, UPDATE_MESSAGE} from '../contants'
import {AlertProps} from '../data/AlertDefaults'
import {
  CityMasterOutput,
  LocationMasterOutput,
  OccupationMasterOuput,
  StateMasterOutput,
  UserMasterOutput,
} from '../types/AdminModuleTypes'
import {BandMasterOutput, JobFamilyMasterOuput} from '../types/HRModuleTypes'
import {ProspectOutput} from '../types/InvestmentModuleTypes'
import {
  APIResponse,
  CommonApiDataType,
  InputErrorType,
  SelectValueType,
  SubmitAPIStatusType,
} from '../types/OtherTypes'
import {setupAxios} from './modules/auth'

//to get Country Data for dropdown
export const getCountryData = (setCountry: Function) => {
  getCountry().then((res) => {
    if (res.statusCode === 200) {
      let Country: SelectValueType[] = []
      res.data
        ?.sort((a: {name: string}, b: {name: string}) => {
          return 1 * a?.name?.localeCompare(b.name)
        })
        .map((obj: {id: string; name: string; isPopular: boolean}) => {
          Country.push({
            label: obj?.name ?? '-',
            value: obj?.id ?? '',
            group: obj.isPopular ? 'Popular Countries' : 'Other Countries',
          })
        })

      setCountry(Country)
    } else {
      setCountry([])
    }
  })
}

//to get city Data by state id for dropdown
export const getCityDataByState = (state: string | null, setCity: Function) => {
  let City: SelectValueType[] = []
  getCityBYState(state ?? '').then((res: APIResponse) => {
    if (res.statusCode === 200) {
      res.data.map((obj: CityMasterOutput['data'][number]) => {
        City.push({label: obj.name, value: obj.id})
      })
      setCity(City)
    } else {
      setCity(City)
    }
  })
}

//to get city Data by state id for dropdown
export const getCityDataByCountry = (state: string | null, setCity: Function) => {
  let City: SelectValueType[] = []
  getCityBYCountry(state ?? '').then((res: APIResponse) => {
    if (res.statusCode === 200) {
      res.data.map((obj: CityMasterOutput['data'][number]) => {
        City.push({label: obj.name, value: obj.id})
      })
      setCity(City)
    } else {
      setCity(City)
    }
  })
}

//to get City Data for dropdown
export const getCityData = (setCity: Function) => {
  getCities().then((res: APIResponse) => {
    if (res.statusCode === 200) {
      let City: SelectValueType[] = []
      res.data?.map((obj: CityMasterOutput['data'][number]) => {
        City.push({label: obj.name, value: obj.id})
      })
      setCity(City)
    }
  })
}

//to get Cluster Data for dropdown
export const getStateData = (setState: Function) => {
  getStates().then((res: APIResponse) => {
    if (res.statusCode === 200) {
      let State: SelectValueType[] = []
      res.data?.map((obj: StateMasterOutput['data'][number]) => {
        State.push({label: obj.name, value: obj.id})
      })
      setState(State)
    }
  })
}

//to get location data by city id for dropdown
export const getLocationDataByCity = (cityId: string, setLocation: Function) => {
  getLocationsByCityId(cityId).then((res: APIResponse) => {
    if (res.statusCode === 200) {
      let Locations: SelectValueType[] = []
      res?.data?.map((obj: LocationMasterOutput['data'][number]) => {
        Locations?.push({label: obj?.name ?? '-', value: obj?.id ?? '-'})
      })
      setLocation(Locations)
    } else {
      setLocation([{label: res?.message ?? '-', value: 'error', isdisabled: true}])
    }
  })
}

//to get state data by country id
export const getStateDataByCountry = (country: string, setState: Function) => {
  getStateBYCountry(country).then((res: APIResponse) => {
    let State: SelectValueType[] = []
    if (res.statusCode === 200) {
      res?.data?.map((obj: StateMasterOutput['data'][number]) => {
        State?.push({label: obj?.name ?? '-', value: obj?.id ?? '-'})
      })
      setState(State)
    } else {
      setState(State)
    }
  })
}

//to get Job Family Data for dropdown
export const getJobFamiliesData = (setJobFamily: Function) => {
  getJobFamilies().then((res: APIResponse) => {
    if (res.statusCode === 200) {
      let JobFamily: SelectValueType[] = []
      res?.data?.map((obj: JobFamilyMasterOuput['data'][number]) => {
        JobFamily.push({label: obj.name, value: obj.id})
      })
      setJobFamily(JobFamily)
    }
  })
}

export const getUserDataByRole = (setUserData: Function, userRole: string) => {
  getUsersByRole(userRole).then((res: APIResponse) => {
    if (res.statusCode === 200) {
      let User: SelectValueType[] = []
      res?.data?.map((obj: UserMasterOutput['data'][number]) => {
        User.push({label: `${obj?.firstName ?? ''}  ${obj?.lastName ?? ''}`, value: obj.id})
      })
      setUserData(User)
    }
  })
}

export const getAdvisorsDataByRole = (setUserData: Function,userId:string, userRole: string) => {
  getAdvisorsByRole(userId,userRole).then((res: APIResponse) => {
    if (res.statusCode === 200) {
      let User: SelectValueType[] = []
      res?.data?.map((obj: UserMasterOutput['data'][number]) => {
        User.push({label: obj.id!==userId?`${obj?.firstName ?? ''}  ${obj?.lastName ?? ''}`:'Self', value: obj.id})
      })
      setUserData(User)
    }
  })
}

//to get Job Family Data for dropdown
export const getOccupationData = (setOccupation: Function) => {
  getOccupations().then((res: APIResponse) => {
    if (res.statusCode === 200) {
      let Occupations: SelectValueType[] = []
      res?.data?.map((obj: OccupationMasterOuput['data'][number]) => {
        Occupations.push({label: obj.name, value: obj.id})
      })
      setOccupation(Occupations)
    }
  })
}

export const getSourceData = (setSource: Function) => {
  getSources().then((res: APIResponse) => {
    if (res.statusCode === 200) {
      let Sources: SelectValueType[] = []
      res?.data?.map((obj: OccupationMasterOuput['data'][number]) => {
        Sources.push({label: obj.name, value: obj.id})
      })
      setSource(Sources)
    }
  })
}

//to get Job Family Data for dropdown
export const getReferalData = (setReferal: Function) => {
  getProspects().then((res: APIResponse) => {
    if (res.statusCode === 200) {
      let referals: SelectValueType[] = []
      res?.data?.map((obj: ProspectOutput['data'][number]) => {
        referals.push({
          label: `${obj?.firstName ?? ''} ${obj?.lastName ?? ''}`,
          value: obj.id,
        })
      })
      setReferal(referals)
    }
  })
}
//To get Band Data for dropdown
export const getBandData = (setBand: Function) => {
  getBands().then((res: APIResponse) => {
    if (res.statusCode === 200) {
      let Band: SelectValueType[] = []
      res?.data?.map((obj: BandMasterOutput['data'][number]) => {
        Band.push({label: obj.name, value: obj.id})
      })
      setBand(Band)
    }
  })
}

//to handle text,number and check input field value change
export const handleInputChange = (
  event: React.SyntheticEvent,
  setFormField: Function,
  InputError: InputErrorType,
  setInputError: Function
) => {
  let target = event.target as HTMLInputElement
  clearInputError(target.name, InputError, setInputError)
  console.log(target.name, target.value, typeof target.value)
  setFormField((prev: any) => ({
    ...prev,
    [target.name]: target.type === 'checkbox' ? target.checked : target.value,
  }))
}

//to handle select, radio input field value change
export const handleOtherInputChange = (
  value: string | null | number | '' | string[] | File,
  inputName: string,
  setFormField: Function,
  InputError: InputErrorType,
  setInputError: Function
) => {
  clearInputError(inputName, InputError, setInputError)
  setFormField((prev: any) => ({
    ...prev,
    [inputName]: value,
  }))
}

//to handle tab change
export const handleTabChange = (event: React.SyntheticEvent, setActiveTab: Function) => {
  let target = event.target as HTMLInputElement
  setActiveTab(target.id)
}

//to get filter length for given master
export const getFilterLengthData = (url: string) => {
  let storageData: any = sessionStorage.getItem('filterLength')
  const pattern = /[!@#$%^&*()_{}\[\]:;<>,.?~\\/\-=|]/g
  let filterDataLength: number | null = null
  let key = url.replaceAll(pattern, '')
  if (storageData) {
    storageData = JSON.parse(storageData)
    filterDataLength = isNaN(Number(storageData[key])) ? 10 : Number(storageData[key])
  } else {
    filterDataLength = 10
  }
  return {filterDataLength}
}

//to delete record from given master
export const deleteRecord = (
  url: string,
  setData: Function,
  setFormField: Function,
  setEditId: Function,
  setInputError: Function,
  formFieldInitialState: any,
  setShowForm?: Function,
  otherUrl?: string
) => {
  cancelSubmit(setFormField, setEditId, setInputError, formFieldInitialState, setShowForm)
  const {token} = setupAxios()
  Swal.fire({...AlertProps, icon: 'warning', title: DELETE_MESSAGE}).then(
    (result: SweetAlertResult) => {
      if (result.isConfirmed) {
        api.delete(`/${url}`, token, true).then((res: APIResponse) => {
          if (res.statusCode === 200) {
            getRecords(otherUrl ? otherUrl : url.split('/')[0], setData)
          }
        })
      }
    }
  )
}

//to get all records from given master
export const getRecords = (url: string, setData: Function) => {
  setData((prev: CommonApiDataType) => ({...prev, loading: true}))
  const {token} = setupAxios()
  let otherQuery = url.includes('?')
  console.log(otherQuery)
  const {filterDataLength} = getFilterLengthData(otherQuery?url.split('?')[0]:url)
  console.log(filterDataLength)
  api
    .get(`/${url}${otherQuery ? `&` : '?'}take=${filterDataLength ?? null}`, token, false)
    .then((res: APIResponse) => {
      if (res.statusCode === 200) {
        setTimeout(() => {
          setData((prev: CommonApiDataType) => ({
            ...prev,
            loading: false,
            data: res?.data?.result ?? res?.data,
            queryData: res?.data?.queryParams ?? null,
          }))
        }, 150)
      } else {
        setData((prev: CommonApiDataType) => ({
          ...prev,
          loading: false,
          error: res.message,
          data: res.data?.result,
          queryData: res?.data?.queryParams ?? null,
        }))
      }
    })
}

//to add/update record for a given master
export const handleSubmit = (
  url: string,
  formField: any,
  formFieldInitialState: any,
  setData: Function,
  setEditId: Function,
  setFormField: Function,
  editId: string | null,
  setInputError: Function,
  validateForm: Function,
  setSubmitAPIStatus: Function,
  addRecord: Function,
  updateRecord: Function,
  setShowForm?: Function
) => {
  let {cnt, error} = validateForm(formField)
  setInputError(error)
  console.log(url)
  if (cnt === 0) {
    if (editId === null) {
      setSubmitAPIStatus((prev: SubmitAPIStatusType) => ({...prev, loading: true}))
      addRecord(formField).then((res: APIResponse) => {
        if (res.statusCode === 200) {
          getRecords(url, setData)
          cancelSubmit(setFormField, setEditId, setInputError, formFieldInitialState, setShowForm)
        }
        setSubmitAPIStatus((prev: SubmitAPIStatusType) => ({...prev, loading: false}))
      })
    } else {
      Swal.fire({...AlertProps, icon: 'warning', title: UPDATE_MESSAGE}).then(
        (result: SweetAlertResult) => {
          if (result.isConfirmed) {
            setSubmitAPIStatus((prev: SubmitAPIStatusType) => ({...prev, loading: true}))
            updateRecord(formField, editId).then((res: APIResponse) => {
              if (res.statusCode === 200) {
                getRecords(url, setData)
                cancelSubmit(
                  setFormField,
                  setEditId,
                  setInputError,
                  formFieldInitialState,
                  setShowForm
                )
              }
              setSubmitAPIStatus((prev: SubmitAPIStatusType) => ({...prev, loading: false}))
            })
          }
        }
      )
    }
  }
}

//to reset form and its error message
export const cancelSubmit = (
  setFormField: Function,
  setEditId: Function,
  setInputError: Function,
  formFieldInitialState: any,
  setShowForm?: Function
) => {
  setEditId(null)
  if (setShowForm) setShowForm(false)
  setFormField(formFieldInitialState)
  setInputError({})
}
