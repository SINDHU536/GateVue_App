import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import StatCard from '../components/SuperAdminPanel/StatCard';
import VisitorLineChart from '../components/SuperAdminPanel/VisitorLineChart';
import VisitorPieChart from '../components/SuperAdminPanel/VisitorPieChart';
import { useAuth } from '../context/AuthContext';
import Images from '../utils/images';

import {
  getVisitorStats,
  getDayGraph,
  getPurposeGraph
} from '../api_config/api';

import { useBranch } from '../context/BranchContext';

const HomeScreen = () => {

  const [userName, setUserName] = useState<string>('');
  const { userRole } = useAuth();

  // ✅ CONTEXT
  const { branch: selectedBranch, setBranch: setSelectedBranch } = useBranch();

  const [branchModal, setBranchModal] = useState(false);

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalCount: 0,
    totalPending: 0,
    totalIn: 0,
    totalOut: 0,
  });

  const [lineData, setLineData] = useState<any[]>([]);
  const [pieData, setPieData] = useState<any[]>([]);

  const [viewMode, setViewMode] = useState<'hourly' | 'daily' | 'monthly'>('hourly');

  const branches = [
    'All',
    'Corporate Office',
    'Dabaspet',
    'Ganganagar',
    'Sulibele'
  ];

  const formatDate = (date: Date) =>
    date.toISOString().split('T')[0];

  // ================= VIEW MODE =================
  useEffect(() => {
    const diffDays =
      (toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24);

    if (diffDays <= 1) setViewMode('hourly');
    else if (diffDays <= 30) setViewMode('daily');
    else setViewMode('monthly');
  }, [fromDate, toDate]);

  // ================= LOAD USER =================
  useEffect(() => {
    const loadUserName = async () => {
      const name = await AsyncStorage.getItem('userName');
      if (name) setUserName(name);
    };
    loadUserName();
  }, []);

  // ================= FETCH DASHBOARD (FIXED) =================
 
  
