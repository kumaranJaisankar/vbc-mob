//var ipAddress = 'https://admin.vbctv.in';
//  var ipAddress = 'https://qa.sparkradius.in';
//var ipAddress = 'https://dev.vbc.cloudtaru.com';

import apiConfig from './apiConfig';
let ipAddress = apiConfig.serverUrl;
var ipAddressColon = ':';

var URL_Post_Login = `${apiConfig.REACT_APP_API_URL_ADMIN}/accounts/customer/token`;
var URL_Send_OTP = `${apiConfig.REACT_APP_API_URL_ADMIN}/accounts/customer/otp/send`;
var URL_Verify_OTP = `${apiConfig.REACT_APP_API_URL_ADMIN}/accounts/otp/verify`;
var URL_LoginOTP = `${apiConfig.REACT_APP_API_URL_ADMIN}/accounts/login`;
var URL_Get_DashboardData = `${apiConfig.REACT_APP_API_URL_CUSTOMER}/customers/web/app`;
var URL_Get_SessionHistory = `${apiConfig.REACT_APP_API_URL_CUSTOMER}/customers/session/history`;
var URL_Get_InvoiceHistory = `${apiConfig.REACT_APP_API_URL_CUSTOMER}/customers/invoice/list`;
var URL_Get_Datausage = `${apiConfig.REACT_APP_API_URL_CUSTOMER}/customers/datausage`;
var URL_Get_Complaints = `${apiConfig.REACT_APP_API_URL_HELPDESK}/v2/ticket/options`;
var URL_Get_UserPlans = `${apiConfig.REACT_APP_API_URL_CUSTOMER}/customers/plans/list`;
var URL_Get_AllPlans = `${apiConfig.REACT_APP_API_URL_SERVICES}/plans/greater/`;
var URL_Get_AreaPlans = `${apiConfig.REACT_APP_API_URL_ADMIN}/accounts/area/`;
var URL_Get_Leads_Data = `${ipAddress}/radius/lead/display`;
var URL_Get_AssetList_Data = `${apiConfig.REACT_APP_API_URL_NETWORK}/network/olt/display`;
var URL_PostCustomerComplaint = `${apiConfig.REACT_APP_API_URL_HELPDESK}/customer/complaint`;
var URL_Customer_Current_Plan = `${apiConfig.REACT_APP_API_URL_SERVICES}/plans/rud/417`;
var URL_Get_InvoiceHistory_User = `${apiConfig.REACT_APP_API_URL_BILLING}/payment/V2/invoice/list/`;
var URL_Get_User_Profile = `${apiConfig.REACT_APP_API_URL_CUSTOMER}/customers/profile/`;
var URL_Update_Profile = `${apiConfig.REACT_APP_API_URL_CUSTOMER}/customers/rud/`;
var URL_CURRENT_PLAN = `${apiConfig.REACT_APP_API_URL_SERVICES}/plans/rud/41`;
let URL_GET_PLAN_DATA = `${apiConfig.REACT_APP_API_URL_CUSTOMER}/customers/enh/plan/data/`;
export const GetUpgradePlanGBDataQueryCreator = (areaID, PlanID) => {
  return {
    url: `${apiConfig.REACT_APP_API_URL_ADMIN}/accounts/loggedin/${areaID}/plans/${PlanID}`,
  };
};

export const GetUpgradePlanDaysDataQueryCreator = (areaID, PlanID) => {
  return {
    url: `${apiConfig.REACT_APP_API_URL_ADMIN}/accounts/loggedin/${areaID}/speedplans/${PlanID}`,
  };
};

export const GetCurrentPlans = cusId => {
  return {url: `${apiConfig.REACT_APP_API_URL_SERVICES}/plans/rud/${cusId}`};
};

export const GetDashboardDataQueryCreator = () => {
  return {url: URL_Get_DashboardData};
};

export const VerifyOTPDataQueryCreator = () => {
  return {url: URL_Verify_OTP};
};

export const LoginOTPDataQueryCreator = () => {
  return {url: URL_LoginOTP};
};

export const SendOTPDataQueryCreator = () => {
  return {url: URL_Send_OTP};
};

export const PostLoginDataQueryCreator = () => {
  return {url: URL_Post_Login};
};

