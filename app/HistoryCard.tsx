// HistoryCard - components/HistoryCard.tsx
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Text, Button, Card, Badge } from 'react-native-paper';
import { HistoryProduct } from '../utils/historyStorage';

type Props = {
  item: HistoryProduct;
  index: number;
  onDelete: (code: string) => Promise<void>;
};

export default function HistoryCard({ item, index, onDelete }: Props) {
  const slideAnim = useRef(new Animated.Value(40)).current;
  const itemOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.timing(itemOpacity, {
        toValue: 1,
        duration: 500,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'safe':
        return (
          <Badge style={{ backgroundColor: '#c7f5c4', color: '#2d6a2f' }}>
            ✅ Safe
          </Badge>
        );
      case 'borderline':
        return (
          <Badge style={{ backgroundColor: '#fff1c1', color: '#8a6d00' }}>
            ⚠️ Borderline
          </Badge>
        );
      case 'dangerous':
        return (
          <Badge style={{ backgroundColor: '#ffd1d1', color: '#a90000' }}>
            ❌ Dangerous
          </Badge>
        );
      default:
        return <Badge>N/A</Badge>;
    }
  };

  const renderWarnings = () => {
    if (item.warning) {
      return <Text style={styles.warning}>{item.warning}</Text>;
    }
    return null;
  };

  return (
    <Animated.View
      style={{
        opacity: itemOpacity,
        transform: [{ translateY: slideAnim }],
        marginBottom: 20,
      }}
    >
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.code}>Code: {item.code}</Text>
          <View style={styles.badge}>{getStatusLabel(item.status)}</View>
          {renderWarnings()}
          <Text style={styles.date}>{new Date(item.date).toLocaleString()}</Text>
        </Card.Content>
        <Card.Actions style={styles.actions}>
          <Button
            mode="outlined"
            onPress={() => onDelete(item.code)}
            style={styles.button}
            labelStyle={styles.buttonLabel}
          >
            Delete
          </Button>
        </Card.Actions>
      </Card>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    backgroundColor: 'rgba(252, 238, 238, 0.75)',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#f3caca',
    paddingBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#B07F6D',
    marginBottom: 6,
    textAlign: 'center',
  },
  code: {
    fontSize: 14,
    color: '#6a4e42',
    marginBottom: 6,
    textAlign: 'center',
  },
  badge: {
    marginVertical: 6,
    alignItems: 'center',
  },
  warning: {
    fontSize: 13,
    color: '#a90000',
    marginBottom: 6,
    textAlign: 'center',
  },
  date: {
    fontSize: 12,
    color: '#8e6e6e',
    textAlign: 'center',
  },
  actions: {
    justifyContent: 'center',
    paddingTop: 10,
  },
  button: {
    borderColor: '#B07F6D',
    borderWidth: 1.2,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  buttonLabel: {
    color: '#5E3A2F',
    fontSize: 15,
  },
});
