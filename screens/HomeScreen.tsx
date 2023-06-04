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

import { signInUser, signUpUser, getTimeStamp } from '@utils/firebase';
import MessagesModel from '@models/messages';
import { Message } from '@models/messages/entity';

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
        const messagesModel = MessagesModel.getInstance();
        console.log('messagesModel: ', messagesModel);
        const mm = await messagesModel.get();
        console.log('mm: ', mm.docs);

        await messagesModel.set(
            new Message({
                message: 'hello darkness my old friend',
                fromUserId: String(mm.size + 1),
                toUserId: '222',
                dateTime: getTimeStamp(),
            })
        );

        const lastItem = await messagesModel.get(mm.docs[mm.size - 1].id);

        console.log('lastItem: ', lastItem);
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
