// utils/historyStorage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export type HistoryProduct = {
  code: string;
  name: string;
  status: 'safe' | 'borderline' | 'dangerous';
  date: string;
};

export const saveProductToHistory = async (product: HistoryProduct) => {
  try {
    const existing = await AsyncStorage.getItem('history');
    const parsed: HistoryProduct[] = existing ? JSON.parse(existing) : [];

    // evităm duplicate
    const withoutDupes = parsed.filter(p => p.code !== product.code);

    // adăugăm produsul nou la început
    const updated = [product, ...withoutDupes].slice(0, 20); // max 20

    await AsyncStorage.setItem('history', JSON.stringify(updated));
  } catch (e) {
    console.error('Eroare salvare istoric:', e);
  }
};

export const getHistory = async (): Promise<HistoryProduct[]> => {
  try {
    const data = await AsyncStorage.getItem('history');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Eroare la citire istoric:', e);
    return [];
  }
};

export const deleteProductFromHistory = async (codeToDelete: string) => {
  try {
    const data = await AsyncStorage.getItem('history');
    const parsed: HistoryProduct[] = data ? JSON.parse(data) : [];

    const updated = parsed.filter(p => p.code !== codeToDelete);
    await AsyncStorage.setItem('history', JSON.stringify(updated));
  } catch (e) {
    console.error('Eroare la ștergerea produsului din istoric:', e);
  }
};