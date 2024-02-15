import Swal, {SweetAlertResult} from 'sweetalert2'
import {Message, clearInputError} from '../../../../_metronic/helpers'
import {
  addRoles,
  deleteRoles,
  getFeaturesByModuleId,
  getModules,
  getRolesById,
  updateRolesById,
} from '../../../../api/AdminAPI'
import API from '../../../../api/apiUrl'
import {DELETE_MESSAGE, UPDATE_MESSAGE} from '../../../../contants'
import {RoleMasterInitialInput} from '../../../../data/AdminModuleDefaultData'
import {AlertProps} from '../../../../data/AlertDefaults'
import {
  ModuleOutput,
  RoleMasterFeatureInputType,
  RoleMasterInput,
} from '../../../../types/AdminModuleTypes'
import {
  APIResponse,
  InputErrorType,
  SelectValueType,
  SubmitAPIStatusType,
  TableHeaderDataType,
} from '../../../../types/OtherTypes'

export const deleteRole = (
  id: string,
  getRole: Function,
  setRole: Function,
  setFormField: Function,
  setEditId: Function,
  setInputError: Function,
  setFeatures: Function,
  setInputFeatures: Function,
  setShowForm: Function
) => {
  cancelSubmit(setFormField, setEditId, setInputError, setFeatures, setInputFeatures, setShowForm)
  Swal.fire({...AlertProps, icon: 'warning', title: DELETE_MESSAGE}).then(
    (result: SweetAlertResult) => {
      if (result.isConfirmed) {
        deleteRoles(id).then((res: APIResponse) => {
          if (res.statusCode === 200) {
            getRole(API.ROLES, setRole)
          }
        })
      }
    }
  )
}

export const getRoleByID = (
  id: string,
  formField: RoleMasterInput,
  setFormField: Function,
  setEditId: Function,
  setInputError: Function,
  setFeatures: Function,
  setInputFeatures: Function,
  setShowForm: Function
) => {
  getRolesById(id).then((res: APIResponse) => {
    if (res.statusCode === 200) {
      getFeaturesByModuleId(
        res.data[0].features.length > 0 ? res.data[0].features[0]?.module.id : '-'
      ).then((res2: APIResponse) => {
        if (res2.statusCode === 200) {
          setShowForm(true)
          let features: RoleMasterFeatureInputType = {}
          for (let i = 0; i < res2.data.length; i++) {
            if (res.data[0].features.length > 0) {
              for (let j = 0; j < res.data[0].features.length; j++) {
                if (res2.data[i].id === res.data[0].features[j].id) {
                  features[`${res2.data[i].id}`] = true
                  break
                } else {
                  features[`${res2.data[i].id}`] = false
                }
              }
            } else {
              features[`${res2.data[i]}`] = true
            }
          }
          setFeatures(res2.data)
          setInputFeatures(features)
        } else {
          setFeatures([])
          setInputFeatures({})
        }
      })
      setFormField({
        ...formField,
        roleName: res.data[0].name,
        module: res.data[0].features?.length > 0 ? res.data[0].features[0]?.module?.id ?? '-' : '',
      })
      setEditId(id)
      setInputError({})
      window.scrollTo(0, 0)
    } else {
      Message(res.message, 'error')
    }
  })
}

