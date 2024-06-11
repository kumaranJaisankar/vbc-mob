import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
  Switch,
  useColorScheme,
} from 'react-native';
import react, {useState, useEffect} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {operations} from '../redux/Main';

import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../commoncomponents/Colors';
import {showAppInstruction} from '../commoncomponents/Common';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LogoutDialog from '../commoncomponents/LogoutDialog';
import VersionCheck from 'react-native-version-check';
import {
  Button,
  Dialog,
  RadioButton,
  Text as Txt,
  useTheme as useMDtheme,
} from 'react-native-paper';
import {useTheme} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

const CustomDrawer = props => {
  const [openTheme, SetThemeing] = useState(false);
  const colortheme = useColorScheme();
  const [logoutVisible, setLogoutVisible] = useState(false);
  const color = useTheme().colors;
  const materialColor = useMDtheme().colors;
  console.log(' jsdhjshdjhsj');
  console.log(Object.keys(props));
  console.log(props.user.first_name);
  // useEffect(() => {
  //   setIsDark(themeVal(props.currentTheme));
  // }, []);

  function themeVal(theme) {
    switch (theme) {
      case 'Dark':
        return true;
      case 'Light':
        return false;

      default:
        return colortheme === 'dark';
    }
  }
  return (
    <View style={{flex: 1, borderRadius: 20}}>
      <LinearGradient
        colors={[Colors.colorgradient1, Colors.colorgradient3]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        useAngle={true}
        angle={45}
        angleCenter={{x: 0.5, y: 0.5}}
        style={{
          padding: 10,
          paddingVertical: 2,
          flex: 0,
          flexDirection: 'row',
          alignItems: 'center',
          borderTopRightRadius: 15,
        }}>
        <Image
          alt="Not find"
          source={require('../assets/images/dashboard_user_icon.png')}
          style={styles.userAvatar}
        />
        <View>
          <Text
            style={{
              color: '#d7d7d7',
              fontSize: 16,
              fontWeight: 'bold',
              marginLeft: 10,
            }}>
            Hello 👋
          </Text>
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontFamily: 'Titillium-Semibold',
              marginLeft: 10,
            }}>
            {props.user.first_name}
          </Text>
        </View>
      </LinearGradient>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          marginTop: -10,
          zIndex: 10,
        }}>
        <View style={{flex: 1, paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: '#ccc',
          // backgroundColor: colors.cardbackground,
        }}>
        {/* <Text style={styles.preferences}>Preferences</Text> */}
        <View style={styles.switchTextContainer}>
          <View
            style={{
              marginLeft: 10,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialIcons
              name="dark-mode"
              size={22}
              color={materialColor.outline}
            />
            <TouchableOpacity onPress={() => SetThemeing(true)}>
              <View>
                <Text
                  style={{
                    marginLeft: 10,
                    color: materialColor.outline,
                    fontSize: 15,
                    fontWeight: '500',
                    fontFamily: 'Titillium-Semibold',
                  }}>
                  Dark Theme
                </Text>
                <Text style={{marginLeft: 10, color: 'grey'}}>
                  {props.currentTheme}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <Switch
            value={themeVal(props.currentTheme)}
            onValueChange={value => {
              console.log(value);
              props.updateTheme(!value ? 'Light' : 'Dark');
            }}
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor="#f4f3f4"
            style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}], marginRight: 10}}
          />
        </View>
      </View>
      <View
        style={{
          padding: 20,
          borderTopWidth: 1,
          borderTopColor: '#ccc',
          paddingTop: 0,
        }}>
        {/* <TouchableOpacity
          onPress={() => {
            showAppInstruction();
          }}
          style={{paddingVertical: 10}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Feather name={'settings'} size={23} color={color.text} />
            <Text
              style={{
                fontSize: 14,
                color: color.text,
                marginLeft: 10,
              }}>
              Settings
            </Text>
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => {
            showAppInstruction();
          }}
          style={{paddingVertical: 10}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons
              name="share-social-outline"
              size={23}
              color={materialColor.outline}
            />
            <Text
              style={{
                fontWeight: '500',
                fontSize: 14,
                color: materialColor.outline,
                marginLeft: 10,
                fontFamily: 'Titillium-Semibold',
              }}>
              Refer A Friend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{paddingVertical: 10}}
          onPress={() => setLogoutVisible(true)}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons
              name="exit-outline"
              size={23}
              color={materialColor.outline}
            />
            <Text
              style={{
                fontSize: 14,
                color: materialColor.outline,
                marginLeft: 10,
                // fontWeight: 'bold',
                fontFamily: 'Titillium-Semibold',
              }}>
              Logout
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 0,
            margin: 0,
          }}>
          <Text style={{fontSize: 10, padding: 0, margin: 0, color: 'grey'}}>
            App Version {VersionCheck.getCurrentVersion()}
          </Text>
        </View>
      </View>

      {/* Dialog box settings */}
      <Dialog
        visible={openTheme}
        dismissable={true}
        onDismiss={() => SetThemeing(false)}>
        <Dialog.Title ellipsizeMode="middle">Choose Theme</Dialog.Title>
        <Dialog.Content>
          <RadioButton.Group
            onValueChange={value => props.updateTheme(value)}
            value={props.currentTheme}>
            <View style={styles.themeListCont}>
              <Txt>System</Txt>
              <RadioButton value="System" />
            </View>
            <View style={styles.themeListCont}>
              <Txt>Dark</Txt>
              <RadioButton value="Dark" />
            </View>
            <View style={styles.themeListCont}>
              <Txt>Light</Txt>
              <RadioButton value="Light" />
            </View>
          </RadioButton.Group>
        </Dialog.Content>
        <Dialog.Actions style={{justifyContent: 'space-between'}}>
          <Button
            mode="contained"
            style={{width: 60}}
            onPress={() => SetThemeing(false)}>
            Done
          </Button>
        </Dialog.Actions>
      </Dialog>

      <LogoutDialog
        setLogoutVisible={setLogoutVisible}
        logoutVisible={logoutVisible}
      />
    </View>
  );
};

function mapStateToProps(state, props) {
  return {
    updateAuthentication: state.mainReducers.main.updateAuthentication,
    user: state.mainReducers.main.user,
    updateTheme: state.mainReducers.main.updateTheme,
    currentTheme: state.mainReducers.main.currentTheme,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(operations, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer);

const styles = StyleSheet.create({
  userAvatar: {
    height: 67.5,
    width: 67.5,
    borderRadius: 40,
    marginBottom: 10,
    marginTop: 30,
  },
  switchTextContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 7,
    paddingVertical: 10,
  },
  preferences: {
    fontSize: 16,
    color: '#ccc',
    paddingTop: 10,
    fontWeight: '500',
    paddingLeft: 20,
  },
  switchText: {
    fontSize: 17,
    color: '',
    paddingTop: 10,
    fontWeight: 'bold',
  },
  themeListCont: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
