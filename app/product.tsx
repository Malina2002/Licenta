// app/product.tsx
import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Button } from 'react-native';
import { useEffect, useState } from 'react';
import { classifyIngredients } from '../utils/ingredientCheck';

export default function ProductScreen() {
  const { code } = useLocalSearchParams<{ code: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [matchedDangerous, setMatchedDangerous] = useState<string[]>([]);
  const [matchedBorderline, setMatchedBorderline] = useState<string[]>([]);
  const [safetyStatus, setSafetyStatus] = useState<'safe' | 'borderline' | 'dangerous'>('safe');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://world.openbeautyfacts.org/api/v0/product/${code}.json`);
        const data = await response.json();

        if (data.product) {
          setProduct(data.product);

          if (data.product.ingredients_text) {
            const results = classifyIngredients(data.product.ingredients_text);
            setMatchedDangerous(results.dangerous);
            setMatchedBorderline(results.borderline);

            // Determinăm statusul produsului
            if (results.dangerous.length > 0) {
              setSafetyStatus('dangerous');
            } else if (results.borderline.length > 0) {
              setSafetyStatus('borderline');
            } else {
              setSafetyStatus('safe');
            }
          }
        }
      } catch (error) {
        console.error('Eroare la preluarea produsului:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [code]);

  if (loading) return <ActivityIndicator style={{ marginTop: 20 }} />;
  if (!product) return <Text>Produsul nu a fost găsit.</Text>;

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{product.product_name || 'Nume necunoscut'}</Text>
        <Text>Marcă: {product.brands || 'N/A'}</Text>
        <Text>Categorie: {product.categories || 'N/A'}</Text>
        <Text>Ingrediente brute:</Text>
        <Text>{product.ingredients_text || 'N/A'}</Text>

        {/* Status + explicație */}
        <View
          style={[
            styles.statusBox,
            safetyStatus === 'dangerous' && { backgroundColor: '#ffe5e5' },
            safetyStatus === 'borderline' && { backgroundColor: '#fff4e5' },
            safetyStatus === 'safe' && { backgroundColor: '#e7ffe5' },
          ]}
        >
          <Text style={styles.statusTitle}>
            Status:{" "}
            {safetyStatus === 'dangerous'
              ? '❌ Periculos'
              : safetyStatus === 'borderline'
              ? '⚠️ La limită'
              : '✅ Sigur'}
          </Text>
          <Text style={styles.statusText}>
            {safetyStatus === 'dangerous' &&
              'Acest produs conține unul sau mai multe ingrediente recunoscute ca fiind periculoase. Utilizarea frecventă poate cauza iritații sau efecte adverse pe termen lung.'}
            {safetyStatus === 'borderline' &&
              'Acest produs conține ingrediente care pot fi controversate sau iritante pentru unele tipuri de piele. A se folosi cu precauție.'}
            {safetyStatus === 'safe' &&
              'Produsul nu conține ingrediente considerate periculoase sau controversate. Este sigur pentru utilizare obișnuită.'}
          </Text>
        </View>

        {/* Ingrediente periculoase */}
        {matchedDangerous.length > 0 && (
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontWeight: 'bold', color: 'red' }}> Ingrediente periculoase:</Text>
            {matchedDangerous.map((ing, idx) => (
              <Text key={idx} style={{ color: 'red' }}>• {ing}</Text>
            ))}
          </View>
        )}

        {/* Ingrediente la limită */}
        {matchedBorderline.length > 0 && (
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontWeight: 'bold', color: 'orange' }}> Ingrediente la limită:</Text>
            {matchedBorderline.map((ing, idx) => (
              <Text key={idx} style={{ color: 'orange' }}>• {ing}</Text>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Butonul pentru scanare din nou */}
      <View style={{ padding: 20 }}>
        <Button title="Scanează alt produs" onPress={() => router.replace('/scan')} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statusBox: {
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
  },
  statusTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  statusText: {
    fontSize: 14,
    color: '#555',
  },
});
