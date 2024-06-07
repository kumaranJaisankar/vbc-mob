import {
  GetComplaintsDataQueryCreator,
  LoginOTPDataQueryCreator,
  GetDashboardDataQueryCreator,
  VerifyOTPDataQueryCreator,
  SendOTPDataQueryCreator,
  GetInvoiceHistoryDataQueryCreator,
  GetDataUsageHistoryDataQueryCreator,
  GetSessionHistoryDataQueryCreator,
  PostLoginDataQueryCreator,
  GetLeadsDataQueryCreator,
  GetAssetListDataQueryCreator,
  GetComplaintsByUserNameDataQueryCreator,
  GetRatingByTicketIDDataQueryCreator,
  PostCustomerComplaintDataQueryCreator,
  GetCustomerCurrentPlanDataQueryCreator,
  GetAllPlansDataQueryCreator,
  GetInvoiceHistoryForUser,
  openPaymentGateWayDataQueryCreator,
  submitFeedbackDataQueryCreator,
  openPaymentGateWayUpdateDataQueryCreator,
  GetAreaPlansDataQueryCreator,
  GetUserProfileDataQueryCreator,
  UpdateUserProfileDataQueryCreator,
  GetCurrentPlans,
  prirorCheck,
  GetUpgradePlanGBDataQueryCreator,
  GetUpgradePlanDaysDataQueryCreator,
  customerAmountcalculation,
  GetUserPlanDataNew,
  GetUserPlanData,
  getPaymentGatewayMethods,
  getCustomerDocuments,
  UpdateDocumentsQueryCreator,
} from './APIRequestQueryCreator';
import {GetHeaderData} from './APIServiceHeader';
import {GetHeaderTokenData} from './APIServiceHeaderToken';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee from '@notifee/react-native';
import {useEffect} from 'react';
import apiConfig from './apiConfig';

const APIServices = {
  postLogin,
  sendOTP,
  verifyOTP,
  loginOTP,
  getDashboardData,
  getSessionHistory,
  getInvoiceHistory,
  getDataUsageHistory,
  getComplaintsData,
  getLeadsData,
  getAssetListData,
  getComplaintsByUserName,
  getRatingByTicketID,
  postCustomerComplaint,
  getCustomerCurrentPlan,
  getAllPlans,
  getInvoiceHistoryForUser,
  openPaymentGateWay,
  submitFeedback,
  openPaymentGateWayUpdate,
  getAreaPlans,
  getCustomerProfile,
  updateProfile,
  localDisplayNotification,
  priorcheckAPI,
  getUpgradePlansGB,
  getUpgradePlansDays,
  GetUserDataForPlan,
  getAmountCalculation,
  getPaymentGatewaysEnabled,
  getDocumentsListData,
  updateDocumentsListData,
};

async function postLogin(email, password, successCallback, errorCallBack) {
  var body = {
    username: email.value,
    password: password.value,
  };
  let ipAddress = PostLoginDataQueryCreator();
  console.log(ipAddress);
  var header = GetHeaderData();
  await axios
    .post(ipAddress.url, JSON.stringify(body), {
      headers: header,
      timeout: 120000,
    })
    .then(response => {
      if (response.status == 200) {
        console.log(response, 'logg response');
        try {
          AsyncStorage.setItem('token', response.data.access);
          AsyncStorage.setItem('refreshtoken', '');
          AsyncStorage.setItem('username', response.data.username);
          AsyncStorage.setItem('id', response?.data?.id);
        } catch (exception) {}
      }
      successCallback(response);
    })
    .catch(_error => {
      console.log(_error);
      const errorresponse = _error.toString();
      errorCallBack(errorresponse);
    });
}

async function sendOTP(otpUsername, successCallback, errorCallBack) {
  var body = {
    username: otpUsername,
  };
  let ipAddress = SendOTPDataQueryCreator();
  var header = GetHeaderData();
  await axios
    .post(ipAddress.url, JSON.stringify(body), {
      headers: header,
      timeout: 120000,
    })
    .then(response => {
      successCallback(response);
    })
    .catch(_error => {
      const errorresponse = _error.toString();
      errorCallBack(errorresponse);
    });
}

