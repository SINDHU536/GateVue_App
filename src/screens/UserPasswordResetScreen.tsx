import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { useAuth } from '../context/AuthContext';
import { getAllSecurity, post } from '../api_config/api';

// 🔥 API
const resetUserPassword = (data: any) =>
  post('resetPassword', data);

const UserPasswordResetScreen = () => {

  const { userRole } = useAuth();

  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // ================= FETCH USERS =================
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await getAllSecurity({ officeLocation: "All" });

      setUsers(res?.data?.response || res?.data || []);

    } catch (e) {
      console.log("Error fetching users:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ================= RESET PASSWORD =================
  const handleReset = async () => {

    if (!selectedEmployeeId) return;

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      await resetUserPassword({
        employeeId: selectedEmployeeId,
        newPassword,
      });

      Alert.alert("Success", "Password reset successful");

      setModalVisible(false);
      setNewPassword('');
      setConfirmPassword('');

    } catch (e) {
      Alert.alert("Error", "Failed to reset password");
    }
  };

  // ================= ROLE PROTECTION =================
  if (userRole !== 2) {
    return (
      <View style={styles.center}>
        <Text>No Access (Role: {userRole})</Text>
      </View>
    );
  }

  // ================= RENDER ITEM =================
  const renderItem = ({ item }: any) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.employeeId}</Text>
      <Text style={styles.cell}>{item.officeLocation}</Text>

      <TouchableOpacity
        style={styles.resetBtn}
        onPress={() => {
          setSelectedEmployeeId(item.employeeId);
          setModalVisible(true);
        }}
      >
        <Text style={styles.btnText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>

      {/* 🔥 HEADER ROW */}
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Employee Id</Text>
        <Text style={styles.headerText}>Location</Text>
        <Text style={styles.headerText}>Reset Password</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : users.length === 0 ? (
        <View style={styles.center}>
          <Text>No Users Found</Text>
        </View>
      ) : (
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.employeeId || index.toString()}
        />
      )}

      {/* MODAL */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>

            <Text style={styles.modalTitle}>Reset Password</Text>

            <TextInput
              placeholder="New Password"
              secureTextEntry
              style={styles.input}
              value={newPassword}
              onChangeText={setNewPassword}
            />

            <TextInput
              placeholder="Confirm Password"
              secureTextEntry
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <TouchableOpacity style={styles.submitBtn} onPress={handleReset}>
              <Text style={styles.btnText}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

export default UserPasswordResetScreen;


// ================= STYLES =================
const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f7fb'
  },

  /* 🔥 HEADER */
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#e1e9f1',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 10
  },

  headerText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    color: '#1a3c6e'
  },

  /* 🔥 ROW */
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 10,
    alignItems: 'center'
  },

  cell: {
    flex: 1,
    textAlign: 'center'
  },

  resetBtn: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#b73a3a',
    paddingVertical: 6,
    marginHorizontal: 5,
    borderRadius: 6
  },

  /* MODAL */
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00000088',
    padding: 20
  },

  modalBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10
  },

  submitBtn: {
    backgroundColor: '#1e73d8',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center'
  },

  cancelBtn: {
    backgroundColor: '#b73a3a',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },

  btnText: {
    color: '#fff',
    fontWeight: 'bold'
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }

});