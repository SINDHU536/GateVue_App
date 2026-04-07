// // import React, { useState } from "react";
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   TouchableOpacity,
// //   FlatList,
// //   Modal
// // } from "react-native";

// // import DateTimePicker from "@react-native-community/datetimepicker";

// // type Visitor = {
// //   id: string;
// //   name: string;
// //   email: string;
// //   phone: string;
// //   location: string;
// //   badge: string;
// //   status: string;
// //   purpose: string;
// //   meet: string;
// //   visitDate: string;
// //   inTime: string;
// //   outTime: string;
// // };

// // const DATA: Visitor[] = [
// //   {
// //     id: "1",
// //     name: "Lokesh Lokesh",
// //     email: "lokesh.dg@gmail.com",
// //     phone: "9886406402",
// //     location: "Corporate Office",
// //     badge: "024",
// //     status: "checkedIn",
// //     purpose: "Official Meet",
// //     meet: "Naveen",
// //     visitDate: "05-03-2026",
// //     inTime: "05-03-2026, 14:26:15",
// //     outTime: "N/A"
// //   },
// //   {
// //     id: "2",
// //     name: "Lokesh Lokesh",
// //     email: "lokesh.dg@gmail.com",
// //     phone: "9886406402",
// //     location: "Corporate Office",
// //     badge: "043",
// //     status: "checkedIn",
// //     purpose: "Official Meet",
// //     meet: "Naveen",
// //     visitDate: "05-03-2026",
// //     inTime: "05-03-2026, 14:26:20",
// //     outTime: "N/A"
// //   },
// //   {
// //     id: "3",
// //     name: "Sudeesh Kumar",
// //     email: "sudeeshkumar.adlerenserv@outlook.com",
// //     phone: "7702219449",
// //     location: "Corporate Office",
// //     badge: "022,017",
// //     status: "checkedIn",
// //     purpose: "Official Meet",
// //     meet: "Naveen",
// //     visitDate: "05-03-2026",
// //     inTime: "05-03-2026, 14:30:00",
// //     outTime: "N/A"
// //   }
// // ];

// // export default function ReportScreen() {

// //   const [startDate,setStartDate] = useState(new Date());
// //   const [endDate,setEndDate] = useState(new Date());

// //   const [showStart,setShowStart] = useState(false);
// //   const [showEnd,setShowEnd] = useState(false);

// //   const [range,setRange] = useState("Select Range");
// //   const [showRangeModal,setShowRangeModal] = useState(false);

// //   const resetFilters = () => {
// //     setStartDate(new Date());
// //     setEndDate(new Date());
// //     setRange("Select Range");
// //   };

// //   const onStartChange = (event:any,selectedDate:any) => {
// //     setShowStart(false);
// //     if(selectedDate){
// //       setStartDate(selectedDate);
// //     }
// //   };

// //   const onEndChange = (event:any,selectedDate:any) => {
// //     setShowEnd(false);
// //     if(selectedDate){
// //       setEndDate(selectedDate);
// //     }
// //   };

// //   const renderItem = ({ item }: { item: Visitor }) => {

// //     return (

// //       <View style={styles.card}>

// //         <Text style={styles.name}>{item.name}</Text>

// //         <Text style={styles.text}>
// //           {item.email} | {item.phone}
// //         </Text>

// //         <Text style={styles.text}>
// //           {item.location} | Badge: {item.badge}
// //         </Text>

// //         <Text style={styles.text}>
// //           Status:
// //           <Text style={styles.status}> {item.status}</Text>
// //         </Text>

// //         <Text style={styles.text}>
// //           Purpose: {item.purpose}
// //         </Text>

// //         <Text style={styles.text}>
// //           To Meet: {item.meet}
// //         </Text>

// //         <Text style={styles.text}>
// //           Visiting Date: {item.visitDate}
// //         </Text>

// //         <Text style={styles.text}>
// //           In: {item.inTime}
// //         </Text>

// //         <Text style={styles.text}>
// //           Out: {item.outTime}
// //         </Text>

// //       </View>

// //     );

// //   };

// //   return (

// //     <View style={styles.container}>

// //       {/* DATE FILTERS */}

// //       <View style={styles.row}>

// //         <TouchableOpacity
// //           style={styles.input}
// //           onPress={()=>setShowStart(true)}
// //         >
// //           <Text>{startDate.toISOString().split("T")[0]}</Text>
// //         </TouchableOpacity>

// //         <TouchableOpacity
// //           style={styles.input}
// //           onPress={()=>setShowEnd(true)}
// //         >
// //           <Text>{endDate.toISOString().split("T")[0]}</Text>
// //         </TouchableOpacity>

