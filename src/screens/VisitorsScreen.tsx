// // import React, { useState, useEffect } from "react";
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   TextInput,
// //   TouchableOpacity,
// //   FlatList,
// //   Image,
// //   Modal,
// //   ActivityIndicator
// // } from "react-native";

// // import { getVisitors } from "../api_config/api";

// // export default function VisitorsScreen() {

// //   const [phone, setPhone] = useState("");
// //   const [badge, setBadge] = useState("");
// //   const [status, setStatus] = useState("All");
// //   const [showDropdown, setShowDropdown] = useState(false);

// //   const [visitors, setVisitors] = useState<any[]>([]);
// //   const [loading, setLoading] = useState(true);

// //   const [modalVisible, setModalVisible] = useState(false);
// //   const [selectedVisitor, setSelectedVisitor] = useState<any>(null);

// //   const [badgeInput, setBadgeInput] = useState("");
// //   const [meetInput, setMeetInput] = useState("");
// //   const [purposeInput, setPurposeInput] = useState("");
// //   const [checkIn, setCheckIn] = useState("");
// //   const [checkOut, setCheckOut] = useState("");

// //   const statusOptions = ["All", "pending", "checkedIn", "checkedOut"];

// //   // ================= STATUS COLOR =================
// //   const getStatusColor = (status: string) => {
// //     switch (status?.toLowerCase()) {
// //       case "checkedin":
// //         return "#73eca2";
// //       case "checkedout":
// //         return "#f0e292";
// //       case "pending":
// //         return "#ebb7b7";
// //       default:
// //         return "#7f8c8d";
// //     }
// //   };

// //   // ================= FETCH API =================
// //   useEffect(() => {
// //     fetchVisitors();
// //   }, []);

// //   const fetchVisitors = async () => {
// //     try {
// //       setLoading(true);

// //       const res = await getVisitors();

// //       console.log("API RESPONSE:", res);

// //       const data = res?.response || res?.data || res || [];

// //       const formatted = data.map((item: any) => ({
// //         id: item._id,
// //         name: item.firstName
// //           ? `${item.firstName} ${item.lastName || ""}`
// //           : "No Name",
// //         phone: item.phoneNumber || "-",
// //         email: item.email || "-",
// //         badge: item.badgeNumber || "N/A",
// //         location: item.officeLocation || "-",
// //         visitDate: item.checkin?.split("T")[0] || "-",
// //         purpose: item.purposeOfVisit || "-",
// //         meet: item.personToMeet || "-",
// //         time: `${item.checkin || "-"} - ${item.checkout || "-"}`,
// //         status: item.status || "-",
// //         image: item.image
// //       }));

// //       console.log("FORMATTED:", formatted);

// //       setVisitors(formatted);

// //     } catch (e) {
// //       console.log("Visitors API Error:", e);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // ================= FILTER =================
// //   const filteredVisitors = visitors.filter((item) => {
// //     return (
// //       (phone ? item.phone.includes(phone) : true) &&
// //       (badge ? item.badge.includes(badge) : true) &&
// //       (status === "All"
// //         ? true
// //         : item.status?.toLowerCase() === status.toLowerCase())
// //     );
// //   });

// //   const resetFilters = () => {
// //     setPhone("");
// //     setBadge("");
// //     setStatus("All");
// //   };

// //   // ================= MODAL =================
// //   const openModal = (item: any) => {
// //     setSelectedVisitor(item);

// //     setBadgeInput(item.badge);
// //     setMeetInput(item.meet);
// //     setPurposeInput(item.purpose);

// //     const times = item.time.split("-");
// //     setCheckIn(times[0]?.trim() || "");
// //     setCheckOut(times[1]?.trim() || "");

// //     setModalVisible(true);
// //   };

// //   const updateVisitor = () => {
// //     if (!selectedVisitor) return;

// //     const updated = visitors.map((v) =>
// //       v.id === selectedVisitor.id
// //         ? {
// //             ...v,
// //             badge: badgeInput,
// //             meet: meetInput,
// //             purpose: purposeInput,
// //             time: `${checkIn} - ${checkOut}`,
// //           }
// //         : v
// //     );

// //     setVisitors(updated);
// //     setModalVisible(false);
// //   };

// //   // ================= ITEM =================
// //   const renderItem = ({ item }: any) => (
// //     <View style={styles.card}>

// //       <View style={styles.cardRow}>

// //         {/* LEFT */}
// //         <View style={styles.leftSection}>
// //           <Text style={styles.name}>{item.name}</Text>
// //           <Text style={styles.phone}>{item.phone}</Text>

// //           <Text style={styles.infoText}>
// //             Email: <Text style={styles.valueText}>{item.email}</Text>
// //           </Text>

// //           <Text style={styles.infoText}>
// //             Badge: <Text style={styles.valueText}>{item.badge}</Text>
// //           </Text>

