import { useEffect, useState } from 'react';
import { auth } from '@utils/firebase';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@appTypes/router';
import { RouteNames } from '@constants/route-names';
import firebase from 'firebase/compat';

export const useAuthWatcher = () => {
    const navigation = useNavigation<NavigationProp>();

    const [currentUser, setCurrentUser] =
        useState<Partial<firebase.User> | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);

            if (user) {
                navigation.navigate(RouteNames.PNB);
            } else {
                navigation.navigate(RouteNames.HOME);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return { currentUser };
};
