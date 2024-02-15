import {edate, getDate} from '../_metronic/helpers'
import {setupAxios} from '../app/modules/auth'
import {calculateAge} from '../app/modules/investment/prospect/ProspectFunction'
import {
  Q1,
  Q2,
  Q3,
  Q4,
  Q5,
  Q6,
  Q7,
  Q8,
  calculateAmountForPipeline,
  getPaidFees,
  getRenewalFees,
} from '../app/modules/investment/sales/SalesFunction'
import {ProspectInputType, SalestInputType} from '../types/InvestmentModuleTypes'
import {api} from './apiMiddleware'
import API from './apiUrl'

export async function getAdvisorsByRole(userId: string, userRole: String) {
  const {token} = setupAxios()
  return await api
    .get(`/${API.PROSPECTS}/user/${userId}/${userRole}/users`, token, false)
    .then((res) => res)
}

export async function getProspectsById(id: string) {
  const {token} = setupAxios()
  return await api.get(`/${API.PROSPECTS}/${id}`, token, false).then((res) => res)
}
export async function getProspects() {
  const {token} = setupAxios()
  return await api.get(`/${API.PROSPECTS}/all`, token, false).then((res) => res)
}
export async function deleteProspects(id: string) {
  const {token} = setupAxios()
  return await api.delete(`/${API.PROSPECTS}/${id}`, token, true).then((res) => res)
}
export async function addProspects(formField: ProspectInputType) {
  const {token} = setupAxios()
  return await api
    .post(
      `/${API.PROSPECTS}`,
      token,
      {
        body: JSON.stringify({
          firstName: formField.firstName.trim(),
          lastName: formField.lastName.trim(),
          middleName: formField.middleName.trim(),
          fatherName: formField.fatherName.trim(),
          motherName: formField.motherName.trim(),
          maidenName: formField.maidenName.trim(),
          mobileNo: formField.contactNo.trim(),
          alternateMobileNo: formField.alternateMobileNo.trim(),
          email: formField.email.trim(),
          addressLine1: formField.addressLine1.trim(),
          addressLine2: formField.addressLine2.trim(),
          pin: formField.pin,
          city: {id: !formField.city ? null : formField.city},
          birthCity: {id: !formField.cityOfBirth ? null : formField.cityOfBirth},
          birthCountry: {id: !formField.countryOfBirth ? null : formField.countryOfBirth},
          currentUserId: !formField.currentUserId ? null : formField.currentUserId,
          isNri: formField.isNRI,
          state: {id: !formField.state ? null : formField.state},
          source: {id: !formField.sourceName ? null : formField.sourceName},
          country: {id: !formField.country ? null : formField.country},
          nationality: formField?.nationality,
          gender: formField.gender,
          dob: formField.dob,
          age: Math.abs(Number(calculateAge(formField.dob))),
          occupation: {id: !formField.occupation ? null : formField.occupation},
          occupationDesc: formField.occupationDesc.trim(),
          maritalStatus: formField.maritalStatus,
          politicalExposure: formField.politicalExposure,
          existingReferal: formField.referalType === 'new' ? null : formField.referal,
          newReferal: formField.referalType === 'new' ? formField.referal : null,
          probability: formField.probability,
          riskAppetite: formField.riskAppetite,
          tentativeAmount: formField.tentativeAmount,
          tentativeFollowUpDate: formField.tentativeFollowUpDate,
          status: {code: '1'},
          operationalStatus: {code: null},
          assignedBy: {id: !formField.assignedBy ? null : formField.assignedBy},
        }),
      },
      true
    )
    .then((res) => res)
}
export async function updateProspectsById(formField: ProspectInputType, id: string) {
  const {token} = setupAxios()
  return await api
    .put(
      `/${API.PROSPECTS}/${id}`,
      token,
      {
        body: JSON.stringify({
          firstName: formField.firstName.trim(),
          lastName: formField.lastName.trim(),
          middleName: formField.middleName.trim(),
          fatherName: formField.fatherName.trim(),
          motherName: formField.motherName.trim(),
          maidenName: formField.maidenName.trim(),
          mobileNo: formField.contactNo.trim(),
          alternateMobileNo: formField.alternateMobileNo.trim(),
          email: formField.email.trim(),
          addressLine1: formField.addressLine1.trim(),
          addressLine2: formField.addressLine2.trim(),
          pin: formField.pin,
          city: {id: !formField.city ? null : formField.city},
          source: {id: !formField.sourceName ? null : formField.sourceName},
          state: {id: !formField.state ? null : formField.state},
          country: {id: !formField.country ? null : formField.country},
          birthCity: {id: !formField.cityOfBirth ? null : formField.cityOfBirth},
          birthCountry: {id: !formField.countryOfBirth ? null : formField.countryOfBirth},
          isNri: formField.isNRI,
          nationality: formField?.nationality,
          gender: formField.gender,
          dob: formField.dob,
          currentUserId: !formField.currentUserId ? null : formField.currentUserId,
          comment: formField?.comment?.trim() ?? null,
          age: Math.abs(Number(calculateAge(formField.dob))),
          occupation: {id: !formField.occupation ? null : formField.occupation},
          occupationDesc: formField.occupationDesc.trim(),
          maritalStatus: formField.maritalStatus,
          politicalExposure: formField.politicalExposure,
          existingReferal: formField.referalType === 'new' ? null : formField.referal,
          newReferal: formField.referalType === 'new' ? formField.referal : null,
          probability: formField.probability,
          riskAppetite: formField.riskAppetite,
          tentativeAmount: formField.tentativeAmount,
          tentativeFollowUpDate: formField.tentativeFollowUpDate,
          status: {code: formField.status},
          operationalStatus: {code: formField.operationalStatus},
          assignedBy: {id: !formField.assignedBy ? null : formField.assignedBy},
        }),
      },
      true
    )
    .then((res) => res)
}
export async function getSalesProspectsById(id: string) {
  const {token} = setupAxios()
  return await api.get(`/${API.PROSPECTS}/${id}/sales`, token, false).then((res) => res)
}