// //         <TouchableOpacity
// //           style={styles.resetBtn}
// //           onPress={resetFilters}
// //         >
// //           <Text style={styles.resetText}>Reset</Text>
// //         </TouchableOpacity>

// //       </View>

// //       {/* RANGE SELECTOR */}

// //       <TouchableOpacity
// //         style={styles.rangeBox}
// //         onPress={()=>setShowRangeModal(true)}
// //       >
// //         <Text style={styles.rangeText}>{range}</Text>
// //         <Text style={styles.arrow}>▼</Text>
// //       </TouchableOpacity>

// //       {/* REPORT LIST */}

// //       <FlatList
// //         data={DATA}
// //         keyExtractor={(item)=>item.id}
// //         renderItem={renderItem}
// //         showsVerticalScrollIndicator={false}
// //       />

// //       {/* START DATE PICKER */}

// //       {showStart && (
// //         <DateTimePicker
// //           value={startDate}
// //           mode="date"
// //           display="default"
// //           onChange={onStartChange}
// //         />
// //       )}

// //       {/* END DATE PICKER */}

// //       {showEnd && (
// //         <DateTimePicker
// //           value={endDate}
// //           mode="date"
// //           display="default"
// //           onChange={onEndChange}
// //         />
// //       )}

// //       {/* RANGE MODAL */}

// //       <Modal
// //         visible={showRangeModal}
// //         transparent
// //         animationType="fade"
// //       >

// //       <View style={styles.modalOverlay}>

// //       <View style={styles.modalContainer}>

// //       {/* <Text style={styles.modalTitle}>Select Range</Text> */}

// //       {["Select Range","Last Week","Last Month"].map((item,index)=>{

// //       return(

// //       <TouchableOpacity
// //       key={index}
// //       style={styles.rangeItem}
// //       onPress={()=>{
// //       setRange(item);
// //       setShowRangeModal(false);
// //       }}
// //       >

// //       <Text style={styles.rangeItemText}>{item}</Text>

// //       </TouchableOpacity>

// //       )

// //       })}

// //       <TouchableOpacity
// //       style={styles.cancelBtn}
// //       onPress={()=>setShowRangeModal(false)}
// //       >

// //       {/* <Text style={styles.cancelText}>Cancel</Text> */}

// //       </TouchableOpacity>

// //       </View>

// //       </View>

// //       </Modal>

// //     </View>

// //   );

// // }

// // // ================= STYLES =================

// // const styles = StyleSheet.create({

// //   container:{
// //     flex:1,
// //     backgroundColor:"#f3f3f3",
// //     padding:16
// //   },

// //   row:{
// //     flexDirection:"row",
// //     justifyContent:"space-between",
// //     marginBottom:15
// //   },

// //   input:{
// //     flex:1,
// //     backgroundColor:"#fff",
// //     padding:12,
// //     borderRadius:12,
// //     marginRight:10,
// //     borderWidth:1,
// //     borderColor:"#ddd",
// //     justifyContent:"center"
// //   },

// //   resetBtn:{
// //     backgroundColor:"#e65a54",
// //     paddingHorizontal:16,
// //     justifyContent:"center",
// //     borderRadius:10
// //   },

// //   resetText:{
// //     color:"#fff",
// //     fontWeight:"bold"
// //   },

// //   rangeBox:{
// //     flexDirection:"row",
// //     justifyContent:"space-between",
// //     alignItems:"center",
// //     backgroundColor:"#fff",
// //     padding:14,
// //     borderRadius:12,
// //     borderWidth:1,
// //     borderColor:"#ddd",
// //     marginBottom:20
// //   },

// //   rangeText:{
// //     fontSize:16
// //   },

// //   arrow:{
// //     fontSize:16
// //   },

// //   card:{
// //     backgroundColor:"#fff",
// //     padding:16,
// //     borderRadius:14,
// //     marginBottom:15,
// //     elevation:3
// //   },

// //   name:{
// //     fontSize:18,
// //     fontWeight:"bold",
// //     marginBottom:4
// //   },

// //   text:{
// //     fontSize:14,
// //     marginBottom:4
// //   },

// //   status:{
    
// //     fontWeight:"600"
// //   },

// //   modalOverlay:{
// //     flex:1,
// //     backgroundColor:"rgba(0,0,0,0.5)",
// //     justifyContent:"center",
// //     alignItems:"center"
// //   },

