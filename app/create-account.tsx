import React, { useState } from 'react';
import {
    View,
    TextInput,
    Text,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import firebaseApp from '../firebase';
import screenNames from '@/components/navigation/ScreenNames';
import { styles } from './styled';

export default function CreateAccount() {
    const navigation = useNavigation();
    const {
        createPostContainer,
        commonTextInput,
        createAccountContainer,
        createAccountText,
        createAccountCta,
        createAccountButton,
    } = styles;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const onPressCreateAccount = async () => {
        try {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                Alert.alert('Invalid Email', 'Please enter a valid email address');
                return;
            }
            if (password !== confirmPassword) {
                Alert.alert("Passwords don't match");
                return;
            }

            const auth = getAuth(firebaseApp);
            await createUserWithEmailAndPassword(auth, email, password);
            navigation.navigate(screenNames.NewPost);
        } catch (error) {
            Alert.alert('Invalid Credential');
        }
    };

    return (
        <View style={createPostContainer}>
            <View style={createAccountContainer}>
                <Text style={createAccountText}>{'Create an account'}</Text>
            </View>
            <View style={styles.textInputMainView}>
                <TextInput
                    style={[commonTextInput, { marginBottom: 40 }]}
                    placeholder="Email"
                    placeholderTextColor="gray"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={commonTextInput}
                    placeholder="Password"
                    placeholderTextColor="gray"
                    value={password}
                    onChangeText={text => {
                        setPassword(text);
                    }}
                    secureTextEntry
                />
                <TextInput
                    style={commonTextInput}
                    placeholder="Confirm Password"
                    placeholderTextColor="gray"
                    value={confirmPassword}
                    onChangeText={text => {
                        setConfirmPassword(text);
                    }}
                    secureTextEntry
                />
            </View>

            <TouchableOpacity
                style={createAccountButton}
                onPress={onPressCreateAccount}>
                <Text style={createAccountCta}>{'Create Account'}</Text>
            </TouchableOpacity>
        </View>
    );
}
