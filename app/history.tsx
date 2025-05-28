// HistoryScreen - pages/history.tsx
import { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import {
  getHistory,
  deleteProductFromHistory,
  HistoryProduct,
} from '../utils/historyStorage';
import HistoryCard from './HistoryCard';

export default function HistoryScreen() {
  const [history, setHistory] = useState<HistoryProduct[]>([]);
  const router = useRouter();

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const data = await getHistory();
    setHistory(data);
  };

  const handleDelete = async (code: string) => {
    await deleteProductFromHistory(code);
    loadHistory();
  };

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <FlatList
          ListHeaderComponent={() => (
            <Text style={styles.title}>🧾 Scanned Product History</Text>
          )}
          data={history}
          keyExtractor={(item) => item.code}
          renderItem={({ item, index }) => (
            <HistoryCard
              item={item}
              index={index}
              onDelete={handleDelete}
            />
          )}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        />

        <TouchableOpacity onPress={() => router.push('/')} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    padding: 20,
    paddingBottom: Platform.OS === 'android' ? 40 : 60,
    backgroundColor: 'rgba(252, 238, 238, 0.6)',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#5E3A2F',
    marginBottom: 20,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#B07F6D',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 25,
    marginTop: 20,
    alignSelf: 'center',
  },
  backButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
  scrollContent: {
    paddingBottom: 120,
    paddingTop: 20,
  },
});
