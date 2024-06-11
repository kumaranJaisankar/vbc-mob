import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import config from '../../apiwebservices/apiConfig';
import {useTheme} from '@react-navigation/native';
const PaymentGatewayOptions = props => {
  const color = useTheme().colors;
  const {paymentGateways, selectedGateway, handleGatewayClick} = props;

  // Effect to handle initial selection
  useEffect(() => {
    const initialGateway = paymentGateways.find(
      gateway => gateway.enabled && gateway.default,
    );
    if (initialGateway && !selectedGateway) {
      handleGatewayClick(initialGateway);
    }
    console.log(initialGateway, 'initialGateway');
  }, [paymentGateways, selectedGateway, handleGatewayClick]);

  return (
    <View style={styles.paymentGatewayOptions}>
      <Text style={styles.label}>
        <Text style={{fontSize: 16, color: color.text}}>Payment Gateway :</Text>
      </Text>
      <View style={styles.pcardContainer}>
        {paymentGateways?.map(gateway => (
          <TouchableOpacity
            key={gateway.id}
            style={[
              styles.pcard,
              selectedGateway === gateway.id && styles.selected,
            ]}
            onPress={() => handleGatewayClick(gateway)}>
            <Image
              source={{
                uri: `${
                  config.REACT_APP_API_URL_BILLING
                }/${gateway.imageurl.replace('./', '')}`,
              }}
              style={styles.gatewayImage}
            />

            {selectedGateway === gateway.id && (
              <Text style={styles.tickMark}>&#10003;</Text>
            )}
            {/* <Text>{config.REACT_APP_API_URL_BILLING}{'/'}{gateway.imageurl.replace('./', '')}</Text> */}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  paymentGatewayOptions: {
    marginTop: 20,
  },
  label: {
    fontSize: 20,
  },
  pcardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pcard: {
    borderWidth: 4,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  gatewayImage: {
    maxWidth: 100,
    marginBottom: 10,
    resizeMode: 'contain',
    height: 50,
    width: 50,
  },
  selected: {
    borderColor: '#285295',
  },
  tickMark: {
    position: 'absolute',
    top: -6,
    left: 2,
    fontSize: 24,
    color: '#285295',
  },
});

export default PaymentGatewayOptions;
