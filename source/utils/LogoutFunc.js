
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {connect} from 'react-redux';
import {operations} from '../redux/Main';
import {bindActionCreators} from 'redux';
import {useNavigation} from '@react-navigation/native';

const LogoutFunc = props => {
  console.log('logout');
  const navigation = useNavigation();
  const onLogOutPress = async () => {
    const getData = async () => {
      const data = await AsyncStorage.getItem('username');
      console.log(data);
      console.log('unsubscribe');

      messaging()
        .unsubscribeFromTopic(`${data}`)
        .then(() => console.log('UnSubscribed to topic!'));
    };
    console.log(props);
    await getData();

    // props.onRequestClose(false);
    props.updateAuthentication(false);
    AsyncStorage.clear();

    navigation.navigate('Login');
  };
  onLogOutPress();
};

function mapStateToProps(state, props) {
  return {
    updateAuthentication: state.mainReducers.main.updateAuthentication,
    user: state.mainReducers.main.user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(operations, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutFunc);