// //   modalContainer:{
// //     width:"80%",
// //     backgroundColor:"#fff",
// //     borderRadius:8,
// //     padding:20
// //   },

// //   modalTitle:{
// //     fontSize:16,
// //     // fontWeight:"bold",
// //     marginBottom:20
// //   },

// //   rangeItem:{
// //     paddingVertical:12,
    
    
// //   },

// //   rangeItemText:{
// //     fontSize:16
// //   },

// //   cancelBtn:{
// //     marginTop:15,
// //     alignItems:"center"
// //   },

// //   cancelText:{
// //     color:"#e65a54",
// //     fontWeight:"bold"
// //   }

// // });


// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
//   Modal,
//   ActivityIndicator,
// } from "react-native";
// import DateTimePicker from "@react-native-community/datetimepicker";

// import {
//   getVisitorsByBranch,
//   getVisitorsByLocationAndDate,
// } from "../api_config/api";

// // 🔥 ADD CONTEXT
// import { useBranch } from "../context/BranchContext";

// export default function ReportScreen() {

//   // 🔥 GLOBAL BRANCH
//   const { branch } = useBranch();

//   const [data, setData] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);

//   const [startDate, setStartDate] = useState<Date | null>(null);
//   const [endDate, setEndDate] = useState<Date | null>(null);

//   const [showStart, setShowStart] = useState(false);
//   const [showEnd, setShowEnd] = useState(false);

//   const [range, setRange] = useState("Select Range");
//   const [showRangeModal, setShowRangeModal] = useState(false);

//   // 🔥 DYNAMIC LOCATION
//   const officeLocation = branch === "All" ? "" : branch;

//   // ================= DATE FORMAT =================

//   const formatStart = (date: Date) => {
//     const d = new Date(date);
//     d.setHours(0, 0, 0, 0);
//     return d.toISOString();
//   };

//   const formatEnd = (date: Date) => {
//     const d = new Date(date);
//     d.setHours(23, 59, 59, 999);
//     return d.toISOString();
//   };

//   // ================= FETCH =================

//   const fetchData = async () => {
//     try {
//       setLoading(true);

//       const isFiltered =
//         (startDate && endDate) || range !== "Select Range";

//       let res;

//       if (isFiltered) {
//         res = await getVisitorsByLocationAndDate({
//           officeLocation,
//           startDate: startDate ? formatStart(startDate) : undefined,
//           endDate: endDate ? formatEnd(endDate) : undefined,
//           range:
//             range === "Last Week"
//               ? "lastWeek"
//               : range === "Last Month"
//               ? "lastMonth"
//               : undefined,
//         });
//       } else {
//         res = await getVisitorsByBranch(officeLocation);
//       }

//       console.log("REPORT API:", res.data);

//       setData(res?.data?.data || []);

//     } catch (error) {
//       console.log("REPORT ERROR:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔥 REFRESH WHEN ANY FILTER OR BRANCH CHANGES
//   useEffect(() => {
//     fetchData();
//   }, [branch, startDate, endDate, range]);

//   // ================= RESET =================

//   const resetFilters = () => {
//     setStartDate(null);
//     setEndDate(null);
//     setRange("Select Range");
//   };

//   // ================= ITEM =================

//   const renderItem = ({ item }: any) => (
//     <View style={styles.card}>

//       <Text style={styles.name}>
//         {item.firstName} {item.lastName}
//       </Text>

//       <Text style={styles.text}>
//         {item.email || "N/A"} | {item.phoneNumber}
//       </Text>

//       <Text style={styles.text}>
//         {item.officeLocation} | Badge: {item.badgeNumber}
//       </Text>

//       <Text style={styles.text}>
//         Status:
//         <Text
//           style={{
//             color: item.status === "checkedIn" ? "green" : "orange",
//           }}
//         >
//           {" "}{item.status}
//         </Text>
//       </Text>

//       <Text style={styles.text}>
//         Purpose: {item.purposeOfVisit}
//       </Text>

//       <Text style={styles.text}>
//         To Meet: {item.personToMeet}
//       </Text>

//       <Text style={styles.text}>
//         Visiting Date: {item.visitDate || "N/A"}
//       </Text>

//       <Text style={styles.text}>
//         In: {item.checkin || "N/A"}
//       </Text>

//       <Text style={styles.text}>
//         Out: {item.checkout || "N/A"}
//       </Text>

//     </View>
//   );

//   return (
//     <View style={styles.container}>

//       {/* DATE FILTER */}
//       <View style={styles.row}>

