import {View, Text, Image} from 'react-native';
import React from 'react';

import construction from 'react-native-vector-icons/MaterialIcons';

const UnderDevelopmentProcess = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        style={{width: 300, height: 300, resizeMode: 'contain'}}
        source={{
          uri: 'https://res.cloudinary.com/dtbarluca/image/upload/v1669999414/erroring_1_svootq.png',
        }}
      />
      <Text
        style={{
          fontSize: 20,
          textAlign: 'center',
          fontWeight: 'bold',
          color: 'grey',
          marginTop: 10,
        }}>
        This Screen under development process
      </Text>
    </View>
  );
};

export default UnderDevelopmentProcess;
