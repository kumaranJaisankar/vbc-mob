import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

const FlaticonAnimatedIcon = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ marginTop: -30, marginHorizontal: 10 }}
    >
      <Image
         source={require('../assets/images/complaints.gif')}  // Replace 'flaticon-animation.gif' with the path to your downloaded GIF animation file
        style={{ width: 50, height: 50 }} // Adjust size as needed
      />
    </TouchableOpacity>
  );
};

export default FlaticonAnimatedIcon;
