// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   ActivityIndicator,
//   Alert
// } from 'react-native';

// import { SafeAreaView } from 'react-native-safe-area-context';
// import Images from '../utils/images';

// // ✅ NEW IMPORT (IMPORTANT)
// import {
//   getAllAdmins,
//   createAdmin,
//   deleteAdmin
// } from '../api_config/api';

// const AdminUsersScreen = () => {

//   const [name, setName] = useState('');
//   const [empId, setEmpId] = useState('');
//   const [phone, setPhone] = useState('');

//   const [loading, setLoading] = useState(true);
//   const [adminList, setAdminList] = useState<any[]>([]);

//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [employeeId, setEmployeeId] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [branch, setBranch] = useState('');

//   // ================= FETCH ADMINS =================

//   useEffect(() => {
//     fetchAdmins();
//   }, []);

//   const fetchAdmins = async () => {
//     try {
//       setLoading(true);

//       // ✅ NEW WAY
//       const res = await getAllAdmins('All');

//       setAdminList(res || []);

//     } catch (e) {
//       console.log('Admin API Error:', e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ================= RESET =================

//   const resetFilters = () => {
//     setName('');
//     setEmpId('');
//     setPhone('');
//   };

//   // ================= DELETE ADMIN =================

//   const removeAdmin = async (employeeId: string) => {
//     try {
//       await deleteAdmin(employeeId); // ✅ FIXED
//       fetchAdmins();
//     } catch (e) {
//       Alert.alert('Error', 'Failed to delete admin');
//     }
//   };

//   // ================= ADD ADMIN =================

//   const addAdmin = async () => {

//     if (!fullName || !employeeId) {
//       Alert.alert('Validation', 'Name & Employee ID required');
//       return;
//     }

//     try {
//       await createAdmin({
//         userName: fullName,
//         email,
//         password,
//         employeeId,
//         phoneNumber,
//         officeLocation: branch
//       });

//       // reset form
//       setFullName('');
//       setEmail('');
//       setPassword('');
//       setEmployeeId('');
//       setPhoneNumber('');
//       setBranch('');

//       fetchAdmins();

//     } catch (e) {
//       Alert.alert('Error', 'Failed to create admin');
//     }
//   };

//   // ================= LOADING =================

//   if (loading) {
//     return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView>

//         <View style={styles.topRow}>
//           <Image source={Images.Logo} style={styles.logo} />

//           <TouchableOpacity
//             style={styles.addButton}
//             onPress={addAdmin}
//           >
//             <Text style={styles.addButtonText}>+ Add Admin</Text>
//           </TouchableOpacity>
//         </View>

//         <TextInput
//           placeholder="Search by Name"
//           style={styles.input}
//           value={name}
//           onChangeText={setName}
//         />

//         <TextInput
//           placeholder="Search by Employee ID"
//           style={styles.input}
//           value={empId}
//           onChangeText={setEmpId}
//         />

//         <TextInput
//           placeholder="Search by Phone"
//           style={styles.input}
//           value={phone}
//           onChangeText={setPhone}
//         />

//         <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
//           <Text style={styles.resetText}>Reset</Text>
//         </TouchableOpacity>

//         {
//           adminList
//             .filter(admin =>
//               admin.userName?.toLowerCase().includes(name.toLowerCase()) &&
//               admin.employeeId?.includes(empId) &&
//               admin.phoneNumber?.includes(phone)
//             )
//             .map((admin, index) => (

//               <View key={index} style={styles.card}>

//                 <Text style={styles.adminName}>{admin.userName}</Text>

//                 <Text style={styles.role}>Role: Admin</Text>
//                 <Text style={styles.info}>Email: {admin.email}</Text>
//                 <Text style={styles.info}>Phone: {admin.phoneNumber}</Text>
//                 <Text style={styles.info}>Emp ID: {admin.employeeId}</Text>

//                 <Text style={styles.office}>
//                   Offices: {admin.officeLocation}
//                 </Text>

//                 <TouchableOpacity
//                   style={styles.removeButton}
//                   onPress={() => removeAdmin(admin.employeeId)}
//                 >
//                   <Text style={styles.removeText}>Remove</Text>
//                 </TouchableOpacity>

//               </View>

//             ))
//         }

//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default AdminUsersScreen;

// const styles = StyleSheet.create({

// container:{
// flex:1,
// backgroundColor:'#f5f7fb',
// padding:16
// },

// topRow:{
// flexDirection:'row',
// justifyContent:'space-between',
// alignItems:'center',
// marginBottom:20
// },

// logo:{
// width:120,
// height:50,
// resizeMode:'contain'
// },

// addButton:{
// backgroundColor:'#1e73d8',
// paddingHorizontal:18,
// paddingVertical:10,
// borderRadius:10
// },

