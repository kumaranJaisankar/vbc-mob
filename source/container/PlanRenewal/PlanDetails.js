import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  GetUserPlanData,
  customerAmountcalculation,
  getPaymentGatewayMethods,
} from '../../apiwebservices/APIRequestQueryCreator';
import {Dialog, DialogContent} from 'react-native-popup-dialog';
import format from 'date-fns/format';
import {Colors} from '../../commoncomponents/Colors';
import {strings} from '../../strings/i18n';
import PlanDetails_Popup_ListData from './PlanDetails_Popup_ListData';
import {Checkbox, RadioButton, TextInput} from 'react-native-paper';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import APIServices from '../../apiwebservices/APIServices';
import {convertToTwoDecimals} from '../../utils/NumberConversion';
import PaymentGatewayOptions from './PaymentGatewayOptions';
import {useTheme} from '@react-navigation/native';
import {useTheme as useMDtheme} from 'react-native-paper';

export default PlanDetails = props => {
  const color = useTheme().colors;
  const materialColor = useMDtheme().colors;
  const [payAmount, setPayAmount] = React.useState();
  const [plan, setPlan] = React.useState({});
  const [planData, setPlanData] = useState([]);
  const [staticIp, setStaticIP] = React.useState(
    props?.plan?.radius_info?.static_ip_bind ||
      props?.planData?.radius_info?.static_ip_bind
      ? true
      : false,
  );
  const [want, setWant] = React.useState(true);
  const [walletAmount, setWalletAmount] = useState(false);
  const [isCurrentDataLoading, setCurrentDataLoading] = React.useState(true);
  const [getCalculations, setGetCalculations] = useState();
  const [selectedGateway, setSelectedGateway] = useState(null);
  const [paymentGateways, setPaymentGateways] = useState([]);
  const [selectedGatewayObj, setSelectedGatewayObj] = useState([]);
  const handleGatewayClick = gateway => {
    console.log('handleGatewayClick', gateway);
    setSelectedGateway(gateway?.id);
    setSelectedGatewayObj(gateway);
  };
  useEffect(() => {
    getPaymentGateWays();
  }, []);
  const getPaymentGateWays = async () => {
    console.log(props, 'props data');
    // const response = await getPaymentGatewayMethods(props?.planData?.customer_id);
    // console.log(response,"paymentgateways response ----149---")
    // if (response?.isSuccess === 200) {
    //   setPaymentGateways(response?.result);
    // } else {
    //   const responseMsg = response;
    //   console.log(responseMsg)
    // }
    await APIServices.getPaymentGatewaysEnabled(
      props?.planData?.customer_id,
      response => {
        console.log('res', response);
        if (response.status == 200) {
          setPaymentGateways(response?.data);
        } else {
          console.log('else');
        }
      },
      error => {
        console.log(error);
      },
    );
  };

  // if(!props?.data?.plan_cgst){
  //   var renewAmount =
  // }

  //code for renew payment when wallet is active
  // const walletAmountcal = async () => {
  // try {
  //   const obj = {
  //     service_plan: props?.data?.id,
  //     use_wallet: walletAmount,
  //   };
  //   if (staticIp === true) {
  //     obj.radius_info = {
  //       id: props?.planData?.radius_info?.id,
  //       ippool_id: props?.planData?.radius_info?.ippool,
  //       static_ip_bind:
  //         props?.planData?.radius_info?.static_ip_bind,
  //       static_ip_cgst:
  //         props?.planData?.radius_info?.static_ip_cgst,
  //       static_ip_cost:
  //         212 * props?.planData?.plan_time_unit,
  //       static_ip_sgst:
  //         props?.planData?.radius_info?.static_ip_sgst,
  //       static_ip_total_cost:
  //         props?.planData?.radius_info
  //           ?.static_ip_total_cost,
  //     }
  //   } else {
  //     delete obj.radius_info
  //   }
  //   const res = await APIServices.getAMountCalculation(props?.planData?.customer_id, obj,response => {
  //     if (response.status == 200) {
  //       const { data } = response;
  //       setGetCalculations(data);
  //     }
  //   },
  //   error => {
  //    console.log(error)
  //   });
  // } catch (error) {
  //   console.log("error inside your function", error);
  // }
  // }

  React.useEffect(() => {
    const extraAmount =
      staticIp && props?.planData?.radius_info?.static_ip_bind
        ? !props?.data?.planData?.cgst
          ? props?.planData?.plan_cost * 0.18
          : 0
        : 0;
    const amount = parseInt(props?.planData?.plan_cost) + extraAmount;
    setPayAmount(amount);
  }, [props?.planData]);

  const extraAmountChnage =
    staticIp && props?.plan?.radius_info?.static_ip_bind
      ? !props?.data?.plan_cgst
        ? props?.data?.plan_cost * 0.18
        : 0
      : 0;

  const UpgradeAmount =
    props?.paymentType === 'gb'
      ? parseFloat(props?.data?.plan_cost) -
        parseFloat(props?.plan?.balanace_by_monthly)
      : parseFloat(props?.data?.plan_cost) -
        parseFloat(props?.plan?.balance_by_days);

  const balance =
    props?.upgradeType === 'gb'
      ? parseInt(props?.plan?.balanace_by_monthly)
      : parseInt(props?.plan?.balance_by_days);

  useEffect(() => {
    (async function () {
      try {
        console.log('its the props', props);
        const obj = {
          service_plan: props?.data?.id,
          use_wallet: walletAmount,
        };

        const planType = props.showCurrentPlanRechargeView ? 'renew' : 'update';

        if (staticIp === true && planType === 'renew') {
          obj.radius_info = {
            id: props?.planData?.radius_info?.id,
            ippool_id: props?.planData?.radius_info?.ippool,
            static_ip_bind: props?.planData?.radius_info?.static_ip_bind,
            static_ip_cgst: props?.plandData?.radius_info?.static_ip_cgst,
            static_ip_cost: 212 * props?.planData?.plan_time_unit,
            static_ip_sgst: props?.planData?.radius_info?.static_ip_sgst,
            static_ip_total_cost:
              props?.planData?.radius_info?.static_ip_total_cost,
          };
        } else if (staticIp === true && planType === 'update') {
          obj.radius_info = {
            id: props?.plan?.radius_info?.id,
            ippool_id: props?.plan?.radius_info?.ippool,
            static_ip_bind: props?.plan?.radius_info?.static_ip_bind,
            static_ip_cgst: props?.plan?.radius_info?.static_ip_cgst,
            static_ip_cost: 212 * props?.plan?.plan_time_unit,
            static_ip_sgst: props?.plan?.radius_info?.static_ip_sgst,
            static_ip_total_cost:
              props?.plan?.radius_info?.static_ip_total_cost,
          };
        } else {
          delete obj.radius_info;
        }

        console.log('its the obj for static,', obj);

        if (planType === 'update') obj.balance = props?.plan?.balance_by_days;
        if (props?.paymentType === 'change') delete obj.balance;

        const customerId =
          props?.planData?.customer_id ?? props?.plan?.customer_id;

        const res = await APIServices.getAmountCalculation(
          `/customers/get/${planType}/amount`,
          customerId,
          obj,
          response => {
            if (response.status == 200) {
              const {data} = response;
              if (selectedGatewayObj) {
                data.payment_gateway_id = selectedGatewayObj?.id;
                data.payment_gateway_type = selectedGatewayObj?.gateway_type;
              }
              setGetCalculations(data);
            }
          },
          error => {
            console.log(error);
          },
        );
      } catch (error) {
        console.log('error inside your function', error);
      }
    })();
  }, [props?.planData, staticIp, walletAmount, selectedGatewayObj]);

  const handleUpgradePlan = () => {
    !staticIp
      ? props.openWebView(
          getCalculations,
          parseInt(props?.data?.id),
          props?.data?.plan_cgst
            ? parseFloat(props?.data?.total_plan_cost) - parseFloat(balance)
            : parseFloat(props?.data?.total_plan_cost) - parseFloat(balance),
          {
            id: props?.plan?.radius_info?.id,
            ippool_id: null,
            static_ip_bind: null,
            static_ip_cgst: null,
            static_ip_cost: null,
            static_ip_sgst: null,
            static_ip_total_cost: null,
          },
          false,
          props?.plan?.customer_area_id,
          props?.plan?.customer_id,
          balance,
          props?.plan,
        )
      : props.openWebView(
          getCalculations,
          parseInt(props?.data?.id),
          props?.data?.plan_cgst
            ? parseFloat(props?.data?.total_plan_cost) +
                parseFloat(250 * props.data.time_unit) -
                parseFloat(balance)
            : parseFloat(props?.data?.plan_cost * 0.18) +
                parseFloat(props?.data?.plan_cost) +
                parseFloat(250 * props.data.time_unit) -
                parseFloat(balance),
          {
            id: props?.plan?.radius_info?.id,
            ippool_id: props?.plan?.radius_info?.ippool,
            static_ip_bind: props?.plan?.radius_info?.static_ip_bind,
            static_ip_cgst: props?.plan?.radius_info?.static_ip_cgst,
            static_ip_cost: 212 * props.data.time_unit,
            static_ip_sgst: props?.plan?.radius_info?.static_ip_sgst,
            static_ip_total_cost: 250 * props?.data?.time_unit,
          },
          false,
          props?.plan?.customer_area_id,
          props?.plan?.customer_id,
          balance,
          props?.plan,
        );

    // props.openWebView(
    //   parseInt(props?.data?.id),
    //   parseFloat(props?.data?.plan_cost),
    //   null,
    //   false,
    //   props?.plan?.customer_area_id,
    //   props?.plan?.customer_id,
    // );
  };

  const handleChangePlan = () => {
    !staticIp
      ? props.openWebView(
          getCalculations,
          parseInt(props?.data?.id),
          props?.data?.plan_cgst
            ? parseFloat(props?.data?.total_plan_cost)
            : parseFloat(props?.data?.total_plan_cost),
          {
            id: props?.plan?.radius_info?.id,
            ippool_id: null,
            static_ip_bind: null,
            static_ip_cgst: null,
            static_ip_cost: null,
            static_ip_sgst: null,
            static_ip_total_cost: null,
          },
          false,
          props?.plan?.customer_area_id,
          props?.plan?.customer_id,
          0,
          props?.plan,
        )
      : props.openWebView(
          getCalculations,
          parseInt(props?.data?.id),
          props?.data?.plan_cgst
            ? parseFloat(props?.data?.total_plan_cost) +
                parseFloat(250 * props.data.time_unit)
            : parseFloat(props?.data?.plan_cost * 0.18) +
                parseFloat(props?.data?.plan_cost) +
                parseFloat(250 * props.data.time_unit),

          {
            id: props?.plan?.radius_info?.id,
            ippool_id: props?.plan?.radius_info?.ippool,
            static_ip_bind: props?.plan?.radius_info?.static_ip_bind,
            static_ip_cgst: props?.plan?.radius_info?.static_ip_cgst,
            static_ip_cost: 212 * props.data.time_unit,
            static_ip_sgst: props?.plan?.radius_info?.static_ip_sgst,
            static_ip_total_cost: 250 * props?.data?.time_unit,
          },
          false,
          props?.plan?.customer_area_id,
          props?.plan?.customer_id,
          0,
          props?.plan,
        );

    // props.openWebView(
    //   parseInt(props?.data?.id),
    //   parseFloat(props?.data?.plan_cost),
    //   null,
    //   false,
    //   props?.plan?.customer_area_id,
    //   props?.plan?.customer_id,
    // );
  };

  const handleRenewPlan = () => {
    !staticIp
      ? props.openWebView(
          getCalculations,
          parseInt(props?.planData?.plan_id),
          parseFloat(props?.planData?.plan_cost),
          0,
          0,
          null,
          props?.planData?.customer_area_id,
          walletAmount,
          props?.planData,
        )
      : props.openWebView(
          getCalculations,
          parseInt(props?.planData?.plan_id),
          props?.data?.plan_cgst
            ? parseFloat(props?.planData?.plan_cost) +
                parseFloat(props?.planData?.radius_info?.static_ip_total_cost)
            : parseFloat(props?.planData?.plan_cost * 0.18) +
                parseFloat(props?.planData?.plan_cost) +
                parseFloat(props?.planData?.radius_info?.static_ip_total_cost),
          // parseFloat(
          //   props?.planData?.plan_cost +
          //     parseInt(
          //       props?.planData?.radius_info
          //         ?.static_ip_total_cost,
          //     ),
          // ),
          0,
          0,
          {
            id: props?.planData?.radius_info?.id,
            ippool_id: props?.planData?.radius_info?.ippool,
            static_ip_bind: props?.planData?.radius_info?.static_ip_bind,
            static_ip_cgst: props?.planData?.radius_info?.static_ip_cgst,
            static_ip_cost: 212 * props?.planData?.plan_time_unit,
            static_ip_sgst: props?.planData?.radius_info?.static_ip_sgst,
            static_ip_total_cost:
              props?.planData?.radius_info?.static_ip_total_cost,
          },
          props?.planData?.customer_area_id,
          walletAmount,
          props?.planData,
        );
  };

  if (plan?.package_name) {
    const walletAmountcal = async () => {
      const res = customerAmountcalculation(props?.planData?.customer_id);
    };

    React.useEffect(() => {
      walletAmountcal();
    }, [props?.planData?.customer_id]);

    return (
      <Dialog visible={props.showDialogVisible} width={0.9}>
        <DialogContent
          style={{padding: 10, backgroundColor: materialColor.onSecondary}}>
          <View style={{flexDirection: 'column'}}>
            <PlanDetails_Popup_ListData
              showPopupData
              title={'Plan Name'}
              value={plan?.package_name}
            />

            <PlanDetails_Popup_ListData
              showPopupData
              title={'Download/Upload'}
              value={
                props?.data?.download_speed + '/' + props?.data?.upload_speed
              }
            />

            <PlanDetails_Popup_ListData
              showPopupData
              title={'Validity'}
              value={plan?.time_unit + ' ' + plan?.unit_type + '(s)'}
            />

            {/* 
            <PlanDetails_Popup_ListData
              showPopupData
              title={'CurrentExp'}
              value={plan?.package_name}
            />

            <PlanDetails_Popup_ListData
              showPopupData
              title={'NextExp'}
              value={plan?.package_name}
            /> */}

            <PlanDetails_Popup_ListData
              showPopupData
              title={'Plan Updated'}
              value={moment(props?.data?.updated_at).format('DD MMM, yyyy')}
            />

            <PlanDetails_Popup_ListData
              showPopupData
              title={'Actual Plan Cost'}
              value={parseFloat(plan?.plan_cost)}
            />

            <PlanDetails_Popup_ListData
              showPopupData
              title={'CGST'}
              value={parseFloat(
                (props?.data?.plan_cgst * plan?.plan_cost) / 100,
              )}
            />

            <PlanDetails_Popup_ListData
              showPopupData
              title={'SGST'}
              value={parseFloat(
                (props?.data?.plan_sgst * plan?.plan_cost) / 100,
              )}
            />

            <PlanDetails_Popup_ListData
              showPopupData
              title={'Total Payable'}
              value={parseFloat(plan?.total_plan_cost)}
            />

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{alignSelf: 'flex-end', marginTop: 20}}>
                <TouchableOpacity
                  onPress={() => props.closeDialog()}
                  style={{
                    backgroundColor: Colors.color_5E0F8B,
                    borderRadius: 10,
                  }}>
                  <View
                    style={{flexDirection: 'column', padding: 7, width: 100}}>
                    <Text style={styles.actionButton}>Close</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{alignSelf: 'flex-start', marginTop: 20}}>
                <TouchableOpacity
                  onPress={() =>
                    props.openWebView(
                      parseInt(plan.id),
                      parseFloat(plan.total_plan_cost),
                      console.log('In proceed'),
                    )
                  }
                  style={{
                    backgroundColor: Colors.color_5E0F8B,
                    borderRadius: 10,
                  }}>
                  <View
                    style={{flexDirection: 'column', padding: 7, width: 110}}>
                    <Text style={styles.actionButton}>Proceed</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </DialogContent>
      </Dialog>
    );
  } else if (props.showCurrentPlanRechargeView) {
    return (
      <Dialog visible={props.showDialogVisible} width={0.9}>
        <DialogContent
          style={{padding: 10, backgroundColor: materialColor.onSecondary}}>
          <View style={{flexDirection: 'column'}}>
            <PlanDetails_Popup_ListData
              showPopupData
              title={'Plan Name'}
              value={props.data.package_name}
            />

            <PlanDetails_Popup_ListData
              showPopupData
              title={strings('Dashboard.DownloadSpeed')}
              value={props.data.download_speed + ' ' + strings('Dashboard.MB')}
            />

            <PlanDetails_Popup_ListData
              showPopupData
              title={strings('Dashboard.UploadSpeed')}
              value={props.data.upload_speed + ' ' + strings('Dashboard.MB')}
            />

            <PlanDetails_Popup_ListData
              showPopupData
              title={strings('Dashboard.Validity')}
              value={props.data.time_unit + ' ' + props.data.unit_type + '(s)'}
            />

            <PlanDetails_Popup_ListData
              showPopupData
              title={strings('Dashboard.PlanCost')}
              value={parseFloat(props.data.total_plan_cost)}
            />

            <PlanDetails_Popup_ListData
              showPopupData
              title={'Final Amount'}
              value={getCalculations?.amount > 0 ? getCalculations?.amount : 0}
            />

            {/* wallet amount */}
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                marginLeft: -10,
              }}>
              <Checkbox
                // color={Colors.black}
                status={walletAmount ? 'checked' : 'unchecked'}
                onPress={() => {
                  console.log(walletAmount);
                  setWalletAmount(!walletAmount);
                }}
              />
              <Text
                style={{
                  color: color.text,
                  fontSize: 14,
                  fontFamily: 'Titillium-Semibold',
                  marginTop: 7,
                }}>
                {'Wallet Amount : '}
                {convertToTwoDecimals(props?.planData?.wallet_info)}
              </Text>
            </View>

            {props?.planData?.radius_info?.static_ip_bind && (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    marginLeft: -10,
                  }}>
                  <Checkbox
                    // color={Colors.black}
                    status={staticIp ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setStaticIP(!staticIp);
                    }}
                  />
                  <Text
                    style={{
                      color: color.text,
                      fontSize: 14,
                      fontFamily: 'Titillium-Semibold',
                      marginTop: 7,
                    }}>
                    {'Static IP'}
                  </Text>
                </View>

                <View>
                  {staticIp ? (
                    <View>
                      <View>
                        <Text style={{color: color.text}}>Static IP</Text>
                        <TextInput
                          mode="outlined"
                          editable={false}
                          value={props?.planData?.radius_info?.static_ip_bind}
                        />
                      </View>
                      <View>
                        <Text style={{color: color.text}}>Static IP Cost</Text>
                        <TextInput
                          mode="outlined"
                          editable={false}
                          value={
                            props?.planData?.radius_info?.static_ip_total_cost
                          }
                        />
                      </View>
                    </View>
                  ) : (
                    <View></View>
                  )}
                </View>
              </View>
            )}
            <PaymentGatewayOptions
              paymentGateways={paymentGateways}
              selectedGateway={selectedGateway}
              handleGatewayClick={handleGatewayClick}
            />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{alignSelf: 'flex-start', marginTop: 20}}>
                <TouchableOpacity
                  onPress={handleRenewPlan}
                  style={{
                    backgroundColor: materialColor.primary,
                    borderRadius: 10,
                  }}>
                  <View
                    style={{flexDirection: 'column', padding: 7, width: 100}}>
                    <Text
                      style={[
                        styles.actionButton,
                        {color: materialColor.primaryContainer},
                      ]}>
                      Renew
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{alignSelf: 'flex-end', marginTop: 20}}>
                <TouchableOpacity
                  onPress={() => props.closeDialog()}
                  style={{
                    backgroundColor: materialColor.error,
                    borderRadius: 10,
                  }}>
                  <View
                    style={{flexDirection: 'column', padding: 7, width: 80}}>
                    <Text
                      style={[
                        styles.actionButton,
                        {color: materialColor.onError},
                      ]}>
                      Close
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </DialogContent>
      </Dialog>
    );
  } else if (props.showAllPlanRechargeView) {
    return (
      <Dialog visible={props.showDialogVisible} width={0.9}>
        <ScrollView>
          <DialogContent
            style={{padding: 10, backgroundColor: materialColor.onSecondary}}>
            <View style={{flexDirection: 'column'}}>
              <PlanDetails_Popup_ListData
                showPopupData
                title={'Plan Name'}
                value={props.data.package_name}
              />
              <PlanDetails_Popup_ListData
                showPopupData
                title={strings('Dashboard.DownloadSpeed')}
                value={
                  props.data.download_speed + ' ' + strings('Dashboard.MB')
                }
              />

              <PlanDetails_Popup_ListData
                showPopupData
                title={strings('Dashboard.UploadSpeed')}
                value={props.data.upload_speed + ' ' + strings('Dashboard.MB')}
              />

              <PlanDetails_Popup_ListData
                showPopupData
                title={strings('Dashboard.Validity')}
                value={
                  props.data.time_unit + ' ' + props.data.unit_type + '(s)'
                }
              />

              <PlanDetails_Popup_ListData
                showPopupData
                title={strings('Dashboard.PlanCost')}
                value={parseFloat(props.data.total_plan_cost)}
              />

              <PlanDetails_Popup_ListData
                showPopupData
                title={'Final Amount'}
                value={
                  getCalculations?.amount > 0 ? getCalculations?.amount : 0
                }
              />

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  marginLeft: -10,
                }}>
                <Checkbox
                  status={walletAmount ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setWalletAmount(!walletAmount);
                  }}
                />
                <Text
                  style={{
                    color: color.text,
                    fontSize: 14,
                    fontFamily: 'Titillium-Semibold',
                    marginTop: 7,
                  }}>
                  {'Wallet Amount : '}
                  {convertToTwoDecimals(props?.plan?.wallet_info)}
                </Text>
              </View>
              {props?.plan?.radius_info?.static_ip_bind && staticIp && (
                <PlanDetails_Popup_ListData
                  showPopupData
                  title="Static IP Cost"
                  value={parseFloat(250 * props.data.time_unit)}
                />
              )}

              {props?.plan?.radius_info?.static_ip_bind && (
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                      marginLeft: -10,
                    }}>
                    <Checkbox
                      status={staticIp ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setStaticIP(!staticIp);
                      }}
                    />
                    <Text
                      style={{
                        color: color.text,
                        fontSize: 14,
                        fontFamily: 'Titillium-Semibold',
                        marginTop: 7,
                      }}>
                      {'Static IP'}
                    </Text>
                  </View>

                  <View>
                    {staticIp ? (
                      <View style={{marginBottom: 10}}>
                        <View>
                          <Text style={{color: color.text}}>Static IP</Text>
                          <TextInput
                            mode="outlined"
                            editable={false}
                            value={props?.plan?.radius_info?.static_ip_bind}
                          />
                        </View>
                        <View>
                          <Text style={{color: color.text}}>
                            Static IP Cost
                          </Text>
                          <TextInput
                            mode="outlined"
                            editable={false}
                            value={(250 * props.data.time_unit).toString()}
                          />
                        </View>
                      </View>
                    ) : (
                      <View></View>
                    )}
                  </View>
                </View>
              )}
            </View>
            <PaymentGatewayOptions
              paymentGateways={paymentGateways}
              selectedGateway={selectedGateway}
              handleGatewayClick={handleGatewayClick}
            />
            <View
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginTop: 10,
              }}>
              {props?.paymentType === 'change' && (
                <TouchableOpacity
                  onPress={handleChangePlan}
                  style={{
                    backgroundColor: Colors.color_5E0F8B,
                    backgroundColor:
                      props.data.total_plan_cost === 0
                        ? Colors.grey_E2E2E2
                        : materialColor.primary,
                    borderRadius: 10,
                  }}
                  disabled={props.data.total_plan_cost === 0}>
                  <View
                    style={{flexDirection: 'column', padding: 7, width: 100}}>
                    <Text
                      style={[
                        styles.actionButton,
                        {color: materialColor.primaryContainer},
                      ]}>
                      Change
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              {props?.paymentType === 'upgrade' && (
                <TouchableOpacity
                  onPress={handleUpgradePlan}
                  style={{
                    backgroundColor: Colors.color_5E0F8B,
                    borderRadius: 10,
                  }}
                  // onPress={() => {
                  //   console.log(
                  //     'customer area',
                  //     props?.plan?.balanace_by_monthly,
                  //   );
                  //   console.log('customer area', props?.plan?.balance_by_days);
                  //   props.openWebView(
                  //     parseInt(props?.data?.id),
                  //     UpgradeAmount,
                  //     null,
                  //     false,
                  //     props?.plan?.customer_area_id,
                  //     props?.plan?.customer_id,
                  //     balance,
                  //   );
                  // }}
                  // style={{
                  //   backgroundColor: Colors.color_5E0F8B,
                  //   borderRadius: 10,
                  // }}
                >
                  <View
                    style={{flexDirection: 'column', padding: 7, width: 100}}>
                    <Text style={styles.actionButton}>Upgrade</Text>
                  </View>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={() => props.closeDialog()}
                style={{
                  backgroundColor: materialColor.error,
                  borderRadius: 10,
                }}>
                <View style={{padding: 7}}>
                  <Text
                    style={[
                      styles.actionButton,
                      {color: materialColor.onError},
                    ]}>
                    Close
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </DialogContent>
        </ScrollView>
      </Dialog>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  actionButton: {
    fontFamily: 'Titillium-Semibold',
    color: '#ffffff',
    fontSize: 14,
    alignSelf: 'center',
  },
});
