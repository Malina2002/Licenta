import { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { Text } from 'react-native-paper';
import {
  getHistory,
  deleteProductFromHistory,
  HistoryProduct,
} from '../utils/historyStorage';
import HistoryCard from './HistoryCard'; // ← corectat aici

export default function HistoryScreen() {
  const [history, setHistory] = useState<HistoryProduct[]>([]);

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
        <Text style={styles.title}>🕒 Istoric produse scanate</Text>
        <FlatList
          data={history}
          keyExtractor={(item) => item.code}
          renderItem={({ item, index }) => (
            <HistoryCard
              item={item}
              index={index}
              onDelete={handleDelete}
            />
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
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
    backgroundColor: 'rgba(252, 238, 238, 0.6)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5E3A2F',
    marginBottom: 15,
  },
});
