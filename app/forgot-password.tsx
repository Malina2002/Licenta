import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleReset = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Success', 'Password reset email sent.');
      router.replace('/login');
    } catch (error: any) {
      let message = 'Something went wrong.';
      if (error.code === 'auth/user-not-found') {
        message = 'No user found with this email.';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Invalid email address.';
      }
      Alert.alert('Reset Error', message);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/background2.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Reset Password</Text>

        <TextInput
          placeholder="Enter your email"
          placeholderTextColor="#ffffffcc"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity
          onPress={handleReset}
          style={styles.button}
          testID="resetBtn" // 🔧 adăugat pentru test Cypress
        >
          <Text style={styles.buttonText}>Send Reset Link</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.replace('/login')}
          style={styles.linkContainer}
        >
          <Text style={styles.link}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 30,
    borderRadius: 20,
    margin: 20,
  },
  title: {
    fontSize: 30,
    color: '#fff',
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Roboto_700Bold',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 12,
    marginVertical: 10,
    color: 'white',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#D288A3',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 18,
  },
  linkContainer: {
    marginTop: 15,
  },
  link: {
    color: '#ffffffdd',
    textAlign: 'center',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
