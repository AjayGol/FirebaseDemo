import { StyleSheet } from 'react-native';
import { screenHeight, screenWidth } from '@/constants/Common';
import { Colors } from '@/constants/Colors';
const { icon, lightBlue, background, text } = Colors?.light;

export const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    commonTextInput: {
        height: 40,
        borderColor: icon,
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    signUpContainer: {
        backgroundColor: lightBlue,
        borderRadius: 8,
        marginBottom: 80,
    },
    signUpText: {
        fontSize: 16,
        color: background,
        fontWeight: '600',
        paddingHorizontal: 70,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        marginBottom: 80,
    },
    line: {
        width: '20%',
        height: 2,
        backgroundColor: lightBlue,
        marginHorizontal: 10,
    },
    textInputMainView: {
        width: screenWidth * 0.8,
    },
    text: {
        fontSize: 16,
        fontWeight: 'regular',
        color: text,
    },
    loginButtonContainer: {
        backgroundColor: lightBlue,
        borderRadius: 8,
        marginTop: 20,
    },
    createPostContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: screenHeight * 0.2,
    },
    createAccountContainer: {
        marginBottom: 40,
    },
    createAccountText: {
        fontSize: 35,
        color: lightBlue,
        fontWeight: 'bold',
        paddingHorizontal: 50,
        paddingVertical: 10,
        textAlign: 'center',
        justifyContent: 'center',
    },
    createAccountButton: {
        backgroundColor: lightBlue,
        borderRadius: 8,
        marginTop: 20
    },
    createAccountCta: {
        fontSize: 16,
        color: background,
        fontWeight: '600',
        paddingHorizontal: 70,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: screenHeight * 0.1,
    },
    newPostContainer: {
        borderWidth: 2,
        borderColor: lightBlue,
        marginBottom: screenHeight * 0.15,
        width: screenWidth - 20,
        alignSelf: 'center',
    },
    newPostInsideContainer: {
        borderWidth: 2,
        borderColor: lightBlue,
        marginBottom: 40,
        paddingBottom: 10,
        width: screenWidth * 0.83,
        alignSelf: 'center',
    },
    newPostText: {
        fontSize: 35,
        color: lightBlue,
        fontWeight: 'bold',
        paddingHorizontal: 50,
        paddingVertical: 10,
        textAlign: 'center',
        justifyContent: 'center',
    },
    newPostInsideText: {
        fontSize: 16,
        color: text,
        fontWeight: 'regular',
        paddingHorizontal: 15,
        paddingVertical: 5,
        textAlign: 'flex-start',
        justifyContent: 'center',
    },
    postAccountCta: {
        fontSize: 16,
        color: background,
        fontWeight: '600',
        paddingHorizontal: 70,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    postMessageButton: {
        backgroundColor: lightBlue,
        borderRadius: 8,
        marginTop: 5,
    },
});