// //           <Text style={styles.infoText}>
// //             Location: <Text style={styles.valueText}>{item.location}</Text>
// //           </Text>

// //           <Text style={styles.infoText}>
// //             Visit Date: <Text style={styles.valueText}>{item.visitDate}</Text>
// //           </Text>
// //         </View>

// //         {/* RIGHT */}
// //         <View style={styles.rightSection}>

// //           <View
// //             style={[
// //               styles.statusBadge,
// //               { backgroundColor: getStatusColor(item.status) }
// //             ]}
// //           >
// //             <Text style={styles.statusText}>{item.status}</Text>
// //           </View>

// //           <Text style={styles.rightInfo}>
// //             Purpose <Text style={styles.rightValue}>{item.purpose}</Text>
// //           </Text>

// //           <Text style={styles.rightInfo}>
// //             To Meet <Text style={styles.rightValue}>{item.meet}</Text>
// //           </Text>

// //           <Text style={styles.time}>{item.time}</Text>

// //           {item.image ? (
// //             <Image source={{ uri: item.image }} style={styles.image} />
// //           ) : (
// //             <View style={styles.imagePlaceholder} />
// //           )}

// //           <TouchableOpacity
// //             style={styles.viewBtn}
// //             onPress={() => openModal(item)}
// //           >
// //             <Text style={styles.viewText}>View</Text>
// //           </TouchableOpacity>

// //         </View>

// //       </View>

// //     </View>
// //   );

// //   return (
// //     <View style={styles.container}>

// //       {/* FILTERS */}
// //       <TextInput
// //         placeholder="Phone Number"
// //         style={styles.filterInput}
// //         value={phone}
// //         onChangeText={setPhone}
// //       />

// //       <TextInput
// //         placeholder="Badge Number"
// //         style={styles.filterInput}
// //         value={badge}
// //         onChangeText={setBadge}
// //       />

// //       <TouchableOpacity
// //         style={styles.dropdown}
// //         onPress={() => setShowDropdown(!showDropdown)}
// //       >
// //         <Text>{status}</Text>
// //         <Text style={styles.dropdownIcon}>▼</Text>
// //       </TouchableOpacity>

// //       {showDropdown && (
// //         <View style={styles.dropdownList}>
// //           {statusOptions.map((item) => (
// //             <TouchableOpacity
// //               key={item}
// //               style={styles.dropdownItem}
// //               onPress={() => {
// //                 setStatus(item);
// //                 setShowDropdown(false);
// //               }}
// //             >
// //               <Text
// //                 style={{
// //                   color: item === status ? "#df140d" : "#333",
// //                   fontWeight: item === status ? "bold" : "normal",
// //                 }}
// //               >
// //                 {item}
// //               </Text>
// //             </TouchableOpacity>
// //           ))}
// //         </View>
// //       )}

// //       <TouchableOpacity style={styles.resetBtn} onPress={resetFilters}>
// //         <Text style={styles.resetText}>Reset</Text>
// //       </TouchableOpacity>

// //       {/* LIST */}
// //       {loading ? (
// //         <ActivityIndicator size="large" />
// //       ) : (
// //         <FlatList
// //           data={filteredVisitors}
// //           keyExtractor={(item) => item.id}
// //           renderItem={renderItem}
// //           ListEmptyComponent={
// //             <Text style={{ textAlign: "center", marginTop: 40 }}>
// //               No Visitors Found
// //             </Text>
// //           }
// //         />
// //       )}

// //       {/* MODAL */}
// //       <Modal visible={modalVisible} transparent animationType="slide">
// //         <View style={styles.modalOverlay}>
// //           <View style={styles.modalContainer}>

// //             <Text style={styles.modalTitle}>Visitor Details</Text>

// //             <TextInput style={styles.modalInput} value={badgeInput} onChangeText={setBadgeInput} />
// //             <TextInput style={styles.modalInput} value={meetInput} onChangeText={setMeetInput} />
// //             <TextInput style={styles.modalInput} value={purposeInput} onChangeText={setPurposeInput} />
// //             <TextInput style={styles.modalInput} value={checkIn} onChangeText={setCheckIn} />
// //             <TextInput style={styles.modalInput} value={checkOut} onChangeText={setCheckOut} />

// //             <TouchableOpacity style={styles.submitBtn} onPress={updateVisitor}>
// //               <Text style={styles.submitText}>Submit</Text>
// //             </TouchableOpacity>

// //           </View>
// //         </View>
// //       </Modal>

// //     </View>
// //   );
// // }

// // ================= STYLES =================

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   Image,
//   Modal,
//   ActivityIndicator
// } from "react-native";

// import { getVisitors } from "../api_config/api";

// export default function VisitorsScreen() {

//   const [phone, setPhone] = useState("");
//   const [badge, setBadge] = useState("");
//   const [status, setStatus] = useState("All");
//   const [showDropdown, setShowDropdown] = useState(false);