// addButtonText:{
// color:'#fff',
// fontWeight:'bold'
// },

// input:{
// backgroundColor:'#fff',
// borderRadius:10,
// padding:14,
// marginBottom:15,
// borderWidth:1,
// borderColor:'#ddd'
// },

// showPassword:{
// color:'#1e73d8',
// marginBottom:10,
// alignSelf:'flex-end'
// },

// resetButton:{
// backgroundColor:'#b73a3a',
// padding:15,
// borderRadius:10,
// alignItems:'center',
// marginBottom:20
// },

// resetText:{
// color:'#fff',
// fontSize:18,
// fontWeight:'bold'
// },

// card:{
// backgroundColor:'#fff',
// padding:20,
// borderRadius:15,
// marginBottom:20,
// shadowColor:'#000',
// shadowOpacity:0.1,
// shadowRadius:6,
// elevation:4
// },

// adminName:{
// fontSize:22,
// fontWeight:'bold'
// },

// role:{
// color:'green',
// marginBottom:8
// },

// info:{
// fontSize:16
// },

// office:{
// color:'#1e73d8',
// marginTop:6
// },

// removeButton:{
// backgroundColor:'#b73a3a',
// padding:12,
// borderRadius:10,
// marginTop:12,
// alignItems:'center'
// },

// removeText:{
// color:'#fff',
// fontWeight:'bold'
// },

// modalOverlay:{
// flex:1,
// backgroundColor:'rgba(0,0,0,0.5)',
// justifyContent:'center',
// alignItems:'center'
// },

// modalContainer:{
// width:'85%',
// backgroundColor:'#fff',
// padding:20,
// borderRadius:15
// },

// modalTitle:{
// fontSize:22,
// fontWeight:'bold',
// marginBottom:15,
// textAlign:'center'
// },

// branchLabel:{
// fontSize:16,
// marginBottom:6,
// marginTop:5
// },

// branchBox:{
// flexDirection:'row',
// justifyContent:'space-between',
// alignItems:'center',
// backgroundColor:'#fff',
// borderWidth:1,
// borderColor:'#ddd',
// borderRadius:10,
// padding:14,
// marginBottom:15
// },

// branchText:{
// fontSize:16
// },

// arrow:{
// fontSize:16
// },

// addAdminButton:{
// backgroundColor:'#1e73d8',
// padding:14,
// borderRadius:10,
// alignItems:'center',
// marginTop:10
// },

// addAdminText:{
// color:'#fff',
// fontWeight:'bold',
// fontSize:16
// },

// cancelButton:{
// backgroundColor:'#b73a3a',
// padding:14,
// borderRadius:10,
// alignItems:'center',
// marginTop:10
// },

// cancelText:{
// color:'#fff',
// fontWeight:'bold'
// },

// branchModal:{
// width:'80%',
// backgroundColor:'#fff',
// borderRadius:15,
// padding:20
// },

// branchItem:{
// paddingVertical:12,
// borderBottomWidth:1,
// borderColor:'#eee'
// },

// branchItemText:{
// fontSize:18
// },

// cancelBranch:{
// textAlign:'center',
// marginTop:20,
// fontSize:18,
// color:'#1a73e8'
// }

// });

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  Modal
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import Images from '../utils/images';

import {
  getAllAdmins,
  createAdmin,
  deleteAdmin
} from '../api_config/api';

import { useBranch } from '../context/BranchContext';
import { useAuth } from '../context/AuthContext';