const fetchDashboard = async () => {
  try {
    setLoading(true);

    const payload = {
      officeLocation: selectedBranch,
      startDate: formatDate(fromDate),
      endDate: formatDate(toDate),
    };

    console.log("Selected Branch:", selectedBranch);

    // ✅ FIXED STATS
    const statsRes = await getVisitorStats(payload);
    const statsData = statsRes?.data || {};

    setStats({
      totalCount: statsData.totalCount ?? 0,
      totalPending: statsData.totalPending ?? 0,
      totalIn: statsData.totalIn ?? 0,
      totalOut: statsData.totalOut ?? 0,
    });


      // LINE GRAPH
      const lineRes = await getDayGraph(payload);
      const safeLineData =
        Array.isArray(lineRes?.data)
          ? lineRes.data
          : lineRes?.data?.data || [];

      setLineData(safeLineData);

      // PIE GRAPH
      const pieRes = await getPurposeGraph(payload);
      const safePieData =
        Array.isArray(pieRes?.data)
          ? pieRes.data
          : pieRes?.data?.data || [];

      setPieData(safePieData);

    } catch (e) {
      console.log('Dashboard API Error:', e);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 IMPORTANT FIX HERE
  useEffect(() => {
  if (!selectedBranch) return;
if (userRole === 1 || userRole === 2 || userRole === 3) {
  fetchDashboard();
}
}, [selectedBranch, fromDate, toDate]);
// useEffect(() => {
//   console.log("BRANCH CHANGED:", selectedBranch);
// }, [selectedBranch]);

  const resetDates = () => {
    setFromDate(new Date());
    setToDate(new Date());
  };

  return (
    <SafeAreaView style={styles.safeArea}>

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 50 }} />
      ) : (

        <ScrollView contentContainerStyle={styles.container}>

          {/* HEADER */}
          <View style={styles.logoBranchRow}>
            <Image source={Images.Logo} style={styles.logo} />

            <View style={styles.branchContainer}>
              <Text style={styles.branchLabel}>Branch:</Text>

              <TouchableOpacity onPress={() => setBranchModal(true)}>
                <Text style={styles.branchName}>{selectedBranch}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* WELCOME */}
          <Text style={styles.welcome}>
            Welcome, {userName}
          </Text>

          {/* DATE FILTER */}
          <View style={styles.dateRow}>

            <TouchableOpacity
              style={styles.dateCard}
              onPress={() => setShowFromPicker(true)}
            >
              <Text style={styles.dateLabel}>From:</Text>
              <Text style={styles.dateText}>{formatDate(fromDate)}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dateCard}
              onPress={() => setShowToPicker(true)}
            >
              <Text style={styles.dateLabel}>To:</Text>
              <Text style={styles.dateText}>{formatDate(toDate)}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.resetButton} onPress={resetDates}>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>

          </View>

          {/* STATS */}
          <View style={styles.cardRow}>
            <StatCard title="Total Count" value={stats.totalCount} />
            <StatCard title="Pending" value={stats.totalPending} />
            <StatCard title="Total In" value={stats.totalIn} />
            <StatCard title="Total Out" value={stats.totalOut} />

            
          </View>

          {/* LINE CHART */}
          <Text style={styles.title}>
            {viewMode.toUpperCase()} - Visitor Insights
          </Text>

          <VisitorLineChart data={lineData} viewMode={viewMode}  />

          {/* PIE CHART */}
          <Text style={[styles.title, { marginTop: 30 }]}>
            Visitor Type Breakdown
          </Text>

          <VisitorPieChart data={pieData} branch={selectedBranch} />

        </ScrollView>

      )}

      {/* DATE PICKERS */}
      {showFromPicker && (
        <DateTimePicker
          value={fromDate}
          mode="date"
          onChange={(_, d) => {
            setShowFromPicker(false);
            if (d) setFromDate(d);
          }}
        />
      )}

      {showToPicker && (
        <DateTimePicker
          value={toDate}
          mode="date"
          onChange={(_, d) => {
            setShowToPicker(false);
            if (d) setToDate(d);
          }}
        />
      )}

      {/* BRANCH MODAL */}
      <Modal visible={branchModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>

            <Text style={styles.modalTitle}>Select Branch</Text>

            {branches.map((branch, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.branchItem,
                  branch === selectedBranch && styles.selectedBranch
                ]}
                onPress={() => {
                  setSelectedBranch(branch);
                  setBranchModal(false);
                }}
              >
                <Text style={styles.branchItemText}>{branch}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity onPress={() => setBranchModal(false)}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

export default HomeScreen;

// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Image,
//   Modal,
//   TouchableOpacity,
//   ActivityIndicator
// } from 'react-native';

// import { SafeAreaView } from 'react-native-safe-area-context';
// import DateTimePicker from '@react-native-community/datetimepicker';

// import StatCard from '../components/SuperAdminPanel/StatCard';
// import VisitorLineChart from '../components/SuperAdminPanel/VisitorLineChart';
// import VisitorPieChart from '../components/SuperAdminPanel/VisitorPieChart';

// import { useAuth } from '../context/AuthContext';
// import { useBranch } from '../context/BranchContext';

// import Images from '../utils/images';

// import {
//   getVisitorStats,
//   getDayGraph,
//   getPurposeGraph
// } from '../api_config/api';

// const HomeScreen = () => {

//   const { userRole, userName } = useAuth();
//   const { branch: selectedBranch, setBranch: setSelectedBranch } = useBranch();

//   const [branchModal, setBranchModal] = useState(false);

//   const [fromDate, setFromDate] = useState(new Date());
//   const [toDate, setToDate] = useState(new Date());

//   const [showFromPicker, setShowFromPicker] = useState(false);
//   const [showToPicker, setShowToPicker] = useState(false);

//   const [loading, setLoading] = useState(true);

//   const [stats, setStats] = useState({
//     totalCount: 0,
//     totalPending: 0,
//     totalIn: 0,
//     totalOut: 0,
//   });

//   const [lineData, setLineData] = useState<any[]>([]);
//   const [pieData, setPieData] = useState<any[]>([]);

//   const [viewMode, setViewMode] = useState<'hourly' | 'daily' | 'monthly'>('hourly');

//   const branches = [
//     'All',
//     'Corporate Office',
//     'Dabaspet',
//     'Ganganagar',
//     'Sulibele'
//   ];

//   // ================= DATE FORMAT FIX =================
//   const formatStartDate = (date: Date) => {
//     const d = new Date(date);
//     d.setHours(0, 0, 0, 0);
//     return d.toISOString();
//   };

//   const formatEndDate = (date: Date) => {
//     const d = new Date(date);
//     d.setHours(23, 59, 59, 999);
//     return d.toISOString();
//   };

//   const formatDisplayDate = (date: Date) =>
//     date.toISOString().split('T')[0];

//   // ================= VIEW MODE =================
//   useEffect(() => {
//     const diffDays =
//       (toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24);

//     if (diffDays <= 1) setViewMode('hourly');
//     else if (diffDays <= 30) setViewMode('daily');
//     else setViewMode('monthly');
//   }, [fromDate, toDate]);

//   // ================= FETCH DASHBOARD =================
//   const fetchDashboard = async () => {
//     try {
//       setLoading(true);

//       const payload = {
//         officeLocation: selectedBranch === "All" ? "" : selectedBranch,
//         startDate: formatStartDate(fromDate),
//         endDate: formatEndDate(toDate),
//       };

//       console.log("PAYLOAD:", payload);
      

//       // STATS
//       const statsRes = await getVisitorStats(payload);
//       const statsData = statsRes?.data || {};

//       setStats({
//         totalCount: statsData.totalCount ?? 0,
//         totalPending: statsData.totalPending ?? 0,
//         totalIn: statsData.totalIn ?? 0,
//         totalOut: statsData.totalOut ?? 0,
//       });

//       // LINE GRAPH
//       const lineRes = await getDayGraph(payload);
      
//       const safeLineData =
//   Array.isArray(lineRes?.data)
//     ? lineRes.data
//     : Array.isArray(lineRes?.data?.data)
//     ? lineRes.data.data
//     : Array.isArray(lineRes?.data?.response)
//     ? lineRes.data.response
//     : [];

// console.log("✅ FINAL LINE DATA:", safeLineData);

// setLineData(safeLineData);

//       // const safeLineData =
//       //   Array.isArray(lineRes?.data)
//       //     ? lineRes.data
//       //     : lineRes?.data?.data || [];

//       // setLineData(safeLineData);
//       // console.log("LINE GRAPH RESPONSE:", lineRes?.data);

//       // PIE GRAPH
//       const pieRes = await getPurposeGraph(payload);
//       const safePieData =
//         Array.isArray(pieRes?.data)
//           ? pieRes.data
//           : pieRes?.data?.data || [];

//       setPieData(safePieData);

//     } catch (e) {
//       console.log('Dashboard API Error:', e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (selectedBranch === undefined || selectedBranch === null) return;

//     if (userRole === 1 || userRole === 2 || userRole === 3) {
//       fetchDashboard();
//     }
//   }, [selectedBranch, fromDate, toDate]);

//   const resetDates = () => {
//     setFromDate(new Date());
//     setToDate(new Date());
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>

//       {loading ? (
//         <View style={{ marginTop: 50, alignItems: 'center' }}>
//           <ActivityIndicator size="large" color="#1e73d8" />
//           <Text style={{ marginTop: 10 }}>Loading dashboard...</Text>
//         </View>
//       ) : (

//         <ScrollView contentContainerStyle={styles.container}>

//           {/* HEADER */}
//           <View style={styles.logoBranchRow}>
//             <Image source={Images.Logo} style={styles.logo} />

//             <View style={styles.branchContainer}>
//               <Text style={styles.branchLabel}>Branch:</Text>

//               <TouchableOpacity onPress={() => setBranchModal(true)}>
//                 <Text style={styles.branchName}>{selectedBranch}</Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* WELCOME */}
//           <Text style={styles.welcome}>
//             Welcome, {userName || "User"}
//           </Text>

//           {/* DATE FILTER */}
//           <View style={styles.dateRow}>

//             <TouchableOpacity
//               style={styles.dateCard}
//               onPress={() => setShowFromPicker(true)}
//             >
//               <Text style={styles.dateLabel}>From:</Text>
//               <Text style={styles.dateText}>{formatDisplayDate(fromDate)}</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.dateCard}
//               onPress={() => setShowToPicker(true)}
//             >
//               <Text style={styles.dateLabel}>To:</Text>
//               <Text style={styles.dateText}>{formatDisplayDate(toDate)}</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.resetButton} onPress={resetDates}>
//               <Text style={styles.resetText}>Reset</Text>
//             </TouchableOpacity>

//           </View>

//           {/* STATS */}
//           <View style={styles.cardRow}>
//             <StatCard title="Total Count" value={stats.totalCount} />
//             <StatCard title="Pending" value={stats.totalPending} />
//             <StatCard title="Total In" value={stats.totalIn} />
//             <StatCard title="Total Out" value={stats.totalOut} />
//           </View>

//           {/* LINE CHART */}
         
//          {/* <Text style={styles.title}>
//             {viewMode.toUpperCase()} - Visitor Insights
//           </Text>

//           <VisitorLineChart data={lineData} viewMode={viewMode} branch={selectedBranch} />

//           {/* PIE CHART */}
//           <Text style={[styles.title, { marginTop: 30 }]}>
//             Visitor Type Breakdown
//           </Text>

//           <VisitorPieChart data={pieData} branch={selectedBranch} />

//         </ScrollView>
//       )}

//       {/* DATE PICKERS */}
//       {showFromPicker && (
//         <DateTimePicker
//           value={fromDate}
//           mode="date"
//           onChange={(_, d) => {
//             setShowFromPicker(false);
//             if (d) setFromDate(d);
//           }}
//         />
//       )}

//       {showToPicker && (
//         <DateTimePicker
//           value={toDate}
//           mode="date"
//           onChange={(_, d) => {
//             setShowToPicker(false);
//             if (d) setToDate(d);
//           }}
//         />
//       )}

//       {/* BRANCH MODAL */}
//       <Modal visible={branchModal} transparent animationType="fade">
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>

//             <Text style={styles.modalTitle}>Select Branch</Text>

//             {branches.map((branch, index) => (
//               <TouchableOpacity
//                 key={index}
//                 style={[
//                   styles.branchItem,
//                   branch === selectedBranch && styles.selectedBranch
//                 ]}
//                 onPress={() => {
//                   setSelectedBranch(branch);
//                   setBranchModal(false);
//                 }}
//               >
//                 <Text style={styles.branchItemText}>{branch}</Text>
//               </TouchableOpacity>
//             ))}

//             <TouchableOpacity onPress={() => setBranchModal(false)}>
//               <Text style={styles.cancelButton}>Cancel</Text>
//             </TouchableOpacity>

//           </View>
//         </View>
//       </Modal>

//     </SafeAreaView>
//   );
// };

// export default HomeScreen;

const styles = StyleSheet.create({

  safeArea:{
    flex:1,
    backgroundColor:'#f8f9fa'
  },

  container:{
    padding:10
  },

  logoBranchRow:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:20
  },

  logo:{
    width:120,
    height:50,
    resizeMode:'contain'
  },

  branchContainer:{
    flexDirection:'row',

  },

  branchLabel:{
    fontSize:16,
    // marginRight:2,
     paddingHorizontal:10,
    paddingVertical:6,
  },

  branchName:{
    fontSize:16,
    fontWeight:'600',
    color:'#81abe6',
    borderRadius:8,
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#e3e7eb',
    paddingHorizontal:10,
    paddingVertical:6,
  },

  welcome:{
    fontSize:18,
    marginBottom:20,
    textAlign:'center'
  },

  /* DATE FILTER */

  dateRow:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:20
  },

  dateCard:{
    backgroundColor:'#e3e7eb',
    padding:12,
    borderRadius:10,
    width:'35%'
  },

  dateLabel:{
    fontSize:14,
    color:'#555'
  },

  dateText:{
    fontSize:16,
    fontWeight:'600'
  },

  resetButton:{
    backgroundColor:'#b43b3b',
    paddingVertical:12,
    paddingHorizontal:18,
    borderRadius:10
  },

  resetText:{
    color:'#fff',
    fontWeight:'bold'
  },

  cardRow:{
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-between',
   
  },

  title:{
    fontSize:22,
    fontWeight:'bold',
    textAlign:'center',
    marginTop:30,
    marginBottom:10
  },

  modalOverlay:{
    flex:1,
    backgroundColor:'rgba(0,0,0,0.5)',
    justifyContent:'center',
    alignItems:'center'
  },

  modalContainer:{
    width:'80%',
    backgroundColor:'#fff',
    borderRadius:15,
    padding:20
  },

  modalTitle:{
    fontSize:22,
    fontWeight:'bold',
    textAlign:'center',
    marginBottom:20
  },

  branchItem:{
    paddingVertical:12,
    borderBottomWidth:1,
    borderColor:'#eee'
  },

  selectedBranch:{
    backgroundColor:'#cfe3f0'
  },

  branchItemText:{
    fontSize:18
  },

  cancelButton:{
    textAlign:'center',
    marginTop:20,
    fontSize:18,
    color:'#1a73e8'
  }

});