export async function sendFormToClient(prospectId: string, userId: string) {
  const {token} = setupAxios()
  return await api
    .post(
      `/prospect/${prospectId}/send-email`,
      token,
      {
        body: JSON.stringify({
          user: {id: userId},
        }),
      },
      false
    )
    .then((res) => res)
}

export async function updateProspectsStatusById(
  id: string,
  status: string,
  operationalStatus: string | null,
  userId: string | null
) {
  const {token} = setupAxios()
  return await api
    .put(
      `/${API.PROSPECTS}/${id}/status`,
      token,
      {
        body: JSON.stringify({
          status: status,
          operationalStatus: operationalStatus,
          user: userId,
        }),
      },
      false
    )
    .then((res) => res)
}

export async function submitProspectComment(
  prospectId: string,
  userId: string,
  formField: {comment: string; commentType: string}
) {
  const {token} = setupAxios()
  return await api
    .post(
      `/sales-comment`,
      token,
      {
        body: JSON.stringify({
          prospect: {id: prospectId},
          user: {id: userId},
          comment: formField.comment.trim(),
          startDate: Date(),
          commentType: formField.commentType ?? null,
          followUpDate: null,
        }),
      },
      false
    )
    .then((res) => res)
}

export async function addSalesDataInProspectByProspectId(
  propspectFormField: ProspectInputType,
  salesFormField: SalestInputType,
  id: string | null
) {
  const {token} = setupAxios()
  const {currentDate} = getDate()
  let documents: any[] = []
  const formdata: any = new FormData()
  salesFormField.documents.map((doc, index) => {
    if (doc.fileName) {
      documents.push({
        documentType: doc.documentType === 'Other' ? doc.otherDocumentType : doc.documentType,
        fileName: doc.fileName?.name,
        remark: doc.remark,
        id: doc.id,
        serial: null,
      })
      formdata.append(`files`, doc.fileName)
    }
  })
  if (salesFormField.aadharDocument) {
    documents.push({
      documentType: 'Aadhar',
      fileName: salesFormField.aadharDocument?.name,
      remark: "Applicant's Aadhar Card",
      serial: 1,
      id: null,
    })
    formdata.append(`files`, salesFormField.aadharDocument)
  }
  if (salesFormField.panDocument) {
    documents.push({
      documentType: 'Pan',
      fileName: salesFormField.panDocument?.name,
      remark: "Applicant's Pan Card",
      serial: 2,
      id: null,
    })
    formdata.append(`files`, salesFormField.panDocument)
  }
  if (salesFormField.cancelledCheque) {
    documents.push({
      documentType: 'Cancelled Cheque',
      fileName: salesFormField.cancelledCheque?.name,
      remark: "Applicant's Cancelled Cheque",
      serial: 3,
      id: null,
    })
    formdata.append(`files`, salesFormField.cancelledCheque)
  }
  if (salesFormField.addressProofDoc) {
    documents.push({
      documentType: 'Address Proof',
      fileName: salesFormField.addressProofDoc?.name,
      remark: "Applicant's Address proof",
      serial: 4,
      id: null,
    })
    formdata.append(`files`, salesFormField.addressProofDoc)
  }
  if (salesFormField.photo) {
    documents.push({
      documentType: 'Photo',
      fileName: salesFormField.photo?.name,
      remark: "Applicant's Photo",
      serial: 5,
      id: null,
    })
    formdata.append(`files`, salesFormField.photo)
  }

  if (Math.abs(Number(calculateAge(propspectFormField.dob))) < 18) {
    if (salesFormField.birthCertificate) {
      documents.push({
        documentType: 'Birth Certificate',
        fileName: salesFormField.birthCertificate?.name,
        remark: "Applicant's Birth Certificate",
        serial: 6,
        id: null,
      })
      formdata.append(`files`, salesFormField.birthCertificate)
    }
  }

  if (propspectFormField.isNRI === 'NRI') {
    if (salesFormField.overseasAddressProof) {
      documents.push({
        documentType: 'Overseas Address Proof',
        fileName: salesFormField.overseasAddressProof?.name,
        remark: "Applicant's Overseas Address Proof",
        serial: 7,
        id: null,
      })
      formdata.append(`files`, salesFormField.overseasAddressProof)
    }
    if (salesFormField.passport) {
      documents.push({
        documentType: 'Passport',
        fileName: salesFormField.passport?.name,
        remark: "Applicant's Passport",
        serial: 8,
        id: null,
      })
      formdata.append(`files`, salesFormField.passport)
    }
    if (salesFormField.pioCard) {
      documents.push({
        documentType: 'PIO & OCI Card',
        fileName: salesFormField.pioCard?.name,
        remark: "Applicant's PIO & OCI Card",
        serial: 9,
        id: null,
      })
      formdata.append(`files`, salesFormField.pioCard)
    }
    if (salesFormField.visa) {
      documents.push({
        documentType: 'Visa',
        fileName: salesFormField.visa?.name,
        remark: "Applicant's Visa",
        serial: 10,
        id: null,
      })
      formdata.append(`files`, salesFormField.visa)
    }
    if (salesFormField.immigration) {
      documents.push({
        documentType: 'Immigration',
        fileName: salesFormField.immigration?.name,
        remark: "Applicant's Immigration",
        serial: 11,
        id: null,
      })
      formdata.append(`files`, salesFormField.immigration)
    }
    if (salesFormField.isTaxResidencyOtherThanIndia === 'Yes') {
      if (salesFormField.taxIdentificationDoc) {
        documents.push({
          documentType: 'Tax Identification Document',
          fileName: salesFormField.taxIdentificationDoc?.name,
          remark: "Applicant's Tax Identification Document",
          serial: 12,
          id: null,
        })
        formdata.append(`files`, salesFormField.taxIdentificationDoc)
      }
    }
  }
  const nominations: {}[] = []
  salesFormField.nominations.map((nomination) => {
    if (nomination.nomineePanCard) {
      formdata.append(`files`, nomination.nomineePanCard)
    }
    nominations.push({
      id: nomination.id,
      firstName: nomination.firstName.trim(),
      lastName: nomination.lastName.trim(),
      relation: nomination.relation,
      dob: nomination.dob,
      address: nomination.address,
      isAddressSame: nomination.isAddressSame,
      gaurdianRelation: nomination.guardianRelation,
      gaurdianFirstName: nomination.guardianFirstName.trim(),
      gaurdianLastName: nomination.guardianLastName.trim(),
      gaurdianAddress: nomination.guardianAddress.trim(),
      gaurdianContact: nomination.guardianContactNo,
      percentage: nomination.percentage,
      isMinor: Math.abs(Number(calculateAge(nomination.dob))) > 18 ? false : true,
      panCard: nomination?.nomineePanCard?.name,
    })
  })

  let products: {
    startDate: string
    amount: string
    id: string | null
    status: {code: string}
    product: {id: string}
    endDate: string
    subCategory: string
    serial: number
    profitPercent: string
    profitPlan: string
    companyFee: string
    type: string
    parentId: string | null
    profitAmount: string
    clientProductRenewal: {
      id: string | null
      profitPercent: string
      renewalBalance: string
      status: {code: string}
      renewalDate: string
    }[]
  }[] = []
  salesFormField.products.map((product) => {
    product.product.map((prd, index) => {
      let renewalData: {
        id: string | null
        profitPercent: string
        renewalBalance: string
        status: {code: string}
        renewalDate: string
      }[] = []
      if (prd.status === '16') {
        if (prd.renewalData.length === 0) {
          let endDate = new Date(prd.endDate)
          let startDate = new Date(prd.startDate)
          let duration =
            endDate?.getMonth() -
            startDate?.getMonth() +
            12 * (endDate?.getFullYear() - startDate?.getFullYear())
          console.log(duration, 'in investment api')
          if (duration > 6) {
            renewalData.push({
              id: null,
              profitPercent: prd.profitPercent,
              renewalBalance: getRenewalFees(
                prd.profitPlan,
                prd.profitPercent,
                prd.amount,
                new Date(prd.startDate),
                new Date(prd.endDate)
              ).toString(),
              status: {code: prd.profitPercent === '0' ? '20' : '19'},
              renewalDate:
                prd.type === 'Addon'
                  ? edate(
                      product.product.filter((item) => item.id === prd.parentId)[0].startDate,
                      6
                    )
                  : edate(prd.startDate, 6),
            })
          }
        }
      }
      prd.renewalData.map((renewal) => {
        renewalData.push({
          id: renewal.id,
          profitPercent: renewal.profitPercent,
          renewalBalance: renewal.renewalBalance,
          status: {code: renewal.status},
          renewalDate: renewal.renewalDate,
        })
        if (prd.type !== 'Pipeline' && renewal.status === '20') {
          let existingPipeline =
            prd.type === 'Addon'
              ? product.product.filter(
                  (item) => item.parentId === prd.parentId && item.type === 'Pipeline'
                )
              : product.product.filter(
                  (item) => item.parentId === prd.id && item.type === 'Pipeline'
                )
          console.log(existingPipeline, 'pipeline')
          if (existingPipeline.length === 0) {
            let startDate: Date = new Date(
              new Date(prd.endDate).setDate(new Date(prd.endDate).getDate() + 1)
            )
            products.push({
              id: null,
              type: 'Pipeline',
              parentId: prd.id,
              startDate: startDate.toISOString().split('T')[0] ?? null,
              amount: prd.amount ?? null,
              status: {code: '17'},
              product: {id: product.productId},
              endDate: edate(startDate.toISOString().split('T')[0], 12),
              subCategory: prd.subCategory,
              profitPercent: prd.profitPercent,
              profitPlan: prd.profitPlan,
              companyFee: '',
              profitAmount: getPaidFees(
                prd.profitPlan,
                prd.profitPercent,
                prd.amount,
                new Date(prd.startDate),
                new Date(prd.endDate)
              ).toString(),
              serial: 1,
              clientProductRenewal: [],
            })
          }
        }
      })
      products.push({
        id: prd.id,
        type: prd.status === '16' && prd.type !== 'Addon' ? 'Asset' : prd.type,
        parentId: prd.parentId,
        startDate: prd.startDate ?? null,
        amount:
          prd.type === 'Pipeline' && prd.startDate > currentDate && prd.parentId
            ? calculateAmountForPipeline(product.product, prd.parentId).toString()
            : prd.amount ?? null,
        status: {code: prd.status},
        product: {id: product.productId},
        endDate: prd.endDate,
        subCategory: prd.subCategory,
        profitPercent: prd.profitPercent,
        profitPlan: prd.profitPlan,
        companyFee: prd.companyFee,
        profitAmount: getPaidFees(
          prd.profitPlan,
          prd.profitPercent,
          prd.amount,
          new Date(prd.startDate),
          new Date(prd.endDate)
        ).toString(),
        serial: index + 1,
        clientProductRenewal: renewalData,
      })
    })
  })
  console.log(products)
  formdata.append(`documents`, JSON.stringify(documents))
  formdata.append(
    'otherData',
    JSON.stringify({
      prospectId: {
        id: id,
      },
      prospect: {
        firstName: propspectFormField.firstName.trim(),
        middleName: propspectFormField.middleName.trim(),
        fatherName: propspectFormField.fatherName.trim(),
        motherName: propspectFormField.motherName.trim(),
        maidenName: propspectFormField.maidenName.trim(),
        lastName: propspectFormField.lastName.trim(),
        mobileNo: propspectFormField.contactNo.trim(),
        alternateMobileNo: propspectFormField.alternateMobileNo.trim(),
        email: propspectFormField.email.trim(),
        comment: propspectFormField?.comment?.trim() ?? null,
        currentUserId: !propspectFormField.currentUserId ? null : propspectFormField.currentUserId,
        addressLine1: propspectFormField.addressLine1.trim(),
        addressLine2: propspectFormField.addressLine2.trim(),
        pin: propspectFormField.pin,
        city: {id: !propspectFormField.city ? null : propspectFormField.city},
        state: {id: !propspectFormField.state ? null : propspectFormField.state},
        source: {id: !propspectFormField.sourceName ? null : propspectFormField.sourceName},
        country: {id: !propspectFormField.country ? null : propspectFormField.country},
        birthCity: {id: !propspectFormField.cityOfBirth ? null : propspectFormField.cityOfBirth},
        birthCountry: {
          id: !propspectFormField.countryOfBirth ? null : propspectFormField.countryOfBirth,
        },
        isNri: propspectFormField.isNRI,
        taxResidencyCountry: {
          id: !salesFormField.taxResidencyCountry ? null : salesFormField.taxResidencyCountry,
        },
        isTaxResidencyOtherThanIndia: salesFormField.isTaxResidencyOtherThanIndia,
        taxIdentificationNo: salesFormField.taxIdentificationNo,
        nationality: propspectFormField?.nationality,
        gender: propspectFormField.gender,
        dob: propspectFormField.dob,
        age: Math.abs(Number(calculateAge(propspectFormField.dob))),
        occupation: {id: !propspectFormField.occupation ? null : propspectFormField.occupation},
        occupationDesc: propspectFormField.occupationDesc.trim(),
        maritalStatus: propspectFormField.maritalStatus,
        politicalExposure: propspectFormField.politicalExposure,
        existingReferal:
          propspectFormField.referalType === 'new' ? null : propspectFormField.referal,
        newReferal: propspectFormField.referalType === 'new' ? propspectFormField.referal : null,
        probability: propspectFormField.probability,
        riskAppetite: propspectFormField.riskAppetite,
        tentativeAmount: propspectFormField.tentativeAmount,
        tentativeFollowUpDate: propspectFormField.tentativeFollowUpDate,
        status: {code: !propspectFormField.status ? null : propspectFormField.status},
        operationalStatus: {
          code: !propspectFormField.operationalStatus
            ? null
            : propspectFormField.status === '5'
            ? null
            : propspectFormField.operationalStatus,
        },
        assignedBy: {id: !propspectFormField.assignedBy ? null : propspectFormField.assignedBy},
        aadharNo: salesFormField.aadharNo,
        panNo: salesFormField.panNo?.toUpperCase(),
      },
      products,
      nominations: nominations,
      riskProfiles: [
        {
          question: Q1,
          answer: salesFormField.riskQ1,
          serialNo: 1,
        },
        {
          question: Q2,
          answer: salesFormField.riskQ2,
          serialNo: 2,
        },
        {
          question: Q3,
          answer: salesFormField.riskQ3,
          serialNo: 3,
        },
        {
          question: Q4,
          answer: salesFormField.riskQ4,
          serialNo: 4,
        },
        {
          question: Q5,
          answer: salesFormField.riskQ5,
          serialNo: 5,
        },
        {
          question: Q6,
          answer: salesFormField.riskQ6,
          serialNo: 6,
        },
        {
          question: Q7,
          answer: salesFormField.riskQ7,
          serialNo: 7,
        },
        {
          question: Q8,
          answer: salesFormField.riskQ8,
          serialNo: 8,
        },
      ],
      interest: {
        invenstmentGoal: salesFormField.investmentGoal,
        investmentHorizon: salesFormField.investmentHorizon,
        annualIncome: salesFormField.annualIncome,
        currentWorth: salesFormField.currentWorth,
        sourceOfIncome: salesFormField.sourceOfIncome,
        immediateFinanceNeeds: salesFormField.immediateFinanceNeeds,
        currentHoldingsInEquity: salesFormField.currentHoldinginEquity,
        currentHoldingsInDebt: salesFormField.currentHoldinginDebt,
      },
    })
  )
  return await api
    .post(
      `/${API.PROSPECTS}/sales`,
      token,
      {
        body: formdata,
      },
      false,
      true
    )
    .then((res) => res)
}

export async function getProspectDashboardCount() {
  const {token} = setupAxios()
  return await api.get(`/${API.PROSPECTS}/count`, token, false).then((res) => res)
}
