// app/product.tsx
import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { Button } from 'react-native';

export default function ProductScreen() {
  const { code } = useLocalSearchParams<{ code: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://world.openbeautyfacts.org/api/v0/product/${code}.json`);
        const data = await response.json();
        setProduct(data.product);
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
      <Text>Ingrediente: {product.ingredients_text || 'N/A'}</Text>
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
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  }
});
