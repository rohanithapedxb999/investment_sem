import {useEffect, useMemo, useState} from 'react'
import {clearInputError, getDate} from '../../../../_metronic/helpers'
import {addUsers, updateUsersById} from '../../../../api/AdminAPI'
import API from '../../../../api/apiUrl'
import {UserMasterInitialInput} from '../../../../data/AdminModuleDefaultData'
import {APIStatusData, SubmitAPIStatusData} from '../../../../data/OtherDefaultData'
import {
  UserMasterInput,
  UserMasterOutput,
  UserMasterRoleData,
} from '../../../../types/AdminModuleTypes'
import {InputErrorType, SelectValueType, SubmitAPIStatusType} from '../../../../types/OtherTypes'
import {
  cancelSubmit,
  getCityData,
  getCountryData,
  getRecords,
  getStateData,
  getStateDataByCountry,
  getUserDataByRole,
  handleInputChange,
  handleOtherInputChange,
  handleSubmit,
} from '../../../CommonFunctions'
import CustomMultiSelectInput from '../../../components/CustomInput/CustomMultiSelectInput'
import CustomNumberInput from '../../../components/CustomInput/CustomNumberInput'
import CustomSelectInput from '../../../components/CustomInput/CustomSelectInput'
import CustomTextInput from '../../../components/CustomInput/CustomTextInput'
import SubmitCancleButton from '../../../components/SubmitCancleButton'
import {handleCityChange, handleStateChange} from '../../investment/prospect/ProspectFunction'
import Table from './Table'
import {
  getAllRoleData,
  handlelPrimaryRoleChange,
  handlelSecondaryRoleChange,
  validateForm,
} from './UserFunctions'
const UserMaster = () => {
  const [editId, setEditId] = useState<string | null>(null)
  const nationality: SelectValueType[] = [
    {label: 'Indian', value: 'Indian'},
    {label: 'Other', value: 'Other'},
  ]
  const {currentDate} = getDate()
  const [submitAPIStatus, setSubmitAPIStatus] = useState<SubmitAPIStatusType>(SubmitAPIStatusData)
  const [showForm, setShowForm] = useState<boolean>(false)
  const [country, setCountry] = useState<SelectValueType[]>([])
  const [state, setState] = useState<SelectValueType[]>([])
  const [city, setCity] = useState<SelectValueType[]>([])
  const [primaryRole, setPrimaryRole] = useState<UserMasterRoleData[]>([])
  const [secondaryRole, setSecondaryRole] = useState<UserMasterRoleData[]>([])
  const [inputError, setInputError] = useState<InputErrorType>({})
  const [user, setUser] = useState<UserMasterOutput>({...APIStatusData, data: []})
  const [formField, setFormField] = useState<UserMasterInput>(UserMasterInitialInput)
  const martialStatus: SelectValueType[] = [
    {label: 'Married', value: 'Married'},
    {label: 'UnMarried', value: 'UnMarried'},
  ]
  const [teamLeaders, setTeamLeaders] = useState<SelectValueType[]>([])
  const updateTeadLeader = useMemo(() => {
    if (editId) {
      let teamLeaderData: SelectValueType[] = [...teamLeaders]
      teamLeaders.map((teamLeader, index) => {
        if (teamLeader.value === editId) {
          teamLeaderData[index] = {
            ...teamLeaderData[index],
            disabled: true,
          }
        } else {
          teamLeaderData[index] = {
            ...teamLeaderData[index],
            disabled: false,
          }
        }
      })
      setTeamLeaders(teamLeaderData)
    }
  }, [editId])

  useEffect(() => {
    let mounted = true
    if (mounted) {
      getAllRoleData(setPrimaryRole, setSecondaryRole)
      getRecords(`${API.USER}?sortBy=name&sort=ASC`, setUser)
      getCountryData(setCountry)
      getStateData(setState)
      getCityData(setCity)
      getUserDataByRole(setTeamLeaders, 'TEAM_LEADER')
    }
    return () => {
      mounted = false
    }
  }, [])
  return (
    <>
      <div className='card my-4' hidden={!showForm}>
        <div className='card-header  mb-0 py-0'>
          <h4 className='card-title'>{editId !== null ? 'Update' : 'Add'} User</h4>
        </div>

        <div className='card-body '>
          <div className='row '>
            <div className='fv-row  col-md-2 mb-5'>
              <CustomTextInput
                name='firstName'
                value={formField.firstName}
                onChange={(event) =>
                  handleInputChange(event, setFormField, inputError, setInputError)
                }
                label='First Name'
                id='firstName'
                error={inputError.firstName}
              />
            </div>
            <div className='fv-row  col-md-2 mb-5'>
              <CustomTextInput
                label='Last Name'
                name='lastName'
                value={formField.lastName}
                onChange={(event) =>
                  handleInputChange(event, setFormField, inputError, setInputError)
                }
                error={inputError.lastName}
              />
            </div>
            <div className=' col-md-2 mb-5'>
              <CustomNumberInput
                label='Contact no'
                name='contactNo'
                value={formField.contactNo}
                onChange={(event) => {
                  handleInputChange(event, setFormField, inputError, setInputError)
                }}
                error={inputError.contactNo}
              />
            </div>
            <div className='mb-5 col-2'>
              <CustomNumberInput
                label='Alternate Contact No'
                name='alternateMobileNo'
                value={formField.alternateMobileNo}
                onChange={(event) => {
                  handleInputChange(event, setFormField, inputError, setInputError)
                }}
                error={inputError.alternateMobileNo}
                withAsterisk={false}
              />
            </div>
            <div className='col-md-2 mb-5'>
              <CustomTextInput
                type='email'
                label='Email'
                name='email'
                value={formField.email}
                onChange={(event) =>
                  handleInputChange(event, setFormField, inputError, setInputError)
                }
                error={inputError.email}
              />
            </div>
            <div className=' col-md-2 mb-5'>
              <CustomTextInput
                label='Date of Birth'
                name='dob'
                type='date'
                max={currentDate}
                value={formField.dob}
                onChange={(event) => {
                  handleInputChange(event, setFormField, inputError, setInputError)
                }}
                error={inputError.dob}
              />
            </div>
            <div className=' col-md-2 mb-5'>
              <CustomSelectInput
                label='Gender'
                data={[
                  {label: 'Male', value: 'male'},
                  {label: 'Female', value: 'female'},
                  {label: 'Other', value: 'other'},
                ]}
                value={formField.gender}
                onChange={(value) => {
                  handleOtherInputChange(value, 'gender', setFormField, inputError, setInputError)
                }}
                withAsterisk={true}
                children={undefined}
                error={inputError.gender}
              />
            </div>
            <div className=' col-md-2 mb-5'>
              <CustomSelectInput
                label='Martial status'
                data={[
                  {label: 'Married', value: 'married'},
                  {label: 'Single', value: 'single'},
                ]}
                value={formField.maritalStatus}
                onChange={(value) => {
                  handleOtherInputChange(
                    value,
                    'maritalStatus',
                    setFormField,
                    inputError,
                    setInputError
                  )
                }}
                withAsterisk={true}
                error={inputError.maritalStatus}
              />
            </div>
            <div className=' col-md-2 mb-5'>
              <CustomSelectInput
                label='Primary Role'
                data={primaryRole}
                value={formField.primaryRole.value}
                onChange={(value) => {
                  handlelPrimaryRoleChange(
                    value,
                    formField,
                    setFormField,
                    setInputError,
                    setSecondaryRole,
                    primaryRole,
                    inputError
                  )
                }}
                name='primaryrole'
                error={inputError.primaryRole}
              />
            </div>

            {formField.primaryRole.value !== '' ? (
              <div className='col-md-2 mb-5'>
                <CustomMultiSelectInput
                  label='Secondary Role'
                  data={secondaryRole}
                  value={formField.secondaryRole.map((obj) => obj.value)}
                  onChange={(value) => {
                    handlelSecondaryRoleChange(value, formField, setFormField, secondaryRole)
                  }}
                  name='secondaryrole'
                  error={inputError.role}
                  withAsterisk={false}
                />
              </div>
            ) : (
              ''
            )}
            {formField.primaryRole.module === 'ADVISOR' ||
            formField.secondaryRole.some((obj: {value: string; module: string}) =>
              obj.module === 'ADVISOR' ? true : false
            ) ? (
              <>
                <div className='col-md-2 mb-5'>
                  <CustomSelectInput
                    label='Team Leader'
                    data={teamLeaders}
                    value={formField.teamLeader}
                    onChange={(value) => {
                      handleOtherInputChange(
                        value,
                        'teamLeader',
                        setFormField,
                        inputError,
                        setInputError
                      )
                    }}
                    error={inputError.teamLeader}
                  />
                </div>
              </>
            ) : (
              ''
            )}
            <div className=' col-md-2 mb-5'>
              <CustomSelectInput
                data={nationality}
                label='Nationality'
                value={formField.nationality}
                onChange={(value) => {
                  handleOtherInputChange(
                    value,
                    'nationality',
                    setFormField,
                    inputError,
                    setInputError
                  )
                }}
                error={inputError.nationality}
              />
            </div>
            <div className='fv-row  col-md-2 mb-5'>
              <CustomTextInput
                name='addressLine1'
                value={formField.addressLine1}
                onChange={(event) =>
                  handleInputChange(event, setFormField, inputError, setInputError)
                }
                label='Address Line 1'
                error={inputError.addressLine1}
              />
            </div>
            <div className=' col-md-2 mb-5'>
              <CustomTextInput
                label='Address Line 2'
                name='addressLine2'
                value={formField.addressLine2}
                onChange={(event) => {
                  handleInputChange(event, setFormField, inputError, setInputError)
                }}
                withAsterisk={false}
                error={inputError.addresslLine2}
              />
            </div>

            <div className=' col-md-2 mb-5'>
              <CustomSelectInput
                label='Country'
                data={country}
                value={formField.country}
                onChange={(value) => {
                  clearInputError('country', inputError, setInputError)
                  setFormField({...formField, country: value ?? '', state: '', city: ''})
                  getStateDataByCountry(value ?? '', setState)
                }}
                withAsterisk={true}
                error={inputError.country}
              />
            </div>
            <div className=' col-md-2 mb-5'>
              <CustomSelectInput
                label='State'
                data={state}
                value={formField.state}
                onChange={(value) => {
                  handleStateChange(
                    value,
                    formField,
                    setCity,
                    setFormField,
                    inputError,
                    setInputError
                  )
                }}
                withAsterisk={true}
                error={inputError.state}
              />
            </div>
            <div className=' col-md-2 mb-5'>
              <CustomSelectInput
                label='City'
                data={city}
                value={formField.city}
                onChange={(value) => {
                  handleCityChange(
                    value,
                    formField,
                    setFormField,
                    inputError,
                    setInputError,
                    setState,
                    setCity
                  )
                }}
                withAsterisk={true}
                error={inputError.city}
              />
            </div>
            <div className=' col-md-2 mb-5'>
              <CustomNumberInput
                label='Pin Code'
                name='pin'
                value={formField.pin}
                onChange={(event) => {
                  handleInputChange(event, setFormField, inputError, setInputError)
                }}
                withAsterisk={true}
                error={inputError.pin}
              />
            </div>
          </div>
        </div>
        <SubmitCancleButton
          cancle={{
            onClick: () => {
              cancelSubmit(
                setFormField,
                setEditId,
                setInputError,
                UserMasterInitialInput,
                setShowForm
              )
            },
          }}
          submit={{
            editid: editId,
            loading: submitAPIStatus.loading,
            onClick: () =>
              handleSubmit(
                `${API.USER}?sortBy=name&sort=ASC`,
                formField,
                UserMasterInitialInput,
                setUser,
                setEditId,
                setFormField,
                editId,
                setInputError,
                validateForm,
                setSubmitAPIStatus,
                addUsers,
                updateUsersById,
                setShowForm
              ),
          }}
        />
      </div>

      <Table
        UserData={user}
        showForm={showForm}
        SetUser={setUser}
        SetShowForm={setShowForm}
        formField={formField}
        SetEditId={setEditId}
        SetformField={setFormField}
        setInputError={setInputError}
        EditID={editId}
        setSecondaryRole={setSecondaryRole}
        setState={setState}
        setCity={setCity}
      />
    </>
  )
}

export default UserMaster
