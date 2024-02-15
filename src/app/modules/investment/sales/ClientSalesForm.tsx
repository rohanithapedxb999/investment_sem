import {Center, MantineProvider} from '@mantine/core'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useThemeMode} from '../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'
import API from '../../../../api/apiUrl'
import {ProspectInitialInput, SalesInitialInput} from '../../../../data/InvestmentModuleDefaultData'
import {APIStatusData} from '../../../../data/OtherDefaultData'
import {
  ProspectInputType,
  ProspectOutput,
  SalestInputType,
} from '../../../../types/InvestmentModuleTypes'
import {InputErrorType, SelectValueType} from '../../../../types/OtherTypes'
import LoadingSkeleton from '../../../components/LoadingSkeleton'
import {useAuth} from '../../auth'
import SalesForm from './SalesForm'
import {getSalesProspectByID} from './SalesFunction'

const ClientSalesForm = () => {
  const params = useParams()
  const {mode} = useThemeMode()
  const [editId, setEditId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState<boolean>(false)
  const [formField, setFormField] = useState<SalestInputType>(SalesInitialInput)
  const [inputError, setInputError] = useState<InputErrorType>({})
  const [state, setState] = useState<SelectValueType[]>([])
  const [city, setCity] = useState<SelectValueType[]>([])
  const [cityOfBirth, setCityOfBirth] = useState<SelectValueType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const {currentUser} = useAuth()
  const [prospectFormField, setProspectFormField] = useState<ProspectInputType>({
    ...ProspectInitialInput,
    referalType: 'existing',
    assignedBy: currentUser?.id ?? '',
    currentUserId: currentUser?.id ?? '',
  })
  const [prospects, setProspects] = useState<ProspectOutput>({
    ...APIStatusData,
    data: [],
  })
  const [selectedProduct, setSelectedProduct] = useState<string[]>([])

  const [propspectInputError, setProspectInputError] = useState<InputErrorType>({})
  useEffect(() => {
    let mounted = true
    if (mounted) {
      setLoading(true)
      getSalesProspectByID(
        params?.id ?? '',
        formField,
        setFormField,
        prospectFormField,
        setProspectFormField,
        setEditId,
        setInputError,
        setShowForm,
        setState,
        setCity,
        setCityOfBirth,
        setSelectedProduct
      )
    }

    return () => {
      mounted = false
    }
  }, [])
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: mode === 'dark' ? 'dark' : 'light',
        colors: {
          // Add your color
          deepBlue: ['#E9EDFC', '#C1CCF6', '#99ABF0' /* ... */],
          // or replace default theme color
          blue: ['#E9EDFC', '#C1CCF6', '#99ABF0' /* ... */],
        },

        shadows: {
          md: '1px 1px 3px rgba(0, 0, 0, .25)',
          xl: '5px 5px 3px rgba(0, 0, 0, .25)',
        },

        headings: {
          fontFamily: 'Roboto, sans-serif',
          sizes: {
            h1: {fontSize: '2rem'},
          },
        },
      }}
    >
      <Center>
        <div className='container-fluid my-9 mx-6 p-0 border rounded'>
          {showForm ? (
            prospectFormField.operationalStatus === '3' ? (
              <SalesForm
                formType='client'
                editId={editId}
                setEditId={setEditId}
                setShowForm={setShowForm}
                formField={formField}
                setFormField={setFormField}
                inputError={inputError}
                setInputError={setInputError}
                city={city}
                setCity={setCity}
                cityOfBirth={cityOfBirth}
                setCityOfBirth={setCityOfBirth}
                state={state}
                setState={setState}
                prospectFormField={prospectFormField}
                setProspectFormField={setProspectFormField}
                setProspects={setProspects}
                prospectInputError={propspectInputError}
                setProspectInputError={setProspectInputError}
                setSelectedProduct={setSelectedProduct}
                selectedProducts={selectedProduct}
                backUrl={`${API.PROSPECTS}/sales/status`}
              />
            ) : prospectFormField.operationalStatus === '5' ? (
              <>
                <Center>
                  <h4 className='py-5'>
                    Your form has been submited succesfully. Please contact to your advisor for any
                    query.
                  </h4>
                </Center>
              </>
            ) : (
              <Center>
                <h4 className='py-5'>
                  Your link has been expired. Please contact to your advisor for any query.
                </h4>
              </Center>
            )
          ) : (
            <LoadingSkeleton />
          )}
        </div>
      </Center>
    </MantineProvider>
  )
}

export default ClientSalesForm
