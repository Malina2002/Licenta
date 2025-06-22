import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { HistoryProduct, getHistory, deleteProductFromHistory } from '../utils/historyStorage';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // ✅ nou

export default function HistoryScreen() {
  const [history, setHistory] = useState<HistoryProduct[]>([]);
  const router = useRouter();
  const insets = useSafeAreaInsets(); // ✅ nou

  useEffect(() => {
    const loadHistory = async () => {
      const saved = await getHistory();
      setHistory(saved);
    };
    loadHistory();
  }, []);

  const handleDelete = async (code: string) => {
    Alert.alert('Confirm Deletion', 'Are you sure you want to delete this product?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        onPress: async () => {
          await deleteProductFromHistory(code);
          const updated = await getHistory();
          setHistory(updated);
          Toast.show({
            type: 'success',
            text1: 'Product Deleted',
            text2: 'The product has been removed from your history.',
            visibilityTime: 2000,
          });
        },
        style: 'destructive',
      },
    ]);
  };

  const getCardStyle = (status: string) => {
    switch (status) {
      case 'safe':
        return styles.cardSafe;
      case 'borderline':
        return styles.cardBorderline;
      case 'dangerous':
        return styles.cardDangerous;
      default:
        return styles.cardDefault;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container} testID="historyScreen">
        <Text style={styles.header}>Scanned Products</Text>

        <View style={styles.scrollContainer}>
          <ScrollView contentContainerStyle={styles.scroll}>
            {history.length > 0 ? (
              history.map((item, index) => (
                <View
                  key={index}
                  style={[styles.cardBase, getCardStyle(item.status)]}
                  testID="historyItem"
                >
                  <View style={styles.cardText}>
                    <Text style={styles.title}>{item.name || 'Unnamed Product'}</Text>
                    <Text style={styles.subtitle}>Barcode: {item.code}</Text>
                    <Text style={styles.subtitle}>Status: {item.status}</Text>
                  </View>
                  <TouchableOpacity onPress={() => handleDelete(item.code)}>
                    <Ionicons name="trash-outline" size={24} color="#b91c1c" />
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>No products scanned yet.</Text>
            )}
          </ScrollView>
        </View>

        {/* ✅ Buton ridicat peste bara sistem */}
        <TouchableOpacity
          style={[styles.button, { bottom: insets.bottom + 16 }]}
          onPress={() => router.replace('/')}
          testID="backToHomeBtn"
        >
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>

      <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FDF6F2',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    color: '#4A2F27',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 90, // rezervăm spațiu pentru buton
  },
  scroll: {
    paddingBottom: 20,
  },
  cardBase: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cardSafe: {
    backgroundColor: '#DCFCE7',
  },
  cardBorderline: {
    backgroundColor: '#FEF9C3',
  },
  cardDangerous: {
    backgroundColor: '#FECACA',
  },
  cardDefault: {
    backgroundColor: '#E5E7EB',
  },
  cardText: {
    flex: 1,
    paddingRight: 10,
  },
  title: {
    fontWeight: '600',
    fontSize: 17,
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 14,
    color: '#4B5563',
    marginTop: 2,
  },
  emptyText: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 16,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  button: {
    position: 'absolute',
    left: 20,
    right: 20,
    backgroundColor: '#B07F6D',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
