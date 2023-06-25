import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';

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
import {View, TouchableOpacity, ScrollView} from 'react-native';

//Colors
const {brand, darkLight, tertiary} = Colors;

//Datetimepicker
import DateTimePicker from '@react-native-community/datetimepicker';

//import { InnerContainer } from '../components/styles';
const Signup = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date(2000, 0 , 1));

    //Actual date of birth to be sent
    const[dob, setDob] = useState();

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        setDob(currentDate);
    }

    const showDatePicker = () => {
        setShow(true);
    }

    const handleSignUp = (values, { resetForm }) => {
        const data = {
          username: values.fullName,
          email: values.email,
          password: values.password
        };
        
        axios.post('http://localhost:8000/user', data)
          .then(function(response) {
            console.log(response.data);
            Alert.alert('Success!', 'Welcome to dineder ' + response.data.username);
            resetForm(); 
            navigation.navigate('AvailTimeInput');
        })
        .catch(function(error) {
          console.error(error);
          Alert.alert('Error', 'Failed to sign up');
        });
    };

    return (
        <ScrollView>
            <StyledContainer>
                <StatusBar style= "dark" />
                <InnerContainer>
                    <PageTitle>Let's Dine!</PageTitle>
                    <SubTitle> Account Sign Up</SubTitle>
                    
                    {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode= 'date'
                        is24Hour={true}
                        display = "default"
                        onChange={onChange}
                    />
                    )}

                    <Formik
                        initialValues={{ fullName: '', email: '', dateOfBirth: '', password: '', confirmPassword: ''}}
                        onSubmit={handleSignUp}
                    >
                        {({handleChange, handleBlur, handleSubmit, values}) => <StyledFormArea>
                            <MyTextInput 
                                label="Full Name"
                                icon = "person"
                                placeholder = "Muhammad bin Trash"
                                placeholderTextColor = {darkLight}
                                onChangeText={handleChange('fullName')}
                                onBlur={handleBlur('fullName')}
                                value={values.fullName}
                            />

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
                                label="Date of Birth"
                                icon = "calendar"
                                placeholder = "DD - MM - YYYY"
                                placeholderTextColor = {darkLight}
                                onChangeText={handleChange('dateOfBirth')}
                                onBlur={handleBlur('dateOfBirth')}
                                value={dob ? dob.toDateString() : ''}
                                isDate = {true}
                                editable = {false}
                                showDatePicker = {showDatePicker}
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

                            <MyTextInput 
                                label="Confirm Password"
                                icon = "lock"
                                placeholder = "* * * * * * *"
                                placeholderTextColor = {darkLight}
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                value={values.confirmPassword}
                                secureTextEntry = {hidePassword}
                                isPassword = {true}
                                hidePassword = {hidePassword}
                                setHidePassword = {setHidePassword}
                                
                            />

                            <MsgBox>...</MsgBox>
                            <StyledButton onPress = {handleSubmit}>
                                <ButtonText>Sign Up</ButtonText>
                            </StyledButton>
                            <Line />
                            <Extraview>
                                <ExtraText>Already have an account? </ExtraText>
                                <TextLink onPress = {() => navigation.navigate('Login')}>
                                    <TextLinkContent>Login</TextLinkContent>
                                </TextLink>
                            </Extraview>
                            </StyledFormArea>}
                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </ScrollView>
    );
};

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, isDate, showDatePicker, ...props}) => {
    return (<View>
        <LeftIcon>
            <Octicons name={icon} size = {30} color = {tertiary} />
        </LeftIcon>
        <StyledInputLabel>{label}</StyledInputLabel>
        {!isDate && <StyledTextInput {...props} />}
        {isDate && (
            <TouchableOpacity onPress = {showDatePicker}>
                <StyledTextInput {...props} />
            </TouchableOpacity>
        )}
        {isPassword && (
            <RightIcon onPress = {() => setHidePassword(!hidePassword)}>
                <Ionicons name = {hidePassword ? 'md-eye-off' : 'md-eye'} size = {30} color = {darkLight} />
            </RightIcon>
        )}
    </View>);
    
};

export default Signup;