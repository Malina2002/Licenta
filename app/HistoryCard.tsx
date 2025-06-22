import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Text, Button, Card, Badge } from 'react-native-paper';
import { HistoryProduct } from '../utils/historyStorage';
import { Ionicons } from '@expo/vector-icons';

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
        return <Badge style={styles.safeBadge}> Safe</Badge>;
      case 'borderline':
        return <Badge style={styles.borderlineBadge}> Borderline</Badge>;
      case 'dangerous':
        return <Badge style={styles.dangerousBadge}>Dangerous</Badge>;
      default:
        return <Badge>N/A</Badge>;
    }
  };

  const renderWarnings = () => {
    if (item.warning) {
      return <Text style={styles.warningText}>{item.warning}</Text>;
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
          <Text style={styles.name}>{item.name || 'Unnamed product'}</Text>
          <Text style={styles.code}>Barcode: {item.code}</Text>
          <View style={styles.badgeContainer}>{getStatusLabel(item.status)}</View>
          {renderWarnings()}
          <Text style={styles.date}>
            Scanned on: {new Date(item.date).toLocaleString()}
          </Text>
        </Card.Content>
        <Card.Actions style={styles.actions}>
          <Button
            mode="outlined"
            onPress={() => onDelete(item.code)}
            style={styles.deleteButton}
            labelStyle={styles.deleteLabel}
            icon={() => <Ionicons name="trash-outline" size={18} color="#8B3A3A" />}
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
    backgroundColor: '#FFF',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3B1F1F',
    marginBottom: 6,
    textAlign: 'center',
  },
  code: {
    fontSize: 14,
    color: '#5E504F',
    marginBottom: 6,
    textAlign: 'center',
  },
  badgeContainer: {
    marginVertical: 8,
    alignItems: 'center',
  },
  safeBadge: {
    backgroundColor: '#D1FAE5',
    color: '#065F46',
    borderRadius: 12,
    fontWeight: 'bold',
    fontSize: 13,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  borderlineBadge: {
    backgroundColor: '#FEF9C3',
    color: '#92400E',
    borderRadius: 12,
    fontWeight: 'bold',
    fontSize: 13,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  dangerousBadge: {
    backgroundColor: '#FECACA',
    color: '#7F1D1D',
    borderRadius: 12,
    fontWeight: 'bold',
    fontSize: 13,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  warningText: {
    fontSize: 13,
    color: '#B91C1C',
    marginTop: 4,
    marginBottom: 6,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  date: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  actions: {
    justifyContent: 'center',
    paddingTop: 10,
  },
  deleteButton: {
    borderColor: '#B07F6D',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 4,
    backgroundColor: '#FFF6F6',
  },
  deleteLabel: {
    color: '#8B3A3A',
    fontSize: 15,
    marginLeft: 6,
  },
});
