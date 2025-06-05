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
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace('/');
    } catch (error: any) {
      let message = 'Login failed. Please try again.';

      switch (error.code) {
        case 'auth/user-not-found':
          message = 'No user found with this email.';
          break;
        case 'auth/wrong-password':
          message = 'Incorrect password.';
          break;
        case 'auth/invalid-email':
          message = 'Invalid email address.';
          break;
        case 'auth/too-many-requests':
          message = 'Too many login attempts. Try again later.';
          break;
        default:
          message = error.message;
      }

      Alert.alert('Login Error', message);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/background2.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#ffffffcc"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#ffffffcc"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />

        {/* 🔧 testID adăugat aici */}
        <TouchableOpacity onPress={handleLogin} style={styles.button} testID="loginBtn">
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('/register')} style={styles.linkContainer}>
          <Text style={styles.link}>Don't have an account? Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/forgot-password')}>
          <Text style={styles.forgotPassword}>Forgot your password?</Text>
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
  },
  forgotPassword: {
    marginTop: 10,
    textAlign: 'center',
    color: '#ffdeeb',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