const AdminUsersScreen = () => {
  const { userRole } = useAuth();
  const { branch } = useBranch();

  const [name, setName] = useState('');
  const [empId, setEmpId] = useState('');
  const [phone, setPhone] = useState('');

  const [loading, setLoading] = useState(true);
  const [adminList, setAdminList] = useState<any[]>([]);

  const [modalVisible, setModalVisible] = useState(false);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const [branchModal, setBranchModal] = useState(false);
  const [tempBranch, setTempBranch] = useState('');
  const [branchInput, setBranchInput] = useState("Select Branches");

  const branches = [
    "Corporate Office",
    "Dabaspet",
    "Ganganagar",
    "Sulibele"
  ];

  // ================= FETCH =================

  const fetchAdmins = async () => {
    if(userRole !== 1 && userRole !== 2) return;  
    try {
      setLoading(true);

      const res = await getAllAdmins({
        officeLocation: branch === "All" ? "" : branch,
        role: 1,
        page: 1,
        limit: 100,
      });

      setAdminList(
        res?.data?.response ||
        res?.data?.data ||
        []
      );

    } catch (e) {
      console.log('Admin API Error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, [branch]);

  // ================= DELETE =================

  const removeAdmin = (employeeId: string) => {
    if (userRole !== 1 && userRole !== 2) return;
    Alert.alert("Confirm Delete", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deleteAdmin(employeeId);
          fetchAdmins();
        }
      }
    ]);
  };

  // ================= ADD =================

  const addAdmin = async () => {
    if (userRole !== 1 && userRole !== 2) return;
    if (!fullName || !employeeId || branchInput === "Select Branches") {
      Alert.alert("Validation Error", "Please fill all the fields.");
      return;
    }

    await createAdmin({
      userName: fullName,
      email,
      password,
      employeeId,
      phoneNumber,
      officeLocation: branchInput,
      role: 1,
    });

    setModalVisible(false);

    setFullName('');
    setEmail('');
    setPassword('');
    setEmployeeId('');
    setPhoneNumber('');
    setBranchInput("Select Branches");

    fetchAdmins();
  };

  // ================= FILTER =================

  const filteredAdmins = adminList.filter(admin =>
    (admin.userName || '').toLowerCase().includes(name.toLowerCase()) &&
    (admin.employeeId || '').includes(empId) &&
    (admin.phoneNumber || '').includes(phone)
  );

  // ================= LOADING =================

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }
  if (userRole !== 1) {
  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text style={{ fontSize:18, fontWeight:'bold', color:'red' }}>
        Access Denied
      </Text>
    </View>
  );
}

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

        {/* HEADER */}
        <View style={styles.topRow}>
          <Image source={Images.Logo} style={styles.logo} />

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addButtonText}>+ Add Admin</Text>
          </TouchableOpacity>
        </View>

        {/* FILTER */}
        <TextInput placeholder="Search by Name" style={styles.input} value={name} onChangeText={setName} />
        <TextInput placeholder="Search by Employee ID" style={styles.input} value={empId} onChangeText={setEmpId} />
        <TextInput placeholder="Search by Phone" style={styles.input} value={phone} onChangeText={setPhone} />

        <TouchableOpacity style={styles.resetButton} onPress={() => {
          setName(''); setEmpId(''); setPhone('');
        }}>
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>

        {/* LIST */}
        {filteredAdmins.map((admin, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.adminName}>{admin.userName}</Text>

            <Text style={styles.role}>Role: Admin</Text>
            <Text style={styles.info}>Email: {admin.email}</Text>
            <Text style={styles.info}>Password: {admin.password}</Text>
          <Text style={styles.info}>Phone: {admin.phoneNumber}</Text>
            <Text style={styles.info}>Emp ID: {admin.employeeId}</Text>

            <Text style={styles.office}>
              Offices: {admin.officeLocation}
            </Text>

            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeAdmin(admin.employeeId)}
            >
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}

      </ScrollView>

      {/* ADD ADMIN MODAL */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>

            <Text style={styles.modalTitle}>Add Admin User</Text>

            <TextInput placeholder="Full Name" style={styles.modalInput} value={fullName} onChangeText={setFullName} />
            <TextInput placeholder="Email" style={styles.modalInput} value={email} onChangeText={setEmail} />

            <TextInput
              placeholder="Password"
              style={styles.modalInput}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.showPassword}>
                {showPassword ? "Hide Password" : "Show Password"}
              </Text>
            </TouchableOpacity>

            <TextInput placeholder="Employee ID" style={styles.modalInput} value={employeeId} onChangeText={setEmployeeId} />
            <TextInput placeholder="Phone Number" style={styles.modalInput} value={phoneNumber} onChangeText={setPhoneNumber} />

            {/* DROPDOWN */}
            <Text style={styles.branchLabel}>Choose Branch</Text>

            {/* <TouchableOpacity style={styles.dropdown} onPress={() => setBranchModal(true)}>
              <Text>{branchInput}</Text>
              <Text>▼</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
  style={styles.dropdown}
  onPress={() => setBranchModal(true)}
>
  <Text style={[
    styles.dropdownText,
    branchInput === "Select Branches" && styles.placeholder
  ]}>
    {branchInput || "Select Branches"}
  </Text>

  <Text style={styles.dropdownIcon}>▼</Text>
</TouchableOpacity>

            <TouchableOpacity style={styles.addAdminButton} onPress={addAdmin}>
              <Text style={styles.addAdminText}>Add</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

      {/* BRANCH MODAL */}
      <Modal visible={branchModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.branchModalContainer}>

            <Text style={styles.modalTitle}>Select Branches</Text>

            {branches.map((b) => (
              <TouchableOpacity
                key={b}
                style={styles.branchItem}
                onPress={() => setTempBranch(b)}
              >
                <Text style={{
                  color: tempBranch === b ? "#1e73d8" : "#000"
                }}>
                  {b}
                </Text>
              </TouchableOpacity>
            ))}

            <View style={styles.buttonRow}>

              <TouchableOpacity
                style={styles.doneBtn}
                onPress={() => {
                  setBranchInput(tempBranch);
                  setBranchModal(false);
                }}
              >
                <Text style={styles.btnText}>Done</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setBranchModal(false)}
              >
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>

            </View>

          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

