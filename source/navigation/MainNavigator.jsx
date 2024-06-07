import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Login from '../login/Login';
import LandingPage from '../login/LandingPage';
import Splashscreen from '../splashscreen/SplashScreen';
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
import TermsOfService from '../container/TermsOfService/TermsOfService';
import PrivacyPolicy from '../container/PrivacyPolicy/PrivacyPolicy';
import Complaints from '../container/Complaints/Complaints';
import ReferAFriend from '../container/ReferAFriend/ReferAFriend';
import PaymentGateWayWebView from '../PaymentGateWayWebView/PaymentGateWayWebView';
import NotificationList from '../notification/NotificationList';
import {Colors} from '../commoncomponents/Colors';
import {connect} from 'react-redux';
import DocumentList from '../container/Documents/DocumentList';
import AuthStack from './AuthStack';
import UnderDevelopmentProcess from '../commoncomponents/UnderDevelopmentProcess';

const Stack = createStackNavigator();

function MainNavigator(props) {
  return (
    <Stack.Navigator initialRouteName="Splashscreen">
      <Stack.Group>
        <Stack.Screen
          options={{
            headerShown: false,
            headerLeft: null,
            animationEnabled: true,
          }}
          name="Splashscreen"
          component={Splashscreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            headerLeft: null,
            animationEnabled: true,
          }}
          name="LandingPage"
          component={LandingPage}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            headerLeft: null,
            animationEnabled: true,
          }}
          name="Login"
          component={Login}
        />

        <Stack.Screen
          options={{
            headerShown: false,
            headerLeft: null,
            animationEnabled: true,
          }}
          name="TermsOfService"
          component={TermsOfService}
        />

        <Stack.Screen
          options={{
            headerShown: false,
            headerLeft: null,
            animationEnabled: true,
          }}
          name="PrivacyPolicy"
          component={PrivacyPolicy}
        />
      </Stack.Group>
      {props.isAuthenticated && (
        <Stack.Group>
          <Stack.Screen
            name="Dash"
            component={AuthStack}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            options={{
              headerShown: false,
              headerLeft: null,
              animationEnabled: true,
            }}
            name="NewDashboard"
            component={NewDashboard}
          />

          <Stack.Screen
            options={{
              headerTintColor: Colors.black,
              headerTitle: 'Payment Page',
              headerStyle: {backgroundColor: Colors.blue_3F79E9},
            }}
            name="PaymentGateWayWebView"
            component={PaymentGateWayWebView}
          />

          <Stack.Screen
            options={{
              headerShown: false,
              headerLeft: null,
              animationEnabled: true,
            }}
            name="KYC_List"
            component={KYC_List}
          />

          <Stack.Screen
            options={{
              headerShown: false,
              headerLeft: null,
              animationEnabled: true,
            }}
            name="KYC_Add_Update"
            component={KYC_Add_Update}
          />

          <Stack.Screen
            options={{
              headerShown: false,
              headerLeft: null,
              animationEnabled: true,
            }}
            name="SignatureCapture"
            component={SignatureCapture}
          />

          <Stack.Screen
            options={{
              headerShown: false,
              headerLeft: null,
              animationEnabled: true,
            }}
            name="Assets_List"
            component={Assets_List}
          />

          <Stack.Screen
            options={{
              headerShown: false,
              headerLeft: null,
              animationEnabled: true,
            }}
            name="Asset_Add_Update"
            component={Asset_Add_Update}
          />

          <Stack.Screen
            options={{
              headerShown: false,
              headerLeft: null,
              animationEnabled: true,
            }}
            name="HardwareCategory"
            component={HardwareCategory}
          />

          <Stack.Screen
            options={{
              headerShown: false,
              headerLeft: null,
              animationEnabled: true,
            }}
            name="Make"
            component={Make}
          />

          <Stack.Screen
            options={{
              headerShown: false,
              headerLeft: null,
              animationEnabled: true,
            }}
            name="Map"
            component={Map}
          />

          <Stack.Screen
            options={{
              headerShown: false,
              headerLeft: null,
              animationEnabled: true,
            }}
            name="InvoiceHistory"
            component={InvoiceHistory}
          />

          <Stack.Screen
            options={{
              headerShown: false,
              headerLeft: null,
              animationEnabled: true,
            }}
            name="DataUsageHistory"
            component={DataUsageHistory}
          />

          <Stack.Screen
            options={{
              headerShown: false,
              headerLeft: null,
              animationEnabled: true,
            }}
            name="SessionHistory"
            component={SessionHistory}
          />

          <Stack.Screen
            options={{
              headerShown: false,
              headerLeft: null,
              animationEnabled: true,
            }}
            name="Profile"
            component={Profile}
          />

          <Stack.Screen
            options={{
              headerShown: false,
              headerLeft: null,
              animationEnabled: true,
            }}
            name="PlanRenewal"
            component={PlanRenewal}
          />

          <Stack.Screen
            options={{
              headerShown: false,
              headerLeft: null,
              animationEnabled: true,
            }}
            name="Complaints"
            component={Complaints}
          />

          <Stack.Screen
            options={{
              headerShown: false,
              headerLeft: null,
              animationEnabled: true,
            }}
            name="ReferAFriend"
            component={ReferAFriend}
          />

          <Stack.Screen
            options={{
              headerShown: false,
              headerLeft: null,
              animationEnabled: true,
            }}
            name="notification"
            component={NotificationList}
          />
          <Stack.Screen
            options={{
              headerShown: false,
              headerLeft: null,
              animationEnabled: true,
            }}
            name="DocumentList"
            component={DocumentList}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}

function mapStateToProps(state, props) {
  return {
    isAuthenticated: state.mainReducers.main.isAuthenticated,
  };
}

export default connect(mapStateToProps)(MainNavigator);
