// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';

// import { SafeAreaView } from 'react-native-safe-area-context';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// import Images from '../utils/images';
// import { useAuth } from '../context/AuthContext';

// // ✅ API
// import { loginUser } from '../api_config/api';

// const LoginScreen = () => {

//   const { setUserRole, setUserName, setUserBranch, setToken } = useAuth();

//   const [employeeId, setEmployeeId] = useState('');
//   const [password, setPassword] = useState('');

//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   // ================= LOGIN =================
//   const handleLogin = async () => {

//     if (!employeeId.trim() || !password.trim()) {
//       Alert.alert('Validation Error', 'Enter Employee ID & Password');
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await loginUser({
//         employeeId,
//         password
//       });

//       console.log("FULL RESPONSE:", res);

//       // ✅ CORRECT EXTRACTION
//       const responseData = res?.data?.data;

//       const token = responseData?.token;
//       const user = responseData?.user;

//       console.log("USER:", user);
//       console.log("ROLE:", user?.role);

//       if (!user || user.role === undefined || user.role === null) {
//         Alert.alert("Login Failed", "User role not found");
//         return;
//       }

//       // 🔥 HANDLE BRANCH (array or string)
//       let branchValue = '';

//       if (Array.isArray(user.officeLocation)) {
//         branchValue = user.officeLocation[0]; // take first branch
//       } else {
//         branchValue = user.officeLocation || '';
//       }

//       // ✅ UPDATE CONTEXT
//       setUserRole(user.role);
//       setUserName(user.userName || '');
//       setUserBranch(branchValue);
//       setToken(token || null);

//       // ✅ STORE DATA
//       if (token) {
//         await AsyncStorage.setItem('token', token);
//       }

//       await AsyncStorage.setItem('user', JSON.stringify(user));
//       await AsyncStorage.setItem('userName', user.userName || '');
//       await AsyncStorage.setItem('userRole', String(user.role));
//       await AsyncStorage.setItem(
//         'officeLocation',
//         JSON.stringify(branchValue)
//       );

//       // 🚀 Navigation handled by AppNavigator

//     } catch (error: any) {
//       console.log('❌ Login error:', error);

//       Alert.alert(
//         'Login Failed',
//         error?.response?.data?.message || 'Invalid credentials'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>

//       <Image source={Images.Logo} style={styles.logo} />

//       <Text style={styles.title}>GATEVUE</Text>

//       <TextInput
//         placeholder="Employee ID"
//         style={styles.input}
//         value={employeeId}
//         onChangeText={setEmployeeId}
//       />

//       <View style={styles.passwordContainer}>
//         <TextInput
//           placeholder="Password"
//           style={styles.passwordInput}
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry={!showPassword}
//         />

//         <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//           <Icon
//             name={showPassword ? 'eye' : 'eye-off'}
//             size={24}
//             color="#888"
//           />
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         {loading ? (
//           <ActivityIndicator color="#fff" />
//         ) : (
//           <Text style={styles.buttonText}>Login</Text>
//         )}
//       </TouchableOpacity>

//     </SafeAreaView>
//   );
// };

// export default LoginScreen;


// // ================= STYLES =================
// const styles = StyleSheet.create({

//   container: {
//     flex: 1,
//     backgroundColor: '#003366',
//     padding: 20,
//     justifyContent: 'center'
//   },

//   logo: {
//     width: 150,
//     height: 60,
//     alignSelf: 'center',
//     marginBottom: 20,
//     resizeMode: 'contain'
//   },

//   title: {
//     fontSize: 28,
//     color: '#fff',
//     textAlign: 'center',
//     fontWeight: 'bold',
//     marginBottom: 30
//   },

//   input: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     padding: 14,
//     marginBottom: 15
//   },

//   passwordContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     marginBottom: 20
//   },

//   passwordInput: {
//     flex: 1,
//     paddingVertical: 14
//   },

//   button: {
//     backgroundColor: '#00AEEF',
//     padding: 16,
//     borderRadius: 8
//   },

//   buttonText: {
//     color: '#fff',
//     textAlign: 'center',
//     fontWeight: 'bold'
//   }

// });

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Images from '../utils/images';
import { useAuth } from '../context/AuthContext';

// ✅ API
import { loginUser } from '../api_config/api';

const LoginScreen = () => {

  const { setUserRole, setUserName, setUserBranch, setToken } = useAuth();

  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ================= LOGIN =================
  const handleLogin = async () => {

    if (loading) return; // 🔥 prevent multiple clicks

    if (!employeeId.trim() || !password.trim()) {
      Alert.alert('Validation Error', 'Enter Employee ID & Password');
      return;
    }

    try {
      setLoading(true);

      const res = await loginUser({
        employeeId: employeeId.trim(),
        password: password.trim()
      });

      const responseData = res?.data?.data;

      if (!responseData) {
        Alert.alert("Login Failed", "Invalid response from server");
        return;
      }

      const token = responseData?.token;
      const user = responseData?.user;

      if (!user || user.role === undefined || user.role === null) {
        Alert.alert("Login Failed", "User role not found");
        return;
      }

      // 🔥 HANDLE BRANCH
      let branchValue = '';

      if (Array.isArray(user.officeLocation)) {
        branchValue = user.officeLocation[0] || '';
      } else {
        branchValue = user.officeLocation || '';
      }

      // ================= CONTEXT =================
      setUserRole(user.role);
      setUserName(user.userName || '');
      setUserBranch(branchValue);
      setToken(token || null);

      // ================= STORAGE =================
      const storagePromises = [];

      if (token) {
        storagePromises.push(AsyncStorage.setItem('token', token));
      }

      storagePromises.push(
        AsyncStorage.setItem('user', JSON.stringify(user)),
        AsyncStorage.setItem('userName', user.userName || ''),
        AsyncStorage.setItem('userRole', String(user.role)),
        AsyncStorage.setItem('officeLocation', JSON.stringify(branchValue))
      );

      await Promise.all(storagePromises);

      // 🚀 Navigation handled automatically by AppNavigator

    } catch (error: any) {
      console.log('❌ Login error:', error);

      Alert.alert(
        'Login Failed',
        error?.response?.data?.message || 'Invalid credentials'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      <Image source={Images.Logo} style={styles.logo} />

      <Text style={styles.title}>GATEVUE</Text>

      <TextInput
        placeholder="Employee ID"
        placeholderTextColor="#888"
        style={styles.input}
        value={employeeId}
        onChangeText={setEmployeeId}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          placeholderTextColor="#888"
          style={styles.passwordInput}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />

        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? 'eye' : 'eye-off'}
            size={24}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          { opacity: loading ? 0.7 : 1 } // 🔥 UI feedback
        ]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

    </SafeAreaView>
  );
};

export default LoginScreen;


// ================= STYLES =================
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#003366',
    padding: 20,
    justifyContent: 'center'
  },

  logo: {
    width: 150,
    height: 60,
    alignSelf: 'center',
    marginBottom: 20,
    resizeMode: 'contain'
  },

  title: {
    fontSize: 28,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 30
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 14,
    marginBottom: 15
  },

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20
  },

  passwordInput: {
    flex: 1,
    paddingVertical: 14
  },

  button: {
    backgroundColor: '#00AEEF',
    padding: 16,
    borderRadius: 8
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  }

});