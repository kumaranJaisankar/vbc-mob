import React from 'react';
import { View, Text } from 'react-native';
import { Colors } from '../../commoncomponents/Colors';

const PlanDetailsPopupListData = (props) => {
  if (props.showPopupData) {
    return (
      <View style={{ flexDirection: 'row', marginVertical: 5 }}>
        <View style={{ flex: 0.7 }}>
          <Text style={styles.labelText}>{props.title}</Text>
        </View>
        <View style={{ flex: 0.1 }}>
          <Text style={styles.labelText}>:</Text>
        </View>
        <View style={{ flex: 1.5, justifyContent: 'flex-start' }}>
          <Text style={styles.valueText}>{props.value}</Text>
        </View>
      </View>
    );
  }
  return null;
};

const styles = {
  labelText: {
    fontFamily: 'Titillium-Semibold',
    color: Colors.black,
    fontSize: 14,
  },
  valueText: {
    fontFamily: 'Titillium-Semibold',
    color: Colors.black,
    fontSize: 14,
    marginLeft: 5,
  },
};

export default PlanDetailsPopupListData;
