import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';

import { RouteNames } from '@constants/route-names';

export type StackNavigatorParamList = {
    [RouteNames.HOME]: undefined;
    [RouteNames.PNB]: undefined;
    [RouteNames.CHAT]: undefined;
};

export type NavigationProp = NativeStackNavigationProp<StackNavigatorParamList>;

export type HomeScreenNavigationProp = NativeStackNavigationProp<
    StackNavigatorParamList,
    RouteNames.HOME
>;
export type HomeScreenRouteProp = RouteProp<
    StackNavigatorParamList,
    RouteNames.HOME
>;

export type PnbScreenNavigationProp = NativeStackNavigationProp<
    StackNavigatorParamList,
    RouteNames.PNB
>;
export type PnbScreenRouteProp = RouteProp<
    StackNavigatorParamList,
    RouteNames.PNB
>;

export type ChatScreenNavigationProp = NativeStackNavigationProp<
    StackNavigatorParamList,
    RouteNames.CHAT
>;
export type ChatScreenRouteProp = RouteProp<
    StackNavigatorParamList,
    RouteNames.CHAT
>;
