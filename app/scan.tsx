// ScanScreen - pages/scan.tsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter, useFocusEffect } from 'expo-router';
import { Button, ActivityIndicator, Text as PaperText } from 'react-native-paper';

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [barcode, setBarcode] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setScanned(false);
      setBarcode(null);
    }, [])
  );

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    setBarcode(data);
    router.push(`/product?code=${data}`);
  };

  if (!permission?.granted) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator animating={true} size="large" color="#B07F6D" />
        <PaperText style={styles.text}>Se cere permisiunea pentru cameră...</PaperText>
      </View>
    );
  }

  return (
    <View style={styles.container} testID="scanScreen">
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr', 'ean13', 'ean8', 'upc_a', 'upc_e'],
        }}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <View style={styles.overlay}>
          <Button
            mode="contained"
            onPress={() => setScanned(false)}
            style={styles.button}
            labelStyle={styles.buttonLabel}
            contentStyle={styles.buttonContent}
          >
            Rescan
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: '#5E3A2F',
    textAlign: 'center',
  },
  overlay: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 16,
  },
  button: {
    backgroundColor: '#B07F6D',
    borderRadius: 10,
  },
  buttonContent: {
    paddingVertical: 6,
    paddingHorizontal: 20,
  },
  buttonLabel: {
    color: 'white',
    fontSize: 16,
  },
});
