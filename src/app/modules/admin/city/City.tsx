import {useEffect, useState} from 'react'
import {clearInputError} from '../../../../_metronic/helpers'
import {addCities, updateCitiesById} from '../../../../api/AdminAPI'
import API from '../../../../api/apiUrl'
import {EDIT_ROW_COLORS} from '../../../../contants'
import {CityMasterInitialInput} from '../../../../data/AdminModuleDefaultData'
import {APIStatusData, SubmitAPIStatusData} from '../../../../data/OtherDefaultData'
import {CityMasterInput, CityMasterOutput} from '../../../../types/AdminModuleTypes'
import {InputErrorType, SelectValueType, SubmitAPIStatusType} from '../../../../types/OtherTypes'
import {
  cancelSubmit,
  deleteRecord,
  getCountryData,
  getRecords,
  getStateDataByCountry,
  handleInputChange,
  handleOtherInputChange,
  handleSubmit,
} from '../../../CommonFunctions'
import ActionColumn from '../../../components/ActionColumn'
import CustomSelectInput from '../../../components/CustomInput/CustomSelectInput'
import CustomTextInput from '../../../components/CustomInput/CustomTextInput'
import CustomTable from '../../../components/CustomTable'
import SubmitCancleButton from '../../../components/SubmitCancleButton'
import {cityTableHeaderData, getCityByID, validateForm} from './CItyFunction'

const City = () => {
  const [editId, setEditId] = useState<string | null>(null)
  const [inputError, setInputError] = useState<InputErrorType>({})
  const [submitAPIStatus, setSubmitAPIStatus] = useState<SubmitAPIStatusType>(SubmitAPIStatusData)
  const [city, setCity] = useState<CityMasterOutput>({...APIStatusData, data: []})
  const [country, setCountry] = useState<SelectValueType[]>([])
  const [state, setState] = useState<SelectValueType[]>([])
  const [formField, setFormField] = useState<CityMasterInput>(CityMasterInitialInput)
  const getTableBody = () => {
    return city?.data?.map((obj) => {
      return (
        <tr
          className={`${editId === obj?.id ?? '-' ? `${EDIT_ROW_COLORS}` : ''}`}
          key={obj?.id ?? '-'}
        >
          <td>{obj?.state?.country?.name ?? '-'}</td>
          <td>{obj?.state?.name ?? '-'}</td>
          <td>{obj?.name ?? '-'}</td>
          <td className=''>
            <ActionColumn
              edit={{
                onClick: () => {
                  getCityByID(obj.id, formField, setFormField, setEditId, setInputError, setState)
                },
              }}
              remove={{
                onClick: () =>
                  deleteRecord(
                    `${API.CITY}/${obj.id}`,
                    setCity,
                    setFormField,
                    setEditId,
                    setInputError,
                    CityMasterInitialInput,
                    () => {},
                    `${API.CITY}?sortBy=name&sort=ASC`
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
      getRecords(API.CITY, setCity)
      getRecords(`${API.CITY}?sortBy=name&sort=ASC`, setCity)
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
          <div className='card '>
            <div className='card-header'>
              <h4 className='card-title'>{editId !== null ? 'Update' : 'Add'} City</h4>
            </div>
            <div className='card-body '>
              <div className='fv-row mb-5 col-md-12'>
                <CustomSelectInput
                  data={country}
                  label='Country'
                  value={formField.country}
                  onChange={(value) => {
                    clearInputError('country', inputError, setInputError)
                    setFormField({...formField, country: value ?? '', state: ''})
                    getStateDataByCountry(value ?? '', setState)
                  }}
                  error={inputError.country}
                />
              </div>
              <div className='fv-row mb-5 col-md-12'>
                <CustomSelectInput
                  data={state}
                  label='State'
                  value={formField.state}
                  onChange={(value) => {
                    handleOtherInputChange(value, 'state', setFormField, inputError, setInputError)
                  }}
                  disabled={formField.country === ''}
                  error={inputError.state}
                />
              </div>
              <div className='fv-row mb-1 col-md-12'>
                <CustomTextInput
                  label='City Name'
                  value={formField.cityName}
                  error={inputError.cityName}
                  name='cityName'
                  id='cityName'
                  onChange={(event) =>
                    handleInputChange(event, setFormField, inputError, setInputError)
                  }
                />
              </div>
            </div>
            <SubmitCancleButton
              cancle={{
                onClick: () => {
                  cancelSubmit(setFormField, setEditId, setInputError, CityMasterInitialInput)
                },
              }}
              submit={{
                editid: editId,
                loading: submitAPIStatus.loading,
                onClick: () =>
                  handleSubmit(
                    `${API.CITY}?sortBy=name&sort=ASC`,
                    formField,
                    CityMasterInitialInput,
                    setCity,
                    setEditId,
                    setFormField,
                    editId,
                    setInputError,
                    validateForm,
                    setSubmitAPIStatus,
                    addCities,
                    updateCitiesById
                  ),
              }}
            />
          </div>
        </div>
        <div className='col-8 '>
          <CustomTable
            data={city}
            setData={setCity}
            url={API.CITY}
            tableBody={getTableBody}
            tableHeadData={cityTableHeaderData}
            tableLabel='Cities'
            defaultSorting='name'
          />
        </div>
      </div>
    </>
  )
}

export default City
