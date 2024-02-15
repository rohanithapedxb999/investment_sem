export interface AuthModel {
  accessToken: string
  refreshToken?: string
  id: string
}

export interface UserAddressModel {
  addressLine: string
  city: string
  state: string
  postCode: string
}

export interface UserCommunicationModel {
  email: boolean
  sms: boolean
  phone: boolean
}

export interface UserEmailSettingsModel {
  emailNotification?: boolean
  sendCopyToPersonalEmail?: boolean
  activityRelatesEmail?: {
    youHaveNewNotifications?: boolean
    youAreSentADirectMessage?: boolean
    someoneAddsYouAsAsAConnection?: boolean
    uponNewOrder?: boolean
    newMembershipApproval?: boolean
    memberRegistration?: boolean
  }
  updatesFromKeenthemes?: {
    newsAboutKeenthemesProductsAndFeatureUpdates?: boolean
    tipsOnGettingMoreOutOfKeen?: boolean
    thingsYouMissedSindeYouLastLoggedIntoKeen?: boolean
    newsAboutStartOnPartnerProductsAndOtherServices?: boolean
    tipsOnStartBusinessProducts?: boolean
  }
}

export interface UserSocialNetworksModel {
  linkedIn: string
  facebook: string
  twitter: string
  instagram: string
}

export interface UserModel {
  id: string
  password: string | undefined
  email: string
  roles: {
    id: string
    type: string
    role: {
      id: string
      name: string
      features: {id: string; feature: string}[]
      module: {id: string; name: string; description: string}
    }
  }[]
  refreshToken?: string
  accessToken: string
  cluster: {id: string; name: string}
  country: {id: string; name: string}
  createdAt: string
  department: {id: string; name: string}
  firstName: string
  lastName: string
}