async function verifyOTP(
  otpUsername,
  enteredOTP,
  successCallback,
  errorCallBack,
) {
  var body = {
    username: otpUsername,
    otp: enteredOTP,
  };
  let ipAddress = VerifyOTPDataQueryCreator();
  var header = GetHeaderData();
  await axios
    .post(ipAddress.url, JSON.stringify(body), {
      headers: header,
      timeout: 120000,
    })
    .then(response => {
      successCallback(response);
    })
    .catch(_error => {
      const errorresponse = _error.toString();
      errorCallBack(errorresponse);
    });
}

async function loginOTP(
  otpUsername,
  enteredOTP,
  successCallback,
  errorCallBack,
) {
  var body = {
    username: otpUsername,
    otp: enteredOTP,
  };
  let ipAddress = LoginOTPDataQueryCreator();
  var header = GetHeaderData();
  await axios
    .post(ipAddress.url, JSON.stringify(body), {
      headers: header,
      timeout: 120000,
    })
    .then(response => {
      successCallback(response);
    })
    .catch(_error => {
      const errorresponse = _error.toString();
      errorCallBack(errorresponse);
    });
}

async function getDashboardData(successCallback, errorCallBack) {
  var token = '';
  try {
    token = await AsyncStorage.getItem('token');
  } catch (e) {}
  let ipAddress = GetDashboardDataQueryCreator();
  var header = GetHeaderTokenData(token);
  await axios(ipAddress.url, {
    method: 'GET',
    headers: header,
    timeout: 120000,
  })
    .then(response => {
      successCallback(response);
    })
    .catch(_error => {
      const errorresponse = _error.toString();
      errorCallBack(errorresponse);
    });
}

async function getSessionHistory(
  start,
  end,
  startDate,
  endDate,
  successCallback,
  errorCallBack,
) {
  var token = '';
  try {
    token = await AsyncStorage.getItem('token');
  } catch (e) {}
  let ipAddress = GetSessionHistoryDataQueryCreator(
    start,
    end,
    startDate,
    endDate,
  );
  console.log('Payload', ipAddress.url);
  var header = GetHeaderTokenData(token);
  await axios(ipAddress.url, {
    method: 'GET',
    headers: header,
    timeout: 120000,
  })
    .then(response => {
      successCallback(response);
    })
    .catch(_error => {
      const errorresponse = _error.toString();
      errorCallBack(errorresponse);
    });
}

async function getInvoiceHistory(successCallback, errorCallBack) {
  var token = '';
  try {
    token = await AsyncStorage.getItem('token');
  } catch (e) {}
  let ipAddress = GetInvoiceHistoryDataQueryCreator();
  var header = GetHeaderTokenData(token);
  await axios(ipAddress.url, {
    method: 'GET',
    headers: header,
    timeout: 60000,
  })
    .then(response => {
      successCallback(response);
    })
    .catch(_error => {
      const errorresponse = _error.toString();
      errorCallBack(errorresponse);
    });
}

async function getDataUsageHistory(
  startDate,
  endDate,
  start,
  end,
  successCallback,
  errorCallBack,
) {
  var token = '';
  try {
    token = await AsyncStorage.getItem('token');
  } catch (e) {}
  let ipAddress = GetDataUsageHistoryDataQueryCreator(
    startDate,
    endDate,
    start,
    end,
  );

  console.log(ipAddress);
  var header = GetHeaderTokenData(token);
  await axios(ipAddress.url, {
    method: 'GET',
    headers: header,
    timeout: 120000,
  })
    .then(response => {
      successCallback(response);
    })
    .catch(_error => {
      const errorresponse = _error.toString();
      errorCallBack(errorresponse);
    });
}

async function getComplaintsData(successCallback, errorCallBack) {
  var token = '';
  try {
    token = await AsyncStorage.getItem('token');
  } catch (e) {}
  let ipAddress = GetComplaintsDataQueryCreator();
  var header = GetHeaderTokenData(token);
  await axios(ipAddress.url, {
    method: 'GET',
    headers: header,
    timeout: 120000,
  })
    .then(response => {
      successCallback(response);
    })
    .catch(_error => {
      const errorresponse = _error.toString();
      errorCallBack(errorresponse);
    });
}

async function getLeadsData(successCallback, errorCallBack) {
  let url = GetLeadsDataQueryCreator();
  var header = GetHeaderData();
  await axios(url, {
    method: 'GET',
    headers: header,
    timeout: 120000,
  })
    .then(response => {
      successCallback(response);
    })
    .catch(_error => {
      const errorresponse = _error.toString();
      if (errorresponse.includes('400')) {
        errorCallBack('400 Error');
      } else if (errorresponse.includes('401')) {
        errorCallBack('401 Error');
      } else {
        errorCallBack(errorresponse);
      }
    });
}