//   const [visitors, setVisitors] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedVisitor, setSelectedVisitor] = useState<any>(null);

//   const [badgeInput, setBadgeInput] = useState("");
//   const [meetInput, setMeetInput] = useState("");
//   const [purposeInput, setPurposeInput] = useState("");
//   const [checkIn, setCheckIn] = useState("");
//   const [checkOut, setCheckOut] = useState("");

//   const statusOptions = ["All", "pending", "checkedIn", "checkedOut"];

//   // ================= STATUS COLOR =================
//   const getStatusColor = (status: string) => {
//     switch (status?.toLowerCase()) {
//       case "checkedin":
//         return "#73eca2";
//       case "checkedout":
//         return "#f0e292";
//       case "pending":
//         return "#ebb7b7";
//       default:
//         return "#7f8c8d";
//     }
//   };

//   // ================= FETCH API =================
//   // useEffect(() => {
//   //   fetchVisitors();
//   // }, []);

//   // const fetchVisitors = async () => {
//   //   try {
//   //     setLoading(true);

//   //     const res = await getVisitors();

//   //     console.log("API RESPONSE:", res);

//   //     // ✅ FIX: correct extraction from axios response
//   //     const safeData =
//   //       Array.isArray(res?.data)
//   //         ? res.data
//   //         : Array.isArray(res?.data?.data)
//   //         ? res.data.data
//   //         : [];

//   //     console.log("SAFE DATA:", safeData);

//   //     const formatted = safeData.map((item: any) => ({
//   //       id: item._id,
//   //       name: item.firstName
//   //         ? `${item.firstName} ${item.lastName || ""}`
//   //         : "No Name",
//   //       phone: item.phoneNumber || "-",
//   //       email: item.email || "-",
//   //       badge: item.badgeNumber || "N/A",
//   //       location: item.officeLocation || "-",
//   //       visitDate: item.checkin?.split("T")[0] || "-",
//   //       purpose: item.purposeOfVisit || "-",
//   //       meet: item.personToMeet || "-",
//   //       time: `${item.checkin || "-"} - ${item.checkout || "-"}`,
//   //       status: item.status || "-",
//   //       image: item.image
//   //     }));

//   //     setVisitors(formatted);

//   //   } catch (e) {
//   //     console.log("Visitors API Error:", e);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
// // const fetchVisitors = async () => {
// //   try {
// //     setLoading(true);

// //     const res = await getVisitors({}); // ✅ FIX

// //     console.log("API RESPONSE:", res);

// //     const safeData =
// //       Array.isArray(res?.data?.data)
// //         ? res.data.data
// //         : Array.isArray(res?.data)
// //         ? res.data
// //         : [];

// //     setVisitors(safeData);

// //   } catch (e) {
// //     console.log("Visitors API Error:", e);
// //   } finally {
// //     setLoading(false);
// //   }
// // };
// //   // ================= FILTER =================
// //   const filteredVisitors = visitors.filter((item) => {
// //     return (
// //       (phone ? item.phone.includes(phone) : true) &&
// //       (badge ? item.badge.includes(badge) : true) &&
// //       (status === "All"
// //         ? true
// //         : item.status?.toLowerCase() === status.toLowerCase())
// //     );
// //   });

// //   const resetFilters = () => {
// //     setPhone("");
// //     setBadge("");
// //     setStatus("All");
// //   };

// //   // ================= MODAL =================
// //   const openModal = (item: any) => {
// //     setSelectedVisitor(item);

// //     setBadgeInput(item.badge);
// //     setMeetInput(item.meet);
// //     setPurposeInput(item.purpose);

// //     const times = item.time.split("-");
// //     setCheckIn(times[0]?.trim() || "");
// //     setCheckOut(times[1]?.trim() || "");

// //     setModalVisible(true);
// //   };

// //   const updateVisitor = () => {
// //     if (!selectedVisitor) return;

// //     const updated = visitors.map((v) =>
// //       v.id === selectedVisitor.id
// //         ? {
// //             ...v,
// //             badge: badgeInput,
// //             meet: meetInput,
// //             purpose: purposeInput,
// //             time: `${checkIn} - ${checkOut}`,
// //           }
// //         : v
// //     );

// //     setVisitors(updated);
// //     setModalVisible(false);
// //   };

// //   // ================= ITEM =================
// //   const renderItem = ({ item }: any) => (
// //     <View style={styles.card}>
// //       <View style={styles.cardRow}>

// //         <View style={styles.leftSection}>
// //           <Text style={styles.name}>{item.name}</Text>
// //           <Text style={styles.phone}>{item.phone}</Text>

// //           <Text style={styles.infoText}>
// //             Email: <Text style={styles.valueText}>{item.email}</Text>
// //           </Text>

// //           <Text style={styles.infoText}>
// //             Badge: <Text style={styles.valueText}>{item.badge}</Text>
// //           </Text>

