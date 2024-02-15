import {useEffect, useState} from 'react'
import {addParticulars, updateParticularsById} from '../../../../api/AdminAPI'
import API from '../../../../api/apiUrl'
import {EDIT_ROW_COLORS} from '../../../../contants'
import {JobFamilyRoleMasterInitialInput} from '../../../../data/AdminModuleDefaultData'
import {APIStatusData, SubmitAPIStatusData} from '../../../../data/OtherDefaultData'
import {
  JobFamilyRoleMasterInput,
  JobFamilyRoleMasterOutput,
} from '../../../../types/AdminModuleTypes'
import {InputErrorType, SelectValueType, SubmitAPIStatusType} from '../../../../types/OtherTypes'
import {
  cancelSubmit,
  deleteRecord,
  getBandData,
  getJobFamiliesData,
  getRecords,
  handleInputChange,
  handleOtherInputChange,
  handleSubmit,
} from '../../../CommonFunctions'
import ActionColumn from '../../../components/ActionColumn'
import CustomSelectInput from '../../../components/CustomInput/CustomSelectInput'
import CustomTextInput from '../../../components/CustomInput/CustomTextInput'
import CustomTable from '../../../components/CustomTable'
import SubmitCancleButton from '../../../components/SubmitCancleButton'
import {getJobFamilyRoleByID, jobFamilyRoleTableHeaderData, validateForm} from './JobRoleFunction'

const JobFamilyRole = () => {
  const [editId, setEditId] = useState<string | null>(null)
  const [inputError, setInputError] = useState<InputErrorType>({})
  const [submitAPIStatus, setSubmitAPIStatus] = useState<SubmitAPIStatusType>(SubmitAPIStatusData)
  const [jobFamilyRole, setJobFamilyRole] = useState<JobFamilyRoleMasterOutput>({
    ...APIStatusData,
    data: [],
  })
  const [band, setBand] = useState<SelectValueType[]>([])
  const [jobFamily, setJobFamily] = useState<SelectValueType[]>([])
  const [formField, setFormField] = useState<JobFamilyRoleMasterInput>(
    JobFamilyRoleMasterInitialInput
  )
  const getTableBody = () => {
    return jobFamilyRole?.data?.map((obj) => {
      return (
        <tr
          className={`${editId === obj?.id ?? '-' ? `${EDIT_ROW_COLORS} ` : ''}`}
          key={obj?.id ?? '-'}
        >
          <td className='ps-3'>{obj?.name ?? '-'}</td>
          <td className='ps-3'>
            <span title={obj?.jobFamily === null ? '-' : obj?.jobFamily?.name ?? '-'}>
              {`${obj?.jobFamily === null ? '-' : obj?.jobFamily?.name?.slice(0, 50) ?? 0}${
                obj?.jobFamily !== null ? (obj?.jobFamily?.name?.length > 50 ? '...' : '') : ''
              }`}
            </span>
          </td>
          <td className='ps-3 text-center'>{obj?.band === null ? '-' : obj?.band?.name ?? '-'}</td>
          <td className=''>
            <ActionColumn
              edit={{
                onClick: () => {
                  getJobFamilyRoleByID(obj.id, formField, setFormField, setEditId, setInputError)
                },
              }}
              remove={{
                onClick: () =>
                  deleteRecord(
                    `${API.JOB_FAMILY_ROLES}/${obj.id}`,
                    setJobFamilyRole,
                    setFormField,
                    setEditId,
                    setInputError,
                    JobFamilyRoleMasterInitialInput
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
      getJobFamiliesData(setJobFamily)
      getBandData(setBand)
      getRecords(API.JOB_FAMILY_ROLES, setJobFamilyRole)
    }

    return () => {
      mounted = false
    }
  }, [])

  return (
    <>
      {' '}
      <div className='row '>
        <div className='col-4  '>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'> {editId !== null ? 'Update' : 'Add'} Job Family Role</h4>
            </div>
            <div className='card-body py-2'>
              <div className='fv-row mb-5'>
                <CustomTextInput
                  label='Job Family Role Name'
                  name='jobFamilyRoleName'
                  value={formField.jobFamilyRoleName}
                  onChange={(event) =>
                    handleInputChange(event, setFormField, inputError, setInputError)
                  }
                  id='jobFamilyRoleName'
                  error={inputError.jobFamilyRoleName}
                />
              </div>
              <div className='fv-row mb-5'>
                <CustomSelectInput
                  data={jobFamily}
                  value={formField.jobFamily}
                  onChange={(value) => {
                    handleOtherInputChange(
                      value,
                      'jobFamily',
                      setFormField,
                      inputError,
                      setInputError
                    )
                  }}
                  label='Job Family'
                  error={inputError.jobFamily}
                />
              </div>
              <div className='fv-row mb-5'>
                <CustomSelectInput
                  label='Band'
                  data={band}
                  value={formField.band}
                  onChange={(value) => {
                    handleOtherInputChange(value, 'band', setFormField, inputError, setInputError)
                  }}
                  error={inputError.band}
                />
              </div>
            </div>
            <SubmitCancleButton
              cancle={{
                onClick: () => {
                  cancelSubmit(
                    setFormField,
                    setEditId,
                    setInputError,
                    JobFamilyRoleMasterInitialInput
                  )
                },
              }}
              submit={{
                editid: editId,
                loading: submitAPIStatus.loading,
                onClick: () =>
                  handleSubmit(
                    API.JOB_FAMILY_ROLES,
                    formField,
                    JobFamilyRoleMasterInitialInput,
                    setJobFamilyRole,
                    setEditId,
                    setFormField,
                    editId,
                    setInputError,
                    validateForm,
                    setSubmitAPIStatus,
                    addParticulars,
                    updateParticularsById
                  ),
              }}
            />
          </div>
        </div>
        <div className='col-8 '>
          <CustomTable
            data={jobFamilyRole}
            setData={setJobFamilyRole}
            url={API.JOB_FAMILY_ROLES}
            tableBody={() => getTableBody()}
            tableHeadData={jobFamilyRoleTableHeaderData}
            tableLabel='Job Family Roles'
          />
        </div>
      </div>
    </>
  )
}

export default JobFamilyRole
