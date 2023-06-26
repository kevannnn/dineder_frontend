import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';

// formik
import {Formik} from 'formik';

//icons
import {Octicons, Ionicons} from '@expo/vector-icons';

import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    StyledButton,
    ButtonText,
    Colors,
    MsgBox,
    Line,
    ExtraText,
    Extraview,
    TextLink,
    TextLinkContent
} from '../components/styles'
import {View} from 'react-native';

//Colors
const {brand, darkLight, tertiary} = Colors;

//import { InnerContainer } from '../components/styles';
const Login = ({navigation}) => {
        const [hidePassword, setHidePassword] = useState(true);
    return (
        <StyledContainer>
            <StatusBar style= "dark" />
            <InnerContainer>
                <PageLogo resizeMode = "cover" source={require('./../assets/dineder.png')} />
                <PageTitle>Let's Dine!</PageTitle>
                <SubTitle> Account Login</SubTitle>
                <Formik
                    initialValues={{email: '', password: ''}}
                    onSubmit={(values) => {
                        console.log(values);
                    }}
                >
                    {({handleChange, handleBlur, handleSubmit, values}) => <StyledFormArea>
                        <MyTextInput 
                            label="Email Address"
                            icon = "mail"
                            placeholder = "e12345657@u.nus.edu"
                            placeholderTextColor = {darkLight}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            keyboardType="email-address"
                        />

                        <MyTextInput 
                            label="Password"
                            icon = "lock"
                            placeholder = "* * * * * * *"
                            placeholderTextColor = {darkLight}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry = {hidePassword}
                            isPassword = {true}
                            hidePassword = {hidePassword}
                            setHidePassword = {setHidePassword}
                            
                        />
                        <StyledButton onPress = {() => navigation.navigate('MealPreference')}>
                            <ButtonText>Login</ButtonText>
                        </StyledButton>
                        <Line />
                        <Extraview>
                            <ExtraText>Don't have an account already? </ExtraText>
                            <TextLink onPress = {() => navigation.navigate('Signup')}>
                                <TextLinkContent>Sign up</TextLinkContent>
                            </TextLink>
                        </Extraview>
                        </StyledFormArea>}
                </Formik>
            </InnerContainer>
        </StyledContainer>
    );
};

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
    return (<View>
        <LeftIcon>
            <Octicons name={icon} size = {30} color = {tertiary} />
        </LeftIcon>
        <StyledInputLabel>{label}</StyledInputLabel>
        <StyledTextInput {...props} />
        {isPassword && (
            <RightIcon onPress = {() => setHidePassword(!hidePassword)}>
                <Ionicons name = {hidePassword ? 'md-eye-off' : 'md-eye'} size = {30} color = {darkLight} />
            </RightIcon>
        )}
    </View>);
    
};

export default Login;