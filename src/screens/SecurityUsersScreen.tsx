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
ActivityIndicator,
Alert
} from "react-native";

import Images from '../utils/images';

import {
  getAllSecurity,
  createSecurity,
  deleteSecurity
} from '../api_config/api';

// 🔥 ADD CONTEXT
import { useBranch } from "../context/BranchContext";

export default function SecurityUsersScreen() {

// 🔥 GLOBAL BRANCH
const { branch: selectedBranch } = useBranch();

// ================= STATES =================

const [name,setName] = useState("");
const [empId,setEmpId] = useState("");
const [phone,setPhone] = useState("");

const [users,setUsers] = useState<any[]>([]);
const [loading,setLoading] = useState(true);

const [modalVisible,setModalVisible] = useState(false);
const [branchModal,setBranchModal] = useState(false);

const [fullName,setFullName] = useState("");
const [password,setPassword] = useState("");
const [empIdInput,setEmpIdInput] = useState("");
const [phoneInput,setPhoneInput] = useState("");
const [branch,setBranch] = useState("Select Branches"); // ✅ KEEP (for add user only)
const [showPassword,setShowPassword] = useState(false);

const branches = [
  "Corporate Office",
  "Dabaspet",
  "Ganganagar",
  "Sulibele"
];

// ================= ROLE MAPPER =================

const getRoleLabel = (role:any) => {
  switch(role){
    case 1: return "Admin";
    case 2: return "SuperAdmin";
    case 3: return "Security";
    default: return role;
  }
};

// ================= FETCH =================

// 🔥 UPDATED
useEffect(()=>{
  fetchUsers();
},[selectedBranch]);

const fetchUsers = async () => {
  try{
    setLoading(true);

    console.log("Selected Branch (Security):", selectedBranch);

    const res = await getAllSecurity({
      officeLocation: selectedBranch
    }
      // selectedBranch === "All" ? "" : selectedBranch
    );

    setUsers(res?.data?.response || []);

  }catch(e){
    console.log("Security API Error:",e);
  }finally{
    setLoading(false);
  }
};

// ================= RESET =================

const resetFilters = () => {
  setName("");
  setEmpId("");
  setPhone("");
};

// ================= DELETE =================

const removeUser = (employeeId: string) => {

  Alert.alert(
    "Confirm Delete",
    "Are you sure?",
    [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteSecurity(employeeId);
            fetchUsers();
          } catch {
            Alert.alert("Error", "Failed to delete user");
          }
        },
      },
    ]
  );

};

// ================= ADD USER =================

const addUser = async () => {

  if(!fullName || !empIdInput || branch === "Select Branches"){
    Alert.alert("Validation Error","Please fill all the fields.");
    return;
  }

  try{

    await createSecurity({
      userName: fullName,
      password,
      employeeId: empIdInput,
      phoneNumber: phoneInput,
      officeLocation: branch,
      role: 3
    });

    setModalVisible(false);

    setFullName("");
    setPassword("");
    setEmpIdInput("");
    setPhoneInput("");
    setBranch("Select Branches");

    fetchUsers();

  }catch{
    Alert.alert("Error","Failed to create user");
  }
};

// ================= FILTER =================

const filteredUsers = users.filter(user =>
  (user.userName || "").toLowerCase().includes(name.toLowerCase()) &&
  (user.employeeId || "").includes(empId) &&
  (user.phoneNumber || "").includes(phone)
);

// ================= LOADING =================

if(loading){
  return <ActivityIndicator size="large" style={{marginTop:50}} />;
}

// ================= ITEM =================

const renderItem = ({item}:any) => (

<View style={styles.card}>

<Text style={styles.name}>{item.userName}</Text>

<Text style={styles.role}>
Role: <Text style={styles.roleValue}>
  {getRoleLabel(item.role)}
</Text>
</Text>

<Text style={styles.info}>Password: {item.password}</Text>
<Text style={styles.info}>Phone: {item.phoneNumber}</Text>
<Text style={styles.info}>Emp ID: {item.employeeId}</Text>

<Text style={styles.office}>
Offices: <Text style={styles.officeValue}>{item.officeLocation}</Text>
</Text>

<TouchableOpacity
style={styles.removeBtn}
onPress={()=>removeUser(item.employeeId)}
>
<Text style={styles.removeText}>Remove</Text>
</TouchableOpacity>

</View>
);

// ================= UI =================