async function getAssetListData(successCallback, errorCallBack) {
  let url = GetAssetListDataQueryCreator();
  var header = GetHeaderData();
  await axios(url, {
    method: 'GET',
    headers: header,
    timeout: 120000,
  })
    .then(response => {
      successCallback(response);
    })
    .catch(_error => {
      const errorresponse = _error.toString();
      if (errorresponse.includes('400')) {
        errorCallBack('400 Error');
      } else if (errorresponse.includes('401')) {
        errorCallBack('401 Error');
      } else {
        errorCallBack(errorresponse);
      }
    });
}

async function getComplaintsByUserName(page, successCallback, errorCallBack) {
  var token = '';
  try {
    token = await AsyncStorage.getItem('token');
  } catch (e) {}
  let userID = await AsyncStorage.getItem('username');
  console.log('username', userID);
  let ipAddress = GetComplaintsByUserNameDataQueryCreator(userID);
  var header = GetHeaderTokenData(token);
  await axios(ipAddress.url, {
    method: 'GET',
    headers: header,
    timeout: 120000,
  })
    .then(response => {
      successCallback(response);
    })
    .catch(_error => {
      const errorresponse = _error.toString();
      errorCallBack(errorresponse);
    });
}

async function getRatingByTicketID(id, successCallback, errorCallBack) {
  var token = '';
  try {
    token = await AsyncStorage.getItem('token');
  } catch (e) {}
  let ipAddress = GetRatingByTicketIDDataQueryCreator(id);
  var header = GetHeaderTokenData(token);
  await axios(ipAddress.url, {
    method: 'GET',
    headers: header,
    timeout: 120000,
  })
    .then(response => {
      successCallback(response);
    })
    .catch(_error => {
      const errorresponse = _error.toString();
      errorCallBack(errorresponse);
    });
}

async function postCustomerComplaint(
  ticket_category,
  sub_category,
  notes,
  successCallback,
  errorCallBack,
) {
  var token = '';
  try {
    token = await AsyncStorage.getItem('token');
  } catch (e) {}
  var body = {
    notes: notes.value.toString(),
    ticket_category: ticket_category.toString(),
    sub_category: sub_category.toString(),
  };
  let ipAddress = PostCustomerComplaintDataQueryCreator();
  var header = GetHeaderTokenData(token);
  console.log('ipAddress', ipAddress);
  console.log('body', body);
  await axios
    .post(ipAddress.url, JSON.stringify(body), {
      headers: header,
      timeout: 120000,
    })
    .then(response => {
      successCallback(response);
    })
    .catch(_error => {
      console.log('_error', _error);
      const errorresponse = _error.toString();
      console.log('error in calling', errorresponse);
      errorCallBack(errorresponse);
    });
}

async function getCustomerCurrentPlan(planId, successCallback, errorCallBack) {
  var token = '';
  try {
    token = await AsyncStorage.getItem('token');
  } catch (e) {}
  let url = GetCustomerCurrentPlanDataQueryCreator(planId);
  var header = GetHeaderTokenData(token);
  console.log('api here', url.url);
  await axios(url.url, {
    method: 'GET',
    headers: header,
    timeout: 5000,
  })
    .then(response => {
      console.log('response api', response);
      successCallback(response);
    })
    .catch(_error => {
      console.log('eeee', _error);
      const errorresponse = _error.toString();
      if (errorresponse.includes('400')) {
        errorCallBack('400 Error');
      } else if (errorresponse.includes('401')) {
        errorCallBack('401 Error');
      } else {
        errorCallBack(errorresponse);
      }
    });
}

async function getAllPlans(pageNo, successCallback, errorCallBack) {
  var token = '';
  try {
    token = await AsyncStorage.getItem('token');
  } catch (e) {}
  let url = GetAllPlansDataQueryCreator(pageNo);
  var header = GetHeaderTokenData(token);
  console.log(url);
  await axios(url.url, {
    method: 'GET',
    headers: header,
    timeout: 120000,
  })
    .then(response => {
      successCallback(response);
    })
    .catch(_error => {
      const errorresponse = _error.toString();
      if (errorresponse.includes('400')) {
        errorCallBack('400 Error');
      } else if (errorresponse.includes('401')) {
        errorCallBack('401 Error');
      } else {
        errorCallBack(errorresponse);
      }
    });
}

