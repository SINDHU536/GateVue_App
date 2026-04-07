
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';

// import CustomDrawer from '../components/CustomDrawer';

// import HomeScreen from '../screens/HomeScreen';
// import VisitorsScreen from '../screens/VisitorsScreen';
// import AdminUsersScreen from '../screens/AdminUsersScreen';
// import SecurityUsersScreen from '../screens/SecurityUsersScreen';
// import ReportsScreen from '../screens/ReportsScreen';
// import LoginScreen from '../screens/LoginScreen';
// import LogoutScreen from '../screens/LogoutScreen';
// import VisitorRegistrationScreen from '../screens/VisitorRegistrationScreen';
// import UserPasswordResetScreen from '../screens/UserPasswordResetScreen';

// // ✅ AUTH CONTEXT
// import { useAuth } from '../context/AuthContext';

// const Drawer = createDrawerNavigator();
// const Stack = createNativeStackNavigator();


// // ================= DRAWER =================
// function DrawerNavigator() {

//   const { userRole } = useAuth(); // 🔥 for future role-based UI

//   return (
//     <Drawer.Navigator
//       drawerContent={(props) => <CustomDrawer {...props} />}
//       screenOptions={({ navigation }) => ({
//         headerTitleAlign: 'center',
//         headerStyle: {
//           backgroundColor: '#f8f9fa',
//         },
//         headerShadowVisible: false,
//         headerLeft: () => (
//           <TouchableOpacity
//             onPress={() => navigation.openDrawer()}
//             style={{ marginLeft: 15 }}
//           >
//             <Text style={{ fontSize: 24 }}>☰</Text>
//           </TouchableOpacity>
//         ),
//         drawerActiveBackgroundColor: '#d9e6f7',
//         drawerActiveTintColor: '#1a73e8',
//         drawerItemStyle: {
//           borderRadius: 25,
//           marginHorizontal: 10,
//           marginVertical: 5,
//         },
//       })}
//     >
      
// {/* ✅ COMMON */}
// <Drawer.Screen name="Home" component={HomeScreen} />

// {/* ================= ROLE 3 (SECURITY) ================= */}
// {userRole === 3 && (
//   <>
//     <Drawer.Screen name="Form" component={VisitorRegistrationScreen} />
//     <Drawer.Screen name="Visitors" component={VisitorsScreen} />
//   </>
// )}

// {/* ================= ROLE 2 (ADMIN) ================= */}
// {userRole === 2 && (
//   <>
//     <Drawer.Screen name="Visitors" component={VisitorsScreen} />
//     <Drawer.Screen name="Security Users" component={SecurityUsersScreen} />
//     <Drawer.Screen name="User Password Reset " component={UserPasswordResetScreen} />
//   </>
// )}

// {/* ================= ROLE 1 (SUPER ADMIN) ================= */}
// {userRole === 1 && (
//   <>
//     <Drawer.Screen name="Visitors" component={VisitorsScreen} />
//     <Drawer.Screen name="Admin Users" component={AdminUsersScreen} />
//     <Drawer.Screen name="Security Users" component={SecurityUsersScreen} />
//     <Drawer.Screen name="Reports" component={ReportsScreen} />
//   </>
// )}

// {/* ✅ COMMON */}
// <Drawer.Screen name="Logout" component={LogoutScreen} />
//     </Drawer.Navigator>
//   );
// }


// // ================= MAIN NAVIGATOR =================
// export default function AppNavigator() {

//   const { userRole, loading } = useAuth(); // 🔥 IMPORTANT

//   // 🔥 WAIT UNTIL STORAGE LOADS
//   if (loading) {
//     return (
//       <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>

//         {/* ✅ NOT LOGGED IN */}
//         {userRole === null ? (
//           <Stack.Screen name="Login" component={LoginScreen} />
//         ) : (
//           <Stack.Screen name="MainApp" component={DrawerNavigator} />
//         )}

//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }



import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Text, View, ActivityIndicator, Image } from 'react-native';

import CustomDrawer from '../components/CustomDrawer';

import HomeScreen from '../screens/HomeScreen';
import VisitorsScreen from '../screens/VisitorsScreen';
import AdminUsersScreen from '../screens/AdminUsersScreen';
import SecurityUsersScreen from '../screens/SecurityUsersScreen';
import ReportsScreen from '../screens/ReportsScreen';
import LoginScreen from '../screens/LoginScreen';
import LogoutScreen from '../screens/LogoutScreen';
import VisitorRegistrationScreen from '../screens/VisitorRegistrationScreen';
import UserPasswordResetScreen from '../screens/UserPasswordResetScreen';

import Images from '../utils/images';

// ✅ AUTH CONTEXT
import { useAuth } from '../context/AuthContext';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();


// ================= DRAWER =================
function DrawerNavigator() {

  const { userRole } = useAuth();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={({ navigation }) => ({
        swipeEnabled: true,              // ✅ FORCE enable
    swipeEdgeWidth: 60,              // ✅ allow swipe from edge
    gestureEnabled: true,

        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#f8f9fa' },
        headerShadowVisible: false,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{ marginLeft: 15 }}
          >
            <Text style={{ fontSize: 24 }}>☰</Text>
          </TouchableOpacity>
        ),
        drawerActiveBackgroundColor: '#d9e6f7',
        drawerActiveTintColor: '#1a73e8',
        drawerItemStyle: {
          borderRadius: 25,
          marginHorizontal: 10,
          marginVertical: 5,
        },
      })}
    >

      {/* ✅ COMMON */}
      <Drawer.Screen name="Home" component={HomeScreen} />

      {/* 🔐 ADMIN (Role = 2) */}
      {userRole === 3 && (
        <>
          <Drawer.Screen name="Form" component={VisitorRegistrationScreen} />
          <Drawer.Screen name="Visitors" component={VisitorsScreen} />
        </>
      )}

      {/* 🧑‍💼 SECURITY (Role = 3) */}
      {userRole === 2 && (
        <>
          <Drawer.Screen name="Visitors" component={VisitorsScreen} />
          <Drawer.Screen name="Security Users" component={SecurityUsersScreen} />
          <Drawer.Screen name="User Password Reset " component={UserPasswordResetScreen} />
         
        </>
      )}

      {/* 👑 SUPER ADMIN (Role = 1) */}
      {userRole === 1 && (
        <>
          <Drawer.Screen name="Visitors" component={VisitorsScreen} />
          <Drawer.Screen name="Admin Users" component={AdminUsersScreen} />
          <Drawer.Screen name="Security Users" component={SecurityUsersScreen} />
          <Drawer.Screen name="Reports" component={ReportsScreen} />
          
        </>
      )}

      {/* ✅ COMMON */}
      <Drawer.Screen name="Logout" component={LogoutScreen} />

    </Drawer.Navigator>
  );
}


// ================= MAIN NAVIGATOR =================
export default function AppNavigator() {

  const { userRole, loading } = useAuth();

  // ================= SPLASH SCREEN =================
  if (loading) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
      }}>
        <Image
          source={Images.Logo}
          style={{ width: 120, height: 60, marginBottom: 20 }}
          resizeMode="contain"
        />
        <ActivityIndicator size="large" color="#1e73d8" />
        <Text style={{ marginTop: 10, fontSize: 16 }}>
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        {/* 🔐 AUTH FLOW */}
        {userRole === null ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <Stack.Screen name="MainApp" component={DrawerNavigator} />
        )}

      </Stack.Navigator>
    </NavigationContainer>
  );
}