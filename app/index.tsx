import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, ImageBackground, Animated, Platform, Pressable } from 'react-native';
import { Text, Button, Provider as PaperProvider } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

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
      })
    ]).start(() => {
      router.push('/scan');
    });
  };

  return (
    <PaperProvider>
      <ImageBackground
        source={require('../assets/splash-icon.png')}
        resizeMode="cover"
        style={styles.background}
      >
        <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
          <Text style={styles.title}>Welcome to</Text>
          <View style={styles.spacer} />
          <Animated.View style={{ transform: [{ scale: scaleAnim }], width: '80%' }}>
            <Button
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
      </ImageBackground>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
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
});