async function getAreaPlans(area, cusID, successCallback, errorCallBack) {
  var token = '';
  try {
    token = await AsyncStorage.getItem('token');
  } catch (e) {}
  let url = GetAreaPlansDataQueryCreator(area, cusID);
  var header = GetHeaderTokenData(token);
  console.log(url);
  await axios(url.url, {
    method: 'GET',
    headers: header,
    timeout: 120000,
  })
    .then(response => {
      successCallback(response);
    })
    .catch(_error => {
      const errorresponse = _error.toString();
      console.log('error', errorresponse);
      if (errorresponse.includes('400')) {
        errorCallBack('400 Error');
      } else if (errorresponse.includes('401')) {
        errorCallBack('401 Error');
      } else {
        errorCallBack(errorresponse);
      }
    });
}

//Upgrade Plan
async function getUpgradePlansGB(
  areaID,
  PlanID,
  successCallback,
  errorCallBack,
) {
  var token = '';
  try {
    token = await AsyncStorage.getItem('token');
  } catch (e) {}
  let url = GetUpgradePlanGBDataQueryCreator(areaID, PlanID);
  var header = GetHeaderTokenData(token);
  console.log(url);
  await axios(url.url, {
    method: 'GET',
    headers: header,
    timeout: 120000,
  })
    .then(response => {
      successCallback(response);
    })
    .catch(_error => {
      const errorresponse = _error.toString();
      console.log('error', errorresponse);
      if (errorresponse.includes('400')) {
        errorCallBack('400 Error');
      } else if (errorresponse.includes('401')) {
        errorCallBack('401 Error');
      } else {
        errorCallBack(errorresponse);
      }
    });
}
async function getUpgradePlansDays(
  areaID,
  PlanID,
  successCallback,
  errorCallBack,
) {
  var token = '';
  try {
    token = await AsyncStorage.getItem('token');
  } catch (e) {}
  let url = GetUpgradePlanDaysDataQueryCreator(areaID, PlanID);
  var header = GetHeaderTokenData(token);
  console.log(url);
  await axios(url.url, {
    method: 'GET',
    headers: header,
    timeout: 120000,
  })
    .then(response => {
      successCallback(response);
    })
    .catch(_error => {
      const errorresponse = _error.toString();
      console.log('error', errorresponse);
      if (errorresponse.includes('400')) {
        errorCallBack('400 Error');
      } else if (errorresponse.includes('401')) {
        errorCallBack('401 Error');
      } else {
        errorCallBack(errorresponse);
      }
    });
}

async function getInvoiceHistoryForUser(
  invoiceListPageNo,
  successCallback,
  errorCallBack,
) {
  var token = '';
  var userID = '';
  try {
    token = await AsyncStorage.getItem('token');
    userID = await AsyncStorage.getItem('username');
  } catch (e) {}
  let ipAddress = GetInvoiceHistoryForUser(userID, invoiceListPageNo);
  console.log(ipAddress);
  var header = GetHeaderTokenData(token);
  await axios(ipAddress.url, {
    method: 'GET',
    headers: header,
    timeout: 120000,
  })
    .then(response => {
      successCallback(response);
    })
    .catch(_error => {
      const errorresponse = _error.toString();
      errorCallBack(errorresponse);
    });
}

