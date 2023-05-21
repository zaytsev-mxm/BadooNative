import { useEffect, useState } from 'react';
import { auth } from '@utils/firebase';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '@appTypes/router';
import { RouteNames } from '@constants/route-names';
import firebase from 'firebase/compat';

export const useAuthWatcher = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();

    const [currentUser, setCurrentUser] =
        useState<Partial<firebase.User> | null>(null);

    useEffect(() => {
        const unsubscibe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);

            if (user?.email) {
                navigation.navigate(RouteNames.PNB);
            } else {
                navigation.navigate(RouteNames.HOME);
            }
        });

        return () => {
            unsubscibe();
        };
    }, []);

    return { currentUser };
};
