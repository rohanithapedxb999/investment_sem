import {useEffect, useState} from 'react'
import {addCountry, updateCountryById} from '../../../../api/AdminAPI'
import API from '../../../../api/apiUrl'
import {EDIT_ROW_COLORS} from '../../../../contants'
import {CountryMasterInitialInput} from '../../../../data/AdminModuleDefaultData'
import {APIStatusData, SubmitAPIStatusData} from '../../../../data/OtherDefaultData'
import {CountryMasterInput, CountryMasterOutput} from '../../../../types/AdminModuleTypes'
import {InputErrorType, SubmitAPIStatusType} from '../../../../types/OtherTypes'
import {
  cancelSubmit,
  deleteRecord,
  getRecords,
  handleInputChange,
  handleSubmit,
} from '../../../CommonFunctions'
import ActionColumn from '../../../components/ActionColumn'
import CustomCheckInput from '../../../components/CustomInput/CustomCheckInput'
import CustomTextInput from '../../../components/CustomInput/CustomTextInput'
import CustomTable from '../../../components/CustomTable'
import SubmitCancleButton from '../../../components/SubmitCancleButton'
import {countryTableHeaderData, getCountriesByID, validateForm} from './CountryFunction'

const Country = () => {
  const [editId, setEditId] = useState<string | null>(null)
  const [inputError, setInputError] = useState<InputErrorType>({})
  const [submitAPIStatus, setSubmitAPIStatus] = useState<SubmitAPIStatusType>(SubmitAPIStatusData)
  const [country, setCountry] = useState<CountryMasterOutput>({...APIStatusData, data: []})
  const [formField, setFormField] = useState<CountryMasterInput>(CountryMasterInitialInput)
  const getTableBody = () => {
    return country?.data.map((obj) => {
      return (
        <tr className={`${editId === obj?.id ? `${EDIT_ROW_COLORS} ` : ''} `} key={obj?.id ?? '-'}>
          <td>{obj?.name ?? '-'}</td>
          <td>{Number(obj?.isPopular) ? 'Yes' : 'No'}</td>
          <td>
            <ActionColumn
              edit={{
                onClick: () => {
                  getCountriesByID(obj.id, formField, setFormField, setEditId, setInputError)
                },
              }}
              remove={{
                onClick: () =>
                  deleteRecord(
                    `${API.COUNTRY}/${obj.id}`,
                    setCountry,
                    setFormField,
                    setEditId,
                    setInputError,
                    CountryMasterInitialInput,
                    ()=>{},
                    `${API.COUNTRY}?sortBy=name&sort=ASC`
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
      getRecords(API.COUNTRY, setCountry)
      getRecords(`${API.COUNTRY}?sortBy=name&sort=ASC`, setCountry)

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
              <h4 className='card-title'>{editId !== null ? 'Update' : 'Add'} Country</h4>
            </div>
            <div className='card-body '>
              <div className='fv-row mb-5 col-md-12'>
                <div className='fv-row mb-5 col-md-12'>
                  <CustomTextInput
                    name='countryName'
                    value={formField.countryName}
                    id='countryName'
                    onChange={(event) =>
                      handleInputChange(event, setFormField, inputError, setInputError)
                    }
                    label='Country Name'
                    error={inputError.countryName}
                  />
                </div>
                <div className='fv-row mb-1 col-md-12'>
                  <CustomCheckInput
                    name='isPopular'
                    label='Popular Country'
                    onChange={(event) =>
                      handleInputChange(event, setFormField, inputError, setInputError)
                    }
                    checked={formField.isPopular}
                  />
                </div>
              </div>
              <SubmitCancleButton
                cancle={{
                  onClick: () => {
                    cancelSubmit(setFormField, setEditId, setInputError, CountryMasterInitialInput)
                  },
                }}
                submit={{
                  editid: editId,
                  loading: submitAPIStatus.loading,
                  onClick: () =>
                    handleSubmit(
                      `${API.COUNTRY}?sortBy=name&sort=ASC`,
                      formField,
                      CountryMasterInitialInput,
                      setCountry,
                      setEditId,
                      setFormField,
                      editId,
                      setInputError,
                      validateForm,
                      setSubmitAPIStatus,
                      addCountry,
                      updateCountryById
                    ),
                }}
              />
            </div>
          </div>
        </div>
        <div className='col-8 '>
          <CustomTable
            data={country}
            setData={setCountry}
            url={API.COUNTRY}
            tableBody={getTableBody}
            tableHeadData={countryTableHeaderData}
            tableLabel='Countries'
            defaultSorting='name'
          />
        </div>
      </div>
    </>
  )
}

export default Country
