import { useState } from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    Button,
    View,
    Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import TextField from '@components/TextField';

import { signInUser, signUpUser } from '@utils/firebase';
import Messages from '@models/messages';

const HomeScreen = () => {
    const [email, setEmail] = useState('test@test.com');
    const [password, setPassword] = useState('testtest');
    const [isLoading, setIsLoading] = useState(false);

    const handleInputEmail = (value: string) => {
        setEmail(value);
    };

    const handleInputPassword = (value: string) => {
        setPassword(value);
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

    const handlePromise = async () => {
        const mm = await Messages.getInstance().get();
        console.log('mm: ', mm);
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View style={styles.field}>
                <TextField
                    nativeID="email"
                    onChangeText={handleInputEmail}
                    value={email}
                    placeholder="Email"
                />
            </View>
            <View style={styles.field}>
                <TextField
                    secureTextEntry={true}
                    nativeID="password"
                    onChangeText={handleInputPassword}
                    value={password}
                    placeholder="Passowrd"
                />
            </View>
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
            <View style={styles.button}>
                <Button title="Promise" onPress={handlePromise} />
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
    field: {
        display: 'flex',
        alignItems: 'stretch',
        width: '90%',
    },
    button: {
        paddingTop: 10,
        display: 'flex',
        alignItems: 'stretch',
        width: '90%',
    },
});

export default HomeScreen;