return (

<View style={styles.container}>

<View style={styles.logoRow}>
<Image source={Images.Logo} style={styles.logo} />

<TouchableOpacity
style={styles.addBtn}
onPress={()=>setModalVisible(true)}
>
<Text style={styles.addText}>+ Add Security</Text>
</TouchableOpacity>
</View>

<TextInput placeholder="Search by Name" style={styles.input} value={name} onChangeText={setName} />
<TextInput placeholder="Search by Employee ID" style={styles.input} value={empId} onChangeText={setEmpId} />
<TextInput placeholder="Search by Phone" style={styles.input} value={phone} onChangeText={setPhone} />

<TouchableOpacity style={styles.resetBtn} onPress={resetFilters}>
<Text style={styles.resetText}>Reset</Text>
</TouchableOpacity>

<FlatList
data={filteredUsers}
renderItem={renderItem}
keyExtractor={(item)=>item._id || item.employeeId}
/>

{/* ADD USER MODAL */}
<Modal visible={modalVisible} transparent>

<View style={styles.modalOverlay}>
<View style={styles.modalContainer}>

<Text style={styles.modalTitle}>Add Security User</Text>

<TextInput placeholder="Full Name" style={styles.modalInput} value={fullName} onChangeText={setFullName} />

<TextInput
placeholder="Password"
style={styles.modalInput}
secureTextEntry={!showPassword}
value={password}
onChangeText={setPassword}
/>

<TouchableOpacity onPress={()=>setShowPassword(!showPassword)}>
<Text style={styles.hidePassword}>
{showPassword ? "Hide Password" : "Show Password"}
</Text>
</TouchableOpacity>

<TextInput placeholder="Employee ID" style={styles.modalInput} value={empIdInput} onChangeText={setEmpIdInput} />
<TextInput placeholder="Phone Number" style={styles.modalInput} value={phoneInput} onChangeText={setPhoneInput} />

{/* BRANCH */}
<Text style={styles.branchLabel}>Choose Branch</Text>
<TouchableOpacity style={styles.dropdown} onPress={()=>setBranchModal(true)}>
<Text>{branch}</Text>
<Text>▼</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.addUserBtn} onPress={addUser}>
<Text style={styles.addUserText}>Add</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.cancelBtn} onPress={()=>setModalVisible(false)}>
<Text style={styles.cancelText}>Cancel</Text>
</TouchableOpacity>

</View>
</View>
</Modal>

{/* BRANCH MODAL */}
<Modal visible={branchModal} transparent>
<View style={styles.modalOverlay}>
<View style={styles.modalContainer}>

{branches.map((b)=>(
  <TouchableOpacity key={b} style={styles.rangeItem} onPress={()=>{
    setBranch(b);
    setBranchModal(false);
  }}>
    <Text>{b}</Text>
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
container:{ flex:1, backgroundColor:"#eef1f6", padding:16 },
logoRow:{ flexDirection:"row", justifyContent:"space-between", alignItems:"center", marginBottom:16 },
logo:{ width:120, height:60, resizeMode:"contain" },
addBtn:{ backgroundColor:"#1e73d8", padding:12, borderRadius:10 },
addText:{ color:"#fff", fontWeight:"bold" },
input:{ backgroundColor:"#fff", padding:14, borderRadius:12, marginBottom:12 },
resetBtn:{ backgroundColor:"#b53a37", padding:14, borderRadius:12, alignItems:"center", marginBottom:18 },
resetText:{ color:"#fff", fontWeight:"bold" },
card:{ backgroundColor:"#fff", padding:18, borderRadius:18, marginBottom:18 },
name:{ fontSize:20, fontWeight:"bold" },
role:{ color:"green", marginBottom:8 },
roleValue:{ color:"green" },
info:{ marginBottom:4 },
office:{ color:"#1e73d8" },
officeValue:{ color:"#1e73d8" },
removeBtn:{ backgroundColor:"#b53a37", padding:12, borderRadius:10, marginTop:10 },
removeText:{ color:"#fff", textAlign:"center" },
modalOverlay:{ flex:1, justifyContent:"center", backgroundColor:"rgba(0,0,0,0.5)" },
modalContainer:{ backgroundColor:"#fff", margin:20, padding:20, borderRadius:10 },
modalTitle:{ fontSize:20, textAlign:"center", marginBottom:15 },
modalInput:{ backgroundColor:"#f2f2f2", padding:12, borderRadius:10, marginBottom:10 },
hidePassword:{ textAlign:"right", color:"#1e73d8", marginBottom:10 },
dropdown:{ backgroundColor:"#f2f2f2", padding:12, borderRadius:10, flexDirection:"row", justifyContent:"space-between", marginBottom:15 },
addUserBtn:{ backgroundColor:"#1e73d8", padding:14, borderRadius:10, alignItems:"center" },
addUserText:{ color:"#fff", fontWeight:"bold" },
cancelBtn:{ backgroundColor:"#b53a37", padding:14, borderRadius:10, alignItems:"center", marginTop:10 },
cancelText:{ color:"#fff" },
rangeItem:{ padding:12 },
branchLabel:{
  marginBottom:6,
  fontSize:14,
  color:"#444",
  fontWeight:"500"
},
});