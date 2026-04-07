// import React, { useMemo } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { PieChart } from 'react-native-gifted-charts';

// type Props = {
//   data: any;
// };

// const VisitorPieChart = ({ data }: Props) => {

//   // =========================
//   // 🧠 NORMALIZE API DATA
//   // =========================
//   const apiData = useMemo(() => {

//     if (!data) return [];

//     if (Array.isArray(data)) return data;

//     if (Array.isArray(data?.data)) return data.data;

//     if (Array.isArray(data?.data?.data)) return data.data.data;

//     if (Array.isArray(data?.response)) return data.response;

//     // 🔥 object → array
//     if (typeof data?.data === 'object') {
//       return Object.keys(data.data).map(key => ({
//         purpose: key,
//         count: data.data[key],
//       }));
//     }

//     if (typeof data === 'object') {
//       return Object.keys(data).map(key => ({
//         purpose: key,
//         count: data[key],
//       }));
//     }

//     return [];

//   }, [data]);

//   // =========================
//   // 🔢 TOTAL
//   // =========================
//   const total = useMemo(() => {
//     return apiData.reduce(
//       (sum: number, item: any) =>
//         sum + (item?.count ?? item?.total ?? item?.value ?? 0),
//       0
//     );
//   }, [apiData]);

//   // =========================
//   // 🎨 COLORS
//   // =========================
//   const colors = [
//     '#f45b78',
//     '#3f8ec4',
//     '#f2c04c',
//     '#4CAF50',
//     '#9C27B0',
//     '#FF9800',
//   ];

//   // =========================
//   // 🎯 CHART DATA
//   // =========================
//   const chartData = useMemo(() => {

//     if (!Array.isArray(apiData)) return [];

//     return apiData.map((item: any, index: number) => {
//       const value =
//         item?.count ??
//         item?.total ??
//         item?.value ??
//         0;

//       return {
//         value,
//         color: colors[index % colors.length],

//         text:
//           total > 0
//             ? `${Math.round((value / total) * 100)}%`
//             : '',

//         label:
//           item?.purpose ??
//           item?._id ??
//           item?.type ??
//           'Unknown',
//       };
//     });

//   }, [apiData, total]);

//   // =========================
//   // ❌ EMPTY STATE
//   // =========================
//   if (!Array.isArray(chartData) || chartData.length === 0 || total === 0) {
//     return (
//       <View style={styles.card}>
//         <Text style={styles.emptyText}>
//           No data available
//         </Text>
//       </View>
//     );
//   }

//   // =========================
//   // ✅ RENDER
//   // =========================
//   return (
//     <View style={styles.card}>

//       <View style={styles.row}>

//         {/* LEGEND */}
//         <View style={styles.legend}>
//           {Array.isArray(chartData) &&
//             chartData.map((item, index) => (
//               <View key={index} style={styles.legendRow}>
//                 <View
//                   style={[styles.dot, { backgroundColor: item.color }]}
//                 />
//                 <Text style={styles.legendText}>
//                   {item.label}
//                 </Text>
//               </View>
//             ))}
//         </View>

//         {/* PIE CHART */}
//         <PieChart
//           data={chartData}

//           donut
          

//           radius={100}
//           innerRadius={55}

//           showText
//           textColor="#fff"
//           textSize={15}
        

//           isAnimated
//           animationDuration={800}

         

//           focusOnPress

          
//         />

//       </View>

//     </View>
//   );
// };

// export default VisitorPieChart;


// // =========================
// // 🎨 STYLES
// // =========================

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 15,
//     padding: 20,
//     marginTop: 15,
//     elevation: 5,
//   },

//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },

//   legend: {
//     flex: 1,
//     justifyContent: 'center',
//   },

//   legendRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },

//   dot: {
//     width: 14,
//     height: 14,
//     borderRadius: 4,
//     marginRight: 10,
//   },

//   legendText: {
//     fontSize: 14,
//     flexShrink: 1,
//   },

//   emptyText: {
//     textAlign: 'center',
//     color: '#95ccf1',
//   },
// });

import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

type Props = {
  data: any;
  branch: string; // ✅ added
};

const VisitorPieChart = ({ data, branch }: Props) => {

  // =========================
  // 🧠 NORMALIZE API DATA
  // =========================
  const apiData = useMemo(() => {

    if (!data) return [];

    if (Array.isArray(data)) return data;

    if (Array.isArray(data?.data)) return data.data;

    if (Array.isArray(data?.data?.data)) return data.data.data;

    if (Array.isArray(data?.response)) return data.response;

    if (typeof data?.data === 'object') {
      return Object.keys(data.data).map(key => ({
        purpose: key,
        count: data.data[key],
      }));
    }

    if (typeof data === 'object') {
      return Object.keys(data).map(key => ({
        purpose: key,
        count: data[key],
      }));
    }

    return [];

  }, [data, branch]); // ✅ branch added

  // =========================
  // 🔢 TOTAL
  // =========================
  const total = useMemo(() => {
    return apiData.reduce(
      (sum: number, item: any) =>
        sum + (item?.count ?? item?.total ?? item?.value ?? 0),
      0
    );
  }, [apiData, branch]); // ✅ branch added

  // =========================
  // 🎨 COLORS
  // =========================
  const colors = [
    '#f45b78',
    '#3f8ec4',
    '#f2c04c',
    '#4CAF50',
    '#9C27B0',
    '#FF9800',
  ];

  // =========================
  // 🎯 CHART DATA
  // =========================
  const chartData = useMemo(() => {

    if (!Array.isArray(apiData)) return [];

    return apiData.map((item: any, index: number) => {
      const value =
        item?.count ??
        item?.total ??
        item?.value ??
        0;

      return {
        value,
        color: colors[index % colors.length],

        text:
          total > 0
            ? `${Math.round((value / total) * 100)}%`
            : '',

        label:
          item?.purpose ??
          item?._id ??
          item?.type ??
          'Unknown',
      };
    });

  }, [apiData, total, branch]); // ✅ branch added

  // =========================
  // ❌ EMPTY STATE
  // =========================
  if (!Array.isArray(chartData) || chartData.length === 0 || total === 0) {
    return (
      <View style={styles.card}>
        {/* <Text style={styles.emptyText}>
          No data available for {branch}
        </Text> */}
      </View>
    );
  }

  // =========================
  // ✅ RENDER
  // =========================
  return (
    <View style={styles.card}>

      

      <View style={styles.row}>

        {/* LEGEND */}
        <View style={styles.legend}>
          {chartData.map((item, index) => (
            <View key={index} style={styles.legendRow}>
              <View
                style={[styles.dot, { backgroundColor: item.color }]}
              />
              <Text style={styles.legendText}>
                {item.label}
              </Text>
            </View>
          ))}
        </View>

        {/* PIE CHART */}
        <PieChart
          data={chartData}
          donut

          radius={100}
          innerRadius={55}

          showText
          textColor="#fff"
          textSize={15}

          isAnimated
          animationDuration={800}

          focusOnPress
        />

      </View>

    </View>
  );
};

export default VisitorPieChart;


// =========================
// 🎨 STYLES
// =========================

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginTop: 15,
    elevation: 5,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  legend: {
    flex: 1,
    justifyContent: 'center',
  },

  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  dot: {
    width: 14,
    height: 14,
    borderRadius: 4,
    marginRight: 10,
  },

  legendText: {
    fontSize: 14,
    flexShrink: 1,
  },

  emptyText: {
    textAlign: 'center',
    color: '#95ccf1',
  },
});