export default AdminUsersScreen;

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:'#f5f7fb',
    padding:16
  },

  // ================= HEADER =================
  topRow:{
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

  addButton:{
    backgroundColor:'#1e73d8',
    paddingHorizontal:18,
    paddingVertical:10,
    borderRadius:10
  },

  addButtonText:{
    color:'#fff',
    fontWeight:'bold'
  },

  // ================= INPUT =================
  input:{
    backgroundColor:'#fff',
    borderRadius:10,
    padding:14,
    marginBottom:15,
    borderWidth:1,
    borderColor:'#ddd'
  },

  // ================= RESET =================
  resetButton:{
    backgroundColor:'#b73a3a',
    padding:15,
    borderRadius:10,
    alignItems:'center',
    marginBottom:20
  },

  resetText:{
    color:'#fff',
    fontSize:18,
    fontWeight:'bold'
  },

  // ================= CARD =================
  card:{
    backgroundColor:'#fff',
    padding:20,
    borderRadius:15,
    marginBottom:20,

    // 🔥 SHADOW
    shadowColor:'#000',
    shadowOpacity:0.1,
    shadowRadius:6,
    shadowOffset:{ width:0, height:2 },
    elevation:4
  },

  adminName:{
    fontSize:22,
    fontWeight:'bold',
    marginBottom:6
  },

  role:{
    color:'green',
    marginBottom:8,
    fontWeight:'500'
  },

  info:{
    fontSize:16,
    marginBottom:2
  },

  office:{
    color:'#1e73d8',
    marginTop:6,
    fontWeight:'500'
  },

  removeButton:{
    backgroundColor:'#b73a3a',
    padding:12,
    borderRadius:10,
    marginTop:12,
    alignItems:'center'
  },

  removeText:{
    color:'#fff',
    fontWeight:'bold'
  },

  // ================= MODAL =================
  modalOverlay:{
    flex:1,
    backgroundColor:'rgba(0,0,0,0.5)',
    justifyContent:'center',
    alignItems:'center'
  },

  modalContainer:{
    width:'85%',
    backgroundColor:'#fff',
    padding:20,
    borderRadius:15
  },

  modalTitle:{
    fontSize:22,
    fontWeight:'bold',
    marginBottom:15,
    textAlign:'center'
  },

  modalInput:{
    backgroundColor:'#f2f2f2',
    padding:14,
    borderRadius:12,
    marginBottom:12
  },

  showPassword:{
    textAlign:'right',
    color:'#1e73d8',
    marginBottom:10,
    fontWeight:'500'
  },

  branchLabel:{
    fontSize:14,
    marginBottom:6,
    color:'#444',
    fontWeight:'500'
  },

  addAdminButton:{
    backgroundColor:'#1e73d8',
    padding:14,
    borderRadius:12,
    alignItems:'center',
    marginTop:10
  },

  addAdminText:{
    color:'#fff',
    fontWeight:'bold',
    fontSize:16
  },

  cancelButton:{
    backgroundColor:'#b73a3a',
    padding:14,
    borderRadius:12,
    alignItems:'center',
    marginTop:10
  },

  cancelText:{
    color:'#fff',
    fontWeight:'bold'
  },
  dropdown:{
  backgroundColor:"#f2f2f2",
  padding:14,
  borderRadius:10,
  flexDirection:"row",
  justifyContent:"space-between",
  alignItems:"center",
  marginBottom:15
},

dropdownIcon:{
  fontSize:16,
  color:"#555"
},

branchModalContainer:{
  width:"85%",
  backgroundColor:"#fff",
  borderRadius:15,
  padding:20
},

branchItem:{
  paddingVertical:14,
  borderBottomWidth:1,
  borderColor:"#eee"
},

buttonRow:{
  flexDirection:"row",
  justifyContent:"space-between",
  marginTop:20
},

doneBtn:{
  backgroundColor:"#1e73d8",
  padding:12,
  borderRadius:10,
  width:"45%",
  alignItems:"center"
},

cancelBtn:{
  backgroundColor:"#b73a3a",
  padding:12,
  borderRadius:10,
  width:"45%",
  alignItems:"center"
},

btnText:{
  color:"#fff",
  fontWeight:"bold"
},


dropdownText:{
  fontSize:16
},

placeholder:{
  color:'#999'
},



});
