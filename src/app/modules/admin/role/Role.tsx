import {Button} from '@mantine/core'
import {useEffect, useState} from 'react'
import API from '../../../../api/apiUrl'
import {EDIT_ROW_COLORS} from '../../../../contants'
import {RoleMasterInitialInput} from '../../../../data/AdminModuleDefaultData'
import {APIStatusData, SubmitAPIStatusData} from '../../../../data/OtherDefaultData'
import {
  RoleMasterFeatureInputType,
  RoleMasterFeatureType,
  RoleMasterInput,
  RoleMasterOutput,
} from '../../../../types/AdminModuleTypes'
import {InputErrorType, SelectValueType, SubmitAPIStatusType} from '../../../../types/OtherTypes'
import {getRecords, handleInputChange} from '../../../CommonFunctions'
import ActionColumn from '../../../components/ActionColumn'
import CustomCheckInput from '../../../components/CustomInput/CustomCheckInput'
import CustomSelectInput from '../../../components/CustomInput/CustomSelectInput'
import CustomTextInput from '../../../components/CustomInput/CustomTextInput'
import CustomTable from '../../../components/CustomTable'
import InputErrorBox from '../../../components/InputErrorBox'
import SubmitCancleButton from '../../../components/SubmitCancleButton'
import {
  cancelSubmit,
  deleteRole,
  getModuleData,
  getRoleByID,
  handleModuleChange,
  handleSubmit,
  roleTableHeaderData,
  validateForm,
} from './RoleFunction'

const Role = () => {
  const [editId, setEditId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState<boolean>(false)
  const [inputError, setInputError] = useState<InputErrorType>({})
  const [submitAPIStatus, setSubmitAPIStatus] = useState<SubmitAPIStatusType>(SubmitAPIStatusData)
  const [role, setRole] = useState<RoleMasterOutput>({...APIStatusData, data: []})
  const [modules, setModules] = useState<SelectValueType[]>([])
  const [features, setFeatures] = useState<RoleMasterFeatureType[]>([])
  const [inputFeatures, setInputFeatures] = useState<RoleMasterFeatureInputType>({})
  const [formField, setFormField] = useState<RoleMasterInput>(RoleMasterInitialInput)
  const getTableBody = () => {
    return role?.data?.map((obj) => {
      return (
        <tr
          className={`${editId === obj?.id ?? '-' ? `${EDIT_ROW_COLORS} ` : ''}`}
          key={obj?.id ?? '-'}
        >
          <td>{obj?.name ?? '-'}</td>
          <td>{obj?.features?.length > 0 ? obj?.features[0]?.module?.description : '-'}</td>
          <td>
            {obj?.features?.map(
              (subobj: {feature: string; name: string; module: {name: string}}, index) => {
                return `${subobj.name}${obj.features.length !== index + 1 ? ', ' : ''}`
              }
            )}
          </td>
          <td>
            <ActionColumn
              edit={{
                onClick: () => {
                  getRoleByID(
                    obj.id,
                    formField,
                    setFormField,
                    setEditId,
                    setInputError,
                    setFeatures,
                    setInputFeatures,
                    setShowForm
                  )
                },
              }}
              remove={{
                onClick: () =>
                  deleteRole(
                    obj.id,
                    getRecords,
                    setRole,
                    setFormField,
                    setEditId,
                    setInputError,
                    setFeatures,
                    setInputFeatures,
                    setShowForm
                  ),
              }}
            />
          </td>
        </tr>
      )
    })
  }

  useEffect(() => {
    let mounted = true
    if (mounted) {
      getModuleData(setModules)
      getRecords(API.ROLES, setRole)
    }

    return () => {
      mounted = false
    }
  }, [])

  return (
    <>
      <div className='card my-4' hidden={!showForm}>
        <div className='card-header  mb-0 py-0'>
          <h4 className='card-title'>{editId !== null ? 'Update' : 'Add'} Role</h4>
        </div>
        <div className='card-body py-4'>
          <div className='row'>
            <div className='fv-row mb-5 col-md-2'>
              <CustomTextInput
                label='User Role Name'
                name='roleName'
                value={formField.roleName.toUpperCase()}
                onChange={(event) =>
                  handleInputChange(event, setFormField, inputError, setInputError)
                }
                id='roleName'
                error={inputError.roleName}
              />
            </div>
            <div className='fv-row mb-5 col-md-2'>
              <CustomSelectInput
                label='User Module'
                data={modules}
                value={formField.module}
                onChange={(value) => {
                  handleModuleChange(
                    value,
                    setFormField,
                    inputError,
                    setInputError,
                    setFeatures,
                    setInputFeatures
                  )
                }}
                name='module'
                error={inputError.module}
              />
            </div>
            {features.length > 0 ? (
              <div className='fv-row mb-5 col-md-12'>
                <label className='fs-6 fw-semibold mb-2'>Features</label>
                <span className='text-danger ms-1 fs-7 fw-bold'>*</span>
                <div className='row '>
                  {features.map((obj: RoleMasterFeatureType) => {
                    return (
                      <div className='col-md-2 mb-3'>
                        <CustomCheckInput
                          label={obj.name}
                          name={`${obj.id}`}
                          id={`${obj.id}`}
                          onChange={(event) =>
                            handleInputChange(event, setInputFeatures, inputError, setInputError)
                          }
                          checked={inputFeatures[`${obj.id}`]}
                        />
                      </div>
                    )
                  })}
                </div>
                {<InputErrorBox Message={inputError.feature} />}
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        <SubmitCancleButton
          cancle={{
            onClick: () => {
              cancelSubmit(
                setFormField,
                setEditId,
                setInputError,
                setFeatures,
                setInputFeatures,
                setShowForm
              )
            },
          }}
          submit={{
            editid: editId,
            loading: submitAPIStatus.loading,
            onClick: () =>
              handleSubmit(
                formField,
                getRecords,
                setRole,
                setEditId,
                setFormField,
                editId,
                setInputError,
                validateForm,
                setFeatures,
                setInputFeatures,
                inputFeatures,
                setSubmitAPIStatus,
                setShowForm
              ),
          }}
        />
      </div>

      <CustomTable
        data={role}
        setData={setRole}
        url={API.ROLES}
        tableBody={getTableBody}
        tableHeadData={roleTableHeaderData}
        tableLabel='Roles'
        newRecordButton={
          <Button
            type='button'
            className='btn btn-primary btn-sm me-3'
            onClick={() => setShowForm(true)}
            hidden={showForm}
          >
            Add Roles
          </Button>
        }
      />
    </>
  )
}

export default Role