async function openPaymentGateWay(
  getCalculations,
  planId,
  amount,
  cgst,
  sgst,
  radius_info,
  cusID,
  walletAmount,
  props,
  successCallback,
  errorCallBack,
) {
  var token = '';
  var customerID = '';
  try {
    token = await AsyncStorage.getItem('token');
    customerID = await AsyncStorage.getItem('customerID');
  } catch (e) {
    console.log(e);
  }
  // var body = {
  //   amount: amount,
  //   plan: planId,
  //   cgst: cgst,
  //   sgst: sgst,
  //   radius_info: radius_info,
  // };

  //old logic
  // let paymentObj={
  //   customer_id: cusID,
  //   service_plan: planId,
  //   radius_info:radius_info?radius_info:{
  //       id: props?.radius_info?.id,
  //       ippool_id: props?.radius_info?.ippool_id,
  //       static_ip_bind:  props?.radius_info?.static_ip_bind,
  //       static_ip_cost:  props?.radius_info?.static_ip_cost,
  //       static_ip_cgst:  props?.radius_info?.static_ip_cgst,
  //       static_ip_sgst:  props?.radius_info?.static_ip_sgst,
  //       static_ip_total_cost:  props?.radius_info?.static_ip_total_cost
  //   },
  //   amount: amount,
  //   ledger_amount:  0,
  //   discount: false,
  //   discount_amount: 0,
  //   wallet_amount: walletAmount,
  //   use_wallet: false
  // }

  const paymentObj = getCalculations;
  paymentObj.plan = paymentObj.new_service_plan;
  paymentObj.amount = paymentObj.amount < 0 ? 0 : paymentObj.amount;

  console.log('cusID', cusID);
  let ipAddress = openPaymentGateWayDataQueryCreator(cusID);
  var header = GetHeaderTokenData(token);
  console.log('body payment', paymentObj);
  console.log(ipAddress.url);
  await axios
    .patch(ipAddress.url, JSON.stringify(paymentObj), {
      method: 'PATCH',
      headers: header,
      timeout: 120000,
    })
    .then(response => {
      console.log('PATCH', response);
      successCallback(response);
    })
    .catch(_error => {
      console.log('errrrr', _error);
      const errorresponse = _error.toString();
      errorCallBack(errorresponse);
    });
}

async function openPaymentGateWayUpdate(
  getCalculations,
  planId,
  amount,
  radiusinfo,
  use_wallet,
  customer_id,
  balance,
  props,
  successCallback,
  errorCallBack,
) {
  var token = '';
  var customerID = '';
  let body;
  try {
    token = await AsyncStorage.getItem('token');
    customerID = await AsyncStorage.getItem('customerID');
  } catch (e) {}
  // if (balance) {
  //   // var body = {
  //   //   amount: amount,
  //   //   plan: planId,
  //   //   use_wallet: use_wallet,
  //   //   radius_info: radiusinfo,
  //   //   balance: balance,
  //   // };
  //   body={
  //     customer_id: props?.customer_id,
  //     previous_service_plan:props.plan_id,
  //     new_service_plan: planId,
  //     radius_info:radiusinfo?radiusinfo:{
  //         id: props?.radius_info?.id,
  //         ippool_id: props?.radius_info?.ippool_id?props?.radius_info?.ippool_id:null,
  //         static_ip_bind:  props?.radius_info?.static_ip_bind,
  //         static_ip_cost:  props?.radius_info?.static_ip_cost,
  //         static_ip_cgst:  props?.radius_info?.static_ip_cgst,
  //         static_ip_sgst:  props?.radius_info?.static_ip_sgst,
  //         static_ip_total_cost:  props?.radius_info?.static_ip_total_cost,
  //     },
  //     amount: amount<0?0:amount,
  //     ledger_amount:  0,
  //     balance:balance,
  //     discount: false,
  //     discount_amount: 0,
  //     wallet_amount: 0,
  //     use_wallet: use_wallet,
  //     plan:planId,
  //   }
  // } else {
  //   // var body = {
  //   //   amount: amount,
  //   //   plan: planId,
  //   //   use_wallet: use_wallet,
  //   //   radius_info: radiusinfo,
  //   // };
  //   body={
  //     customer_id: props?.customer_id,
  //     previous_service_plan:props.plan_id,
  //     new_service_plan: planId,
  //     radius_info:radiusinfo?radiusinfo:{
  //         id: props?.radius_info?.id,
  //         ippool_id: props?.radius_info?.ippool_id?props?.radius_info?.ippool_id:null,
  //         static_ip_bind:  props?.radius_info?.static_ip_bind,
  //         static_ip_cost:  props?.radius_info?.static_ip_cost,
  //         static_ip_cgst:  props?.radius_info?.static_ip_cgst,
  //         static_ip_sgst:  props?.radius_info?.static_ip_sgst,
  //         static_ip_total_cost:  props?.radius_info?.static_ip_total_cost,
  //     },
  //     amount: amount<0?0:amount,
  //     ledger_amount:  0,
  //     balance:0,
  //     discount: false,
  //     discount_amount: 0,
  //     wallet_amount: 0,
  //     use_wallet: false,
  //     plan:planId,
  //   }
  // }

  getCalculations.plan = getCalculations.new_service_plan;
  getCalculations.amount =
    getCalculations.amount < 0 ? 0 : getCalculations.amount;

  let ipAddress = openPaymentGateWayUpdateDataQueryCreator(props?.customer_id);
  console.log(ipAddress);
  var header = GetHeaderTokenData(token);
  console.log(body);
  await axios
    .patch(ipAddress.url, JSON.stringify(getCalculations), {
      method: 'PATCH',
      headers: header,
      timeout: 120000,
    })
    .then(response => {
      console.log(response?.data);
      successCallback(response);
    })
    .catch(_error => {
      console.log(_error);
      const errorresponse = _error.toString();
      errorCallBack(errorresponse);
    });
}

