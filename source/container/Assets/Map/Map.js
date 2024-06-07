import React from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Dimensions,
  Image,
  Text,
} from 'react-native';
import {Colors} from '../../../commoncomponents/Colors';
import {strings} from '../../../strings/i18n';
import Headerview from '../../../commoncomponents/HeaderView';
import MapView, {Marker, PROVIDER_GOOGLE, Polyline} from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import MapViewDirections from 'react-native-maps-directions';
import apiConfig from '../../../apiwebservices/apiConfig';

const Map = ({navigation}) => {
  var i = 0;
  const {width, height} = Dimensions.get('window');

  const ASPECT_RATIO = width / height;
  const LATITUDE = 12.89;
  const LONGITUDE = 77.64;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  var regionData = {
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  const [region, setRegion] = React.useState(regionData);

  const [coordinates] = React.useState([
    {
      latitude: 12.899722108603239,
      longitude: 77.64482683003114,
    },
    {
      latitude: 12.921996376437693,
      longitude: 77.64518849260193,
    },
  ]);

  const MINUTE_MS = 2000;

  React.useEffect(() => {
    const interval = setInterval(() => {
      i = i + 1;
      if (i == 2) {
        var regionData = {
          latitude: 12.899931,
          longitude: 77.645315,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };
        setRegion(regionData);
        updateLocation(12.899931, 77.645315);
      } else if (i == 3) {
        var regionData = {
          latitude: 12.90136,
          longitude: 77.64557,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };
        setRegion(regionData);
      } else if (i == 4) {
        var regionData = {
          latitude: 12.90136,
          longitude: 77.64557,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };
        setRegion(regionData);
      } else if (i == 5) {
        var regionData = {
          latitude: 12.902873,
          longitude: 77.643064,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };
        setRegion(regionData);
      } else if (i == 6) {
        var regionData = {
          latitude: 12.903793,
          longitude: 77.641692,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };
        setRegion(regionData);
      } else if (i == 7) {
        var regionData = {
          latitude: 12.905037,
          longitude: 77.639859,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };
        setRegion(regionData);
      } else if (i == 8) {
        var regionData = {
          latitude: 12.905122783058069,
          longitude: 77.64269520239102,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };
        setRegion(regionData);
      } else if (i == 9) {
        var regionData = {
          latitude: 12.904843,
          longitude: 77.644301,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };
        setRegion(regionData);
      } else if (i == 10) {
        var regionData = {
          latitude: 12.910229,
          longitude: 77.644535,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };
        setRegion(regionData);
      } else if (i == 11) {
        var regionData = {
          latitude: 12.91525,
          longitude: 77.644752,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };
        setRegion(regionData);
      } else if (i == 12) {
        var regionData = {
          latitude: 12.921996376437693,
          longitude: 77.64518849260193,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };
        setRegion(regionData);
      } else if (i == 13) {
        i = 1;
      }
    }, MINUTE_MS);
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  const updateLocation = async (lat, lng) => {
    var token = '';
    try {
      token = await AsyncStorage.getItem('token');
    } catch (e) {}
    var body = {
      latitude: lat,
      longitude: lng,
      timestamp: '2021-09-21T10:43:58.440110Z',
      status: 'ONL',
      emp: 1,
    };
    var url = `${apiConfig.REACT_APP_API_URL_STAFF}/hist/create/list`;
    await axios
      .post(url, JSON.stringify(body), {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        //console.log(JSON.stringify(response));
        if (response.status == 200) {
          //console.log(response.data.access);
        }
      })
      .catch(_error => {
        const errorresponse = _error.toString();
        //console.log(errorresponse+"//////");
      });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: Colors.grey_E2E2E2}}>
        <Headerview
          showHeader
          showBackButton
          title={'Asset No : 29'}
          onBackClicked={() => {
            navigation.goBack(null);
          }}
        />

        <View style={{flex: 1}}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            minZoomLevel={12}
            scrollEnabled={true}
            zoomEnabled={true}
            pitchEnabled={true}
            rotateEnabled={true}
            initialRegion={region}>
            {/* <Marker
                            title="Asset No : 29"
                            description="# 7, HSR Layout, Bangalore"
                            coordinate={region}>                       
                        </Marker>       */}

            <Marker coordinate={region}>
              <Image
                source={require('../../../assets/images/user.png')}
                style={{height: 40, width: 40}}></Image>
            </Marker>

            <MapViewDirections
              origin={coordinates[0]}
              //waypoints={ (coordinates.length > 2) ? coordinates.slice(1, -1): null}
              destination={coordinates[1]}
              apikey={'AIzaSyARDHuO21H6qHxSv2tiFP0Me9U7PyF6ASg'}
              strokeWidth={5}
              strokeColor="hotpink"
              optimizeWaypoints={true}
              onStart={params => {
                console.log(
                  `Started routing between "${params.origin}" and "${params.destination}"`,
                );
              }}
              onReady={result => {
                console.log(`Distance: ${result.distance} km`);
                console.log(`Duration: ${result.duration} min.`);
              }}
              onError={errorMessage => {
                // console.log('GOT AN ERROR');
              }}
            />

            <Marker coordinate={coordinates[0]} />
            <Marker coordinate={coordinates[1]} />
            {/* <MapViewDirections
                            origin={coordinates[0]}
                            destination={coordinates[1]}
                            onReady={1}
                            onStart={origin}
                            apikey={'AIzaSyARDHuO21H6qHxSv2tiFP0Me9U7PyF6ASg'}
                            strokeWidth={10}
                            strokeColor="#111111"
                            mode='DRIVING'
                            language='en'/>   
                        
                        <Polyline
                            coordinates={coordinates}
                            strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                            strokeColors={['#7F0000']}
                            strokeWidth={3}
                            /> */}
          </MapView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  scrollview: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
