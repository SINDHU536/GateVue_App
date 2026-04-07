// import React from 'react';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';

// import { AuthProvider } from './src/context/AuthContext';
// import { BranchProvider } from './src/context/BranchContext';

// import AppNavigator from './src/navigation/AppNavigator';

// export default function App() {
//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <AuthProvider>
//         <BranchProvider> {/* 🔥 ADDED */}
//           <AppNavigator />
//         </BranchProvider>
//       </AuthProvider>
//     </GestureHandlerRootView>
//   );
// }

import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'react-native';

import { AuthProvider } from './src/context/AuthContext';
import { BranchProvider } from './src/context/BranchContext';

import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      
      {/* 🔥 Status Bar */}
      <StatusBar barStyle="light-content" backgroundColor="#003366" />

      {/* 🔥 GLOBAL PROVIDERS */}
      <AuthProvider>
        <BranchProvider>
          <AppNavigator />
        </BranchProvider>
      </AuthProvider>

    </GestureHandlerRootView>
  );
}