async function submitFeedback(
  rating,
  feedback,
  ticket,
  customerId,
  successCallback,
  errorCallBack,
) {
  var token = '';
  try {
    token = await AsyncStorage.getItem('token');
  } catch (e) {}
  var body = {
    rating: rating,
    feedback: feedback,
    ticket: ticket,
    customer: customerId,
  };
  let ipAddress = submitFeedbackDataQueryCreator();
  var header = GetHeaderTokenData(token);
  await axios
    .post(ipAddress.url, body, {
      headers: header,
      timeout: 120000,
    })
    .then(response => {
      successCallback(response);
    })
    .catch(_error => {
      const errorresponse = _error.toString();
      errorCallBack(errorresponse);
      console.log(errorresponse);
    });
}

async function priorcheckAPI(area, props, successCallback, errorCallBack) {
  var token = '';
  console.log(props, 'props prior check api');
  try {
    token = await AsyncStorage.getItem('token');
  } catch (e) {}
  var body = {
    plan: props?.plan_id,
    area: area,
    ...(props?.radius_info?.ippool
      ? {ippool: props?.radius_info ? props?.radius_info?.ippool : null}
      : {}),
  };
  console.log('body prior', body);
  let ipAddress = prirorCheck();
  var header = GetHeaderTokenData(token);
  await axios
    .post(ipAddress.url, body, {
      headers: header,
      timeout: 120000,
    })
    .then(response => {
      successCallback(response);
    })
    .catch(_error => {
      const errorresponse = _error.toString();
      errorCallBack(errorresponse);
      console.log(errorresponse);
    });
}

async function getCustomerProfile(userID, successCallback, errorCallBack) {
  let token = '';
  try {
    token = await AsyncStorage.getItem('token');
  } catch (e) {}
  let url = GetUserProfileDataQueryCreator(userID);
  var header = GetHeaderTokenData(token);
  await axios(url.url, {
    method: 'GET',
    headers: header,
    timeout: 120000,
  })
    .then(response => {
      successCallback(response);
    })
    .catch(_error => {
      const errorresponse = _error.toString();
      errorCallBack(errorresponse);
    });
}

async function updateProfile(userID, data, successCallback, errorCallBack) {
  let token = '';
  try {
    token = await AsyncStorage.getItem('token');
  } catch (e) {}
  let ipAddress = UpdateUserProfileDataQueryCreator(userID);
  var header = GetHeaderTokenData(token);
  await axios
    .patch(ipAddress.url, data, {
      headers: header,
      timeout: 120000,
    })
    .then(response => {
      successCallback(response);
    })
    .catch(_error => {
      const errorresponse = _error.toString();
      errorCallBack(errorresponse);
    });
}

async function GetUserDataForPlan(userID, successCallback, errorCallBack) {
  let token = '';
  try {
    token = await AsyncStorage.getItem('token');
  } catch (e) {}
  let url = APIServices.GetUserDataForPlan(userID);
  var header = GetHeaderTokenData(token);
  await axios(url.url, {
    method: 'GET',
    headers: header,
    timeout: 120000,
  })
    .then(response => {
      successCallback(response);
    })
    .catch(_error => {
      const errorresponse = _error.toString();
      errorCallBack(errorresponse);
    });
}
async function localDisplayNotification() {
  // Create a channel
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Display a notification
  notifee.displayNotification({
    title: `<p style="color: #DC631F;"><b>${apiConfig.REACT_APP_CLIENT_NAME}</span></p></b></p>`,
    subtitle: ' ',
    body: 'This is a notification',
    android: {
      channelId,
      color: '#DC631F',
      largeIcon: require('../assets/images/notificationicon.png'),
      actions: [
        {
          title: '<b>View</b> 📄',
          pressAction: {id: 'default', mainComponent: 'notificationList'},
        },
        {
          title: '<p style="color: #f44336;"><b>Clear</b> 🗑</p>',
          pressAction: {id: 'cry'},
        },
      ],
    },
  });
}