//         <TouchableOpacity
//           style={styles.input}
//           onPress={() => setShowStart(true)}
//         >
//           <Text>
//             {startDate ? startDate.toDateString() : "Start Date"}
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.input}
//           onPress={() => setShowEnd(true)}
//         >
//           <Text>
//             {endDate ? endDate.toDateString() : "End Date"}
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.resetBtn} onPress={resetFilters}>
//           <Text style={styles.resetText}>Reset</Text>
//         </TouchableOpacity>

//       </View>

//       {/* RANGE */}
//       <TouchableOpacity
//         style={styles.rangeBox}
//         onPress={() => setShowRangeModal(true)}
//       >
//         <Text style={styles.rangeText}>{range}</Text>
//         <Text>▼</Text>
//       </TouchableOpacity>

//       {/* LIST */}
//       {loading ? (
//         <ActivityIndicator size="large" style={{ marginTop: 20 }} />
//       ) : (
//         <FlatList
//           data={data}
//           keyExtractor={(item) => item._id}
//           renderItem={renderItem}
//           showsVerticalScrollIndicator={false}
//           ListEmptyComponent={
//             <Text style={styles.empty}>No visitors found</Text>
//           }
//         />
//       )}

//       {/* START PICKER */}
//       {showStart && (
//         <DateTimePicker
//           value={startDate || new Date()}
//           mode="date"
//           onChange={(e, d) => {
//             setShowStart(false);
//             if (d) {
//               setStartDate(d);
//               setRange("Select Range");
//             }
//           }}
//         />
//       )}

//       {/* END PICKER */}
//       {showEnd && (
//         <DateTimePicker
//           value={endDate || new Date()}
//           mode="date"
//           onChange={(e, d) => {
//             setShowEnd(false);
//             if (d) {
//               setEndDate(d);
//               setRange("Select Range");
//             }
//           }}
//         />
//       )}

//       {/* RANGE MODAL */}
//       <Modal visible={showRangeModal} transparent>
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>

//             {["Select Range", "Last Week", "Last Month"].map((item) => (
//               <TouchableOpacity
//                 key={item}
//                 style={styles.rangeItem}
//                 onPress={() => {
//                   setRange(item);
//                   setStartDate(null);
//                   setEndDate(null);
//                   setShowRangeModal(false);
//                 }}
//               >
//                 <Text style={styles.rangeItemText}>{item}</Text>
//               </TouchableOpacity>
//             ))}

//           </View>
//         </View>
//       </Modal>

//     </View>
//   );
// }

// // ================= STYLES =================

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f3f3f3",
//     padding: 16,
//   },

//   row: {
//     flexDirection: "row",
//     marginBottom: 15,
//   },

//   input: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 12,
//     borderRadius: 12,
//     marginRight: 10,
//   },

//   resetBtn: {
//     backgroundColor: "#e65a54",
//     paddingHorizontal: 16,
//     justifyContent: "center",
//     borderRadius: 10,
//   },

//   resetText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },

//   rangeBox: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     backgroundColor: "#fff",
//     padding: 14,
//     borderRadius: 12,
//     marginBottom: 20,
//   },

//   rangeText: {
//     fontSize: 16,
//   },

//   card: {
//     backgroundColor: "#fff",
//     padding: 16,
//     borderRadius: 14,
//     marginBottom: 15,
//     elevation: 2,
//   },

//   name: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },

//   text: {
//     fontSize: 14,
//     marginBottom: 4,
//   },

//   empty: {
//     textAlign: "center",
//     marginTop: 50,
//     color: "#999",
//   },

//   modalOverlay: {
//     flex: 1,
//     justifyContent: "center",
//     backgroundColor: "rgba(0,0,0,0.5)",
//   },

//   modalContainer: {
//     backgroundColor: "#fff",
//     margin: 20,
//     padding: 20,
//     borderRadius: 10,
//   },

//   rangeItem: {
//     paddingVertical: 12,
//   },

//   rangeItemText: {
//     fontSize: 16,
//   },
// });

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  ActivityIndicator,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import {
  getVisitorsByLocationAndDate,
  getVisitorsByBranch,
} from "../api_config/api";

import { useBranch } from "../context/BranchContext";