export const GetSessionHistoryDataQueryCreator = (
  start,
  end,
  startDate,
  endDate,
) => {
  return {
    url: `${apiConfig.REACT_APP_API_URL_CUSTOMER}/customers/v2/session/history?start=${start}&end=${end}&start_date=${startDate}&end_date=${endDate}`,
  };
};

export const GetInvoiceHistoryDataQueryCreator = () => {
  return {url: ipAddress + ipAddressColon + URL_Get_InvoiceHistory};
};

export const GetDataUsageHistoryDataQueryCreator = (
  startDate,
  endDate,
  start,
  end,
) => {
  return {
    url: `${apiConfig.REACT_APP_API_URL_CUSTOMER}/customers/v2/datausage?start_date=${startDate}&end_date=${endDate}&start=${start}&end=${end}`,
  };
};

export const GetComplaintsDataQueryCreator = () => {
  return {url: URL_Get_Complaints};
};

export const GetLeadsDataQueryCreator = () => {
  return {url: URL_Get_Leads_Data};
};

export const GetAssetListDataQueryCreator = () => {
  return {url: URL_Get_AssetList_Data};
};

export const GetComplaintsByUserNameDataQueryCreator = userID => {
  return {
    url: `${apiConfig.REACT_APP_API_URL_HELPDESK}/customer/${userID}/tickets`,
  };
};

export const GetRatingByTicketIDDataQueryCreator = id => {
  return {
    url: `${apiConfig.REACT_APP_API_URL_HELPDESK}/feedback/ticket/` + id,
  };
};

export const PostCustomerComplaintDataQueryCreator = id => {
  return {
    url: URL_PostCustomerComplaint,
  };
};

export const GetCustomerCurrentPlanDataQueryCreator = planId => {
  return {
    url: `${apiConfig.REACT_APP_API_URL_SERVICES}/plans/rud/` + planId,
  };
};

export const prirorCheck = () => {
  return {
    url: `${apiConfig.REACT_APP_API_URL_ADMIN}/wallet/priorcheck`,
  };
};

export const GetAllPlansDataQueryCreator = pageNo => {
  return {
    url: URL_Get_AllPlans + pageNo,
  };
};

export const GetAreaPlansDataQueryCreator = (area, custID) => {
  return {
    url: `${apiConfig.REACT_APP_API_URL_ADMIN}/accounts/area/${area}/plans/${custID}`,
  };
};

export const GetInvoiceHistoryForUser = (userID, page = 1) => {
  return {
    url: URL_Get_InvoiceHistory_User + userID + `?limit=10&page=${page}`,
  };
};

export const openPaymentGateWayDataQueryCreator = cusId => {
  return {
    url: `${apiConfig.REACT_APP_API_URL_CUSTOMER}/customers/enh/onl/plan/renew/${cusId}`,
  };
};

export const customerAmountcalculation = (url = "/customers/get/renew/amount",cusId) => {
  return {
    url: `${apiConfig.REACT_APP_API_URL_CUSTOMER + url}/${cusId}`,
  };
};

export const openPaymentGateWayUpdateDataQueryCreator = custID => {
  return {
    url:
      `${apiConfig.REACT_APP_API_URL_CUSTOMER}/customers/enh/onl/plan/update/` +
      custID,
  };
};

export const submitFeedbackDataQueryCreator = () => {
  return {
    url: `${apiConfig.REACT_APP_API_URL_HELPDESK}/ticket/rating`,
  };
};

export const GetUserProfileDataQueryCreator = userID => {
  return {
    url: URL_Get_User_Profile + userID,
  };
};

export const UpdateUserProfileDataQueryCreator = userID => {
  return {
    url: URL_Update_Profile + userID,
  };
};

export const GetUserPlanData = userID => {
  return {
    url: URL_GET_PLAN_DATA + userID,
  };
};
export const getPaymentGatewayMethods = id => {
  return {
    url: `${apiConfig.REACT_APP_API_URL_BILLING}/payment/cstmr/payment/gateways/${id}`,
  };
};
export const getCustomerDocuments = id => {
  return {
    url: `${apiConfig.REACT_APP_API_URL_CUSTOMER}/customers/get/documents/customer/${id}`,
  };
};
export const UpdateDocumentsQueryCreator = id => {
  return {
    url:`${apiConfig.REACT_APP_API_URL_CUSTOMER}/customers/get/documents/customer/${id}`,
  };
};