export const handleSubmit = (
  formField: RoleMasterInput,
  getRole: Function,
  setRole: Function,
  setEditId: Function,
  setFormField: Function,
  editId: string | null,
  setInputError: Function,
  validateForm: Function,
  setFeatures: Function,
  setInputFeatures: Function,
  inputFeatures: RoleMasterFeatureInputType,
  setSubmitAPIStatus: Function,
  setShowForm: Function
) => {
  let {cnt, error} = validateForm(formField, inputFeatures)
  setInputError(error)
  if (cnt === 0) {
    if (editId === null) {
      setSubmitAPIStatus((prev: SubmitAPIStatusType) => ({...prev, loading: true}))
      addRoles(formField, inputFeatures).then((res: APIResponse) => {
        if (res.statusCode === 200) {
          getRole(API.ROLES, setRole)
          cancelSubmit(
            setFormField,
            setEditId,
            setInputError,
            setFeatures,
            setInputFeatures,
            setShowForm
          )
        }
        setSubmitAPIStatus((prev: SubmitAPIStatusType) => ({...prev, loading: false}))
      })
    } else {
      Swal.fire({...AlertProps, icon: 'warning', title: UPDATE_MESSAGE}).then(
        (result: SweetAlertResult) => {
          if (result.isConfirmed) {
            setSubmitAPIStatus((prev: SubmitAPIStatusType) => ({...prev, loading: true}))
            updateRolesById(formField, editId, inputFeatures).then((res: APIResponse) => {
              if (res.statusCode === 200) {
                getRole(API.ROLES, setRole)
                cancelSubmit(
                  setFormField,
                  setEditId,
                  setInputError,
                  setFeatures,
                  setInputFeatures,
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

export const cancelSubmit = (
  setFormField: Function,
  setEditId: Function,
  setInputError: Function,
  setFeatures: Function,
  setInputFeatures: Function,
  setShowForm: Function
) => {
  setEditId(null)
  setFeatures([])
  setShowForm(false)
  setInputFeatures({})
  setFormField(RoleMasterInitialInput)
  setInputError({})
}

export const validateForm = (
  formField: RoleMasterInput,
  inputFeatures: RoleMasterFeatureInputType
) => {
  let cnt = 0
  const error: InputErrorType = {}
  let alphaRegex = /^([a-z]+(\s{1})?)+[a-z\d]+$/i
  if (!formField.roleName.trim()) {
    cnt = cnt + 1
    error.roleName = 'User Role Name is required'
  } else {
    if (formField.roleName.trim().length <= 1) {
      cnt = cnt + 1
      error.roleName = 'User Role Name must be greater than 1 characters'
    } else {
      if (!alphaRegex.test(formField.roleName.trim())) {
        cnt = cnt + 1
        error.roleName =
          'User Role Name should start and end with a letter or number. It can contain only letters (A-Z), numbers (0-9), or a single space.'
      } else {
        if (formField.roleName.replaceAll(' ', '').length > 50) {
          cnt = cnt + 1
          error.roleName = 'User Role Name should not be greater than 50 characters'
        }
      }
    }
  }
  if (!formField.module) {
    cnt = cnt + 1
    error.module = 'Module Name is required'
  } else {
    let selected = 0
    Object.keys(inputFeatures).forEach(function (key, index) {
      if (inputFeatures[key]) selected = +1
    })
    if (selected === 0) {
      cnt = cnt + 1
      error.feature = 'At least one feature is required'
    }
  }

  return {error, cnt}
}

export const handleModuleChange = (
  value: string | null,
  setFormField: Function,
  inputError: InputErrorType,
  setInputError: Function,
  setFeatures: Function,
  setInputFeatures: Function
) => {
  clearInputError('module', inputError, setInputError)
  if (value !== null) {
    setFormField((prev: RoleMasterInput) => ({
      ...prev,
      module: value,
    }))
    getFeaturesByModuleId(value).then((res: APIResponse) => {
      if (res.statusCode === 200) {
        let features: RoleMasterFeatureInputType = {}
        res.data.map((feat: {id: string}) => {
          features[`${feat.id}`] = true
        })
        setFeatures(res.data)
        setInputFeatures(features)
      } else {
        setFeatures([])
        setInputFeatures({})
      }
    })
  }
}

export const getModuleData = (setModules: Function) => {
  getModules().then((res: APIResponse) => {
    let Modules: SelectValueType[] = []
    if (res.statusCode === 200) {
      res.data.map((obj: ModuleOutput) => {
        Modules.push({label: obj.description, value: obj.id})
      })
      setModules(Modules)
    } else {
      setModules(Modules)
    }
  })
}

export const roleTableHeaderData: TableHeaderDataType[] = [
  {
    th: {
      id: 'name',
      style: {
        minWidth: '90px',
        width: '100px',
      },
    },
    text: 'User Role',
  },
  {
    th: {
      id: 'module',
      style: {
        minWidth: '90px',
        width: '100px',
      },
    },
    text: 'Module',
  },
  {
    th: {
      id: 'features',
      style: {
        minWidth: '90px',
        width: '100px',
      },
    },
    text: 'Features',
  },
  {
    th: {
      id: 'actions',
      style: {
        width: '100px',
        minWidth: '70px',
      },
    },
    text: 'Actions',
    justifyContent: 'end',
    isSortable: false,
  },
]
