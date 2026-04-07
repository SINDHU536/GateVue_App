// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { useAuth } from '../context/AuthContext';

// const LogoutScreen = ({ navigation }: any) => {

//   const { logout } = useAuth(); // 🔥 use context

//   const handleLogout = async () => {
//     await logout(); // 🔥 clears storage + resets state
//   };

//   return (
//     <View style={styles.container}>

//       <View style={styles.card}>

//         <Text style={styles.title}>
//           Logout Confirmation
//         </Text>

//         <Text style={styles.message}>
//           Are you sure you want to logout?
//         </Text>

//         <View style={styles.row}>

//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Text style={styles.cancel}>
//               CANCEL
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={handleLogout}>
//             <Text style={styles.logout}>
//               LOGOUT
//             </Text>
//           </TouchableOpacity>

//         </View>

//       </View>

//     </View>
//   );
// };

// export default LogoutScreen;

// const styles = StyleSheet.create({

//   container:{
//     flex:1,
//     backgroundColor:'#00000040',
//     justifyContent:'center',
//     alignItems:'center'
//   },

//   card:{
//     width:'85%',
//     backgroundColor:'#fff',
//     padding:25,
//     borderRadius:8
//   },

//   title:{
//     fontSize:22,
//     fontWeight:'bold',
//     marginBottom:10
//   },

//   message:{
//     fontSize:16,
//     marginBottom:25
//   },

//   row:{
//     flexDirection:'row',
//     justifyContent:'flex-end',
//     gap:20
//   },

//   cancel:{
//     color:'#009688',
//     fontWeight:'600',
//     fontSize:16
//   },

//   logout:{
//     color:'#009688',
//     fontWeight:'600',
//     fontSize:16
//   }

// });

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext';

const LogoutScreen = ({ navigation }: any) => {

  const { logout } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    if (loading) return; // 🔥 prevent multiple clicks

    try {
      setLoading(true);
      await logout(); // 🔥 clears storage + redirects automatically
    } catch (e) {
      console.log("Logout error:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.overlay}>

      <View style={styles.card}>

        <Text style={styles.title}>
          Logout Confirmation
        </Text>

        <Text style={styles.message}>
          Are you sure you want to logout?
        </Text>

        <View style={styles.row}>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.cancel}>
              CANCEL
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLogout}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#009688" />
            ) : (
              <Text style={styles.logout}>
                LOGOUT
              </Text>
            )}
          </TouchableOpacity>

        </View>

      </View>

    </View>
  );
};

export default LogoutScreen;


// ================= STYLES =================
const styles = StyleSheet.create({

  overlay:{
    flex:1,
    backgroundColor:'rgba(0,0,0,0.5)', // 🔥 better overlay
    justifyContent:'center',
    alignItems:'center'
  },

  card:{
    width:'85%',
    backgroundColor:'#fff',
    padding:25,
    borderRadius:12, // 🔥 smoother UI
    elevation:5 // 🔥 Android shadow
  },

  title:{
    fontSize:22,
    fontWeight:'bold',
    marginBottom:10
  },

  message:{
    fontSize:16,
    marginBottom:25
  },

  row:{
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems:'center',
    gap:20
  },

  cancel:{
    color:'#009688',
    fontWeight:'600',
    fontSize:16
  },

  logout:{
    color:'#d32f2f', // 🔥 red for logout (better UX)
    fontWeight:'600',
    fontSize:16
  }

});