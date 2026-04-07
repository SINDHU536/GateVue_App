// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import {
//   DrawerContentScrollView,
//   DrawerItemList,
// } from '@react-navigation/drawer';

// const CustomDrawer = (props: any) => {
//   return (

//     <DrawerContentScrollView
//       {...props}
//       contentContainerStyle={styles.container}
//     >

//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.title}>GATEVUE</Text>
//       </View>

//       {/* Divider */}
//       <View style={styles.divider} />

//       {/* Drawer Items */}
//       <DrawerItemList {...props} />

//     </DrawerContentScrollView>

//   );
// };

// export default CustomDrawer;

// const styles = StyleSheet.create({

//   container:{
//     flex:1,
//     backgroundColor:'#fff',
//     fontSize:16,
//     fontWeight:'600'
//   },

//   header:{
//     padding:20,
    

//   },

//   title:{
//     fontSize:28,
//     fontWeight:'bold',
//     color:'#2c3e50'
//   },

//   divider:{
//     height:1,
//     backgroundColor:'#dcdcdc',
//     marginHorizontal:20,
//     marginBottom:10
//   }

// });


import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import { useAuth } from '../context/AuthContext';

const CustomDrawer = (props: any) => {

  const { userName, userRole, userBranch, logout } = useAuth();

  // 🔥 Role Name Mapping
  const getRoleName = () => {
    switch (userRole) {
      case 1:
        return 'Super Admin';
      case 2:
        return 'Admin';
      case 3:
        return 'Security';
      default:
        return 'User';
    }
  };

  // 🔥 Logout Confirmation
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: logout }
      ]
    );
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
    >

      {/* 🔥 HEADER */}
      <View style={styles.header}>

        <Text style={styles.title}>gatevue</Text>

       
        

      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Drawer Items */}
      <DrawerItemList {...props} />

      
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;


// ================= STYLES =================
const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:'#fff'
  },

  header:{
    padding:20,
    textAlign:'center'
    
  },

  title:{
    fontSize:26,
    fontWeight:'bold',
    color:'#2c3e50',
    marginBottom:10
  },

  userName:{
    fontSize:18,
    fontWeight:'600',
    color:'#333'
  },

  role:{
    fontSize:14,
    color:'#1a73e8',
    marginTop:4
  },

  branch:{
    fontSize:13,
    color:'#666',
    marginTop:4
  },

  divider:{
    height:1,
    backgroundColor:'#e0e0e0',
    marginVertical:10
  },

  logoutBtn:{
    marginTop:20,
    marginHorizontal:20,
    padding:14,
    backgroundColor:'#e74c3c',
    borderRadius:10,
    alignItems:'center'
  },

  logoutText:{
    color:'#fff',
    fontWeight:'bold',
    fontSize:16
  }

});