export default function ReportScreen() {
  const { branch } = useBranch();

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const [range, setRange] = useState("Select Range");
  const [showRangeModal, setShowRangeModal] = useState(false);

  // ================= DATE FORMAT =================
  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  // 🔥 VISITING DATE FORMAT (dd-mm-yyyy)
  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  // 🔥 IN / OUT FORMAT (dd-mm-yyyy, hh:mm:ss)
  const formatDateTimeFull = (dateString: string) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}-${month}-${year}, ${hours}:${minutes}:${seconds}`;
  };

  // ================= FETCH =================
  const fetchData = async () => {
    try {
      setLoading(true);

      let res;

      if (!startDate && !endDate && range === "Select Range") {
        res = await getVisitorsByBranch({
          officeLocation: branch === "All" ? "" : branch,
        });
      } else {
        res = await getVisitorsByLocationAndDate({
          officeLocation: branch === "All" ? "" : branch,
          ...(startDate && { startDate: formatDate(startDate) }),
          ...(endDate && { endDate: formatDate(endDate) }),
          ...(range !== "Select Range" && {
            range:
              range === "Last Week"
                ? "lastWeek"
                : range === "Last Month"
                ? "lastMonth"
                : undefined,
          }),
        });
      }

      const responseData = res?.data;

      setData(
        responseData?.response ||
        responseData?.data ||
        []
      );

    } catch (error) {
      console.log("ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [branch, startDate, endDate, range]);

  const resetFilters = () => {
    setStartDate(null);
    setEndDate(null);
    setRange("Select Range");
  };

  // ================= ITEM =================
  const renderItem = ({ item }: any) => (
    <View style={styles.card}>

      <Text style={styles.name}>
        {item.firstName} {item.lastName}
      </Text>

      <Text style={styles.text}>
        {item.email || "N/A"} | {item.phoneNumber}
      </Text>

      <Text style={styles.text}>
        {item.officeLocation} | Badge: {item.badgeNumber}
      </Text>

      <Text style={styles.text}>
        Status:
        <Text
          style={{
            color: item.status === "checkedIn" ? "green" : "orange",
          }}
        >
          {" "}{item.status}
        </Text>
      </Text>

      <Text style={styles.text}>
        Purpose: {item.purposeOfVisit}
      </Text>

      <Text style={styles.text}>
        To Meet: {item.personToMeet}
      </Text>

      {/* ✅ UPDATED */}
      <Text style={styles.text}>
        Visiting Date: {formatDisplayDate(item.visitDate)}
      </Text>

      {/* ✅ UPDATED */}
      <Text style={styles.text}>
        In: {formatDateTimeFull(item.checkin)}
      </Text>

      {/* ✅ UPDATED */}
      <Text style={styles.text}>
        Out: {formatDateTimeFull(item.checkout)}
      </Text>

    </View>
  );

  return (
    <View style={styles.container}>

      <View style={styles.row}>

        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowStart(true)}
        >
          <Text>
            {startDate ? startDate.toDateString() : "Start Date"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowEnd(true)}
        >
          <Text>
            {endDate ? endDate.toDateString() : "End Date"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resetBtn} onPress={resetFilters}>
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>

      </View>

      <TouchableOpacity
        style={styles.rangeBox}
        onPress={() => setShowRangeModal(true)}
      >
        <Text style={styles.rangeText}>{range}</Text>
        <Text>▼</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item, index) => item._id || index.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.empty}>No visitors found</Text>
          }
        />
      )}

      {showStart && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="date"
          onChange={(e, d) => {
            setShowStart(false);
            if (d) {
              setStartDate(d);
              setRange("Select Range");
            }
          }}
        />
      )}

      {showEnd && (
        <DateTimePicker
          value={endDate || new Date()}
          mode="date"
          onChange={(e, d) => {
            setShowEnd(false);
            if (d) {
              setEndDate(d);
              setRange("Select Range");
            }
          }}
        />
      )}

      <Modal visible={showRangeModal} transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {["Select Range", "Last Week", "Last Month"].map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.rangeItem}
                onPress={() => {
                  setRange(item);
                  setStartDate(null);
                  setEndDate(null);
                  setShowRangeModal(false);
                }}
              >
                <Text style={styles.rangeItemText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

    </View>
  );
  
}


// ================= STYLES =================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    padding: 16,
  },
  row: {
    flexDirection: "row",
    marginBottom: 15,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginRight: 10,
  },
  resetBtn: {
    backgroundColor: "#e65a54",
    paddingHorizontal: 16,
    justifyContent: "center",
    borderRadius: 10,
  },
  resetText: {
    color: "#fff",
    fontWeight: "bold",
  },
  rangeBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
  },
  rangeText: {
    fontSize: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 15,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
  },
  empty: {
    textAlign: "center",
    marginTop: 50,
    color: "#999",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  rangeItem: {
    paddingVertical: 12,
  },
  rangeItemText: {
    fontSize: 16,
  },
});