import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { HistoryProduct, getHistory } from '../utils/historyStorage';

export default function HistoryScreen() {
  const [history, setHistory] = useState<HistoryProduct[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadHistory = async () => {
      const saved = await getHistory();
      setHistory(saved);
    };
    loadHistory();
  }, []);

  return (
    <View style={styles.container} testID="historyScreen">
      <ScrollView contentContainerStyle={styles.scroll}>
        {history.length > 0 ? (
          history.map((item, index) => (
            <View key={index} style={styles.card} testID="historyItem">
              <Text style={styles.title}>{item.name || 'Produs fără nume'}</Text>
              <Text style={styles.subtitle}>Cod: {item.code}</Text>
              <Text style={styles.subtitle}>Status: {item.status}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>Nu există produse scanate</Text>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace('/')}
        testID="backToHomeBtn"
      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF1ED',
    padding: 20,
  },
  scroll: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFE5DC',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#5E3A2F',
  },
  subtitle: {
    fontSize: 14,
    color: '#8B5E3C',
  },
  emptyText: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 16,
    color: '#8B5E3C',
  },
  button: {
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: '#B07F6D',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
