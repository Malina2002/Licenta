import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
  ScrollView,
  Platform,
} from 'react-native';

export default function ContactScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSend = () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    Alert.alert('Message Sent', 'We will get back to you soon!');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <ImageBackground source={require('../assets/background2.jpg')} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.overlay} testID="contactScreen">
          <Text style={styles.title}>Contact Us</Text>

          <TextInput
            testID="contactNameInput"
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#ffffffcc"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            testID="contactEmailInput"
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#ffffffcc"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <TextInput
            testID="contactMessageInput"
            style={[styles.input, styles.textarea]}
            placeholder="Your message"
            placeholderTextColor="#ffffffcc"
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={4}
          />

          <TouchableOpacity
            testID="contactSendButton"
            style={styles.button}
            onPress={handleSend}
          >
            <Text style={styles.buttonText}>Send Message</Text>
          </TouchableOpacity>

          <Text testID="contactText" style={styles.contactInfo}>
            📧 support@beautyscan.com
          </Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  overlay: {
    width: '100%',
    maxWidth: 400,
    padding: 30,
    paddingBottom: Platform.OS === 'android' ? 40 : 60,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    color: 'white',
    fontSize: 16,
  },
  textarea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#D288A3',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 18,
  },
  contactInfo: {
    textAlign: 'center',
    color: 'white',
    marginTop: 15,
    fontSize: 16,
  },
});
