import {Button, Modal, Textarea} from '@mantine/core'
import {useEffect, useMemo, useState} from 'react'
import {Message} from '../../../../_metronic/helpers'
import {
  addProspects,
  submitProspectComment,
  updateProspectsById,
} from '../../../../api/InvestmentAPI'
import API from '../../../../api/apiUrl'
import {EDIT_ROW_COLORS} from '../../../../contants'
import {ProspectInitialInput} from '../../../../data/InvestmentModuleDefaultData'
import {APIStatusData, SubmitAPIStatusData} from '../../../../data/OtherDefaultData'
import {ProspectInputType, ProspectOutput} from '../../../../types/InvestmentModuleTypes'
import {InputErrorType, SelectValueType, SubmitAPIStatusType} from '../../../../types/OtherTypes'
import {
  cancelSubmit,
  deleteRecord,
  getRecords,
  getReferalData,
  handleInputChange,
  handleSubmit,
} from '../../../CommonFunctions'
import ActionColumn from '../../../components/ActionColumn'
import CustomTable from '../../../components/CustomTable'
import SubmitCancleButton from '../../../components/SubmitCancleButton'
import {useAuth} from '../../auth'
import {commentTableHeaderData} from '../comments/commentFunction'
import ProspectForm from './ProspectForm'
import {
  convertToSales,
  getProspectByID,
  getProspectTableHeaderData,
  validateProspectForm,
} from './ProspectFunction'

