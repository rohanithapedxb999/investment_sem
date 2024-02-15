import {useEffect, useState} from 'react'
import {addOccupations, updateOccupationsById} from '../../../../api/AdminAPI'
import API from '../../../../api/apiUrl'
import {EDIT_ROW_COLORS} from '../../../../contants'
import {OccuputionInitialInput} from '../../../../data/AdminModuleDefaultData'
import {APIStatusData, SubmitAPIStatusData} from '../../../../data/OtherDefaultData'
import {OccupationMasterInput, OccupationMasterOuput} from '../../../../types/AdminModuleTypes'
import {InputErrorType, SubmitAPIStatusType} from '../../../../types/OtherTypes'
import {
  cancelSubmit,
  deleteRecord,
  getRecords,
  handleInputChange,
  handleSubmit,
} from '../../../CommonFunctions'
import ActionColumn from '../../../components/ActionColumn'
import CustomTextInput from '../../../components/CustomInput/CustomTextInput'
import CustomTable from '../../../components/CustomTable'
import SubmitCancleButton from '../../../components/SubmitCancleButton'
import {getOccupationsByID, occupationTableHeaderData, validateForm} from './OccupationFunctions'

const Occupation = () => {
  const [occupation, setOccupation] = useState<OccupationMasterOuput>({...APIStatusData, data: []})
  const [inputError, setInputError] = useState<InputErrorType>({})
  const [formField, setFormField] = useState<OccupationMasterInput>(OccuputionInitialInput)
  const [editId, setEditId] = useState<string | null>(null)
  const [submitAPIStatus, setSubmitAPIStatus] = useState<SubmitAPIStatusType>(SubmitAPIStatusData)
  const getTableBody = () => {
    return occupation?.data?.map((obj: {id: string; name: any}) => {
      return (
        <tr className={`${editId === obj?.id ?? '-' ? `${EDIT_ROW_COLORS} ` : ''}`}>
          <td>{obj?.name ?? '-'}</td>
          <td className=''>
            <ActionColumn
              edit={{
                onClick: () => {
                  getOccupationsByID(obj.id, formField, setFormField, setEditId, setInputError)
                },
              }}
              remove={{
                onClick: () =>
                  deleteRecord(
                    `${API.OCCUPATION}/${obj.id}`,
                    setOccupation,
                    setFormField,
                    setEditId,
                    setInputError,
                    OccuputionInitialInput
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
      getRecords(API.OCCUPATION, setOccupation)
      getRecords(`${API.OCCUPATION}?sortBy=name&sort=ASC`, setOccupation)

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
              <h4 className='card-title'> {editId !== null ? 'Update' : 'Add'} Occupation</h4>
            </div>
            <div className='card-body py-2'>
              <div className='fv-row mb-5 col-md-12'>
                <CustomTextInput
                  label='Occupation Name'
                  name='occupationName'
                  value={formField?.occupationName}
                  onChange={(event) =>
                    handleInputChange(event, setFormField, inputError, setInputError)
                  }
                  id='occupationName'
                  error={inputError.occupationName}
                />
              </div>
            </div>
            <SubmitCancleButton
              cancle={{
                onClick: () => {
                  cancelSubmit(setFormField, setEditId, setInputError, OccuputionInitialInput)
                },
              }}
              submit={{
                editid: editId,
                loading: submitAPIStatus.loading,
                onClick: () =>
                  handleSubmit(
                    `${API.OCCUPATION}?sortBy=name&sort=ASC`,
                    formField,
                    OccuputionInitialInput,
                    setOccupation,
                    setEditId,
                    setFormField,
                    editId,
                    setInputError,
                    validateForm,
                    setSubmitAPIStatus,
                    addOccupations,
                    updateOccupationsById
                  ),
              }}
            />
          </div>
        </div>
        <div className='col-8 '>
          <CustomTable
            data={occupation}
            setData={setOccupation}
            url={API.OCCUPATION}
            tableBody={getTableBody}
            tableHeadData={occupationTableHeaderData}
            tableLabel='Occupations'
            defaultSorting='name'
          />
        </div>
      </div>
    </>
  )
}

export default Occupation
