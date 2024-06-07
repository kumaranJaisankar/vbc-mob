import React, { useState } from 'react'
import {
    View, Text, SafeAreaView, TouchableOpacity,
    Image,
    FlatList,
    StyleSheet
} from 'react-native';
import Headerview from '../commoncomponents/HeaderView1';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../commoncomponents/Colors';
import apiConfig from '../apiwebservices/apiConfig';

const NotificationList = () => {
    const [modalVisible, setModalVisible] = useState(false);
    var img = require('../assets/images/notificationicon.png')
    const data = [
        { id: 3, image: img, name: `${apiConfig.REACT_APP_CLIENT_NAME} Notificaions`, text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", attachment: "", hours: "Few Seconds ago" },
        { id: 2, image: img, name: `${apiConfig.REACT_APP_CLIENT_NAME} Open Ticket`, text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", attachment: "", hours: "10 min ago" },
        { id: 4, image: img, name: `${apiConfig.REACT_APP_CLIENT_NAME} Close Ticket`, text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", attachment: "", hours: "20 min ago" },
        { id: 5, image: img, name: `${apiConfig.REACT_APP_CLIENT_NAME} Notificaions`, text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", attachment: "", hours: "30 min ago" },
        { id: 1, image: img, name: `${apiConfig.REACT_APP_CLIENT_NAME} Notificaions`, text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", attachment: "", hours: "40 min ago" },
        { id: 6, image: img, name: `${apiConfig.REACT_APP_CLIENT_NAME} Notificaions`, text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", attachment: "", hours: "50 min ago" },
        { id: 7, image: img, name: `${apiConfig.REACT_APP_CLIENT_NAME} Notificaions`, text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", attachment: "", hours: "1 hours ago" },
        { id: 8, image: img, name: `${apiConfig.REACT_APP_CLIENT_NAME} Notificaions`, text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", attachment: "", hours: "2 hours ago" },

    ]
    return (
        <>
            <Headerview
                username={'Notifications'}
                showDashboardHeader
                showName
                onMenuClick={() => {
                    setModalVisible(true);
                }}
            />
            <FlatList
                style={styles.root}
                data={data}
                extraData={data}
                ItemSeparatorComponent={() => {
                    return (
                        <View style={styles.separator} />
                    )
                }}
                keyExtractor={(item) => {
                    return item.id;
                }}
                renderItem={(item) => {
                    const Notification = item.item;
                    let attachment = <View />;

                    let mainContentStyle;
                    if (Notification.attachment) {
                        mainContentStyle = styles.mainContent;
                        attachment = <Image style={styles.attachment} source={{ uri: Notification.attachment }} />
                    }
                    return (
                        <View style={styles.container}>
                            <Image source={Notification.image} style={styles.avatar} />

                            <View style={styles.content}>
                                <View style={mainContentStyle}>
                                    <View style={styles.text}>
                                        <Text style={styles.name}>{Notification.name}</Text>
                                        <Text>{Notification.text}</Text>
                                    </View>
                                    <Text style={styles.timeAgo}>
                                        <Ionicons
                                            name={'time-outline'}
                                            size={12}
                                            color={Colors.grey_888888}
                                        />
                                        {' '}
                                        {Notification.hours}
                                    </Text>
                                </View>
                                {attachment}
                            </View>
                        </View>
                    );
                }} />

            {modalVisible && (
                <Headerview
                    showSideMenu
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                />
            )}
        </>
    );
}
const styles = StyleSheet.create({
    root: {
        backgroundColor: "#FFFFFF"
    },
    container: {
        padding: 16,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: "#FFFFFF",
        alignItems: 'flex-start'
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    text: {
        marginBottom: 5,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    content: {
        flex: 1,
        marginLeft: 16,
        marginRight: 0
    },
    mainContent: {
        marginRight: 60
    },
    img: {
        height: 50,
        width: 50,
        margin: 0
    },
    attachment: {
        position: 'absolute',
        right: 0,
        height: 50,
        width: 50
    },
    separator: {
        height: 1,
        backgroundColor: "#CCCCCC"
    },
    timeAgo: {
        fontSize: 12,
        color: "#696969"
    },
    name: {
        fontSize: 16,
        color: "#DC631F"
    }
});

export default NotificationList