const Prospects = (props: {role: string}) => {
  const [prospects, setProspects] = useState<ProspectOutput>({
    ...APIStatusData,
    data: [],
  })
  let {role} = props
  const {prospectTableHeaderData} = getProspectTableHeaderData(true)
  const [submitAPIStatus, setSubmitAPIStatus] = useState<SubmitAPIStatusType>(SubmitAPIStatusData)
  const [commentSubmitAPIStatus, setCommentSubmitAPIStatus] =
    useState<SubmitAPIStatusType>(SubmitAPIStatusData)
  const {currentUser} = useAuth()
  const [editId, setEditId] = useState<string | null>(null)
  const [commentEditId, setCommentEditId] = useState<string | null>(null)
  const [newProspectEditId, setNewProspectEditId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState<boolean>(false)
  const [openModel, setOpenModel] = useState<boolean>(false)
  const [referal, setReferal] = useState<{label: string; value: string}[]>([])
  const [state, setState] = useState<SelectValueType[]>([])
  const [cityOfBirth, setCityOfBirth] = useState<SelectValueType[]>([])
  const [city, setCity] = useState<SelectValueType[]>([])
  const [newProspectState, setNewProspectState] = useState<SelectValueType[]>([])
  const [newProspectCity, setNewProspectCity] = useState<SelectValueType[]>([])
  const [newProspectCityOfBirth, setNewProspectCityOfBirth] = useState<SelectValueType[]>([])
  const [inputError, setInputError] = useState<InputErrorType>({})
  const [newProspectInputError, setNewProspectInputError] = useState<InputErrorType>({})
  const [show, setShow] = useState<boolean>(false)
  const [showProduct, setShowProduct] = useState<number[]>([])
  const [formField, setFormField] = useState<ProspectInputType>({
    ...ProspectInitialInput,
    referalType: 'existing',
    assignedBy: currentUser?.id ?? '',
    currentUserId: currentUser?.id ?? '',
  })
  const [commentFormField, setCommentFormField] = useState({comment: ''})
  const [commentInputError, setCommentInputError] = useState<InputErrorType>({})
  const [newProspectformField, setNewProspectFormField] = useState<ProspectInputType>({
    ...ProspectInitialInput,
    referalType: 'new',
    assignedBy: currentUser?.id ?? '',
    currentUserId: currentUser?.id ?? '',
  })

  const openCommentModal = (prospectId: string) => {
    setShow(true)
    setCommentEditId(prospectId)
    setCommentFormField({
      ...commentFormField,
      comment: '',
    })
  }

  const validateCommentForm = (formField: {comment: string}) => {
    let cnt: number = 0
    const error: InputErrorType = {}
    let invalidCharacters = /[<>"\\|?*\x00-\x1F~`!@^+='[\]{}#$]/
    if (formField.comment.trim() == '') {
      cnt = cnt + 1
      error.comment = 'Comment should not be blank'
    } else if (invalidCharacters.test(formField.comment.trim())) {
      cnt = cnt + 1
      error.comment = 'Only ( ) , . - / % : ; _ & this Special Characters allowed'
    }
    return {error, cnt}
  }
  const checkArrayProduct = (element: number) => {
    setShowProduct((prevshowProduct) => {
      const isExists = prevshowProduct.includes(element)
      if (isExists) {
        return prevshowProduct.filter((row) => row !== element)
      } else {
        return [element]
      }
    })
  }

  const HandleSubmit = () => {
    let {cnt, error} = validateCommentForm(commentFormField)
    setCommentInputError(error)
    if (cnt === 0) {
      setCommentSubmitAPIStatus((prev: SubmitAPIStatusType) => ({...prev, loading: true}))
      submitProspectComment(commentEditId ?? '', currentUser?.id ?? '', {
        ...commentFormField,
        commentType: 'Sales Progression',
      }).then((res) => {
        if (res.statusCode === 200) {
          setCommentSubmitAPIStatus((prev: SubmitAPIStatusType) => ({...prev, loading: true}))
          convertToSales(
            commentEditId ?? '',
            setProspects,
            setShow,
            setCommentInputError,
            setCommentEditId,
            setCommentFormField,
            currentUser?.id ?? null,
            role
          )
        } else {
          Message(res.message, 'error')
          setCommentSubmitAPIStatus((prev: SubmitAPIStatusType) => ({...prev, loading: false}))
        }
      })
    }
  }

  const getTableBody = () => {
    return (
      <>
        {prospects?.data?.map((obj, index) => {
          return (
            <>
              <tr
                className={`${editId === obj?.id ?? '-' ? `${EDIT_ROW_COLORS} ` : ''}`}
                key={obj?.id ?? '-'}
              >
                <>
                  <td>
                    <div className='text-center'>
                      <i
                        className={`fas fa-chevron-${showProduct.includes(index) ? 'up' : 'down'}`}
                        style={{
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          checkArrayProduct(index)
                        }}
                      />
                    </div>
                  </td>
                  <td>{`${obj?.firstName ?? ''} ${obj?.lastName ?? ''}`}</td>
                  <td>{obj?.mobileNo ?? '-'}</td>
                  <td>{obj?.email ?? '-'}</td>
                  <td>
                    {!obj.addressLine1 &&
                    !obj?.addressLine2 &&
                    !obj?.pin &&
                    !obj?.city?.name &&
                    !obj?.state?.name &&
                    !obj?.country?.name
                      ? '-'
                      : `${obj?.addressLine1 ? obj?.addressLine1 + ',' : ''} ${
                          obj?.addressLine2 ? obj?.addressLine2 + ',' : ''
                        } ${obj?.city?.name ? obj?.city?.name + ',' : ''} ${
                          obj?.state?.name ? obj?.state?.name + ',' : ''
                        } ${obj?.country?.name ? obj?.country?.name + ',' : ''} ${obj?.pin ?? ''}`}
                  </td>
                  <td>
                    {obj?.newReferal?.firstName
                      ? `${obj?.newReferal?.firstName ?? ''} ${obj?.newReferal?.lastName ?? ''}`
                      : `${obj?.existingReferal?.firstName ?? ''} ${
                          obj?.existingReferal?.lastName ?? ''
                        }`}
                  </td>
                  <td>
                    {' '}
                    {obj?.newReferal?.firstName
                      ? obj?.newReferal?.mobileNo
                      : obj?.existingReferal?.mobileNo}
                  </td>
                  <td>
                    {obj?.assignedBy
                      ? obj?.assignedBy?.firstName + ' ' + obj?.assignedBy?.lastName
                      : '-'}
                  </td>
                  <td>{!obj?.probability ? '-' : obj?.probability}</td>
                  <td>{!obj?.operationalStatus ? obj?.status ?? '' : obj?.operationalStatus}</td>
                  <td>
                    <div className='d-flex'>
                      <ActionColumn
                        edit={{
                          onClick: () => {
                            getReferalData(setReferal)
                            getProspectByID(
                              obj.id,
                              formField,
                              setFormField,
                              setEditId,
                              setInputError,
                              setShowForm,
                              setState,
                              setCity,
                              setCityOfBirth
                            )
                          },
                        }}
                        remove={{
                          onClick: () =>
                            deleteRecord(
                              `${API.PROSPECTS}/${obj.id}`,
                              setProspects,
                              setFormField,
                              setEditId,
                              setInputError,
                              {
                                ...ProspectInitialInput,
                                referalType: 'existing',
                                assignedBy: currentUser?.id ?? '',
                                currentUserId: currentUser?.id ?? '',
                              },
                              setShowForm,
                              `${API.PROSPECTS}/user/${currentUser?.id}/${role}`
                            ),
                        }}
                      />
                      <Button
                        title='Convert to sales'
                        className='btn btn-icon btn-light-info btn-sm ms-1 mb-1'
                        // onClick={()=>convertToSales(obj.id,setProspects)}
                        onClick={() => {
                          openCommentModal(obj.id)
                        }}
                      >
                        <i className='fa-regular fa-paper-plane'></i>
                      </Button>
                    </div>
                  </td>
                </>
              </tr>
              <tr hidden={!showProduct.includes(index)}>
                <td colSpan={12}>
                  <div className='row '>
                    <CustomTable
                      tableBody={() => {
                        return obj.comments?.map((item: any) => {
                          return (
                            <tr key={item?.id ?? '-'}>
                              <td>{item?.id ?? '-'}</td>
                              <td>{item?.startDate ?? '-'}</td>
                              <td>{item?.comment ?? '-'}</td>
                              <td>{item?.user ?? '-'}</td>
                              <td>{item?.commentType ?? '-'}</td>
                              <td>{item?.followUpDate ?? '-'}</td>
                            </tr>
                          )
                        })
                      }}
                      data={!obj.comments ? [] : {data: obj.comments}}
                      tableHeadData={commentTableHeaderData}
                      tableLabel='Comments'
                      isPaginationRequired={false}
                      isSearchingRequired={false}
                      isSortingRequired={false}
                    />
                  </div>
                </td>
              </tr>
            </>
          )
        })}
      </>
    )
  }
  const getReferals = useMemo(() => {
    getReferalData(setReferal)
  }, [openModel])

  const handleOpenModel = () => {
    setOpenModel(true)
    setNewProspectFormField({
      ...newProspectformField,
      referal: currentUser?.id ?? '',
    })
  }

  useEffect(() => {
    let mounted = true
    if (mounted) {
      setShowForm(false)
      getRecords(`${API.PROSPECTS}/user/${currentUser?.id}/${role}`, setProspects)
    }

    return () => {
      mounted = false
    }
  }, [role])

  return (
    <>
      <div className='row '>
        <div className='col-12  mb-4' hidden={!showForm}>
          <div className='card '>
            <div className='card-header'>
              <h4 className='card-title'>{editId !== null ? 'Update' : 'Add'} Prospect</h4>
            </div>
            <div className='card-body'>
              <ProspectForm
                formField={formField}
                handleOpenModel={handleOpenModel}
                prospectType='old'
                inputError={inputError}
                setFormField={setFormField}
                setInputError={setInputError}
                setCity={setCity}
                setState={setState}
                city={city}
                cityOfBirth={cityOfBirth}
                setCityOfBirth={setCityOfBirth}
                state={state}
                referal={referal}
                isFormEditable={true}
                editId={editId}
              />
            </div>
            <SubmitCancleButton
              cancle={{
                onClick: () => {
                  cancelSubmit(
                    setFormField,
                    setEditId,
                    setInputError,
                    {
                      ...ProspectInitialInput,
                      referalType: 'existing',
                      assignedBy: currentUser?.id ?? '',
                      currentUserId: currentUser?.id ?? '',
                    },
                    setShowForm
                  )
                },
              }}
              submit={{
                editid: editId,
                loading: submitAPIStatus.loading,
                onClick: () =>
                  handleSubmit(
                    `${API.PROSPECTS}/user/${currentUser?.id}/${role}`,
                    formField,
                    {
                      ...ProspectInitialInput,
                      referalType: 'existing',
                      assignedBy: currentUser?.id ?? '',
                      currentUserId: currentUser?.id ?? '',
                    },
                    setProspects,
                    setEditId,
                    setFormField,
                    editId,
                    setInputError,
                    validateProspectForm,
                    setSubmitAPIStatus,
                    addProspects,
                    updateProspectsById,
                    setShowForm
                  ),
              }}
            />
          </div>
        </div>
        <Modal
          opened={show}
          onClose={() => {
            setShow(false)
            setCommentInputError({})
            setCommentEditId(null)
            setCommentFormField({
              ...commentFormField,
              comment: '',
            })
          }}
          size='40%'
          title='Comment'
          withCloseButton={true}
        >
          <div className='row'>
            <div className='col-sm-3 col-md-12 col-12 mb-5'>
              <Textarea
                name='comment'
                id='comment'
                style={{height: 'auto'}}
                autosize
                cols={50}
                minRows={5}
                value={commentFormField.comment}
                autoFocus
                onChange={(event) =>
                  handleInputChange(
                    event,
                    setCommentFormField,
                    commentInputError,
                    setCommentInputError
                  )
                }
                error={commentInputError.comment}
              />
            </div>
          </div>
          <SubmitCancleButton
            cancle={{
              label: 'Close',
              onClick: () => {
                setShow(false)
                setCommentInputError({})
                setCommentFormField({
                  ...commentFormField,
                  comment: '',
                })
              },
            }}
            submit={{
              label: 'Submit',
              loading: commentSubmitAPIStatus.loading,
              onClick: () => HandleSubmit(),
            }}
          />
        </Modal>
        <Modal
          opened={openModel}
          onClose={() => {
            getReferalData(setReferal)
            cancelSubmit(
              setNewProspectFormField,
              setEditId,
              setNewProspectInputError,
              {
                ...ProspectInitialInput,
                referalType: 'new',
                assignedBy: currentUser?.id ?? '',
                currentUserId: currentUser?.id ?? '',
              },
              setOpenModel
            )
          }}
          size='85%'
          withCloseButton={true}
        >
          <div className='card '>
            <div className='card-header'>
              <h4 className='card-title'>Add Referral</h4>
            </div>
            <div className='card-body'>
              <ProspectForm
                formField={newProspectformField}
                handleOpenModel={handleOpenModel}
                prospectType='new'
                inputError={newProspectInputError}
                setFormField={setNewProspectFormField}
                setInputError={setNewProspectInputError}
                setCity={setNewProspectCity}
                setState={setNewProspectState}
                city={newProspectCity}
                cityOfBirth={newProspectCityOfBirth}
                setCityOfBirth={setNewProspectCityOfBirth}
                state={newProspectState}
                referal={referal}
                editId={null}
                isFormEditable={true}
              />
            </div>
            <SubmitCancleButton
              cancle={{
                onClick: () => {
                  cancelSubmit(
                    setNewProspectFormField,
                    setNewProspectEditId,
                    setNewProspectInputError,
                    {
                      ...ProspectInitialInput,
                      referalType: 'new',
                      assignedBy: currentUser?.id ?? '',
                      currentUserId: currentUser?.id ?? '',
                    },
                    setOpenModel
                  )
                },
              }}
              submit={{
                editid: editId,
                loading: submitAPIStatus.loading,
                onClick: () =>
                  handleSubmit(
                    `${API.PROSPECTS}/user/${currentUser?.id}/${role}`,
                    newProspectformField,
                    {
                      ...ProspectInitialInput,
                      referalType: 'new',
                      assignedBy: currentUser?.id ?? '',
                      currentUserId: currentUser?.id ?? '',
                    },
                    setProspects,
                    setNewProspectEditId,
                    setNewProspectFormField,
                    newProspectEditId,
                    setNewProspectInputError,
                    validateProspectForm,
                    setSubmitAPIStatus,
                    addProspects,
                    updateProspectsById,
                    setOpenModel
                  ),
              }}
            />
          </div>
        </Modal>
        <div className='col-12 '>
          <CustomTable
            data={prospects}
            setData={setProspects}
            url={`${API.PROSPECTS}/user/${currentUser?.id}/${role}`}
            tableBody={getTableBody}
            tableHeadData={prospectTableHeaderData}
            tableLabel='Prospects'
            // isPaginationRequired={false}
            // isSearchingRequired={false}
            // isSortingRequired={false}
            newRecordButton={
              <Button
                type='button'
                className='btn btn-primary btn-sm me-3'
                onClick={() => {
                  getReferalData(setReferal)
                  setShowForm(true)
                }}
                hidden={showForm === true}
              >
                Add Prospects
              </Button>
            }
          />
        </div>
      </div>
    </>
  )
}

export default Prospects
