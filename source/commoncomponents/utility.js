import format from 'date-fns/format';

export const formatDate = date => {
  let formatedDate = format(new Date(date), 'dd MMM, yyyy');
  return formatedDate;
};

export const formatCustomDate = () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;
  return today;
};

export const formatCustomDateWithTime = () => {
  let todayWithTime = new Date();
  let dd = String(todayWithTime.getDate()).padStart(2, '0');
  let mm = String(todayWithTime.getMonth() + 1).padStart(2, '0');
  let yyyy = todayWithTime.getFullYear();
  let hh = String(todayWithTime.getHours()).padStart(2, '0');
  let min = String(todayWithTime.getMinutes()).padStart(2, '0');
  todayWithTime = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + min;
  return todayWithTime;
};

export const getFullAddress = data => {
  let result = '';
  if (data.house_no) {
    result = '#' + data.house_no;
  }
  if (data.street) {
    result = result + ', ' + data.street;
  }
  if (data.landmark) {
    result = result + ', ' + data.landmark;
  }
  if (data.city) {
    result = result + ', ' + data.city;
  }
  if (data.pincode) {
    result = result + ', ' + data.pincode;
  }
  if (data.district) {
    result = result + ', ' + data.district;
  }
  if (data.state) {
    result = result + ', ' + data.state;
  }
  return result;
};
