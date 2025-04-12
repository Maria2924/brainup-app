import {Alert, Platform, ToastAndroid} from "react-native";

export const toast = (title: string, text: string) => {
    if (Platform.OS === "android") {
        ToastAndroid.show(text, ToastAndroid.LONG)
    } else {
        Alert.alert(title, text)
    }
}
