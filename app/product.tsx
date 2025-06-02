//product
import { router, useLocalSearchParams } from 'expo-router';
import { View, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { useEffect, useState } from 'react';
import { Text, Button, ActivityIndicator, Card, Divider } from 'react-native-paper';
import { classifyIngredients } from '../utils/ingredientCheck';
import { saveProductToHistory } from '../utils/historyStorage';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export default function ProductScreen() {
  const { code } = useLocalSearchParams<{ code: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [matchedDangerous, setMatchedDangerous] = useState<string[]>([]);
  const [matchedBorderline, setMatchedBorderline] = useState<string[]>([]);
  const [matchedAllergens, setMatchedAllergens] = useState<string[]>([]);
  const [warningText, setWarningText] = useState('');
  const [safetyStatus, setSafetyStatus] = useState<'safe' | 'borderline' | 'dangerous'>('safe');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://world.openbeautyfacts.org/api/v0/product/${code}.json`);
        const data = await response.json();

        if (!data.product || !data.product.ingredients_text) {
          alert('We did not find any useful data for this product..');
          router.replace('/');
          return;
        }

        setProduct(data.product);

        // Fetch user allergies
        const user = auth.currentUser;
        let userAllergies: string[] = [];
        if (user) {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            userAllergies = userData.allergies || [];
          }
        }

        const results = classifyIngredients(data.product.ingredients_text, userAllergies);
        setMatchedDangerous(results.dangerous);
        setMatchedBorderline(results.borderline);
        setMatchedAllergens(results.allergens);

        let status: 'safe' | 'borderline' | 'dangerous' = 'safe';
        let warning = '';

        if (results.dangerous.length > 0) {
          status = 'dangerous';
        } else if (results.borderline.length > 0) {
          status = 'borderline';
        }

        if (results.allergens.length > 0) {
          warning = `⚠️ Allergens detected: ${results.allergens.join(', ')}`;
        }

        setSafetyStatus(status);
        setWarningText(warning);

        await saveProductToHistory({
          code: code!,
          name: data.product.product_name || 'Necunoscut',
          status: status,
          date: new Date().toISOString(),
          allergens: results.allergens,
          warning: warning,
        });

      } catch (error) {
        console.error('Eroare:', error);
        alert('A apărut o problemă.');
        router.replace('/');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [code]);

  if (loading) return <ActivityIndicator animating={true} style={{ marginTop: 50 }} color="#B07F6D" />;
  if (!product) return null;

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>{product.product_name || 'Unknown Product'}</Text>
        <Text style={styles.label}>Brand: <Text style={styles.value}>{product.brands || 'N/A'}</Text></Text>
        <Text style={styles.label}>Category: <Text style={styles.value}>{product.categories || 'N/A'}</Text></Text>

        <Divider style={{ marginVertical: 15 }} />

        <Text style={styles.sectionTitle}>Ingredients</Text>
        <Text style={styles.ingredients}>{product.ingredients_text || 'N/A'}</Text>

        <Card style={[styles.statusBox, statusColors[safetyStatus]]}>
          <Card.Content>
            <Text style={styles.statusTitle}>
              {safetyStatus === 'dangerous'
                ? '❌ Dangerous'
                : safetyStatus === 'borderline'
                ? '⚠️ Borderline'
                : '✅ Safe'}
            </Text>
            <Text style={styles.statusText}>
              {safetyStatus === 'dangerous' &&
                'This product contains one or more ingredients known to be hazardous.'}
              {safetyStatus === 'borderline' &&
                'This product contains ingredients that may be controversial or irritating.'}
              {safetyStatus === 'safe' &&
                'This product does not contain any hazardous or controversial ingredients.'}
            </Text>
            {warningText && <Text style={styles.warningText}>{warningText}</Text>}
          </Card.Content>
        </Card>

        {matchedDangerous.length > 0 && (
          <View style={styles.listContainer}>
            <Text style={styles.dangerTitle}>Dangerous ingredients:</Text>
            {matchedDangerous.map((ing, idx) => (
              <Text key={idx} style={styles.dangerItem}>• {ing}</Text>
            ))}
          </View>
        )}

        {matchedBorderline.length > 0 && (
          <View style={styles.listContainer}>
            <Text style={styles.borderlineTitle}>Borderline ingredients:</Text>
            {matchedBorderline.map((ing, idx) => (
              <Text key={idx} style={styles.borderlineItem}>• {ing}</Text>
            ))}
          </View>
        )}

        {matchedAllergens.length > 0 && (
          <View style={styles.listContainer}>
            <Text style={styles.allergenTitle}>Allergens detected:</Text>
            {matchedAllergens.map((all, idx) => (
              <Text key={idx} style={styles.allergenItem}>• {all}</Text>
            ))}
          </View>
        )}

        <View style={styles.footer}>
          <Button
            mode="outlined"
            onPress={() => router.replace('/scan')}
            style={styles.footerButton}
            labelStyle={{ color: '#B07F6D' }}
          >
            Scan another product
          </Button>
          <Button
            mode="contained"
            onPress={() => router.push('/history')}
            style={[styles.footerButton, styles.historyButton]}
            labelStyle={{ color: '#fff' }}
          >
            Vezi istoric
          </Button>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const statusColors = {
  dangerous: { backgroundColor: '#ffe5e5' },
  borderline: { backgroundColor: '#fff4e5' },
  safe: { backgroundColor: '#e7ffe5' },
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 16,
    margin: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5E3A2F',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7A4E3B',
  },
  value: {
    fontWeight: '400',
    color: '#444',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    color: '#B07F6D',
  },
  ingredients: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  statusBox: {
    marginTop: 20,
    borderRadius: 12,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#5E3A2F',
  },
  statusText: {
    fontSize: 14,
    color: '#555',
  },
  warningText: {
    fontSize: 14,
    color: 'darkred',
    marginTop: 10,
    fontWeight: '600',
  },
  listContainer: {
    marginTop: 20,
  },
  dangerTitle: {
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 5,
  },
  dangerItem: {
    color: 'red',
  },
  borderlineTitle: {
    fontWeight: 'bold',
    color: 'orange',
    marginBottom: 5,
  },
  borderlineItem: {
    color: 'orange',
  },
  allergenTitle: {
    fontWeight: 'bold',
    color: 'purple',
    marginBottom: 5,
  },
  allergenItem: {
    color: 'purple',
  },
  footer: {
    marginTop: 30,
    paddingBottom: 40,
  },
  footerButton: {
    marginVertical: 6,
    borderRadius: 10,
  },
  historyButton: {
    backgroundColor: '#B07F6D',
  },
});
