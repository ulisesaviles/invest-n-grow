import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key, value, isObject) => {
  try {
    if (isObject) {
      value = JSON.stringify(value);
    }
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const getData = async (key, isObject) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? (isObject ? JSON.parse(value) : value) : null;
  } catch (e) {
    console.log(e);
    return e;
  }
};