// //           <Text style={styles.infoText}>
// //             Location: <Text style={styles.valueText}>{item.location}</Text>
// //           </Text>

// //           <Text style={styles.infoText}>
// //             Visit Date: <Text style={styles.valueText}>{item.visitDate}</Text>
// //           </Text>
// //         </View>

// //         <View style={styles.rightSection}>

// //           <View
// //             style={[
// //               styles.statusBadge,
// //               { backgroundColor: getStatusColor(item.status) }
// //             ]}
// //           >
// //             <Text style={styles.statusText}>{item.status}</Text>
// //           </View>

// //           <Text style={styles.rightInfo}>
// //             Purpose <Text style={styles.rightValue}>{item.purpose}</Text>
// //           </Text>

// //           <Text style={styles.rightInfo}>
// //             To Meet <Text style={styles.rightValue}>{item.meet}</Text>
// //           </Text>

// //           <Text style={styles.time}>{item.time}</Text>

// //           {item.image ? (
// //             <Image source={{ uri: item.image }} style={styles.image} />
// //           ) : (
// //             <View style={styles.imagePlaceholder} />
// //           )}

// //           <TouchableOpacity
// //             style={styles.viewBtn}
// //             onPress={() => openModal(item)}
// //           >
// //             <Text style={styles.viewText}>View</Text>
// //           </TouchableOpacity>

// //         </View>

// //       </View>
// //     </View>
// //   );

// //   return (
// //     <View style={styles.container}>

// //       <TextInput
// //         placeholder="Phone Number"
// //         style={styles.filterInput}
// //         value={phone}
// //         onChangeText={setPhone}
// //       />

// //       <TextInput
// //         placeholder="Badge Number"
// //         style={styles.filterInput}
// //         value={badge}
// //         onChangeText={setBadge}
// //       />

// //       <TouchableOpacity
// //         style={styles.dropdown}
// //         onPress={() => setShowDropdown(!showDropdown)}
// //       >
// //         <Text>{status}</Text>
// //         <Text style={styles.dropdownIcon}>▼</Text>
// //       </TouchableOpacity>

// //       {showDropdown && (
// //         <View style={styles.dropdownList}>
// //           {statusOptions.map((item) => (
// //             <TouchableOpacity
// //               key={item}
// //               style={styles.dropdownItem}
// //               onPress={() => {
// //                 setStatus(item);
// //                 setShowDropdown(false);
// //               }}
// //             >
// //               <Text
// //                 style={{
// //                   color: item === status ? "#df140d" : "#333",
// //                   fontWeight: item === status ? "bold" : "normal",
// //                 }}
// //               >
// //                 {item}
// //               </Text>
// //             </TouchableOpacity>
// //           ))}
// //         </View>
// //       )}

// //       <TouchableOpacity style={styles.resetBtn} onPress={resetFilters}>
// //         <Text style={styles.resetText}>Reset</Text>
// //       </TouchableOpacity>

// //       {loading ? (
// //         <ActivityIndicator size="large" />
// //       ) : (
// //         <FlatList
// //           data={filteredVisitors}
// //           keyExtractor={(item) => item.id}
// //           renderItem={renderItem}
// //           ListEmptyComponent={
// //             <Text style={{ textAlign: "center", marginTop: 40 }}>
// //               No Visitors Found
// //             </Text>
// //           }
// //         />
// //       )}

// //       {/* MODAL */}
// //       <Modal visible={modalVisible} transparent animationType="slide">
// //         <View style={styles.modalOverlay}>
// //           <View style={styles.modalContainer}>

// //             <Text style={styles.modalTitle}>Visitor Details</Text>

// //             <TextInput style={styles.modalInput} value={badgeInput} onChangeText={setBadgeInput} />
// //             <TextInput style={styles.modalInput} value={meetInput} onChangeText={setMeetInput} />
// //             <TextInput style={styles.modalInput} value={purposeInput} onChangeText={setPurposeInput} />
// //             <TextInput style={styles.modalInput} value={checkIn} onChangeText={setCheckIn} />
// //             <TextInput style={styles.modalInput} value={checkOut} onChangeText={setCheckOut} />

// //             <TouchableOpacity style={styles.submitBtn} onPress={updateVisitor}>
// //               <Text style={styles.submitText}>Submit</Text>
// //             </TouchableOpacity>

// //           </View>
// //         </View>
// //       </Modal>

// //     </View>
// //   );
// // }


// const styles = StyleSheet.create({

// container:{
// flex:1,
// backgroundColor:"#f4f6fb",
// padding:16
// },

// filterInput:{
// backgroundColor:"#fff",
// padding:14,
// borderRadius:14,
// borderWidth:1,
// borderColor:"#ddd",
// marginBottom:14,
// fontWeight:"600"
// },

// dropdown:{
// backgroundColor:"#fff",
// borderRadius:14,
// padding:14,
// flexDirection:"row",
// justifyContent:"space-between",
// borderWidth:1,
// borderColor:"#ddd",
// marginBottom:8
// },

