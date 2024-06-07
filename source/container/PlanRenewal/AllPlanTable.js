import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Colors } from '../../commoncomponents/Colors';
import { strings } from '../../strings/i18n';

const AllPlanTable = (props) => {
  const [invoiceVisible, setInvoiceVisible] = useState(false);
  const allPlanData = props.itemdata;

  return (
    <View>
      <View style={styles.rowContainer}>
        <View style={styles.column}>
          <Text style={styles.text}>{allPlanData.package_name}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.text}>{parseFloat(allPlanData.total_plan_cost)}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.text}>
            {allPlanData.download_speed + ' ' + strings('Plan.DownSpeed')}
          </Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.text}>{allPlanData.package_data_type}</Text>
        </View>
        <View style={styles.column}>
          <TouchableOpacity
            onPress={props.onItemClick}
            style={styles.selectButton}>
            <Text style={styles.buttonText}>Select</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.separator}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  column: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Titillium-Semibold',
    color: '#000000',
    fontSize: 12,
  },
  selectButton: {
    backgroundColor: Colors.color_5E0F8B,
    borderRadius: 10,
    height: 28,
    marginTop: 5,
    padding: 5,
    width: 50,
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Titillium-Semibold',
    color: '#ffffff',
    fontSize: 12,
    alignSelf: 'center',
  },
  separator: {
    backgroundColor: Colors.grey_F8F7FD,
    height: 2,
    marginTop: 5,
  },
});

export default AllPlanTable;
