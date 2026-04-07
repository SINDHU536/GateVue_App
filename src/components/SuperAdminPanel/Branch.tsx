import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const BranchPicker = ({ visible, branches, onSelect, onClose }: any) => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {branches.map((branch: string) => (
            <TouchableOpacity
              key={branch}
              onPress={() => {
                onSelect(branch);
                onClose();
              }}
            >
              <Text style={styles.branch}>{branch}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

export default BranchPicker;

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'center', backgroundColor: '#0005' },
  container: { backgroundColor: '#fff', padding: 20 },
  branch: { padding: 10, fontSize: 18 },
});