import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';

import { RouteNames } from '@constants/route-names';

export type StackNavigatorParamList = {
    [RouteNames.HOME]: undefined;
    [RouteNames.PROFILE]:
        | {
              id?: string;
          }
        | undefined;
    [RouteNames.PNB]: undefined;
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
    StackNavigatorParamList,
    RouteNames.HOME
>;
export type HomeScreenRouteProp = RouteProp<
    StackNavigatorParamList,
    RouteNames.PROFILE
>;

export type ProfileScreenNavigationProp = NativeStackNavigationProp<
    StackNavigatorParamList,
    RouteNames.PROFILE
>;
export type ProfileScreenRouteProp = RouteProp<
    StackNavigatorParamList,
    RouteNames.PROFILE
>;

export type PnbScreenNavigationProp = NativeStackNavigationProp<
    StackNavigatorParamList,
    RouteNames.PNB
>;
export type PnbScreenRouteProp = RouteProp<
    StackNavigatorParamList,
    RouteNames.PNB
>;
