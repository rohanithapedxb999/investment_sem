import {Button} from '@mantine/core'
import {useEffect, useState} from 'react'
import {numberFormat} from '../../../../_metronic/helpers'
import {addProducts, updateProductsById} from '../../../../api/AdminAPI'
import API from '../../../../api/apiUrl'
import {EDIT_ROW_COLORS} from '../../../../contants'
import {ProductMasterInitialInput} from '../../../../data/AdminModuleDefaultData'
import {APIStatusData, SubmitAPIStatusData} from '../../../../data/OtherDefaultData'
import {ProductMasterInput, ProductMasterOutput} from '../../../../types/AdminModuleTypes'
import {InputErrorType, SubmitAPIStatusType} from '../../../../types/OtherTypes'
import {
  cancelSubmit,
  deleteRecord,
  getRecords,
  handleInputChange,
  handleOtherInputChange,
  handleSubmit,
} from '../../../CommonFunctions'
import ActionColumn from '../../../components/ActionColumn'
import CustomNumberInput from '../../../components/CustomInput/CustomNumberInput'
import CustomSelectInput from '../../../components/CustomInput/CustomSelectInput'
import CustomTextInput from '../../../components/CustomInput/CustomTextInput'
import CustomTable from '../../../components/CustomTable'
import SubmitCancleButton from '../../../components/SubmitCancleButton'
import {
  getProductByID,
  handleProductTicketSizeChange,
  handleSubCategoryChange,
  productTableHeaderData,
  validateForm,
} from './ProductFunction'

