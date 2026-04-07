// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
//   ScrollView,
//   ActivityIndicator,
//   Modal
// } from 'react-native';

// import Icon from 'react-native-vector-icons/Ionicons';

// import {
//   launchCamera,
//   launchImageLibrary,
// } from 'react-native-image-picker';

// import DateTimePicker from '@react-native-community/datetimepicker';

// import { useAuth } from '../context/AuthContext';
// import { createVisitor } from '../api_config/api';

// const VisitorRegistrationScreen = () => {

//   const { userRole, userBranch } = useAuth();

//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [mobile, setMobile] = useState('');
//   const [email, setEmail] = useState('');
//   const [personToMeet, setPersonToMeet] = useState('');

//   const [purpose, setPurpose] = useState('');
//   const [otherReason, setOtherReason] = useState('');

//   const [photo, setPhoto] = useState<any>(null);
//   const [govtIdFile, setGovtIdFile] = useState<any>(null);

//   const [visitDate, setVisitDate] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);

//   const [loading, setLoading] = useState(false);
//   const [purposeModalVisible, setPurposeModalVisible] = useState(false);

//   if (userRole !== 3) {
//     return (
//       <View style={styles.center}>
//         <Text>No Access</Text>
//       </View>
//     );
//   }

//   // ================= GOVT ID ALERT =================
//   const handleGovtIdUpload = () => {
//     Alert.alert(
//       'Upload Government ID',
//       'Choose an option',
//       [
//         { text: 'CANCEL', style: 'cancel' },
//         {
//           text: 'CHOOSE FROM GALLERY',
//           onPress: () =>
//             launchImageLibrary({ mediaType: 'photo' }, (res) => {
//               if (res.assets && res.assets.length > 0) {
//                 setGovtIdFile(res.assets[0]);
//               }
//             }),
//         },
//         {
//           text: 'TAKE PHOTO',
//           onPress: () =>
//             launchCamera({ mediaType: 'photo' }, (res) => {
//               if (res.assets && res.assets.length > 0) {
//                 setGovtIdFile(res.assets[0]);
//               }
//             }),
//         },
//       ]
//     );
//   };

//   // ================= PHOTO ALERT =================
//   const handlePhotoUpload = () => {
//     Alert.alert(
//       'Upload Photo',
//       'Choose an option',
//       [
//         { text: 'CANCEL', style: 'cancel' },
//         {
//           text: 'CHOOSE FROM GALLERY',
//           onPress: () =>
//             launchImageLibrary({ mediaType: 'photo' }, (res) => {
//               if (res.assets && res.assets.length > 0) {
//                 setPhoto(res.assets[0]);
//               }
//             }),
//         },
//         {
//           text: 'TAKE PHOTO',
//           onPress: () =>
//             launchCamera({ mediaType: 'photo' }, (res) => {
//               if (res.assets && res.assets.length > 0) {
//                 setPhoto(res.assets[0]);
//               }
//             }),
//         },
//       ]
//     );
//   };

//   const handleSubmit = async () => {

//     if (!firstName || !mobile || !purpose || !personToMeet) {
//       Alert.alert("Error", "Fill all required fields");
//       return;
//     }

//     if (purpose === 'Other' && !otherReason.trim()) {
//       Alert.alert("Error", "Please specify the reason");
//       return;
//     }

//     const formData = new FormData();

//     formData.append('firstName', firstName);
//     formData.append('lastName', lastName);
//     formData.append('phoneNumber', mobile);
//     formData.append('email', email);
//     formData.append('officeLocation', userBranch);
//     formData.append('personToMeet', personToMeet);
//     formData.append(
//       'purposeOfVisit',
//       purpose === 'Other' ? otherReason : purpose
//     );
//     formData.append('visitDate', visitDate.toISOString());

//     if (photo?.uri) {
//       formData.append('userImage', {
//         uri: photo.uri,
//         name: photo.fileName || 'photo.jpg',
//         type: photo.type || 'image/jpeg',
//       } as any);
//     }

//     if (govtIdFile?.uri) {
//       formData.append('documentImage', {
//         uri: govtIdFile.uri,
//         name: govtIdFile.fileName || 'govtid.jpg',
//         type: govtIdFile.type || 'image/jpeg',
//       } as any);
//     }

//     try {
//       setLoading(true);
//       await createVisitor(formData);
//       Alert.alert("Success", "Visitor Registered");

//       setFirstName('');
//       setLastName('');
//       setMobile('');
//       setEmail('');
//       setPersonToMeet('');
//       setPurpose('');
//       setOtherReason('');
//       setPhoto(null);
//       setGovtIdFile(null);

//     } catch (e) {
//       Alert.alert("Error", "Failed to register");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ScrollView style={styles.container}>

