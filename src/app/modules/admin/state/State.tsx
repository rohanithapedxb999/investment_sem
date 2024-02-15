import {useEffect, useState} from 'react'
import {addStates, updateStatesById} from '../../../../api/AdminAPI'
import API from '../../../../api/apiUrl'
import {EDIT_ROW_COLORS} from '../../../../contants'
import {StateMasterInitialInput} from '../../../../data/AdminModuleDefaultData'
import {APIStatusData, SubmitAPIStatusData} from '../../../../data/OtherDefaultData'
import {StateMasterInput, StateMasterOutput} from '../../../../types/AdminModuleTypes'
import {InputErrorType, SelectValueType, SubmitAPIStatusType} from '../../../../types/OtherTypes'
import {
  cancelSubmit,
  deleteRecord,
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
import {getStateByID, stateTableHeaderData, validateForm} from './StateFunction'

const State = () => {
  const [editId, setEditId] = useState<string | null>(null)
  const [inputError, setInputError] = useState<InputErrorType>({})
  const [submitAPIStatus, setSubmitAPIStatus] = useState<SubmitAPIStatusType>(SubmitAPIStatusData)
  const [state, setState] = useState<StateMasterOutput>({...APIStatusData, data: []})
  const [country, setCountry] = useState<SelectValueType[]>([])
  const [formField, setFormField] = useState<StateMasterInput>(StateMasterInitialInput)
  const getTableBody = () => {
    return state?.data?.map((obj) => {
      return (
        <tr
          className={`${editId === obj?.id ?? '-' ? `${EDIT_ROW_COLORS}` : ''}`}
          key={obj?.id ?? '-'}
        >
          <td>{obj?.country?.name ?? '-'}</td>
          <td>{obj?.name ?? '-'}</td>
          <td className=''>
            <ActionColumn
              edit={{
                onClick: () => {
                  getStateByID(obj.id, formField, setFormField, setEditId, setInputError)
                },
              }}
              remove={{
                onClick: () =>
                  deleteRecord(
                    `${API.STATE}/${obj.id}`,
                    setState,
                    setFormField,
                    setEditId,
                    setInputError,
                    StateMasterInitialInput,
                    ()=>{},
                    `${API.STATE}?sortBy=name&sort=ASC`
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
      getRecords(API.STATE, setState)
      getRecords(`${API.STATE}?sortBy=name&sort=ASC`, setState)

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
              <h4 className='card-title'>{editId !== null ? 'Update' : 'Add'} State</h4>
            </div>
            <div className='card-body '>
              <div className='fv-row mb-5 col-md-12'>
                <CustomSelectInput
                  value={formField.country}
                  data={country}
                  label='Country'
                  placeholder='Select Country'
                  onChange={(value) => {
                    handleOtherInputChange(
                      value,
                      'country',
                      setFormField,
                      inputError,
                      setInputError
                    )
                  }}
                  error={inputError.country}
                />
              </div>
              <div className='fv-row mb-1 col-md-12'>
                <CustomTextInput
                  label='State Name'
                  value={formField.stateName}
                  error={inputError.stateName}
                  name='stateName'
                  id='stateName'
                  onChange={(event) =>
                    handleInputChange(event, setFormField, inputError, setInputError)
                  }
                />
              </div>
            </div>
            <SubmitCancleButton
              cancle={{
                onClick: () => {
                  cancelSubmit(setFormField, setEditId, setInputError, StateMasterInitialInput)
                },
              }}
              submit={{
                editid: editId,
                loading: submitAPIStatus.loading,
                onClick: () =>
                  handleSubmit(
                    `${API.STATE}?sortBy=name&sort=ASC`,
                    formField,
                    StateMasterInitialInput,
                    setState,
                    setEditId,
                    setFormField,
                    editId,
                    setInputError,
                    validateForm,
                    setSubmitAPIStatus,
                    addStates,
                    updateStatesById
                  ),
              }}
            />
          </div>
        </div>
        <div className='col-8 '>
          <CustomTable
            data={state}
            setData={setState}
            url={API.STATE}
            tableBody={getTableBody}
            tableHeadData={stateTableHeaderData}
            tableLabel='States'
            defaultSorting='name'
          />
        </div>
      </div>
    </>
  )
}

export default State
