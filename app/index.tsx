import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Animated,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  Button,
  Provider as PaperProvider,
  Modal,
  Portal,
} from 'react-native-paper';
import { useRouter } from 'expo-router';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) router.replace('/login');
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleScanPress = () => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 0.97,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.push('/scan');
    });
  };

  const handleNavigation = (route: string) => {
    setMenuVisible(false);
    router.push(`/${route}`);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/login');
    } catch (error: any) {
      Alert.alert('Eroare la delogare', error.message);
    }
  };

  return (
    <PaperProvider>
      <ImageBackground
        source={require('../assets/splash-icon.png')}
        resizeMode="cover"
        style={styles.background}
      >
        <TouchableOpacity
          testID="menuBtn"
          onPress={() => setMenuVisible(true)}
          style={styles.menuButton}
        >
          <Ionicons name="menu" size={30} color="#ffffff" />
        </TouchableOpacity>

        <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
          <Text style={styles.title}>Welcome to</Text>
          <View style={styles.spacer} />
          <Animated.View style={{ transform: [{ scale: scaleAnim }], width: '80%' }}>
            <Button
              testID="scanButton"
              mode="contained"
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
              style={styles.button}
              onPress={handleScanPress}
            >
              Scan a Product
            </Button>
          </Animated.View>
        </Animated.View>

        <Portal>
          <Modal
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            contentContainerStyle={styles.drawerContainer}
          >
            <View style={styles.drawerItem}>
              <TouchableOpacity onPress={() => handleNavigation('profile')} style={styles.drawerItemRow}>
                <Ionicons name="person-outline" size={20} color="#fff" />
                <Text style={styles.drawerLabel}>Profile</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.drawerItem}>
              <TouchableOpacity onPress={() => handleNavigation('history')} style={styles.drawerItemRow}>
                <Ionicons name="time-outline" size={20} color="#fff" />
                <Text style={styles.drawerLabel}>History</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.drawerItem}>
              <TouchableOpacity onPress={() => handleNavigation('contact')} style={styles.drawerItemRow}>
                <Ionicons name="mail-outline" size={20} color="#fff" />
                <Text style={styles.drawerLabel}>Contact</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.drawerItem}>
              <TouchableOpacity
                onPress={handleLogout}
                style={styles.drawerItemRow}
                testID="logoutBtn"
              >
                <Ionicons name="log-out-outline" size={20} color="#fff" />
                <Text style={styles.drawerLabel}>Logout</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </Portal>
      </ImageBackground>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#5E3A2F',
    marginTop: 50,
    textAlign: 'center',
  },
  spacer: {
    flex: 1,
  },
  button: {
    borderRadius: 10,
    backgroundColor: '#B07F6D',
    alignSelf: 'center',
  },
  buttonContent: {
    paddingVertical: 10,
  },
  buttonLabel: {
    fontSize: 16,
    color: 'white',
  },
  menuButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 8,
    borderRadius: 20,
  },
  drawerContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: '65%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    paddingTop: 60,
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
  },
  drawerItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  drawerItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerLabel: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
});