//       {/* INPUTS */}
//       <View style={styles.inputContainer}>
//         <Icon name="person-outline" size={20} color="#777" />
//         <TextInput placeholder="First Name" style={styles.input} value={firstName} onChangeText={setFirstName} />
//       </View>

//       <View style={styles.inputContainer}>
//         <Icon name="person-outline" size={20} color="#777" />
//         <TextInput placeholder="Last Name" style={styles.input} value={lastName} onChangeText={setLastName} />
//       </View>

//       <View style={styles.inputContainer}>
//         <Icon name="call-outline" size={20} color="#777" />
//         <TextInput placeholder="Mobile Number" style={styles.input} value={mobile} onChangeText={setMobile} keyboardType="phone-pad" />
//       </View>

//       <View style={styles.inputContainer}>
//         <Icon name="card-outline" size={20} color="#777" />
//         <TextInput placeholder="Badge Number" style={styles.input} />
//       </View>

//       <View style={styles.inputContainer}>
//         <Icon name="mail-outline" size={20} color="#777" />
//         <TextInput placeholder="Email ID (optional)" style={styles.input} value={email} onChangeText={setEmail} />
//       </View>

//       <View style={styles.inputContainer}>
//         <Icon name="person-circle-outline" size={20} color="#777" />
//         <TextInput placeholder="Person to Meet" style={styles.input} value={personToMeet} onChangeText={setPersonToMeet} />
//       </View>

//       {/* DATE */}
//       <TouchableOpacity style={styles.inputContainer} onPress={() => setShowDatePicker(true)}>
//         <Icon name="calendar-outline" size={20} color="#777" />
//         <Text style={styles.dateText}>{visitDate.toDateString()}</Text>
//       </TouchableOpacity>

//       {showDatePicker && (
//         <DateTimePicker
//           value={visitDate}
//           mode="date"
//           onChange={(e, date) => {
//             setShowDatePicker(false);
//             if (date) setVisitDate(date);
//           }}
//         />
//       )}

//       {/* OFFICE LOCATION */}
//       <Text style={styles.sectionTitle}>Office Location</Text>
//       <View style={styles.inputContainer}>
//         <Icon name="location-outline" size={20} color="#777" />
//         <Text style={styles.dropdownText}>{userBranch}</Text>
//         <Icon name="chevron-down-outline" size={20} color="#777" />
//       </View>

//       {/* PURPOSE */}
//       <Text style={styles.sectionTitle}>Purpose of Visit</Text>

//       <TouchableOpacity
//         style={styles.inputContainer}
//         onPress={() => setPurposeModalVisible(true)}
//       >
//         <Icon name="clipboard-outline" size={20} color="#777" />
//         <Text style={{ flex: 1, marginLeft: 10, color: purpose ? '#000' : '#888' }}>
//           {purpose || 'Select Purpose of Visit'}
//         </Text>
//         <Icon name="chevron-down-outline" size={20} color="#777" />
//       </TouchableOpacity>

//       {/* 🔥 OTHER REASON FIELD */}
//       {purpose === 'Other' && (
//         <View style={styles.inputContainer}>
//           <Icon name="create-outline" size={20} color="#777" />
//           <TextInput
//             placeholder="Please specify the reason"
//             placeholderTextColor="#888"
//             value={otherReason}
//             onChangeText={setOtherReason}
//             style={styles.input}
//           />
//         </View>
//       )}

//       {/* MODAL */}
//       <Modal visible={purposeModalVisible} transparent animationType="fade">
//         <TouchableOpacity
//           style={styles.modalOverlay}
//           onPress={() => setPurposeModalVisible(false)}
//         >
//           <View style={styles.modalContainer}>
//             {['Meeting', 'Delivery', 'Interview', 'Other'].map((item, index, arr) => (
//               <TouchableOpacity
//                 key={item}
//                 style={[
//                   styles.optionItem,
//                   index === arr.length - 1 && { borderBottomWidth: 0 },
//                 ]}
//                 onPress={() => {
//                   setPurpose(item);
//                   setPurposeModalVisible(false);

//                   if (item !== 'Other') {
//                     setOtherReason('');
//                   }
//                 }}
//               >
//                 <Text style={styles.optionText}>{item}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </TouchableOpacity>
//       </Modal>

//       {/* BUTTONS */}
//       <TouchableOpacity style={styles.govtBtn} onPress={handleGovtIdUpload}>
//         <Text style={styles.btnText}>Upload Govt ID (Image)</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.photoBtn} onPress={handlePhotoUpload}>
//         <Text style={styles.btnText}>Take or Upload Photo</Text>
//       </TouchableOpacity>

