import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from "./screens/LoginPage";

const Stack = createNativeStackNavigator();
export function AuthNavigator() {
    return (
        <Stack.Navigator initialRouteName={"Login"} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={"Login"} component={LoginPage}></Stack.Screen>
        </Stack.Navigator>
    )
}
