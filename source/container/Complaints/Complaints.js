import React, {useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  Button,
  Divider,
  TextInput,
  useTheme as useMDtheme,
} from 'react-native-paper';
import {Colors} from '../../commoncomponents/Colors';
import Headerview from '../../commoncomponents/HeaderView1';
import Toast from 'react-native-toast-message';
import {Dialog, DialogContent} from 'react-native-popup-dialog';
import APIServices from '../../apiwebservices/APIServices';
import DialogView from '../../commoncomponents/DialogView';
import {strings} from '../../strings/i18n';
import NoData from '../../commoncomponents/NoData';
import Complaints_ListCell from './Complaints_ListCell';
import RBSheet from 'react-native-raw-bottom-sheet';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ComplaintsDetails from './ComplaintsDetails';
import {Dropdown} from 'react-native-element-dropdown';
import {useTheme} from '@react-navigation/native';

const Complaints = ({navigation}) => {
  const color = useTheme().colors;
  const materialColor = useMDtheme().colors;
  const refRBSheet1 = useRef();
  const [isLoading, setLoading] = React.useState(false);
  const [catLoading, setCatLoading] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [invoiceVisible, setInvoiceVisible] = React.useState(false);
  const [complaintType, setcomplaintType] = React.useState('');
  const [subComplaintType, setSubComplaintType] = React.useState('');
  const [notes, setNotes] = React.useState({
    value: '',
  });
  const [requiredMsg, setRequiredMsg] = React.useState({});
  const [isDataAvailable, setDataAvailable] = React.useState(true);
  const [isNoDataAvailable, setNoDataAvailable] = React.useState(false);
  const [isData, setData] = React.useState([]);
  const [isCategoryData, setCategoryData] = React.useState([]);
  const [isSubCategoryData, setSubCategoryData] = React.useState([]);
  const [offset, setOffset] = React.useState(1);
  const [isFocus, setIsFocus] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getComplaintsDataOnRefreshClicked();
    });
    return unsubscribe;
  }, [navigation]);

  const getComplaintsData = async () => {
    setLoading(true);
    await APIServices.getComplaintsByUserName(
      offset,
      response => {
        console.log('com res', response);
        if (response.status == 200) {
          setOffset(offset + 1);
          setData([...isData, ...response.data.results]);
          setDataAvailable(true);
          setLoading(false);
        } else {
          // setNoDataAvailable(true);
          // setDataAvailable(false);
          setLoading(false);
        }
      },
      error => {
        console.log('COM ERRIR', error);
        // setNoDataAvailable(true);
        // setDataAvailable(false);
        setLoading(false);
        Toast.show({
          type: 'info',
          text1: 'No More Data Available!',
          position: 'bottom',
        });
      },
    );
  };
  const getComplaintsDataOnRefreshClicked = async () => {
    setLoading(true);
    await APIServices.getComplaintsByUserName(
      1,
      response => {
        console.log('AAA', response);
        if (response.status == 200) {
          setOffset(2);
          setData(response.data.tickets);
          setDataAvailable(true);
          setLoading(false);
        } else {
          setNoDataAvailable(true);
          setDataAvailable(false);
          setLoading(false);
        }
      },
      error => {
        console.log('err', error);
        setNoDataAvailable(true);
        setDataAvailable(false);
        setLoading(false);
      },
    );
  };
  const getCategory = async () => {
    setCatLoading(true);
    await APIServices.getComplaintsData(
      response => {
        if (response.status == 200) {
          setCategoryData(response.data.category);
          setSubCategoryData(response.data.subcategory);
          setCatLoading(false);
        } else {
          setCatLoading(false);
        }
      },
      error => {
        setCatLoading(false);
      },
    );
  };
  const onSubmitPressed = async () => {
    if (complaintType && subComplaintType && notes.value) {
      setLoading(true);
      await APIServices.postCustomerComplaint(
        complaintType,
        subComplaintType,
        notes,
        async response => {
          console.log('here');
          if (response.status == 200) {
            const responseMsg = response;
            console.log('THIS IS COMRES========>', response.data);
            if (
              response.data['result'] ==
              'A Ticket already exists for this user!'
            ) {
              refRBSheet1.current.close();
              await getComplaintsDataOnRefreshClicked();

              Toast.show({
                type: 'error',
                text1: 'A Ticket already exists for this user!',
                position: 'bottom',
              });
            } else {
              refRBSheet1.current.close();
              await getComplaintsDataOnRefreshClicked();

              Toast.show({
                type: 'success',
                text1: 'Complaint Created Successfully!',
                position: 'bottom',
              });
            }
          } else if (response.status == 201) {
            refRBSheet1.current.close();
            await getComplaintsDataOnRefreshClicked();

            Toast.show({
              type: 'success',
              text1: 'Complaint Created Successfully!',
              position: 'bottom',
            });
          } else {
            const errorresponse = response;
            setLoading(false);
          }
        },
        error => {
          const errorresponse = error.toString();
          console.log('errorresponse', errorresponse);
          refRBSheet1.current.close();
          Toast.show({
            type: 'error',
            text1: 'A Ticket already exists for this user!',
            position: 'bottom',
          });
          setLoading(false);
        },
      );
      setcomplaintType('');
      setSubComplaintType('');
      setNotes({value: ''});
      setRequiredMsg({});
    } else {
      setRequiredMsg({
        complaintType: !complaintType ? true : false,
        subComplaintType: !subComplaintType ? true : false,
        notes: !notes.value ? true : false,
      });
    }
  };
  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={getComplaintsData}
          style={[
            styles.loadMoreBtn,
            {backgroundColor: materialColor.primary},
          ]}>
          <Text
            style={[styles.btnText, {color: materialColor.primaryContainer}]}>
            Load More
          </Text>
          {/* {isLoading ? (
            <ActivityIndicator color="white" style={{marginLeft: 8}} />
          ) : null} */}
        </TouchableOpacity>
      </View>
    );

    return null;
  };
  const styles = StyleSheet.create({
    footer: {
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    loadMoreBtn: {
      padding: 10,
      backgroundColor: Colors.color_5E0F8B,
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    btnText: {
      color: '#ffffff',
      fontSize: 16,
      textAlign: 'center',
      fontFamily: 'Titillium-Semibold',
    },
    dropdown: {
      marginTop: 5,
      borderWidth: 1,
      borderRadius: 5,
    },
    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
      fontFamily: 'Titillium-Semibold',
      color: 'grey',
      fontSize: 14,
    },
    selectedTextStyle: {
      fontFamily: 'Titillium-Semibold',
      color: color.text,
      fontSize: 14,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
  });
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: color.background}}>
        <Headerview
          showHeader
          showRefreshIcon
          // showCommentPlusIcon
          title={strings('Complaints.Complaints')}
          onMenuClick={() => {
            navigation.openDrawer();
          }}
          onRefreshClicked={() => {
            getComplaintsDataOnRefreshClicked();
          }}
          // onAddClicked={() => {
          //   getCategory();
          //   refRBSheet1.current.open();
          // }}
        />

        <View style={{flex: 1}}>
          <View style={{marginTop: -80}}>
            <View
              style={{
                backgroundColor: materialColor.onSecondary,
                borderRadius: 10,
                padding: 20,
                margin: 20,
              }}>
              <TouchableOpacity
                onPress={() => {
                  getCategory();
                  refRBSheet1.current.open();
                }}
                style={{
                  borderWidth: 1,
                  borderColor: 'rgba(0,0,0,0.2)',
                  alignItems: 'center',
                  justifyContent: 'center',

                  backgroundColor: color.primary,
                  borderRadius: 100,
                  padding: 12,
                  flexDirection: 'row',
                  marginBottom: 10,
                }}>
                <FontAwesome
                  name="plus"
                  size={20}
                  color={materialColor.primaryContainer}
                />
                <Text
                  style={{
                    color: materialColor.primaryContainer,
                    marginLeft: 5,
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  Add Complaint
                </Text>
              </TouchableOpacity>
              <Divider />
              <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                {isDataAvailable ? (
                  <View>
                    <FlatList
                      data={isData}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={(item, index) => index}
                      enableEmptySections={true}
                      renderItem={({item, index}) => (
                        <Complaints_ListCell itemdata={isData[index]} />
                      )}
                      ListFooterComponent={renderFooter}
                      refreshControl={
                        <RefreshControl
                          refreshing={isLoading}
                          onRefresh={getComplaintsData}
                        />
                      }
                      style={{marginTop: 5}}
                    />
                  </View>
                ) : (
                  <View style={{height: '100%'}}>
                    {isNoDataAvailable && <NoData />}
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
        <RBSheet
          ref={refRBSheet1}
          closeOnPressBack={true}
          draggable={true}
          closeOnDragDown={true}
          closeOnPressMask={false}
          dragOnContent={true}
          height={550}
          customStyles={{
            container: {
              borderTopEndRadius: 20,
              borderTopLeftRadius: 20,
              backgroundColor: materialColor.onSecondary,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              elevation: 20,
            },
            draggableIcon: {
              backgroundColor: color.text,
            },
          }}>
          <View style={{padding: 20}}>
            <TouchableOpacity
              onPress={() => refRBSheet1.current.close()}
              style={{justifyContent: 'center', alignItems: 'flex-end'}}>
              <Text style={{color: color.notification}}>Cancel</Text>
            </TouchableOpacity>
            <ScrollView>
              <TouchableOpacity activeOpacity={1}>
                <View style={{flexDirection: 'row', marginTop: 5}}>
                  <View style={{flex: 1, flexDirection: 'column'}}>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          fontFamily: 'Titillium-Semibold',
                          color: color.text,
                          fontSize: 14,
                          marginBottom: 5,
                        }}>
                        Complaint Type
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Titillium-Semibold',
                          color: Colors.red_FF0000,
                          fontSize: 14,
                        }}>
                        *
                      </Text>
                    </View>
                    <Dropdown
                      activeColor={color.card}
                      style={[styles.dropdown]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      data={isCategoryData}
                      itemTextStyle={{color: color.text}}
                      confirmSelectItem={true}
                      containerStyle={{
                        backgroundColor: color.border,
                        borderBottomEndRadius: 20,
                        borderBottomLeftRadius: 20,
                      }}
                      maxHeight={200}
                      labelField="category"
                      valueField="id"
                      placeholder="Select Category"
                      value={complaintType}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                        setcomplaintType(item.id);
                        setIsFocus(false);
                        setRequiredMsg({});
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: 'Titillium-Semibold',
                        color: Colors.red_FF0000,
                        fontSize: 11,
                      }}>
                      {requiredMsg.complaintType &&
                        'Complaint Type is required !!!'}
                    </Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row', marginTop: 15}}>
                  <View style={{flex: 1, flexDirection: 'column'}}>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          fontFamily: 'Titillium-Semibold',
                          color: color.text,
                          fontSize: 14,
                          marginBottom: 5,
                        }}>
                        Sub Complaint Type
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Titillium-Semibold',
                          color: Colors.red_FF0000,
                          fontSize: 14,
                        }}>
                        *
                      </Text>
                    </View>
                    <Dropdown
                      activeColor={color.card}
                      style={[styles.dropdown]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      data={isSubCategoryData}
                      itemTextStyle={{color: color.text}}
                      containerStyle={{
                        backgroundColor: color.border,
                        borderBottomEndRadius: 20,
                        borderBottomLeftRadius: 20,
                      }}
                      maxHeight={200}
                      labelField="name"
                      valueField="id"
                      placeholder="Select Sub Category"
                      value={subComplaintType}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                        setSubComplaintType(item.id);
                        setIsFocus(false);
                        setRequiredMsg({});
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: 'Titillium-Semibold',
                        color: Colors.red_FF0000,
                        fontSize: 11,
                      }}>
                      {requiredMsg.subComplaintType &&
                        'Sub Complaint Type is required !!!'}
                    </Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row', marginTop: 15}}>
                  <View style={{flex: 1, flexDirection: 'column'}}>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          fontFamily: 'Titillium-Semibold',
                          color: color.text,
                          fontSize: 14,
                          marginBottom: 5,
                        }}>
                        Notes
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Titillium-Semibold',
                          color: Colors.red_FF0000,
                          fontSize: 14,
                        }}>
                        *
                      </Text>
                    </View>
                    <TextInput
                      mode="outlined"
                      value={notes.value}
                      returnKeyType="next"
                      autoCapitalize="none"
                      keyboardType="default"
                      multiline={true}
                      underlineColorAndroid="transparent"
                      style={{
                        fontFamily: 'Titillium-Semibold',
                        color: '#777777',
                        fontSize: 14,
                        backgroundColor: materialColor.onSecondary,
                        borderRadius: 5,
                        textAlignVertical: 'top',
                      }}
                      onChangeText={text => {
                        setNotes({value: text});
                        setRequiredMsg({});
                      }}
                      theme={{
                        colors: {
                          placeholder: Colors.grey_888888,
                          text: Colors.black,
                          primary: Colors.grey_C0C0C0,
                          underlineColor: 'transparent',
                          backgroundColor: Colors.white,
                        },
                        fonts: {
                          regular: {
                            fontFamily: 'Titillium-Semibold',
                            fontWeight: 'normal',
                          },
                        },
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: 'Titillium-Semibold',
                        color: Colors.red_FF0000,
                        fontSize: 11,
                      }}>
                      {requiredMsg.notes && 'Notes is required !!!'}
                    </Text>
                  </View>
                </View>
                <Button
                  mode="contained"
                  onPress={() => {
                    onSubmitPressed();
                  }}
                  uppercase={false}
                  disabled={isLoading}
                  style={{
                    backgroundColor: materialColor.primary,
                    marginTop: 30,
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: 'Titillium-Semibold',
                      fontWeight: 'normal',
                      color: materialColor.primaryContainer,
                    }}>
                    {isLoading ? 'Loading...' : 'Submit'}
                  </Text>
                </Button>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </RBSheet>
        <Dialog visible={invoiceVisible} width={0.9}>
          <DialogContent
            style={{padding: 10, backgroundColor: Colors.color_e0e0e0}}>
            <View style={{flexDirection: 'column'}}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={require('../../assets/images/loggo.png')}
                  style={{height: 40, width: 80}}></Image>
                <Text
                  style={{
                    fontFamily: 'Titillium-Semibold',
                    color: '#000000',
                    fontSize: 18,
                    marginLeft: 50,
                    marginTop: 5,
                  }}>
                  INVOICE
                </Text>
              </View>

              <View style={{flexDirection: 'row', marginTop: 10}}>
                <View style={{flex: 1, flexDirection: 'column'}}>
                  <Text
                    style={{
                      fontFamily: 'Titillium-Semibold',
                      color: Colors.black,
                      fontSize: 14,
                      textAlignVertical: 'center',
                      marginLeft: 10,
                    }}>
                    45/67-07 Cowper Street
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Titillium-Semibold',
                      color: Colors.black,
                      fontSize: 14,
                      textAlignVertical: 'center',
                      marginLeft: 10,
                    }}>
                    London, EC2A 4AW
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Titillium-Semibold',
                      color: Colors.black,
                      fontSize: 14,
                      textAlignVertical: 'center',
                      marginLeft: 10,
                    }}>
                    United Kingdom
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                    flexDirection: 'column',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Titillium-Semibold',
                      color: Colors.black,
                      fontSize: 14,
                      textAlignVertical: 'center',
                      marginLeft: 10,
                    }}>
                    Invoice # 035
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Titillium-Semibold',
                      color: Colors.black,
                      fontSize: 14,
                      textAlignVertical: 'center',
                      marginLeft: 10,
                    }}>
                    Date: Aug 15, 2021
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Titillium-Semibold',
                      color: Colors.black,
                      fontSize: 14,
                      textAlignVertical: 'center',
                      marginLeft: 10,
                    }}>
                    Amount: 1900
                  </Text>
                </View>
              </View>

              <View
                style={{
                  backgroundColor: Colors.grey_F8F7FD,
                  height: 2,
                  marginTop: 5,
                }}></View>

              <View style={{flexDirection: 'row', marginTop: 10}}>
                <View style={{flex: 1, flexDirection: 'column'}}>
                  <Text
                    style={{
                      fontFamily: 'Titillium-Semibold',
                      color: Colors.black,
                      fontSize: 16,
                      textAlignVertical: 'center',
                      marginLeft: 10,
                    }}>
                    Bill To
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Titillium-Semibold',
                      color: Colors.black,
                      fontSize: 14,
                      textAlignVertical: 'center',
                      marginLeft: 10,
                    }}>
                    ABC Pvt Ltd
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Titillium-Semibold',
                      color: Colors.black,
                      fontSize: 14,
                      textAlignVertical: 'center',
                      marginLeft: 10,
                    }}>
                    United States
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                    flexDirection: 'column',
                  }}></View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <View style={{flex: 0.5, flexDirection: 'row', marginTop: -10}}>
                  <Text
                    style={{
                      fontFamily: 'Titillium-Semibold',
                      color: '#000000',
                      fontSize: 16,
                    }}>
                    Description
                  </Text>
                </View>
                <View
                  style={{
                    flex: 0.5,
                    flexDirection: 'row',
                    marginTop: -10,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Titillium-Semibold',
                      color: '#000000',
                      fontSize: 16,
                    }}>
                    Price
                  </Text>
                </View>
                <View
                  style={{
                    flex: 0.5,
                    flexDirection: 'row',
                    marginTop: -10,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Titillium-Semibold',
                      color: '#000000',
                      fontSize: 16,
                    }}>
                    Amount(RS)
                  </Text>
                </View>
              </View>

              <View
                style={{
                  backgroundColor: Colors.grey_F8F7FD,
                  height: 2,
                  marginTop: 5,
                }}></View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <View style={{flex: 0.5, flexDirection: 'row', marginTop: -10}}>
                  <Text
                    style={{
                      fontFamily: 'Titillium-Semibold',
                      color: '#000000',
                      fontSize: 16,
                    }}>
                    2 Months Subscription
                  </Text>
                </View>
                <View
                  style={{
                    flex: 0.5,
                    flexDirection: 'row',
                    marginTop: -10,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Titillium-Semibold',
                      color: '#000000',
                      fontSize: 16,
                    }}>
                    1900
                  </Text>
                </View>
                <View
                  style={{
                    flex: 0.5,
                    flexDirection: 'row',
                    marginTop: -10,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Titillium-Semibold',
                      color: '#000000',
                      fontSize: 16,
                    }}>
                    1900
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <View style={{flex: 0.5, flexDirection: 'row', marginTop: -10}}>
                  <Text
                    style={{
                      fontFamily: 'Titillium-Semibold',
                      color: '#000000',
                      fontSize: 16,
                    }}></Text>
                </View>
                <View
                  style={{
                    flex: 0.5,
                    flexDirection: 'row',
                    marginTop: -10,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Titillium-Semibold',
                      color: '#000000',
                      fontSize: 16,
                    }}>
                    Total
                  </Text>
                </View>
                <View
                  style={{
                    flex: 0.5,
                    flexDirection: 'row',
                    marginTop: -10,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Titillium-Semibold',
                      color: '#000000',
                      fontSize: 16,
                    }}>
                    1900
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <View style={{flex: 0.5, flexDirection: 'row', marginTop: -10}}>
                  <Text
                    style={{
                      fontFamily: 'Titillium-Semibold',
                      color: '#000000',
                      fontSize: 16,
                    }}></Text>
                </View>
                <View
                  style={{
                    flex: 0.5,
                    flexDirection: 'row',
                    marginTop: -10,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Titillium-Semibold',
                      color: '#000000',
                      fontSize: 16,
                    }}>
                    Payments
                  </Text>
                </View>
                <View
                  style={{
                    flex: 0.5,
                    flexDirection: 'row',
                    marginTop: -10,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Titillium-Semibold',
                      color: '#000000',
                      fontSize: 16,
                    }}>
                    1900
                  </Text>
                </View>
              </View>

              <View
                style={{
                  backgroundColor: Colors.grey_F8F7FD,
                  height: 2,
                  marginTop: 5,
                }}></View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <View style={{flex: 0.5, flexDirection: 'row', marginTop: -10}}>
                  <Text
                    style={{
                      fontFamily: 'Titillium-Semibold',
                      color: '#000000',
                      fontSize: 16,
                    }}></Text>
                </View>
                <View
                  style={{
                    flex: 0.5,
                    flexDirection: 'row',
                    marginTop: -10,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Titillium-Semibold',
                      color: '#000000',
                      fontSize: 16,
                    }}>
                    Amount Due
                  </Text>
                </View>
                <View
                  style={{
                    flex: 0.5,
                    flexDirection: 'row',
                    marginTop: -10,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Titillium-Semibold',
                      color: '#000000',
                      fontSize: 16,
                    }}>
                    0.00
                  </Text>
                </View>
              </View>

              <Text
                style={{
                  fontFamily: 'Titillium-Semibold',
                  color: '#000000',
                  fontSize: 16,
                  marginTop: 20,
                }}>
                Payments
              </Text>

              <View
                style={{
                  backgroundColor: Colors.grey_F8F7FD,
                  height: 2,
                  marginTop: 5,
                }}></View>

              <Text
                style={{
                  fontFamily: 'Titillium-Semibold',
                  color: '#000000',
                  fontSize: 15,
                  marginTop: 10,
                }}>
                Rs. 1900 was paid on Aug 15, 2021 UTC by VISA card ending 2456
              </Text>

              <View style={{alignSelf: 'center', marginTop: 20}}>
                <TouchableOpacity
                  onPress={() => setInvoiceVisible(false)}
                  style={{
                    backgroundColor: Colors.color_5E0F8B,
                    borderRadius: 20,
                  }}>
                  <View
                    style={{flexDirection: 'column', padding: 7, width: 120}}>
                    <Text
                      style={{
                        fontFamily: 'Titillium-Semibold',
                        color: '#ffffff',
                        fontSize: 16,
                        alignSelf: 'center',
                      }}>
                      Close
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </DialogContent>
        </Dialog>
      </View>

      <DialogView
        showLoadingDialog
        visible={isLoading}
        text="Loading Complaints..."></DialogView>

      {modalVisible && (
        <Headerview
          showSideMenu
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default Complaints;
