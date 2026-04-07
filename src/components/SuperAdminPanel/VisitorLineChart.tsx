import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';

import { LineChart } from 'react-native-gifted-charts';

// ================= TYPES =================

interface DataPoint {
  label: string;
  count: number;
}

interface Props {
  data: any; // ✅ accept raw API response
  viewMode: 'hourly' | 'daily' | 'monthly';
}

// ================= COMPONENT =================

const VisitorLineChart: React.FC<Props> = ({ data, viewMode }) => {

  // ================= NORMALIZE DATA =================
  const normalizedData: DataPoint[] = useMemo(() => {

    if (!data) return [];

    // ✅ handle all API shapes
    const raw =
      Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.data?.data)
        ? data.data.data
        : [];

    return raw.map((item: any) => ({
      label: item.label || item.date || '',
      count: item.count ?? item.value ?? 0,
    }));

  }, [data]);

  // ================= FILTER (HOURLY) =================
  const processedData = useMemo(() => {
    if (viewMode !== 'hourly') return normalizedData;

    return normalizedData.filter(item => {
      const hour = parseInt(item.label.split(':')[0], 10);
      return hour >= 9 && hour <= 18;
    });
  }, [normalizedData, viewMode]);

  // ================= TITLE =================
  const titleMap = {
    hourly: 'Hourly Trends (9AM - 6PM)',
    daily: 'Daily Trends',
    monthly: 'Monthly Trends',
  };

  // ================= CHART DATA =================
  const chartData = useMemo(() => {
    return processedData.map(item => ({
      value: item.count,
      label: item.label,
    }));
  }, [processedData]);

  // ================= EMPTY STATE =================
  if (!processedData.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{titleMap[viewMode]}</Text>
        <Text style={styles.noData}>
          No {viewMode} data available
        </Text>
      </View>
    );
  }

  // ================= CALCULATIONS =================
  const spacing = 70;
  const chartWidth = processedData.length * spacing + 40;

  const maxValue = Math.max(...processedData.map(d => d.count), 1);

  // ================= UI =================
  return (
    <View style={styles.container}>

      <Text style={styles.title}>{titleMap[viewMode]}</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>

        <LineChart
          data={chartData}
          width={chartWidth}

          curved
          thickness={2}
          color="#4a90e2"

          areaChart
          startFillColor="#4a90e2"
          endFillColor="#ffffff00"

          initialSpacing={10}
          spacing={spacing}

          hideDataPoints={false}
          dataPointsColor="#4a90e2"

          yAxisTextStyle={{ color: '#555' }}
          xAxisLabelTextStyle={{ color: '#555', fontSize: 10 }}

          rulesColor="#e0e0e0"
          noOfSections={4}
          maxValue={maxValue}

          yAxisThickness={0}
          xAxisThickness={0}

          isAnimated

          pointerConfig={{
            pointerStripUptoDataPoint: true,
            pointerColor: '#4a90e2',
            radius: 6,
            pointerStripColor: '#4a90e2',

            pointerLabelComponent: (items: any) => {
              const item = items?.[0];
              if (!item) return null;

              return (
                <View style={styles.pointerLabel}>
                  <Text style={styles.pointerText}>
                    {item.label}: {item.value}
                  </Text>
                </View>
              );
            },
          }}
        />

      </ScrollView>

    </View>
  );
};

export default VisitorLineChart;

// ================= STYLES =================

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    elevation: 2,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },

  noData: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },

  pointerLabel: {
    position: 'absolute',
    top: -40,
    left: -20,
    backgroundColor: '#4a90e2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    width: 90,
  },

  pointerText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});
