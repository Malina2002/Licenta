import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { getHistory, deleteProductFromHistory, HistoryProduct } from '../utils/historyStorage';

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
    loadHistory(); // reîncarcă lista fără produsul șters
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'safe': return '✅ safe';
      case 'borderline': return '⚠️ borderline';
      case 'dangerous': return '❌ dangerous';
      default: return 'N/A';
    }
  };

  const renderItem = ({ item }: { item: HistoryProduct }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text>Cod: {item.code}</Text>
      <Text>Status: {getStatusLabel(item.status)}</Text>
      <Text style={styles.date}>{new Date(item.date).toLocaleString()}</Text>
      <Button title="Șterge" onPress={() => handleDelete(item.code)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🕒 Istoric produse scanate</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.code}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  item: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  name: { fontWeight: 'bold', fontSize: 16 },
  date: { fontSize: 12, color: '#555' },
});