// dropdownList:{
// backgroundColor:"#fff",
// borderRadius:12,
// marginTop:4,
// marginBottom:14
// },

// dropdownItem:{
// padding:14
// },

// resetBtn:{
// backgroundColor:"#b73a3a",
// padding:14,
// borderRadius:14,
// alignItems:"center",
// marginBottom:18
// },

// resetText:{
// color:"#fff",
// fontWeight:"800",
// fontSize:17
// },

// card:{
// backgroundColor:"#fff",
// padding:18,
// borderRadius:18,
// marginBottom:18,
// shadowColor:"#000",
// shadowOpacity:0.08,
// shadowRadius:10,
// elevation:4
// },

// cardRow:{
// flexDirection:"row",
// justifyContent:"space-between"
// },

// leftSection:{
// flex:1,
// paddingRight:8,
// paddingLeft:45,
// fontSize:14,

// },

// rightSection:{
// width:150,
// alignItems:"flex-end",
// fontSize:14,
// },

// name:{
// fontSize:18,
// fontWeight:"bold",
// marginBottom:2
// },

// phone:{
// marginBottom:8,
// color:"#000"
// },

// infoText:{
// fontSize:14,
// color:"#000",
// marginBottom:4
// },

// valueText:{
// color:"#000",
// fontWeight:"500",
// fontSize:14
// },

// statusBadge:{
// backgroundColor:"#e9d79a",
// paddingHorizontal:14,
// paddingVertical:6,
// borderRadius:20,
// marginBottom:8
// },

// statusText:{
// color:"#6b5a1a",
// fontWeight:"600",
// fontSize:14
// },

// time:{
// marginBottom:6,
// color:"#000",
// fontSize:14
// },

// image:{
// width:55,
// height:55,
// borderRadius:10,
// marginBottom:6
// },

// imagePlaceholder:{
// width:55,
// height:55,
// borderRadius:10,
// backgroundColor:"#eee",
// marginBottom:6
// },

// viewBtn:{
// backgroundColor:"#1e73d8",
// paddingHorizontal:18,
// paddingVertical:8,
// borderRadius:10
// },

// viewText:{
// color:"#fff",
// fontWeight:"bold"
// },

// rightInfo:{
// fontSize:13,
// color:"#000",
// marginBottom:4,
// textAlign:"right"
// },

// rightValue:{
// color:"#000",
// fontWeight:"500"
// },

// modalOverlay:{
// flex:1,
// backgroundColor:"rgba(0,0,0,0.4)",
// justifyContent:"center",
// alignItems:"center"
// },

// modalContainer:{
// width:"90%",
// backgroundColor:"#fff",
// borderRadius:20,
// padding:20
// },

// modalHeader:{
// flexDirection:"row",
// justifyContent:"space-between",
// alignItems:"center",
// marginBottom:15
// },

// modalTitle:{
// fontSize:20,
// fontWeight:"600"
// },

// closeBtn:{
// fontSize:22,
// fontWeight:"bold"
// },

// label:{
// fontSize:15,
// color:"#1c3d5a",
// marginTop:10
// },

// modalInput:{
// borderWidth:1,
// borderColor:"#ddd",
// borderRadius:12,
// padding:12,
// marginTop:5,
// backgroundColor:"#f9f9f9"
// },
//  dropdownIcon: {
//     fontSize: 16,
//     color: '#666',
//   },
// submitBtn:{
// backgroundColor:"#1e73d8",
// marginTop:20,
// padding:15,
// borderRadius:12,
// alignItems:"center"
// },

// submitText:{
// color:"#fff",
// fontSize:16,
// fontWeight:"600"
// }

// });


import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  ActivityIndicator
} from "react-native";

import { getVisitors } from "../api_config/api";
import { useBranch } from "../context/BranchContext";
import DateTimePicker from '@react-native-community/datetimepicker';

// ================= HELPERS =================

// const getImageUrl = (path?: string) => {
//   if (!path) return null;
//   if (path.startsWith("http")) return path;
//   return `https://emmveegatevue.com/${path}`;
// };

