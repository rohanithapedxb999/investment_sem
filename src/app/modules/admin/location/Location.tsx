import {useEffect, useState} from 'react'
import {clearInputError} from '../../../../_metronic/helpers/AssetHelpers'
import {addLocations, updateLocationsById} from '../../../../api/AdminAPI'
import API from '../../../../api/apiUrl'
import {EDIT_ROW_COLORS} from '../../../../contants'
import {LocationMasterInitialInput} from '../../../../data/AdminModuleDefaultData'
import {APIStatusData, SubmitAPIStatusData} from '../../../../data/OtherDefaultData'
import {LocationMasterInput, LocationMasterOutput} from '../../../../types/AdminModuleTypes'
import {InputErrorType, SelectValueType, SubmitAPIStatusType} from '../../../../types/OtherTypes'
import {
  cancelSubmit,
  deleteRecord,
  getCityDataByCountry,
  getCountryData,
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
import {getLocationByID, locationTableHeaderData, validateForm} from './LocationFunction'

const Location = () => {
  const [editId, setEditId] = useState<string | null>(null)
  const [inputError, setInputError] = useState<InputErrorType>({})
  const [submitAPIStatus, setSubmitAPIStatus] = useState<SubmitAPIStatusType>(SubmitAPIStatusData)
  const [location, setLocation] = useState<LocationMasterOutput>({...APIStatusData, data: []})
  const [country, setCountry] = useState<SelectValueType[]>([])
  const [city, setCity] = useState<SelectValueType[]>([])
  const [formField, setFormField] = useState<LocationMasterInput>(LocationMasterInitialInput)
  const getTableBody = () => {
    return location?.data?.map((obj) => {
      return (
        <tr
          className={`${editId === obj?.id ?? '-' ? `${EDIT_ROW_COLORS} ` : ''}`}
          key={obj?.id ?? '-'}
        >
          <td>{obj?.city?.state?.country?.name ?? '-'}</td>
          <td>{obj?.city?.name ?? '-'}</td>
          <td>{obj?.name ?? '-'}</td>
          <td>
            <ActionColumn
              edit={{
                onClick: () => {
                  getLocationByID(
                    obj.id,
                    formField,
                    setFormField,
                    setEditId,
                    setInputError,
                    setCity
                  )
                },
              }}
              remove={{
                onClick: () =>
                  deleteRecord(
                    `${API.LOCATION}/${obj.id}`,
                    setLocation,
                    setFormField,
                    setEditId,
                    setInputError,
                    LocationMasterInitialInput
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
      getCountryData(setCountry)
      getRecords(API.LOCATION, setLocation)
    }
    return () => {
      mounted = false
    }
  }, [])
  return (
    <>
      <div className='row '>
        <div className='col-4  '>
          <div className='card '>
            <div className='card-header'>
              <h4 className='card-title'>{editId !== null ? 'Update' : 'Add'} Office Location</h4>
            </div>
            <div className='card-body '>
              <div className='fv-row mb-5 col-md-12'>
                <CustomSelectInput
                  data={country}
                  label='Country'
                  value={formField.country}
                  onChange={(value) => {
                    clearInputError('country', inputError, setInputError)
                    setFormField({...formField, country: value ?? '', city: ''})
                    getCityDataByCountry(value, setCity)
                  }}
                  error={inputError.country}
                />
              </div>
              <div className='fv-row mb-5 col-md-12'>
                <CustomSelectInput
                  data={city}
                  label='City'
                  value={formField.city}
                  onChange={(value) => {
                    handleOtherInputChange(value, 'city', setFormField, inputError, setInputError)
                  }}
                  name='city'
                  disabled={formField.country === ''}
                  error={inputError.city}
                />
              </div>
              <div className='fv-row mb-5 col-md-12'>
                <CustomTextInput
                  label='Location Name'
                  name='locationName'
                  id='locationName'
                  value={formField.locationName}
                  onChange={(event) =>
                    handleInputChange(event, setFormField, inputError, setInputError)
                  }
                  error={inputError.locationName}
                />
              </div>
            </div>
            <SubmitCancleButton
              cancle={{
                onClick: () => {
                  cancelSubmit(setFormField, setEditId, setInputError, LocationMasterInitialInput)
                },
              }}
              submit={{
                editid: editId,
                loading: submitAPIStatus.loading,
                onClick: () =>
                  handleSubmit(
                    API.LOCATION,
                    formField,
                    LocationMasterInitialInput,
                    setLocation,
                    setEditId,
                    setFormField,
                    editId,
                    setInputError,
                    validateForm,
                    setSubmitAPIStatus,
                    addLocations,
                    updateLocationsById
                  ),
              }}
            />
          </div>
        </div>
        <div className='col-8 '>
          <CustomTable
            data={location}
            setData={setLocation}
            url={API.LOCATION}
            tableBody={getTableBody}
            tableHeadData={locationTableHeaderData}
            tableLabel='Office Locations'
          />
        </div>
      </div>
    </>
  )
}

export default Location
