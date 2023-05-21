import { RouteNames } from '@constants/route-names';
import HomeScreen from '@screens/HomeScreen';
import PeopleNearbyScreen from '@screens/PeopleNearbyScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigatorParamList } from '@appTypes/router';
import { useAuthWatcher } from '@hooks/use-auth-watcher';

const Stack = createNativeStackNavigator<StackNavigatorParamList>();

const Entry = () => {
    const { currentUser } = useAuthWatcher();

    return (
        <>
            <Stack.Navigator>
                <Stack.Screen
                    name={RouteNames.HOME}
                    component={HomeScreen}
                    options={{ title: 'Login' }}
                />
                <Stack.Screen
                    name={RouteNames.PNB}
                    component={PeopleNearbyScreen}
                    options={{ title: `Hello, ${currentUser?.email}!` }}
                />
            </Stack.Navigator>
        </>
    );
};

export default Entry;