const getImageUrl = (path?: string) => {
  if (!path) return "";

  if (path.startsWith("http")) return path;

  return `https://emmveegatevue.com/${path.replace(/^\/+/, "")}`;
};
const formatDate = (dateString?: string) => {
  if (!dateString) return "N/A";

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return "N/A";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
const formatTime = (iso?: string) => {
  if (!iso) return "N/A";

  const date = new Date(iso);
  if (isNaN(date.getTime())) return "N/A";

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const formatTimeRange = (inTime?: string, outTime?: string) => {
  return `${formatTime(inTime)} - ${formatTime(outTime)}`;
};

export default function VisitorsScreen() {

  const { branch } = useBranch();

  const [phone, setPhone] = useState("");
  const [badge, setBadge] = useState("");
  const [badgeInput, setBadgeInput] = useState("");
const [meetInput, setMeetInput] = useState("");
const [purposeInput, setPurposeInput] = useState("");
  const [status, setStatus] = useState("All");
  const [showDropdown, setShowDropdown] = useState(false);

  const [visitors, setVisitors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const statusOptions = ["All", "pending", "checkedIn", "checkedOut"];
const [successMsg, setSuccessMsg] = useState('');
  const [selectedVisitor, setSelectedVisitor] = useState<any>(null);
const [modalVisible, setModalVisible] = useState(false);
const [checkInTime, setCheckInTime] = useState(new Date());
const [checkOutTime, setCheckOutTime] = useState(new Date());

const [isEdited, setIsEdited] = useState(false);

const [showCheckInPicker, setShowCheckInPicker] = useState(false);
const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);
const handleSubmit = () => {
  try {
    console.log("Updated Visitor:", {
      badgeInput,
      meetInput,
      purposeInput,
      checkInTime,
      checkOutTime,
    });

    // 🔥 close modal
    setModalVisible(false);

    // 🔥 success message
    setSuccessMsg("Visitor updated successfully");

    // reset edit state
    setIsEdited(false);

    // auto hide
    setTimeout(() => {
      setSuccessMsg('');
    }, 3000);

  } catch (e) {
    console.log("Update error:", e);
  }
};
  // ================= STATUS COLOR =================

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "checkedin": return "#73eca2";
      case "checkedout": return "#f0e292";
      case "pending": return "#ebb7b7";
      default: return "#ccc";
    }
  };

  // ================= FETCH =================

  useEffect(() => {
    fetchVisitors();
  }, [branch]);

  const fetchVisitors = async () => {
    try {
      setLoading(true);

      const res = await getVisitors({
        officeLocation: branch === "All" ? "" : branch
      });
console.log("FULL API RESPONSE:", res.data);
      const safeData =
        Array.isArray(res?.data?.data)
          ? res.data.data
          : Array.isArray(res?.data)
          ? res.data
          : [];

      const formatted = safeData.map((item: any) => ({
        id: item._id,
        name: item.firstName
          ? `${item.firstName} ${item.lastName || ""}`
          : "No Name",
        phone: item.phoneNumber || "-",
        email: item.email || "N/A",
        badge: item.badgeNumber || "N/A",
        location: item.officeLocation || "-",
        visitDate: item.checkin?.split("T")[0] || "-",
        purpose: item.purposeOfVisit || "-",
        meet: item.personToMeet || "-",
        checkIn: item.checkin,
        checkOut: item.checkout,
        status: item.status || "-",
        
        image: item.documentImageURL || item.documentImage || null
      }));

      setVisitors(formatted);

    } catch (e) {
      console.log("Visitors API Error:", e);
    } finally {
      setLoading(false);
    }
  };

  // ================= FILTER =================

  const filteredVisitors = visitors.filter((item) => {
    return (
      (phone ? item.phone.includes(phone) : true) &&
      (badge ? item.badge.includes(badge) : true) &&
      (status === "All"
        ? true
        : item.status?.toLowerCase() === status.toLowerCase())
    );
  });

  const resetFilters = () => {
    setPhone("");
    setBadge("");
    setStatus("All");
  };

  // ================= ITEM =================

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>

      <View style={styles.cardRow}>

        {/* LEFT */}
        <View style={styles.leftSection}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.phone}>{item.phone}</Text>

          <Text style={styles.infoText}>
            Email: <Text style={styles.valueText}>{item.email}</Text>
          </Text>

          <Text style={styles.infoText}>
            Badge: <Text style={styles.valueText}>{item.badge}</Text>
          </Text>

          <Text style={styles.infoText}>
            Location: <Text style={styles.valueText}>{item.location}</Text>
          </Text>

          <Text style={styles.infoText}>
            Visit Date: <Text style={styles.valueText}>{formatDate(item.visitDate)}</Text>
          </Text>
        </View>

        {/* RIGHT */}
        <View style={styles.rightSection}>

          <View style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) }
          ]}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>

          <Text style={styles.rightInfo}>
            Purpose: <Text style={styles.rightValue}>{item.purpose}</Text>
          </Text>

          <Text style={styles.rightInfo}>
            To Meet: <Text style={styles.rightValue}>{item.meet}</Text>
          </Text>

          {/* TIME FIX */}
          <Text style={styles.time}>
            {formatTimeRange(item.checkIn, item.checkOut)}
          </Text>

          {/* IMAGE FIX */}
          {item.image ? (
            <Image
  source={{ uri: item.image }}
  style={styles.image}
  resizeMode="cover"
/>
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text></Text>
            </View>
          )}

          <TouchableOpacity
  style={styles.viewBtn}
  onPress={() => {
    setSelectedVisitor(item);
    setBadgeInput(item.badge || "");
setMeetInput(item.meet || "");
setPurposeInput(item.purpose || "");

    if (item.checkIn) setCheckInTime(new Date(item.checkIn));
if (item.checkOut) setCheckOutTime(new Date(item.checkOut));

    setModalVisible(true);
  }}
