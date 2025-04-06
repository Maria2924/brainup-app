import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from "./screens/LoginPage";
import RegisterPage from "./screens/RegisterPage";
import {RootStackParamList} from "../types";

const Stack = createNativeStackNavigator<RootStackParamList>();
export function AuthNavigator() {
    return (
        <Stack.Navigator initialRouteName={"Login"} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={"Login"} component={LoginPage}></Stack.Screen>
            <Stack.Screen name={"Register"} component={RegisterPage}></Stack.Screen>
        </Stack.Navigator>
    )
}
