import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { auth, db } from '../firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export default function ProfileScreen() {
  const [username, setUsername] = useState('');
  const [allergies, setAllergies] = useState<string[]>([]);
  const [newAllergy, setNewAllergy] = useState('');
  const router = useRouter();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      setUsername(data.username || '');
      setAllergies(data.allergies || []);
    }
  };

  const handleSave = async () => {
    if (!username.trim()) {
      Alert.alert('Error', 'Username cannot be empty.');
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Not logged in');
      return;
    }

    try {
      await setDoc(doc(db, 'users', user.uid), {
        username,
        allergies,
      });
      Alert.alert('Profile updated!');
    } catch (error) {
      Alert.alert('Error', 'Could not save profile');
    }
  };

  const handleAddAllergy = () => {
    const trimmed = newAllergy.trim();
    if (trimmed && !allergies.includes(trimmed)) {
      setAllergies([...allergies, trimmed]);
      setNewAllergy('');
    }
  };

  return (
    <ImageBackground source={require('../assets/background2.jpg')} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.overlay}>
          <Text style={styles.title}>User Profile</Text>

          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#ffffffcc"
            value={username}
            onChangeText={setUsername}
          />

          <Text style={styles.subtitle}>Known Allergies:</Text>
          <View style={styles.allergyList}>
            {allergies.map((item, index) => (
              <Text key={index} style={styles.listItem}>• {item}</Text>
            ))}
          </View>

          <TextInput
            style={styles.input}
            placeholder="Add new allergy"
            placeholderTextColor="#ffffffcc"
            value={newAllergy}
            onChangeText={setNewAllergy}
          />

          <TouchableOpacity onPress={handleAddAllergy} style={styles.addButton}>
            <Text style={styles.buttonText}>Add Allergy</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSave} style={styles.button}>
            <Text style={styles.buttonText}>Save Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/')} style={styles.backButton}>
            <Text style={styles.buttonText}>Back to Home</Text>
          </TouchableOpacity>
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
  subtitle: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    color: 'white',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#D288A3',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  addButton: {
    backgroundColor: '#aa6e88',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  backButton: {
    backgroundColor: '#6e6e6e',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 18,
  },
  listItem: {
    color: 'white',
    fontSize: 16,
    marginBottom: 4,
  },
  allergyList: {
    marginBottom: 10,
  },
});