>
  <Text style={styles.viewText}>View</Text>
</TouchableOpacity>
<Modal visible={modalVisible} transparent animationType="fade">
  <View style={styles.modalOverlay}>
    <View style={styles.modalContainer}>

      {/* HEADER */}
      <View style={styles.modalHeader}>
        <Text style={styles.modalTitle}>Visitor Details</Text>

        <TouchableOpacity onPress={() => setModalVisible(false)}>
          <Text style={styles.close}>X</Text>
        </TouchableOpacity>
      </View>

      {/* CONTENT */}
      {selectedVisitor && (
        <View>

          
          {/* BADGE */}
<Text style={styles.label}>Badge Number</Text>
<TextInput
  style={[styles.inputBox,styles.disabledInput]}
  value={badgeInput}
  editable={false}
  placeholder="Enter Badge Number"
/>

{/* PERSON */}
<Text style={styles.label}>Person to Meet</Text>
<TextInput
  style={styles.inputBox}
  value={meetInput}
  onChangeText={(text) => {
    setMeetInput(text);
    setIsEdited(true); // 🔥 ADD THIS
  }}
  placeholder="Enter Person Name"
/>

{/* PURPOSE */}
<Text style={styles.label}>Purpose of Visit</Text>
<TextInput
  style={styles.inputBox}
  value={purposeInput}
  onChangeText={(text) => {
    setPurposeInput(text);
    setIsEdited(true); // 🔥 ADD THIS
  }}
  placeholder="Enter Purpose"
/>

{/* CHECK-IN */}
{/* <Text style={styles.label}>Check-in Time</Text>
<TouchableOpacity
  style={styles.inputBox}
  onPress={() => setShowCheckInPicker(true)}
>
  <Text>{formatTime(checkInTime.toISOString())}</Text>
</TouchableOpacity>
{showCheckInPicker && (
  <DateTimePicker
    value={checkInTime}
    mode="time"
    display="default"
    onChange={(event, selectedDate) => {
      setShowCheckInPicker(false);
      if (selectedDate) setCheckInTime(selectedDate);
    }}
  />
)} */}

<Text style={styles.label}>Check-in Time</Text>
<TouchableOpacity
  style={styles.inputBox}
  onPress={() => setShowCheckInPicker(true)}
>
  <Text>{formatTime(checkInTime.toISOString())}</Text>
</TouchableOpacity>

{showCheckInPicker && (
  <DateTimePicker
    value={checkInTime}
    mode="time"
    display="default"
    onChange={(event, selectedDate) => {
      setShowCheckInPicker(false);
      if (selectedDate) {
        setCheckInTime(selectedDate);
        setIsEdited(true); // 🔥 ADD THIS
      }
    }}
  />
)}

{/* CHECK-OUT */}
{/* <Text style={styles.label}>Check-out Time</Text>
<TouchableOpacity
  style={styles.inputBox}
  onPress={() => setShowCheckOutPicker(true)}
>
  <Text>{formatTime(checkOutTime.toISOString())}</Text>
</TouchableOpacity>
{showCheckOutPicker && (
  <DateTimePicker
    value={checkOutTime}
    mode="time"
    display="default"
    onChange={(event, selectedDate) => {
      setShowCheckOutPicker(false);
      if (selectedDate) setCheckOutTime(selectedDate);
    }}
  />
)} */}

<Text style={styles.label}>Check-out Time</Text>
<TouchableOpacity
  style={styles.inputBox}
  onPress={() => setShowCheckOutPicker(true)}
>
  <Text>{formatTime(checkOutTime.toISOString())}</Text>
</TouchableOpacity>

{showCheckOutPicker && (
  <DateTimePicker
    value={checkOutTime}
    mode="time"
    display="default"
    onChange={(event, selectedDate) => {
      setShowCheckOutPicker(false);
      if (selectedDate) {
        setCheckOutTime(selectedDate);
        setIsEdited(true); // 🔥 ADD THIS
      }
    }}
  />
)}
          {/* <TouchableOpacity style={styles.submitBtn}> */}
            {/* <TouchableOpacity
  style={styles.submitBtn}
  onPress={() => {
    console.log("Submitted:", selectedVisitor);

    // Example: close modal after submit
    setModalVisible(false);
  }}
>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity> */}


<TouchableOpacity
  style={[
    styles.submitBtn,
    { backgroundColor: isEdited ? '#1e73d8' : '#ccc' } // 🔥 grey → blue
  ]}
  disabled={!isEdited}
  onPress={handleSubmit}
>
  <Text style={styles.submitText}>Submit</Text>
</TouchableOpacity>
        </View>
      )}

    </View>
  </View>
