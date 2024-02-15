import {useEffect, useState} from 'react'
import { addSources, updateSourcesById} from '../../../../api/AdminAPI'
import API from '../../../../api/apiUrl'
import {EDIT_ROW_COLORS} from '../../../../contants'
import { SourceInitialInput} from '../../../../data/AdminModuleDefaultData'
import {APIStatusData, SubmitAPIStatusData} from '../../../../data/OtherDefaultData'
import { SourceMasterInput, SourceMasterOuput} from '../../../../types/AdminModuleTypes'
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
import {getSourcesByID, sourceTableHeaderData, validateForm} from './SourceFunctions'

const Source = () => {
  const [source, setSource] = useState<SourceMasterOuput>({...APIStatusData, data: []})
  const [inputError, setInputError] = useState<InputErrorType>({})
  const [formField, setFormField] = useState<SourceMasterInput>(SourceInitialInput)
  const [editId, setEditId] = useState<string | null>(null)
  const [submitAPIStatus, setSubmitAPIStatus] = useState<SubmitAPIStatusType>(SubmitAPIStatusData)
  const getTableBody = () => {
    return source?.data?.map((obj: {id: string; name: any}) => {
      return (
        <tr className={`${editId === obj?.id ?? '-' ? `${EDIT_ROW_COLORS} ` : ''}`}>
          <td>{obj?.name ?? '-'}</td>
          <td className=''>
            <ActionColumn
              edit={{
                onClick: () => {
                  getSourcesByID(obj.id, formField, setFormField, setEditId, setInputError)
                },
              }}
              remove={{
                onClick: () =>
                  deleteRecord(
                    `${API.SOURCE}/${obj.id}`,
                    setSource,
                    setFormField,
                    setEditId,
                    setInputError,
                    SourceInitialInput
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
      getRecords(API.SOURCE, setSource)
      getRecords(`${API.SOURCE}?sortBy=name&sort=ASC`, setSource)

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
              <h4 className='card-title'> {editId !== null ? 'Update' : 'Add'} Source</h4>
            </div>
            <div className='card-body py-2'>
              <div className='fv-row mb-5 col-md-12'>
                <CustomTextInput
                  label='Source Name'
                  name='sourceName'
                  value={formField?.sourceName}
                  onChange={(event) =>
                    handleInputChange(event, setFormField, inputError, setInputError)
                  }
                  id='sourceName'
                  error={inputError.sourceName}
                />
              </div>
            </div>
            <SubmitCancleButton
              cancle={{
                onClick: () => {
                  cancelSubmit(setFormField, setEditId, setInputError, SourceInitialInput)
                },
              }}
              submit={{
                editid: editId,
                loading: submitAPIStatus.loading,
                onClick: () =>
                  handleSubmit(
                    `${API.SOURCE}?sortBy=name&sort=ASC`,
                    formField,
                    SourceInitialInput,
                    setSource,
                    setEditId,
                    setFormField,
                    editId,
                    setInputError,
                    validateForm,
                    setSubmitAPIStatus,
                    addSources,
                    updateSourcesById,
                  ),
              }}
            />
          </div>
        </div>
        <div className='col-8 '>
          <CustomTable
            data={source}
            setData={setSource}
            url={API.SOURCE}
            tableBody={getTableBody}
            tableHeadData={sourceTableHeaderData}
            tableLabel='Sources'
            defaultSorting='name'
          />
        </div>
      </div>
    </>
  )
}

export default Source
