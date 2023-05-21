import { useState } from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    Button,
    View,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import TextField from '@components/TextField';

import { HomeScreenNavigationProp } from '@appTypes/router';

import { RouteNames } from '@constants/route-names';
import { signInUser, signUpUser } from '@utils/firebase';

const HomeScreen = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleInputEmail = (value: string) => {
        setEmail(value);
    };

    const handleInputPassword = (value: string) => {
        setPassword(value);
    };

    const handlePress = () => {
        navigation.navigate(RouteNames.PROFILE, { id: '42' });
    };

    const handleSignup = async () => {
        try {
            setIsLoading(true);
            const signedUpUser = await signUpUser(email, password);
            console.log('signedUpUser: ', signedUpUser.user);
        } catch (err) {
            Alert.alert('Error', 'Sign Up Failed');
            console.log('err: ', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignin = async () => {
        try {
            setIsLoading(true);
            const signedInUser = await signInUser(email, password);
            console.log('signedInUser: ', signedInUser.user);
        } catch (err) {
            Alert.alert('Error', 'Sign In Failed');
            console.log(' err: ', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <TextField
                nativeID="email"
                onChangeText={handleInputEmail}
                value={email}
                placeholder="Email"
            />
            <TextField
                secureTextEntry={true}
                nativeID="password"
                onChangeText={handleInputPassword}
                value={password}
                placeholder="Passowrd"
            />
            <View style={styles.button}>
                <Button
                    title="Login"
                    onPress={handleSignin}
                    disabled={isLoading}
                />
            </View>
            <View style={styles.button}>
                <Button
                    title="Register"
                    onPress={handleSignup}
                    disabled={isLoading}
                />
            </View>
            <StatusBar style="auto" />
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        paddingTop: 10,
        display: 'flex',
        alignItems: 'stretch',
        width: '90%',
    },
});

export default HomeScreen;