</Modal>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>

      {/* FILTERS */}
      <TextInput
        placeholder="Phone Number"
        style={styles.filterInput}
        value={phone}
        onChangeText={setPhone}
      />

      <TextInput
        placeholder="Badge Number"
        style={styles.filterInput}
        value={badge}
        onChangeText={setBadge}
      />

      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setShowDropdown(!showDropdown)}
      >
        <Text>{status}</Text>
        <Text style={styles.dropdownIcon}>▼</Text>
      </TouchableOpacity>

      {showDropdown && (
        <View style={styles.dropdownList}>
          {statusOptions.map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.dropdownItem}
              onPress={() => {
                setStatus(item);
                setShowDropdown(false);
              }}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <TouchableOpacity style={styles.resetBtn} onPress={resetFilters}>
        <Text style={styles.resetText}>Reset</Text>
      </TouchableOpacity>

      {/* LIST */}
      {/* SUCCESS MESSAGE */}
{successMsg !== '' && (
  <Text style={styles.successText}>
    {successMsg}
  </Text>
)}
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={filteredVisitors}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}

    </View>
  );
}

// ================= STYLES =================

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:"#f4f6fb",
    padding:16
  },

  filterInput:{
    backgroundColor:"#fff",
    padding:14,
    borderRadius:14,
    borderWidth:1,
    borderColor:"#ddd",
    marginBottom:14
  },

  dropdown:{
    backgroundColor:"#fff",
    borderRadius:14,
    padding:14,
    flexDirection:"row",
    justifyContent:"space-between",
    borderWidth:1,
    borderColor:"#ddd",
    marginBottom:8
  },

  dropdownIcon:{ fontSize:16 },

  dropdownList:{
    backgroundColor:"#fff",
    borderRadius:12,
    marginBottom:14 
  },

  dropdownItem:{ padding:14 },
  resetBtn:{
    backgroundColor:"#b73a3a",
    padding:14,
    borderRadius:14,
    alignItems:"center",
    marginBottom:18
  },

  resetText:{
    color:"#fff",
    fontWeight:"bold"
  },

  card:{
    backgroundColor:"#fff",
    padding:18,
    borderRadius:18,
    marginBottom:18,
    elevation:4
  },

  cardRow:{
    flexDirection:"row",
    justifyContent:"space-between"
  },

  leftSection:{ width:"57%",flex:1, paddingLeft:10 },
  rightSection:{ width:"43%", alignItems:"flex-end" },

  name:{ fontSize:18, fontWeight:"bold" },
  phone:{ marginBottom:8 },

  infoText:{ fontSize:14, marginBottom:3 },
  valueText:{ fontWeight:"500" },

  statusBadge:{
    paddingHorizontal:12,
    paddingVertical:5,
    borderRadius:15,
    marginBottom:6
  },

  statusText:{ fontSize:12 },

  rightInfo:{ textAlign:"right", marginBottom:3 },
  rightValue:{ fontWeight:"500" },

  time:{ marginVertical:5, textAlign:"right" },

  image:{
    width:65,
    height:45,
    borderRadius:6,
    marginBottom:6
  },

  imagePlaceholder:{
    width:65,
    height:45,
    backgroundColor:"#eee",
    borderRadius:6,
    justifyContent:"center",
    alignItems:"center",
    marginBottom:6
  },

  viewBtn:{
    backgroundColor:"#1e73d8",
    paddingHorizontal:16,
    paddingVertical:6,
    borderRadius:8
  },

  viewText:{ color:"#fff" },
  modalOverlay:{
  flex:1,
  backgroundColor:"rgba(0,0,0,0.5)",
  justifyContent:"center",
  alignItems:"center"
},

modalContainer:{
  width:"90%",
  backgroundColor:"#fff",
  borderRadius:20,
  padding:20
},

modalHeader:{
  flexDirection:"row",
  justifyContent:"space-between",
  alignItems:"center",
  marginBottom:15
},

modalTitle:{
  fontSize:20,
  fontWeight:"bold"
},

close:{
  fontSize:18,
  fontWeight:"bold"
},

label:{
  marginTop:10,
  marginBottom:4,
  fontWeight:"500",
  color:"#1e3a5f"
},



submitBtn:{
  backgroundColor:"#6c9ee4",
  padding:14,
  borderRadius:10,
  alignItems:"center",
  marginTop:20
},

submitText:{
  color:"#fff",
  fontWeight:"bold"
},
inputBox:{
  backgroundColor:"#ffffff",
  padding:14,
  borderRadius:10,
  marginBottom:8,
  borderWidth:1,
  borderColor:"#ddd"
},
disabledInput:{
  backgroundColor:"#e5e7eb",
  color:"#888"
},
successText:{
  color:"green",
  textAlign:"center",
  marginBottom:10,
  fontWeight:"600"
}

});