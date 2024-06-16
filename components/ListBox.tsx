import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ListBox = ({navigation}:any) => {
  const list = [
    {
      title: 'Dashboard',
      icon: 'dashboard',
      route: 'Dashboard',
    },
    {
      title: 'Recorded Videos',
      icon: 'ondemand-video',
      route: 'Recent',
    },
    {
      title: 'Settings',
      icon: 'settings',
      route: 'Settings',
    },
    {
      title: 'About',
      icon: 'info',
      route: 'About',
    },
  ];

  const renderListItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate(item.route)} >
      <MaterialIcons name={item.icon} size={24} color="#1e90ff" />
      <Text style={styles.itemText} >{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={list}
        renderItem={renderListItem}
        keyExtractor={(item) => item.title}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

export default ListBox;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 10,
    top: heightPercentageToDP('7%'),
    right: widthPercentageToDP('.9%'),
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    width: widthPercentageToDP('45%'),
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  itemText: {
    marginLeft: 16,
    fontSize: 16,
    color: '#123456',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
  },
});