//code for renew payment when wallet is active
async function getAmountCalculation(
  url,
  customerId,
  data,
  successCallback,
  errorCallBack,
) {
  let token = '';
  try {
    token = await AsyncStorage.getItem('token');
  } catch (e) {}
  let ipAddress = customerAmountcalculation(url, customerId);
  var header = GetHeaderTokenData(token);
  await axios
    .post(ipAddress.url, data, {
      headers: header,
      timeout: 120000,
    })
    .then(response => {
      successCallback(response);
    })
    .catch(_error => {
      const errorresponse = _error.toString();
      errorCallBack(errorresponse);
    });
}
// async function getPaymentGatewaysEnabled(id,successCallback, errorCallBack) {
//   var token = '';
//   try {
//     token = await AsyncStorage.getItem('token');
//   } catch (e) {}
//   let ipAddress = getPaymentGatewayMethods(id);
//   var header = GetHeaderTokenData(token);
//   await axios(ipAddress.url, {
//     method: 'GET',
//     headers: header,
//     timeout: 120000,
//   })
//     .then(response => {
//       successCallback(response);
//     })
//     .catch(_error => {

//       const errorresponse = _error.toString();
//       errorCallBack(errorresponse);
//     });
// }
async function getPaymentGatewaysEnabled(
  cusID,
  successCallback,
  errorCallBack,
) {
  var token = '';
  var customerID = '';
  let body;
  try {
    token = await AsyncStorage.getItem('token');
    customerID = await AsyncStorage.getItem('id');
    console.log('Token:', token); // Log token value
    console.log('Customer ID:', customerID); // Log customerID value
  } catch (e) {
    console.error('AsyncStorage Error:', e); // Log any AsyncStorage errors
  }
  let url = getPaymentGatewayMethods(customerID);
  var header = GetHeaderTokenData(token);
  console.log(url);
  await axios(url.url, {
    method: 'GET',
    headers: header,
    timeout: 120000,
  })
    .then(response => {
      successCallback(response);
    })
    .catch(_error => {
      const errorresponse = _error.toString();
      console.log('error', _error);
      if (errorresponse.includes('400')) {
        errorCallBack('400 Error');
      } else if (errorresponse.includes('401')) {
        errorCallBack('401 Error');
      } else {
        errorCallBack(errorresponse);
      }
    });
}
async function getDocumentsListData(cusID, successCallback, errorCallBack) {
  var token = '';
  var customerID = '';
  let body;
  try {
    token = await AsyncStorage.getItem('token');
    customerID = await AsyncStorage.getItem('id');
    console.log('Token:', token); // Log token value
    console.log('Customer ID:', customerID); // Log customerID value
  } catch (e) {
    console.error('AsyncStorage Error:', e); // Log any AsyncStorage errors
  }
  let url = getCustomerDocuments(customerID);
  var header = GetHeaderTokenData(token);
  console.log(url);
  await axios(url.url, {
    method: 'GET',
    headers: header,
    timeout: 120000,
  })
    .then(response => {
      console.log(response, 'response');
      successCallback(response);
    })
    .catch(_error => {
      const errorresponse = _error.toString();
      console.log('error', _error);
      if (errorresponse.includes('400')) {
        errorCallBack('400 Error');
      } else if (errorresponse.includes('401')) {
        errorCallBack('401 Error');
      } else {
        errorCallBack(errorresponse);
      }
    });
}

async function updateDocumentsListData(
  userID,
  data,
  successCallback,
  errorCallBack,
) {
  var token = '';
  var customerID = '';
  let body;
  try {
    token = await AsyncStorage.getItem('token');
    customerID = await AsyncStorage.getItem('id');
    console.log('Token:', token); // Log token value
    console.log('Customer ID:', customerID); // Log customerID value
  } catch (e) {
    console.error('AsyncStorage Error:', e); // Log any AsyncStorage errors
  }
  let ipAddress = UpdateDocumentsQueryCreator(customerID);
  var header = GetHeaderTokenData(token);
  await axios
    .patch(ipAddress.url, data, {
      headers: header,
      timeout: 120000,
    })
    .then(response => {
      successCallback(response);
    })
    .catch(_error => {
      const errorresponse = _error.toString();
      errorCallBack(errorresponse);
    });
}
export default APIServices;