const Product = () => {
  const [product, setProduct] = useState<ProductMasterOutput>({...APIStatusData, data: []})
  const [editId, setEditId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState<boolean>(false)
  const [inputError, setInputError] = useState<InputErrorType>({})
  const [submitAPIStatus, setSubmitAPIStatus] = useState<SubmitAPIStatusType>(SubmitAPIStatusData)
  const [formField, setFormField] = useState<ProductMasterInput>(ProductMasterInitialInput)
  const getTableBody = () => {
    return product?.data?.map((obj) => {
      console.log(product)
      return (
        <tr
          className={`${editId === obj?.id ?? '-' ? `${EDIT_ROW_COLORS} ` : ''}`}
          key={obj?.id ?? '-'}
        >
          <td>{obj?.productName ?? '-'}</td>
          <td>{obj?.category ?? '-'}</td>
          <td>{obj?.subCategory ?? '-'}</td>
          <td>
            {obj?.productsTicketSize.length > 1
              ? obj?.productsTicketSize?.map((productsTicketSize, index) => {
                  return (
                    <div key={`${index}`}>
                      {`${index + 1})`}{' '}
                      {productsTicketSize?.subCategory === null
                        ? '-'
                        : productsTicketSize?.subCategory + ' : '}
                      {productsTicketSize?.ticketSize === null
                        ? '0'
                        : numberFormat(productsTicketSize?.ticketSize, 'no-roundup')}
                      <br />
                    </div>
                  )
                })
              : numberFormat(obj?.productsTicketSize[0]?.ticketSize, 'no-roundup')}
          </td>
          <td>{numberFormat(obj?.totalTicketSize ?? '-', 'no-roundup')}</td>
          <td>{obj?.profitPlan ?? '-'}</td>
          <td>{obj?.profitPercent ?? '-'}</td>
          <td>
            <ActionColumn
              edit={{
                onClick: () => {
                  getProductByID(
                    obj.id,
                    formField,
                    setFormField,
                    setEditId,
                    setInputError,
                    setShowForm
                  )
                },
              }}
              remove={{
                onClick: () =>
                  deleteRecord(
                    `${API.PRODUCTS}/${obj.id}`,
                    setProduct,
                    setFormField,
                    setEditId,
                    setInputError,
                    ProductMasterInitialInput
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
      getRecords(API.PRODUCTS, setProduct)
      getRecords(`${API.PRODUCTS}?sortBy=name&sort=ASC`, setProduct)

    }

    return () => {
      mounted = false
    }
  }, [])

  return (
    <>
      <div className='row '>
        <div className='col-12  mb-4' hidden={!showForm}>
          <div className='card '>
            <div className='card-header'>
              <h4 className='card-title'>{editId !== null ? 'Update' : 'Add'} Product</h4>
            </div>
            <div className='card-body'>
              <div className='row'>
                <div className='mb-5 col-2'>
                  <CustomTextInput
                    label='ProductName'
                    name='productName'
                    value={formField.productName}
                    onChange={(event) => {
                      handleInputChange(event, setFormField, inputError, setInputError)
                    }}
                    error={inputError.productName}
                  />
                </div>
                <div className='mb-5 col-2'>
                  <CustomSelectInput
                    data={[
                      {label: 'Advisory', value: 'Advisory'},
                      {label: 'PMS', value: 'PMS'},
                      {label: 'Mutual Fund', value: 'Mutual Fund'},
                    ]}
                    value={formField.category}
                    onChange={(value) => {
                      handleOtherInputChange(
                        value,
                        'category',
                        setFormField,
                        inputError,
                        setInputError
                      )
                    }}
                    label='Category'
                    error={inputError.category}
                  />
                </div>
                <div className='mb-5 col-2'>
                  <CustomSelectInput
                    data={[
                      {label: 'Lumpsum', value: 'Lumpsum'},
                      {label: 'SIP', value: 'SIP'},
                      {label: 'Lumpsum + SIP', value: 'Lumpsum + SIP'},
                    ]}
                    value={formField.subCategory}
                    onChange={(value) => {
                      handleSubCategoryChange(value, setFormField, inputError, setInputError)
                    }}
                    label='Sub Category'
                    error={inputError.subCategory}
                  />
                </div>
                <div className='mb-5 col-2'>
                  <CustomSelectInput
                    data={[
                      {label: '50-50', value: '50-50'},
                      {label: '80-20', value: '80-20'},
                    ]}
                    value={formField.profitPlan}
                    onChange={(value) => {
                      handleOtherInputChange(
                        value,
                        'profitPlan',
                        setFormField,
                        inputError,
                        setInputError
                      )
                    }}
                    label='Profit Plan'
                    error={inputError.profitPlan}
                  />
                </div>
                <div className='mb-5 col-2'>
                  <CustomNumberInput
                    label='Profit %'
                    name='profitPer'
                    value={formField.profitPer}
                    onChange={(event) => {
                      handleInputChange(event, setFormField, inputError, setInputError)
                    }}
                    error={inputError.profitPer}
                  />
                </div>
                {formField.productTicketSize.map((productTicketSize, index) => {
                  return (
                    <div className='mb-5 col-2'>
                      <CustomNumberInput
                        label={`Ticket Size ${
                          formField.productTicketSize.length > 1
                            ? `${productTicketSize.subCategory}`
                            : ''
                        }`}
                        name='ticketSize'
                        value={productTicketSize.ticketSize}
                        onChange={(event) => {
                          handleProductTicketSizeChange(
                            event.target.value,
                            index,
                            setFormField,
                            formField.productTicketSize,
                            inputError,
                            setInputError
                          )
                        }}
                        error={inputError[`ticketSize${index}`]}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
            <SubmitCancleButton
              cancle={{
                onClick: () => {
                  cancelSubmit(
                    setFormField,
                    setEditId,
                    setInputError,
                    ProductMasterInitialInput,
                    setShowForm
                  )
                },
              }}
              submit={{
                editid: editId,
                loading: submitAPIStatus.loading,
                onClick: () =>
                  handleSubmit(
                    `${API.PRODUCTS}?sortBy=name&sort=ASC`,
                    formField,
                    ProductMasterInitialInput,
                    setProduct,
                    setEditId,
                    setFormField,
                    editId,
                    setInputError,
                    validateForm,
                    setSubmitAPIStatus,
                    addProducts,
                    updateProductsById,
                    setShowForm
                  ),
              }}
            />
          </div>
        </div>
        <div className='col-12 '>
          <CustomTable
            data={product}
            setData={setProduct}
            url={API.PRODUCTS}
            tableBody={getTableBody}
            tableHeadData={productTableHeaderData}
            tableLabel='Products'
            defaultSorting='productName'
            // isPaginationRequired={false}
            // isSearchingRequired={false}
            // isSortingRequired={false}
            newRecordButton={
              <Button
                type='button'
                className='btn btn-primary btn-sm me-3'
                onClick={() => {
                  setShowForm(true)
                }}
                hidden={showForm}
              >
                Add Product
              </Button>
            }
          />
        </div>
      </div>
    </>
  )
}

export default Product
