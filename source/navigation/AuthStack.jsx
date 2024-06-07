import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import React from 'react';
import NewDashboard from '../dashboard/NewDashboard';
import KYC_List from '../container/KYC_Form/KYC_List';
import KYC_Add_Update from '../container/KYC_Form/KYC_Add_Update/KYC_Add_Update';
import SignatureCapture from '../commoncomponents/SignatureCapture';
import Assets_List from '../container/Assets/Assets_List';
import Asset_Add_Update from '../container/Assets/Asset_Add_Update/Asset_Add_Update';
import HardwareCategory from '../container/Assets/HardwareCategory/HardwareCategory';
import Make from '../container/Assets/Make/Make';
import Map from '../container/Assets/Map/Map';
import InvoiceHistory from '../container/InvoiceHistory/InvoiceHistory';
import DataUsageHistory from '../container/DataUsageHistory/DataUsageHistory';
import SessionHistory from '../container/SessionHistory/SessionHistory';
import Profile from '../container/Profile/Profile';
import PlanRenewal from '../container/PlanRenewal/PlanRenewal';
import Complaints from '../container/Complaints/Complaints';
import ReferAFriend from '../container/ReferAFriend/ReferAFriend';
import PaymentGateWayWebView from '../PaymentGateWayWebView/PaymentGateWayWebView';
import NotificationList from '../notification/NotificationList';
import {Colors} from '../commoncomponents/Colors';
import DocumentList from '../container/Documents/DocumentList';
import CustomDrawer from './CustomDrawer';
import UnderDevelopmentProcess from '../commoncomponents/UnderDevelopmentProcess';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const Drawer = createDrawerNavigator();

const AuthStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerStyle: {backgroundColor: Colors.colorgradient2},
        drawerStyle: {borderTopRightRadius: 15, borderBottomRightRadius: 15},
        drawerLabelStyle: {
          fontSize: 14,
          fontFamily: 'Titillium-Semibold',
          marginLeft: -20,
          padding: 0,
        },
        drawerItemStyle: {padding: 0, margin: 0, marginBottom: 0},
      }}>
      <Drawer.Screen
        options={{
          drawerIcon: props => (
            <Ionicons name={'home'} size={20} color={props.color} />
          ),
          drawerLabel: 'Home',
          headerShown: false,
          headerLeft: null,
          animationEnabled: true,
        }}
        name="NewDashboard"
        component={NewDashboard}
      />

      <Drawer.Screen
        options={{
          drawerIcon: props => (
            <MaterialIcons name={'payment'} size={22} color={props.color} />
          ),
          drawerLabel: 'Bill Payment',
          headerTintColor: Colors.white,
          headerTitle: 'Bill Payment',
          headerStyle: {backgroundColor: Colors.colorgradient3},
        }}
        name="underDevelopement"
        component={UnderDevelopmentProcess}
      />

      <Drawer.Screen
        options={{
          drawerIcon: props => (
            <Ionicons
              name={'newspaper-outline'}
              size={22}
              color={props.color}
            />
          ),
          drawerLabel: 'Invoice History ',
          headerShown: false,
          headerLeft: null,
          animationEnabled: true,
        }}
        name="InvoiceHistory"
        component={InvoiceHistory}
      />

      <Drawer.Screen
        options={{
          drawerIcon: props => (
            <MaterialIcons name={'history'} size={23} color={props.color} />
          ),
          drawerLabel: 'Data usage History',
          headerShown: false,
          headerLeft: null,
          animationEnabled: true,
        }}
        name="DataUsageHistory"
        component={DataUsageHistory}
      />

      <Drawer.Screen
        options={{
          drawerIcon: props => (
            <MaterialCommunityIcons
              name={'format-section'}
              size={25}
              color={props.color}
            />
          ),
          drawerLabel: 'Session History',
          headerShown: false,
          headerLeft: null,
          animationEnabled: true,
        }}
        name="SessionHistory"
        component={SessionHistory}
      />

      <Drawer.Screen
        options={{
          drawerIcon: props => (
            <FontAwesome name={'ticket'} size={23} color={props.color} />
          ),
          drawerLabel: 'Complaints',
          headerShown: false,
          headerLeft: null,
          animationEnabled: true,
        }}
        name="Complaints"
        component={Complaints}
      />

      <Drawer.Screen
        options={{
          drawerIcon: props => (
            <MaterialIcons name={'autorenew'} size={24} color={props.color} />
          ),
          drawerLabel: 'Plan Renewal',
          headerShown: false,
          headerLeft: null,
          animationEnabled: true,
        }}
        name="PlanRenewal"
        component={PlanRenewal}
      />

      <Drawer.Screen
        options={{
          drawerIcon: props => (
            <Feather name={'hard-drive'} size={23} color={props.color} />
          ),
          drawerLabel: 'Documents',
          headerShown: false,
          headerLeft: null,
          animationEnabled: true,
        }}
        name="DocumentList"
        component={DocumentList}
      />

      <Drawer.Screen
        options={{
          drawerItemStyle: {display: 'none'},
          headerShown: false,
          headerLeft: null,
          animationEnabled: true,
        }}
        name="Make"
        component={Make}
      />

      <Drawer.Screen
        options={{
          drawerItemStyle: {display: 'none'},
          headerShown: false,
          headerLeft: null,
          animationEnabled: true,
        }}
        name="Map"
        component={Map}
      />

      {/* <Drawer.Screen
        options={{
          drawerItemStyle: {display: 'none'},
          headerShown: false,
          headerLeft: null,
          animationEnabled: true,
        }}
        name="InvoiceHistory"
        component={InvoiceHistory}
      /> */}

      {/* <Drawer.Screen
        options={{
          drawerItemStyle: {display: 'none'},
          headerShown: false,
          headerLeft: null,
          animationEnabled: true,
        }}
        name="DataUsageHistory"
        component={DataUsageHistory}
      /> */}

      {/* <Drawer.Screen
        options={{
          drawerItemStyle: {display: 'none'},
          headerShown: false,
          headerLeft: null,
          animationEnabled: true,
        }}
        name="SessionHistory"
        component={SessionHistory}
      /> */}

      <Drawer.Screen
        options={{
          headerShown: false,
          headerLeft: null,
          animationEnabled: true,

          drawerItemStyle: {display: 'none'},
        }}
        name="Profile"
        component={Profile}
      />

      {/* <Drawer.Screen
        options={{
          drawerItemStyle: {display: 'none'},
          headerShown: false,
          headerLeft: null,
          animationEnabled: true,
        }}
        name="PlanRenewal"
        component={PlanRenewal}
      /> */}

      {/* <Drawer.Screen
        options={{
          drawerItemStyle: {display: 'none'},
          headerShown: false,
          headerLeft: null,
          animationEnabled: true,
        }}
        name="Complaints"
        component={Complaints}
      /> */}

      <Drawer.Screen
        options={{
          drawerItemStyle: {display: 'none'},
          headerShown: false,
          headerLeft: null,
          animationEnabled: true,
        }}
        name="ReferAFriend"
        component={ReferAFriend}
      />

      <Drawer.Screen
        options={{
          drawerItemStyle: {display: 'none'},
          headerShown: false,
          headerLeft: null,
          animationEnabled: true,
        }}
        name="notification"
        component={NotificationList}
      />
      {/* <Drawer.Screen
        options={{
          drawerItemStyle: {display: 'none'},
          headerShown: false,
          headerLeft: null,
          animationEnabled: true,
        }}
        name="DocumentList"
        component={DocumentList}
      /> */}
    </Drawer.Navigator>
  );
};

export default AuthStack;