//       {/* SUBMIT */}
//       <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
//         <Text style={styles.submitText}>Submit</Text>
//       </TouchableOpacity>

//       {loading && <ActivityIndicator style={{ marginTop: 10 }} />}

//     </ScrollView>
//   );
// };

// export default VisitorRegistrationScreen;

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
  Modal
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

import DateTimePicker from '@react-native-community/datetimepicker';

import { useAuth } from '../context/AuthContext';
import { createVisitor } from '../api_config/api';

const VisitorRegistrationScreen = () => {

  const { userRole, userBranch } = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [personToMeet, setPersonToMeet] = useState('');

  const [purpose, setPurpose] = useState('');
  const [otherReason, setOtherReason] = useState('');

  const [officeLocation, setOfficeLocation] = useState('');
  const [officeModalVisible, setOfficeModalVisible] = useState(false);

  const [photo, setPhoto] = useState<any>(null);
  const [govtIdFile, setGovtIdFile] = useState<any>(null);

  const [visitDate, setVisitDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [loading, setLoading] = useState(false);
  const [purposeModalVisible, setPurposeModalVisible] = useState(false);

  const branchList = ['All', 'Corporate Office', 'Dabaspet', 'Ganganagar','Sulibele'];

  if (userRole !== 3) {
    return (
      <View style={styles.center}>
        <Text>No Access</Text>
      </View>
    );
  }

  // ================= GOVT ID ALERT =================
  const handleGovtIdUpload = () => {
    Alert.alert('Upload Government ID', 'Choose an option', [
      { text: 'CANCEL', style: 'cancel' },
      {
        text: 'CHOOSE FROM GALLERY',
        onPress: () =>
          launchImageLibrary({ mediaType: 'photo' }, (res) => {
            if (res.assets?.length) setGovtIdFile(res.assets[0]);
          }),
      },
      {
        text: 'TAKE PHOTO',
        onPress: () =>
          launchCamera({ mediaType: 'photo' }, (res) => {
            if (res.assets?.length) setGovtIdFile(res.assets[0]);
          }),
      },
    ]);
  };

  // ================= PHOTO ALERT =================
  const handlePhotoUpload = () => {
    Alert.alert('Upload Photo', 'Choose an option', [
      { text: 'CANCEL', style: 'cancel' },
      {
        text: 'CHOOSE FROM GALLERY',
        onPress: () =>
          launchImageLibrary({ mediaType: 'photo' }, (res) => {
            if (res.assets?.length) setPhoto(res.assets[0]);
          }),
      },
      {
        text: 'TAKE PHOTO',
        onPress: () =>
          launchCamera({ mediaType: 'photo' }, (res) => {
            if (res.assets?.length) setPhoto(res.assets[0]);
          }),
      },
    ]);
  };

  const handleSubmit = async () => {

    if (!firstName || !mobile || !purpose || !personToMeet) {
      Alert.alert("Error", "Fill all required fields");
      return;
    }

    if (!officeLocation) {
      Alert.alert("Error", "Please select office location");
      return;
    }

    if (purpose === 'Other' && !otherReason.trim()) {
      Alert.alert("Error", "Please specify the reason");
      return;
    }

    const formData = new FormData();

    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('phoneNumber', mobile);
    formData.append('email', email);
    formData.append('officeLocation', officeLocation || userBranch);
    formData.append('personToMeet', personToMeet);
    formData.append(
      'purposeOfVisit',
      purpose === 'Other' ? otherReason : purpose
    );
    formData.append('visitDate', visitDate.toISOString());

    if (photo?.uri) {
      formData.append('userImage', {
        uri: photo.uri,
        name: photo.fileName || 'photo.jpg',
        type: photo.type || 'image/jpeg',
      } as any);
    }

    if (govtIdFile?.uri) {
      formData.append('documentImage', {
        uri: govtIdFile.uri,
        name: govtIdFile.fileName || 'govtid.jpg',
        type: govtIdFile.type || 'image/jpeg',
      } as any);
    }

    try {
      setLoading(true);
      await createVisitor(formData);
      Alert.alert("Success", "Visitor Registered");

      setFirstName('');
      setLastName('');
      setMobile('');
      setEmail('');
      setPersonToMeet('');
      setPurpose('');
      setOtherReason('');
      setOfficeLocation('');
      setPhoto(null);
      setGovtIdFile(null);

    } catch (e) {
      Alert.alert("Error", "Failed to register");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>

      {/* INPUTS */}
      <View style={styles.inputContainer}>
        <Icon name="account" size={20} color="#666" />
        <TextInput placeholder="First Name" style={styles.input} value={firstName} onChangeText={setFirstName} />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="account" size={20} color="#666" />
        <TextInput placeholder="Last Name" style={styles.input} value={lastName} onChangeText={setLastName} />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="phone" size={20} color="#666" />
        <TextInput placeholder="Mobile Number" style={styles.input} value={mobile} onChangeText={setMobile} keyboardType="phone-pad" />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="card-account-details" size={20} color="#777" />
        <TextInput placeholder="Badge Number" style={styles.input} />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="email" size={20} color="#777" />
        <TextInput placeholder="Email ID (optional)" style={styles.input} value={email} onChangeText={setEmail} />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="account-circle" size={20} color="#777" />
        <TextInput placeholder="Person to Meet" style={styles.input} value={personToMeet} onChangeText={setPersonToMeet} />
      </View>

      {/* DATE */}
      <TouchableOpacity style={styles.inputContainer} onPress={() => setShowDatePicker(true)}>
        <Icon name="calendar" size={20} color="#777" />
        <Text style={styles.dateText}>{visitDate.toDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={visitDate}
          mode="date"
          onChange={(e, date) => {
            setShowDatePicker(false);
            if (date) setVisitDate(date);
          }}
        />
      )}

      {/* OFFICE LOCATION */}
      <Text style={styles.sectionTitle}>Office Location</Text>

      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => setOfficeModalVisible(true)}
      >
        <Icon name="map-marker" size={20} color="#777" />
        <Text style={{ flex: 1, marginLeft: 10, color: officeLocation ? '#000' : '#888' }}>
          {officeLocation || 'Select Office Location'}
        </Text>
        <Icon name="menu-down" size={20} color="#777" />
      </TouchableOpacity>

      {/* PURPOSE */}
      <Text style={styles.sectionTitle}>Purpose of Visit</Text>

      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => setPurposeModalVisible(true)}
      >
        <Icon name="clipboard-text" size={20} color="#777" />
        <Text style={{ flex: 1, marginLeft: 10, color: purpose ? '#000' : '#888' }}>
          {purpose || 'Select Purpose of Visit'}
        </Text>
        <Icon name="menu-down" size={20} color="#777" />
      </TouchableOpacity>

      {/* OTHER REASON */}
      {purpose === 'Other' && (
        <View style={styles.inputContainer}>
          <Icon name="create-outline" size={20} color="#777" />
          <TextInput
            placeholder="Please specify the reason"
            placeholderTextColor="#888"
            value={otherReason}
            onChangeText={setOtherReason}
            style={styles.input}
          />
        </View>
      )}

      {/* PURPOSE MODAL */}
      <Modal visible={purposeModalVisible} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setPurposeModalVisible(false)}>
          <View style={styles.modalContainer}>
            {['Meeting', 'Delivery', 'Interview', 'Other'].map((item, index, arr) => (
              <TouchableOpacity
                key={item}
                style={[styles.optionItem, index === arr.length - 1 && { borderBottomWidth: 0 }]}
                onPress={() => {
                  setPurpose(item);
                  setPurposeModalVisible(false);
                  if (item !== 'Other') setOtherReason('');
                }}
              >
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* OFFICE MODAL */}
      <Modal visible={officeModalVisible} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setOfficeModalVisible(false)}>
          <View style={styles.modalContainer}>
            {branchList.map((item, index, arr) => (
              <TouchableOpacity
                key={item}
                style={[styles.optionItem, index === arr.length - 1 && { borderBottomWidth: 0 }]}
                onPress={() => {
                  setOfficeLocation(item);
                  setOfficeModalVisible(false);
                }}
              >
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* BUTTONS */}
      <TouchableOpacity style={styles.govtBtn} onPress={handleGovtIdUpload}>
        <Text style={styles.btnText}>Upload Govt ID (Image)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.photoBtn} onPress={handlePhotoUpload}>
        <Text style={styles.btnText}>Take or Upload Photo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator style={{ marginTop: 10 }} />}

    </ScrollView>
  );
};

export default VisitorRegistrationScreen;

// ================= STYLES =================
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#EEF2F5',
    padding: 16
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDEDED',
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 55,
    marginBottom: 12
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16
  },

  dateText: {
    marginLeft: 10,
    fontWeight: '600'
  },

  dropdownText: {
    flex: 1,
    marginLeft: 10,
    color: '#777'
  },

  sectionTitle: {
    marginVertical: 8,
    fontSize: 14,
    color: '#444'
  },

  govtBtn: {
    backgroundColor: '#1E73E8',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10
  },

  photoBtn: {
    backgroundColor: '#1E73E8',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10
  },

  btnText: {
    color: '#fff',
    fontWeight: '600'
  },

  submitBtn: {
    backgroundColor: '#9ea4ad',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12
  },

  submitText: {
    color: '#fff',
    fontWeight: 'bold'
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },

  optionItem: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },

  optionText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },

});