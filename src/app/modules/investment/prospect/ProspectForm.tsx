import { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { clearInputError, getDate } from '../../../../_metronic/helpers'
import roleContext from '../../../../context/roleContext'
import { ProspectInputType } from '../../../../types/InvestmentModuleTypes'
import { InputErrorType, RoleContextValue, SelectValueType } from '../../../../types/OtherTypes'
import {
  getAdvisorsDataByRole,
  getCityData,
  getCityDataByCountry,
  getCountryData,
  getOccupationData,
  getSourceData,
  getStateData,
  getStateDataByCountry,
  handleInputChange,
  handleOtherInputChange,
} from '../../../CommonFunctions'
import CustomNumberInput from '../../../components/CustomInput/CustomNumberInput'
import CustomRadioInput from '../../../components/CustomInput/CustomRadioInput'
import CustomSelectInput from '../../../components/CustomInput/CustomSelectInput'
import CustomTextInput from '../../../components/CustomInput/CustomTextInput'
import { useAuth } from '../../auth'
import {
  calculateAge,
  handleCityChange,
  handleCityOfBirthChange,
  handleStateChange,
} from './ProspectFunction'

const ProspectForm = (props: {
  prospectType: string
  formField: ProspectInputType
  setFormField: Function
  inputError: InputErrorType
  setInputError: Function
  handleOpenModel: Function
  setState: Function
  state: SelectValueType[]
  setCity: Function
  city: SelectValueType[]
  cityOfBirth: SelectValueType[]
  setCityOfBirth: Function
  referal: SelectValueType[]
  isFormEditable: boolean
  editId: string | null
}) => {
  const {
    formField,
    inputError,
    setFormField,
    setInputError,
    handleOpenModel,
    prospectType,
    setCity,
    city,
    cityOfBirth,
    setCityOfBirth,
    referal,
    setState,
    state,
    editId,
    isFormEditable,
  } = props
  const {currentDate} = getDate()
  const {currentUser} = useAuth()
  let roleState: RoleContextValue = useContext(roleContext)
  const location = useLocation()
  const [country, setCountry] = useState<SelectValueType[]>([])
  const [sourceName, setSourceName] = useState<SelectValueType[]>([])
  const [occupation, setOccupation] = useState<SelectValueType[]>([])
  const politicalExposure: SelectValueType[] = [
    {label: 'Not Applicable', value: 'Not Applicable'},
    {label: 'Politically Exposed', value: 'Politically Exposed'},
    {label: 'Related to politically exposed', value: 'Related to politically exposed'},
  ]
  const [users, setUsers] = useState<SelectValueType[]>([])
  const martialStatus: SelectValueType[] = [
    {label: 'Married', value: 'married'},
    {label: 'Single', value: 'single'},
  ]
  const riskAppetite: SelectValueType[] = [
    {label: 'High', value: 'High'},
    {label: 'Moderate', value: 'Moderate'},
    {label: 'Low', value: 'Low'},
  ]
  const probability: SelectValueType[] = [
    {label: 'High', value: 'High'},
    {label: 'Medium', value: 'Medium'},
    {label: 'Low', value: 'Low'},
  ]

  const nationality: SelectValueType[] = [
    {label: 'Indian', value: 'Indian'},
    {label: 'Other', value: 'Other'},
  ]
  const isFormMandatory =
    Number(formField.operationalStatus) > 2 || Number(formField.status) === 5

  useEffect(() => {
    let mounted = true
    if (mounted) {
      console.log(location.pathname)
      getCountryData(setCountry)
      getStateData(setState)
      getCityData(setCity)
      getOccupationData(setOccupation)
      getSourceData(setSourceName)
      if (!location.pathname.includes('/sales-form')) {
        getAdvisorsDataByRole(
          setUsers,
          currentUser?.id ?? '',
          roleState.state === 'ADVISOR' ? 'advisor' : 'teamlead'
        )
      }
    }

    return () => {
      mounted = false
    }
  }, [])
  return (
    <>
      {' '}
      <div className='row'>
        <div className='mb-5 col-2'>
          <CustomTextInput
            label="First's Name"
            name='firstName'
            value={formField.firstName}
            disabled={!isFormEditable}
            onChange={(event) => {
              handleInputChange(event, setFormField, inputError, setInputError)
            }}
            error={inputError.firstName}
          />
        </div>
        <div className='mb-5 col-2'>
          <CustomTextInput
            label='Middle Name'
            name='middleName'
            value={formField.middleName}
            withAsterisk={false}
            disabled={!isFormEditable}
            onChange={(event) => {
              handleInputChange(event, setFormField, inputError, setInputError)
            }}
            error={inputError.middleName}
          />
        </div>
        <div className='mb-5 col-2'>
          <CustomTextInput
            label='Last Name'
            name='lastName'
            value={formField.lastName}
            disabled={!isFormEditable}
            onChange={(event) => {
              handleInputChange(event, setFormField, inputError, setInputError)
            }}
            error={inputError.lastName}
          />
        </div>
        <div className='mb-5 col-2'>
          <CustomTextInput
            label="Father's Name"
            name='fatherName'
            value={formField.fatherName}
            withAsterisk={isFormMandatory}
            disabled={!isFormEditable}
            onChange={(event) => {
              handleInputChange(event, setFormField, inputError, setInputError)
            }}
            error={inputError.fatherName}
          />
        </div>
        <div className='mb-5 col-2'>
          <CustomTextInput
            label="Mother's Name"
            name='motherName'
            value={formField.motherName}
            withAsterisk={isFormMandatory}
            disabled={!isFormEditable}
            onChange={(event) => {
              handleInputChange(event, setFormField, inputError, setInputError)
            }}
            error={inputError.motherName}
          />
        </div>
        <div className='mb-5 col-2'>
          <CustomTextInput
            label='Maiden Name'
            name='maidenName'
            value={formField.maidenName}
            withAsterisk={false}
            disabled={!isFormEditable}
            onChange={(event) => {
              handleInputChange(event, setFormField, inputError, setInputError)
            }}
            error={inputError.maidenName}
          />
        </div>
        <div className='mb-5 col-2'>
          <CustomNumberInput
            label='Contact No'
            name='contactNo'
            value={formField.contactNo}
            disabled={!isFormEditable}
            onChange={(event) => {
              handleInputChange(event, setFormField, inputError, setInputError)
            }}
            maxLength={10}
            error={inputError.contactNo}
          />
        </div>
        <div className='mb-5 col-2'>
          <CustomNumberInput
            label='Alternate Contact No'
            name='alternateMobileNo'
            value={formField.alternateMobileNo}
            disabled={!isFormEditable}
            onChange={(event) => {
              handleInputChange(event, setFormField, inputError, setInputError)
            }}
            error={inputError.alternateMobileNo}
            withAsterisk={false}
          />
        </div>
        <div className='mb-5 col-2'>
          <CustomTextInput
            label='Email'
            name='email'
            value={formField.email}
            disabled={!isFormEditable}
            onChange={(event) => {
              handleInputChange(event, setFormField, inputError, setInputError)
            }}
            error={inputError.email}
          />
        </div>
        <div className='mb-5 col-2'>
          <CustomTextInput
            label='Date of Birth'
            name='dob'
            type='date'
            max={currentDate}
            withAsterisk={isFormMandatory}
            value={formField.dob ?? ''}
            disabled={!isFormEditable}
            onChange={(event) => {
              handleInputChange(event, setFormField, inputError, setInputError)
            }}
            error={inputError.dob}
          />
        </div>
        <div className='mb-5 col-2'>
          <CustomTextInput
            label='Age'
            withAsterisk={false}
            value={
              formField.dob !== ''
                ? Math.abs(Number(calculateAge(formField.dob ?? ''))) + ' years'
                : '-'
            }
            disabled={true}
          />
        </div>
        <div className='mb-5 col-2' hidden={location.pathname.includes('/sales-form')}>
          <CustomTextInput
            label='Follow Up Date'
            name='tentativeFollowUpDate'
            type='datetime-local'
            min={currentDate}
            value={formField.tentativeFollowUpDate}
            disabled={!isFormEditable}
            onChange={(event) => {
              clearInputError('tentativeFollowUpDate', inputError, setInputError)
              clearInputError('comment', inputError, setInputError)
              setFormField({
                ...formField,
                tentativeFollowUpDate: event?.target.value ?? '',
                comment: null,
              })
            }}
            error={inputError.tentativeFollowUpDate}
          />
        </div>
        <div
          className='mb-5 col-2'
          hidden={
            !(props.editId && formField.tentativeFollowUpDate !== formField.existingFollowUpDate)
          }
        >
          <CustomTextInput
            label='Comment'
            name='comment'
            value={formField.comment ?? ''}
            disabled={!isFormEditable}
            onChange={(event) => {
              handleInputChange(event, setFormField, inputError, setInputError)
            }}
            error={inputError.comment}
          />
        </div>
        <div className='mb-5 col-2 ' hidden={location.pathname.includes('/sales-form')}>
          <CustomSelectInput
            data={
              prospectType === 'new'
                ? [
                    {
                      label: `Self`,
                      value: currentUser?.id ?? '',
                    },
                  ]
                : [
                    ...referal,
                    {
                      label: `Self`,
                      value: currentUser?.id ?? '',
                    },
                    {label: 'Add New', value: 'add new'},
                  ]
            }
            label='Referral'
            value={formField.referal}
            disabled={!isFormEditable}
            onChange={(value) => {
              value === 'add new' && handleOpenModel()
              clearInputError('referal', inputError, setInputError)
              setFormField({
                ...formField,
                referal: value ?? '',
                referalType: value === currentUser?.id ? 'new' : 'existing',
              })
            }}
            error={inputError.referal}
          />
        </div>
        <div className='mb-5 col-2' hidden={location.pathname.includes('/sales-form')}>
          <CustomSelectInput
            label='Source'
            data={sourceName}
            value={formField.sourceName}
            disabled={!isFormEditable}
            onChange={(value) => {
              handleOtherInputChange(value, 'sourceName', setFormField, inputError, setInputError)
            }}
            withAsterisk={Number(formField?.status) > 3 || location.pathname.includes('/sales')}
            error={inputError.sourceName}
          />
        </div>
        <div className='mb-5 col-2 ' hidden={location.pathname.includes('/sales-form')}>
          <CustomSelectInput
            data={users}
            label='Assign To'
            value={formField.assignedBy}
            disabled={!isFormEditable}
            onChange={(value) =>
              handleOtherInputChange(value, 'assignedBy', setFormField, inputError, setInputError)
            }
            error={inputError.assignedBy}
          />
        </div>
        <div className='mb-5 col-2'>
          <CustomTextInput
            label='Address Line 1'
            name='addressLine1'
            value={formField.addressLine1}
            disabled={!isFormEditable}
            onChange={(event) => {
              handleInputChange(event, setFormField, inputError, setInputError)
            }}
            withAsterisk={isFormMandatory}
            error={inputError.addressLine1}
          />
        </div>
        <div className='mb-5 col-2'>
          <CustomTextInput
            label='Address Line 2'
            name='addressLine2'
            value={formField.addressLine2}
            disabled={!isFormEditable}
            onChange={(event) => {
              handleInputChange(event, setFormField, inputError, setInputError)
            }}
            withAsterisk={false}
            error={inputError.addresslLine2}
          />
        </div>
        <div className='mb-5 col-2'>
          <CustomSelectInput
            data={nationality}
            label='Nationality'
            value={formField.nationality}
            disabled={!isFormEditable}
            onChange={(value) => {
              handleOtherInputChange(value, 'nationality', setFormField, inputError, setInputError)
            }}
            error={inputError.nationality}
            withAsterisk={isFormMandatory}
          />
        </div>
        <div className='mb-5 col-2'>
          <CustomSelectInput
            label='Country'
            data={country}
            value={formField.country}
            disabled={!isFormEditable}
            onChange={(value) => {
              clearInputError('country', inputError, setInputError)
              setFormField({...formField, country: value ?? '', state: '', city: ''})
              getStateDataByCountry(value ?? '', setState)
            }}
            withAsterisk={isFormMandatory}
            error={inputError.country}
          />
        </div>
        <div className='mb-5 col-2'>
          <CustomSelectInput
            label='State'
            data={state}
            value={formField.state}
            disabled={!isFormEditable}
            onChange={(value) => {
              handleStateChange(value, formField, setCity, setFormField, inputError, setInputError)
            }}
            withAsterisk={isFormMandatory}
            error={inputError.state}
          />
        </div>
        <div className='mb-5 col-2'>
          <CustomSelectInput
            label='City'
            data={city}
            value={formField.city}
            disabled={!isFormEditable}
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
            withAsterisk={isFormMandatory}
            error={inputError.city}
          />
        </div>
        <div className='mb-5 col-2'>
          <CustomNumberInput
            label='Pin Code'
            name='pin'
            value={formField.pin}
            disabled={!isFormEditable}
            onChange={(event) => {
              handleInputChange(event, setFormField, inputError, setInputError)
            }}
            withAsterisk={isFormMandatory}
            error={inputError.pin}
          />
        </div>
        <div className=' col-md-2 mb-5'>
          <CustomSelectInput
            label='Gender'
            data={[
              {label: 'Male', value: 'Male'},
              {label: 'Female', value: 'Female'},
              {label: 'Other', value: 'Other'},
            ]}
            value={formField.gender}
            disabled={!isFormEditable}
            onChange={(value) => {
              handleOtherInputChange(value, 'gender', setFormField, inputError, setInputError)
            }}
            withAsterisk={isFormMandatory}
            error={inputError.gender}
          />
        </div>
        <div className='mb-5 col-2'>
          <CustomSelectInput
            label='Occupation'
            data={occupation}
            value={formField.occupation}
            disabled={!isFormEditable}
            onChange={(value) => {
              handleOtherInputChange(value, 'occupation', setFormField, inputError, setInputError)
            }}
            withAsterisk={isFormMandatory}
            error={inputError.occupation}
          />
        </div>
        <div className='mb-5 col-2'>
          <CustomTextInput
            label='Occupation Description'
            name='occupationDesc'
            value={formField.occupationDesc}
            disabled={!isFormEditable}
            onChange={(event) => {
              handleInputChange(event, setFormField, inputError, setInputError)
            }}
            withAsterisk={isFormMandatory}
            error={inputError.occupationDesc}
          />
        </div>
        <div className=' col-md-2 mb-5'>
          <CustomSelectInput
            label='Marital Status'
            data={martialStatus}
            value={formField.maritalStatus}
            disabled={!isFormEditable}
            onChange={(value) => {
              handleOtherInputChange(
                value,
                'maritalStatus',
                setFormField,
                inputError,
                setInputError
              )
            }}
            withAsterisk={isFormMandatory}
            error={inputError.maritalStatus}
          />
        </div>
        <div className='mb-5 col-2'>
          <CustomSelectInput
            label='Political Exposure'
            data={politicalExposure}
            value={formField.politicalExposure}
            disabled={!isFormEditable}
            onChange={(value) => {
              handleOtherInputChange(
                value,
                'politicalExposure',
                setFormField,
                inputError,
                setInputError
              )
            }}
            withAsterisk={false}
            error={inputError.politicalExposure}
          />
        </div>
        <div className='mb-5 col-2'>
          <CustomSelectInput
            label='Risk Appetite'
            data={riskAppetite}
            value={formField.riskAppetite}
            disabled={!isFormEditable}
            onChange={(value) => {
              handleOtherInputChange(value, 'riskAppetite', setFormField, inputError, setInputError)
            }}
            withAsterisk={false}
            error={inputError.riskAppetite}
          />
        </div>

        <div className='mb-5 col-2' hidden={location.pathname.includes('/sales-form')}>
          <CustomSelectInput
            label='Probability'
            data={probability}
            value={formField.probability}
            disabled={!isFormEditable}
            onChange={(value) => {
              handleOtherInputChange(value, 'probability', setFormField, inputError, setInputError)
            }}
            withAsterisk={false}
            error={inputError.probability}
          />
        </div>
        <div className='mb-5 col-2'>
          <CustomNumberInput
            label='Amount'
            name='tentativeAmount'
            value={formField.tentativeAmount}
            disabled={!isFormEditable}
            onChange={(event) => {
              handleInputChange(event, setFormField, inputError, setInputError)
            }}
            withAsterisk={false}
            error={inputError.tentativeAmount}
          />
        </div>
        <div className='mb-5 col-2'>
          <CustomSelectInput
            label='Country of Birth'
            data={country}
            value={formField.countryOfBirth}
            disabled={!isFormEditable}
            onChange={(value) => {
              clearInputError('countryOfBirth', inputError, setInputError)
              setFormField({...formField, countryOfBirth: value ?? '', cityOfBirth: ''})
              getCityDataByCountry(value ?? '', setCityOfBirth)
            }}
            withAsterisk={isFormMandatory}
            error={inputError.countryOfBirth}
          />
        </div>
        <div className='mb-5 col-2'>
          <CustomSelectInput
            label='City of Birth'
            data={cityOfBirth}
            value={formField.cityOfBirth}
            disabled={!isFormEditable}
            onChange={(value) => {
              handleCityOfBirthChange(
                value,
                formField,
                setFormField,
                inputError,
                setInputError,
                setCityOfBirth
              )
            }}
            withAsterisk={isFormMandatory}
            error={inputError.cityOfBirth}
          />
        </div>
        <div className='mb-5 col-2'>
          <CustomRadioInput
            label='Residential Status'
            data={[
              {
                label: `NRI`,
                value: 'NRI',
                disabled: !isFormEditable,
              },
              {
                label: `India`,
                value: 'India',
                disabled: !isFormEditable,
              },
            ]}
            children={undefined}
            value={formField.isNRI}
            onChange={(value) => {
              handleOtherInputChange(value, 'isNRI', setFormField, inputError, setInputError)
            }}
            withAsterisk={isFormMandatory}
            error={inputError.isNRI}
          />
        </div>
      </div>
    </>
  )
}

export default ProspectForm
