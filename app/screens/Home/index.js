import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { Item, Picker } from 'native-base';
import AppBar from '../../components/AppBar';
import LoadingIndicator from '../../components/LoadingIndicator';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import colours from '../../providers/constants/colours';
import * as Location from 'expo-location';

const styles = StyleSheet.create({
  divider: {
    marginHorizontal: 16,
    height: 0.5,
    width: '100%',
    backgroundColor: colours.borderGrey,
    alignSelf: 'center',
  },
  recipeDescription: {
    marginVertical: 3,
    width: 220,
  },
  bookingItem: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 6,
  },
  previewImg: {
    height: 100,
    width: 100,
    resizeMode: 'cover',
    alignSelf: 'flex-start',
    borderRadius: 6,
  },
  flatlistEmptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textboxContainer: {
    backgroundColor: colours.themePrimaryLight,
    borderRadius: 3,
    padding: 5,
    marginVertical: 5,
  },
  pickerOuterContainer: {
    borderWidth: 0.5,
    borderRadius: 4,
    borderColor: colours.themePrimary,
  },
  pickerContainer: { width: '95%', alignSelf: 'center' },
});

const GeneralInfo = ({ title, info }) => (
  <View style={{ flexDirection: 'row', marginLeft: 10, marginVertical: 5 }}>
    <Text style={{ fontSize: 16, marginRight: 8 }}>{title}: </Text>
    <Text style={{ flex: 1 }}>{info}</Text>
  </View>
);

const productCategories = [
  { label: 'All', value: 'all' },
  { label: 'Books & Stationeries', value: 'c1' },
  { label: 'Clothes & Accessories', value: 'c2' },
  { label: 'Food', value: 'c3' },
  { label: 'Furniture', value: 'c4' },
  { label: 'Home & Living', value: 'c5' },
  { label: 'Kitchenware', value: 'c6' },
  { label: 'Toiletries', value: 'c7' },
  { label: 'Vehicles & Accessories ', value: 'c8' },
  { label: 'Others', value: 'c9' },
];

const RenderItem = ({ item }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      style={{ marginTop: 10, padding: 10 }}
      onPress={() => dispatch(getProductUserInfo(item))}
    >
      <Image
        source={{ uri: Object.values(item.productImages)[0].image_url }}
        style={{ height: 150, width: 150, borderRadius: 4 }}
      />
      <View
        style={{
          backgroundColor: 'rgba(52, 52, 52, 0.8)',
          height: 50,
          width: 150,
          position: 'absolute',
          left: 10,
          bottom: 0,
          borderBottomLeftRadius: 4,
          borderBottomRightRadius: 4,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 5,
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>{item.price}</Text>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          {item.sellType}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

RenderItem.propTypes = {
  item: PropTypes.object.isRequired,
};

function Home({ route, navigation }) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [data, setData] = useState([]);

  const {
    name,
    email,
    age,
    isLoading,
  } = useSelector((state) => ({
    name: state.userReducer.name,
    email: state.userReducer.email,
    age: state.userReducer.age,
    isLoading: state.userReducer.isLoading,
  }));

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      //while(true){
        //setTimeout(() => {
          let location = await Location.getCurrentPositionAsync({});
          console.log(location);
        //}, 5000);
      //}
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <AppBar />

      <View>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <ScrollView
          contentContainerStyle={{
            justifyContent: 'center',
            padding: 10,
          }}
        >
          <GeneralInfo title="Name" info={name} />
          <GeneralInfo title="Email" info={email} />
          <GeneralInfo title="Age" info={age} />

          <Text style={{ color: 'black' }}>You are being tracked</Text>
        </ScrollView>
      )}
      </View>
    </View>
  );
}

export default Home;
