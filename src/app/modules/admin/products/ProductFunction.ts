import {Message, clearInputError} from '../../../../_metronic/helpers'
import {getProductsById} from '../../../../api/AdminAPI'
import {ProductMasterInput} from '../../../../types/AdminModuleTypes'
import {APIResponse, InputErrorType, TableHeaderDataType} from '../../../../types/OtherTypes'

export const handleSubCategoryChange = (
  value: string | null,
  setFormField: Function,
  InputError: InputErrorType,
  setInputError: Function
) => {
  clearInputError('subCategory', InputError, setInputError)
  let productTicketSize: ProductMasterInput['productTicketSize'] = []
  if (value?.includes('+')) {
    value?.split('+').map((subCategory: string, index) => {
      productTicketSize.push({
        ticketSize: '',
        subCategory: subCategory?.trim() ?? '',
        serial: index + 1,
      })
    })
  } else {
    productTicketSize.push({ticketSize: '', subCategory: value ?? '', serial: 1})
  }

  setFormField((prev: any) => ({
    ...prev,
    subCategory: value,
    productTicketSize,
  }))
}

export const handleProductTicketSizeChange = (
  value: string | null,
  index: number,
  setFormField: Function,
  productTicketSize: ProductMasterInput['productTicketSize'],
  inputError: InputErrorType,
  setInputError: Function
) => {
  let data: ProductMasterInput['productTicketSize'] = [...productTicketSize]
  data[index] = {
    ...data[index],
    ['ticketSize' as keyof ProductMasterInput['productTicketSize'][number]]: value ?? '',
  }

  setFormField((formField: ProductMasterInput) => ({
    ...formField,
    productTicketSize: [...data],
  }))
  clearInputError(`${'ticketSize'}${index}`, inputError, setInputError)
}

export const getProductByID = (
  id: string,
  formField: ProductMasterInput,
  setFormField: Function,
  setEditId: Function,
  setInputError: Function,
  setShowForm: Function
) => {
  getProductsById(id).then((res: APIResponse) => {
    if (res.statusCode === 200) {
      setFormField({
        ...formField,
        productName: res?.data?.productName ?? '',
        category: res?.data?.category ?? '',
        subCategory: res?.data?.subCategory ?? '',
        productTicketSize: res?.data?.productsTicketSize ?? '',
        profitPlan: res?.data?.profitPlan ?? '',
        profitPer: res?.data?.profitPercent ?? '',
      })
      setEditId(id)
      setShowForm(true)
      setInputError({})
    } else {
      Message(res.message, 'error')
    }
  })
}

export const validateForm = (formField: ProductMasterInput) => {
  let cnt: number = 0
  const error: InputErrorType = {}
  let alphaRegex = /^[a-zA-Z0-9(][\w\W]*[a-zA-Z0-9)]+$/
  let invalidCharacters = /[<>:"\\|?*\x00-\x1F~`!@#^+=;'[\]{}%$]/

  if (!formField.productName.trim()) {
    cnt = cnt + 1
    error.productName = 'Product Name is Required'
  } else {
    if (formField.productName.replaceAll(' ', '').length <= 2) {
      cnt = cnt + 1
      error.productName = 'Product Name must be greater than 2 characters'
    } else if (!alphaRegex.test(formField.productName.trim())) {
      cnt = cnt + 1
      error.productName =
        'Product Name must start with letter,number or "(" and end with letter,number or ")"'
    } else if (invalidCharacters.test(formField.productName.trim())) {
      cnt = cnt + 1
      error.productName = 'Only ( ) , . - & _ this Special Characters allowed '
    } else if (/(?=([^\w\d]))\1{2,}/g.test(formField.productName.trim())) {
      cnt = cnt + 1
      error.productName = 'Recurring Special Characters are not allowed'
    } else {
      if (formField.productName.replaceAll(' ', '').length > 250) {
        cnt = cnt + 1
        error.productName = 'Product Name should not be greater than 250 characters'
      }
    }
  }

  if (!formField.category) {
    cnt = cnt + 1
    error.category = 'Category is Required'
  }

  if (!formField.subCategory) {
    cnt = cnt + 1
    error.subCategory = 'Sub Category is Required'
  }

  if (!formField.profitPlan) {
    cnt = cnt + 1
    error.profitPlan = 'Profit Plan is Required'
  }

  if (!formField.profitPer) {
    cnt = cnt + 1
    error.profitPer = 'Profit Percentage is Required'
  } else {
    if (formField.profitPer.toString().replaceAll('.', '').length > 10) {
      cnt = cnt + 1
      error.profitPer = 'Profit Percentage should not be greater than 10 digits'
    }
  }

  formField.productTicketSize.map((productTicketSize, index) => {
    if (!productTicketSize.ticketSize) {
      cnt = cnt + 1
      error[`ticketSize${index}`] = 'Ticket Size is Required'
    } else {
      if (Number(productTicketSize.ticketSize) <= 0) {
        cnt = cnt + 1
        error[`ticketSize${index}`] = 'Ticket Size should be greater than zero'
      } else if (productTicketSize.ticketSize.toString().includes('.')) {
        cnt = cnt + 1
        error[`ticketSize${index}`] = 'Decimal is not allowed in ticket Size.'
      } else if (productTicketSize.ticketSize.toString().replaceAll('.', '').length > 10) {
        cnt = cnt + 1
        error[`ticketSize${index}`] = 'Ticket Size should not be greater than 10 digits'
      }
    }
  })
  return {error, cnt}
}

export const productTableHeaderData: TableHeaderDataType[] = [
  {
    th: {
      id: 'productName',
      style: {
        minWidth: '90px',
        width: '100px',
      },
    },
    text: 'Product Name',
  },
  {
    th: {
      id: 'category',
      style: {
        minWidth: '90px',
        width: '100px',
      },
    },
    text: 'Category',
  },

  {
    th: {
      id: 'subCategory',
      style: {
        minWidth: '90px',
        width: '100px',
      },
    },
    text: 'Sub Category',
  },
  {
    th: {
      id: 'ticketSize',
      style: {
        minWidth: '90px',
        width: '100px',
      },
    },
    text: 'Ticket Size',
  },
  {
    th: {
      id: 'totalTicketSize',
      style: {
        minWidth: '90px',
        width: '100px',
      },
    },
    isSortable: false,
    text: 'Total Ticket Size',
  },
  {
    th: {
      id: 'profitPlan',
      style: {
        minWidth: '90px',
        width: '100px',
      },
    },
    isSortable: false,
    text: 'Profit Plan',
  },
  {
    th: {
      id: 'profitPercent',
      style: {
        minWidth: '90px',
        width: '100px',
      },
    },
    isSortable: false,
    text: 'Profit %',
  },
  {
    th: {
      id: 'actions',
      style: {
        width: '100px',
        minWidth: '70px',
      },
    },
    text: 'Actions',
    justifyContent: 'end',
    isSortable: false,
  },
]
