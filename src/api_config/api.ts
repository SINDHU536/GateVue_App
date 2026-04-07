// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';


// // =====================================================
// // 🔹 AXIOS INSTANCE
// // =====================================================

// const api = axios.create({
//   baseURL: 'https://emmveegatevue.com/apis',
//   timeout: 15000,
// });


// // =====================================================
// // 🔐 REQUEST INTERCEPTOR (TOKEN)
// // =====================================================

// api.interceptors.request.use(
//   async config => {
//     const token = await AsyncStorage.getItem('token');

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   error => Promise.reject(error)
// );


// // =====================================================
// // 🔴 RESPONSE INTERCEPTOR
// // =====================================================

// api.interceptors.response.use(
//   response => {
//     console.log('✅ API RESPONSE:', response.data);
//     return response;
//   },
//   error => {
//     console.log('❌ API ERROR:', error?.response?.data || error.message);
//     return Promise.reject(error);
//   }
// );


// // =====================================================
// // 🔐 AUTH APIs
// // =====================================================

// export const loginUser = async (credentials: any) => {
//   const res = await api.post('login', credentials);
//   return res.data;
// };


// // =====================================================
// // 👮 SECURITY APIs
// // =====================================================

// export const createSecurity = async (data: any) => {
//   const res = await api.post('signup', data);
//   return res.data;
// };

// export const getAllSecurity = async (officeLocation?: string) => {
//   const params: any = {};

//   if (officeLocation && officeLocation !== 'All') {
//     params.officeLocation = officeLocation;
//   }

//   const res = await api.get('allsecurity', { params });
//   return res.data.response;
// };

// export const deleteSecurity = async (employeeId: string) => {
//   const res = await api.delete('deleteSecurity', {
//     data: { employeeId },
//   });
//   return res.data;
// };


// // =====================================================
// // 👤 ADMIN APIs
// // =====================================================

// export const createAdmin = async (data: any) => {
//   const res = await api.post('signup', data);
//   return res.data;
// };

// export const getAllAdmins = async (officeLocation?: string) => {
//   const params: any = {};

//   if (officeLocation && officeLocation !== 'All') {
//     params.officeLocation = officeLocation;
//   }

//   const res = await api.get('allAdmin', { params });
//   return res.data.response;
// };

// export const deleteAdmin = async (employeeId: string) => {
//   const res = await api.delete('deleteadmin', {
//     data: { employeeId },
//   });
//   return res.data;
// };


// // =====================================================
// // 🧾 VISITOR APIs
// // =====================================================

// // ➕ Create Visitor
// export const createVisitor = async (formData: FormData) => {
//   const res = await api.post('visitor/create', formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   });

//   return res.data;
// };

// // 🛠 Update Visitor
// export const updateVisitor = async ({ id, ...data }: any) => {
//   const res = await api.patch(`visitor/${id}`, data);
//   return res.data;
// };

// // 📄 Get Visitors 
// export const getVisitors = async (page = 0, limit = 30) => {
//   const res = await api.get('visitors', {
//     params: { page, limit },
//   });
//   return res.data;
// };

// // 🏢 Get Visitors by Branch
// export const getVisitorsByBranch = async ({
//   officeLocation,
//   page = 1,
//   limit = 100,
// }: any) => {
//   const params = {
//     officeLocation: officeLocation === 'All' ? '' : officeLocation,
//     page,
//     limit,
//   };

//   const res = await api.get('visitors', { params });
//   return res.data;
// };

// // 🔍 Filter Visitors
// export const filterVisitors = async ({
//   phoneNumber,
//   badge,
//   status,
// }: any) => {
//   const body: any = {};

//   if (phoneNumber?.trim()) body.phoneNumber = phoneNumber.trim();
//   if (badge?.trim()) body.badgeNumber = badge.trim();
//   if (status && status !== 'All') body.status = status;

//   const res = await api.post('visitor/filter', body);
//   return res.data;
// };

// // 📅 Filter by Date
// export const filterVisitorsByDate = async (dates: any) => {
//   const res = await api.post('visitor/filterdate', dates);
  
// };


// // =====================================================
// // 📊 GRAPH APIs (FIXED)
// // =====================================================

// // 📊 Visitor Stats
// export const getVisitorStats = async ({
//   officeLocation,
//   startDate,
//   endDate,
// }: any) => {
//   const params = {
//     officeLocation: officeLocation === 'All' ? '' : officeLocation,
//   };

//   const res = await api.post(
//     'visitor/stats',
//     { startDate, endDate },
//     { params }
//   );

//   return res.data;
// };

// // 📈 Day Graph
// export const getDayGraph = async ({
//   officeLocation,
//   startDate,
//   endDate,
// }: any) => {
//   const params = {
//     officeLocation: officeLocation === 'All' ? '' : officeLocation,
//   };

//   const res = await api.post(
//     'visitor/daygraph',
//     { startDate, endDate },
//     { params }
//   );

//   return res.data;
// };

// // 🎯 Purpose Graph (🔥 IMPORTANT FIX)
// export const getPurposeGraph = async ({
//   officeLocation,
//   startDate,
//   endDate,
// }: any) => {
//   const params = {
//     officeLocation: officeLocation === 'All' ? '' : officeLocation,
//   };

//   const res = await api.post(
//     'visitor/purposegraph',
//     { startDate, endDate },
//     { params }
//   );

//   return res.data;
// };


// // =====================================================
// // 🔔 NOTIFICATIONS
// // =====================================================

// export const getNotifications = async () => {
//   const res = await api.get('getallnotify');
//   return res.data;
// };

// export const notifyForgotPassword = async ({
//   employeeId,
//   officeLocation,
// }: any) => {
//   const res = await api.post('notify', {
//     employeeId,
//     officeLocation,
//   });
//   return res.data;
// };


// // =====================================================
// // ⚙️ SYSTEM
// // =====================================================

// export const resetApp = async (credentials: any) => {
//   const res = await api.post('reset', credentials);
//   return res.data;
// };


// // =====================================================
// // 🌍 LOCATIONS
// // =====================================================

// export const getAllLocations = async () => {
//   const res = await api.get('getAllLocation');
//   return res.data.data;
// };

// export default api;



// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // =====================================================
// // 🔹 BASE CONFIG
// // =====================================================

// const BASE_URL = 'https://emmveegatevue.com/apis';

// // =====================================================
// // 🔹 ENDPOINTS
// // =====================================================

// export const ENDPOINTS = {
//   // 🔐 AUTH
//   LOGIN: 'login',

//   // 🧾 VISITORS
//   CREATE_VISITOR: 'visitor/create',
//   UPDATE_VISITOR: 'visitor',
//   GET_VISITORS: 'visitors',
//   FILTER_VISITOR: 'visitor/filter',
//   FILTER_VISITOR_DATE: 'visitor/filterdate',

//   // 📊 GRAPHS
//   VISITOR_STATS: 'visitor/stats',
//   DAY_GRAPH: 'visitor/daygraph',
//   PURPOSE_GRAPH: 'visitor/purposegraph',

//   // 🌍 LOCATIONS
//   GET_LOCATIONS: 'getAllLocation',

//   // 👤 ADMIN
//   GET_ADMINS: 'allAdmin',
//   CREATE_ADMIN: 'signup',
//   DELETE_ADMIN: 'deleteadmin',
// };

// // =====================================================
// // 🔹 AXIOS INSTANCE
// // =====================================================

// const api = axios.create({
//   baseURL: BASE_URL,
//   timeout: 15000,
// });

// // =====================================================
// // 🔐 REQUEST INTERCEPTOR (TOKEN)
// // =====================================================

// api.interceptors.request.use(
//   async config => {
//     const token = await AsyncStorage.getItem('token');

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   error => Promise.reject(error)
// );

// // =====================================================
// // 🔴 RESPONSE INTERCEPTOR
// // =====================================================

// api.interceptors.response.use(
//   response => {
//     console.log('✅ API:', response.config.url, response.data);
//     return response; // ✅ always return full response
//   },
//   error => {
//     console.log('❌ API ERROR:', error?.response?.data || error.message);
//     return Promise.reject(error);
//   }
// );

// // =====================================================
// // 🔹 GENERIC METHODS 
// // =====================================================

// export const get = (url: string, params?: any) =>
//   api.get(url, { params });

// export const post = (url: string, data?: any, config?: any) =>
//   api.post(url, data, config);

// export const patch = (url: string, data?: any) =>
//   api.patch(url, data);

// export const del = (url: string, data?: any) =>
//   api.delete(url, { data });

// // =====================================================
// // 🔹 API SERVICES
// // =====================================================

// // 🔐 AUTH
// export const loginUser = (data: any) =>
//   post(ENDPOINTS.LOGIN, data);

// // ================= VISITORS =================

// export const createVisitor = (formData: FormData) =>
//   post(ENDPOINTS.CREATE_VISITOR, formData, {
//     headers: { 'Content-Type': 'multipart/form-data' },
//   });

// export const updateVisitor = (id: string, data: any) =>
//   patch(`${ENDPOINTS.UPDATE_VISITOR}/${id}`, data);

// export const getVisitors = (params?: any) =>
//   get(ENDPOINTS.GET_VISITORS, params);

// export const filterVisitors = (data: any) =>
//   post(ENDPOINTS.FILTER_VISITOR, data);

// export const filterVisitorsByDate = (data: any) =>
//   post(ENDPOINTS.FILTER_VISITOR_DATE, data);

// // ================= GRAPHS =================

// export const getVisitorStats = (data: any) =>
//   post(ENDPOINTS.VISITOR_STATS, data);

// export const getDayGraph = (data: any) =>
//   post(ENDPOINTS.DAY_GRAPH, data);

// export const getPurposeGraph = (data: any) =>
//   post(ENDPOINTS.PURPOSE_GRAPH, data);

// // ================= LOCATIONS =================

// export const getAllLocations = () =>
//   get(ENDPOINTS.GET_LOCATIONS);

// // ================= ADMIN =================


// export const getAllAdmins = ({
//   officeLocation = "All",
//   role = 1,
//   page = 1,
//   limit = 100,
// }: any = {}) =>
//   get(ENDPOINTS.GET_ADMINS, {
//     officeLocation: officeLocation === "All" ? "" : officeLocation,
//     role,
//     page,
//     limit,
//   });
// export const createAdmin = (data: any) =>
//   post(ENDPOINTS.CREATE_ADMIN, data);

// export const deleteAdmin = (employeeId: string) =>
//   del(ENDPOINTS.DELETE_ADMIN, { employeeId });
// // ================= REPORT SCREEN =================

// // ✅ Get visitors by branch (default report list)
// export const getVisitorsByBranch = (officeLocation: string) =>
//   get(ENDPOINTS.GET_VISITORS, {
//     officeLocation: officeLocation === "All" ? "" : officeLocation,
//     page: 1,
//     limit: 100,
//   });

// // ✅ Get visitors by location + date/range (Report Screen main API)
// export const getVisitorsByLocationAndDate = ({
//   officeLocation,
//   startDate,
//   endDate,
//   range,
// }: any) => {
//   return post(
//     ENDPOINTS.FILTER_VISITOR_DATE,
//     {
//       ...(startDate && { startDate }),
//       ...(endDate && { endDate }),
//       ...(range && { range }),
//     },
//     {
//       params: {
//         officeLocation:
//           officeLocation === "All" ? "" : officeLocation,
//       },
//     }
//   );
// };

// // ================= SECURITY =================

// // ✅ Get all security users
// export const getAllSecurity = (officeLocation: string) =>
//   get("allsecurity", {
//     officeLocation: officeLocation === "All" ? "" : officeLocation,
//   });

// // ✅ Create security user
// export const createSecurity = (data: any) =>
//   post("signup", data);

// // ✅ Delete security user
// export const deleteSecurity = (employeeId: string) =>
//   del("deleteSecurity", { employeeId });
// // =====================================================
// // EXPORT
// // =====================================================

// export default api;


import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// =====================================================
// 🔹 BASE CONFIG
// =====================================================

const BASE_URL = 'https://emmveegatevue.com/apis';

// =====================================================
// 🔹 AXIOS INSTANCE
// =====================================================

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

// =====================================================
// 🔐 REQUEST INTERCEPTOR (TOKEN)
// =====================================================

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// =====================================================
// 🔴 RESPONSE INTERCEPTOR
// =====================================================

api.interceptors.response.use(
  (response) => {
    console.log('✅ API:', response.config.url, response.data);
    return response;
  },
  (error) => {
    console.log('❌ API ERROR:', error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

// =====================================================
// 🔹 GENERIC METHODS
// =====================================================

export const get = (url: string, params?: any) =>
  api.get(url, { params });

export const post = (url: string, data?: any, config?: any) =>
  api.post(url, data, config);

export const patch = (url: string, data?: any) =>
  api.patch(url, data);

export const del = (url: string, data?: any) =>
  api.delete(url, { data });


// =====================================================
// 🔐 AUTH
// =====================================================

export const loginUser = (data: any) =>
  post('login', data);


// =====================================================
// 👤 ADMIN
// =====================================================

export const getAllAdmins = ({ officeLocation }: any) => {
  const params = new URLSearchParams();

  if (officeLocation && officeLocation !== 'All') {
    params.append('officeLocation', officeLocation);
  }

  const url = params.toString()
    ? `allAdmin?${params.toString()}`
    : 'allAdmin';

  return get(url);
};

export const createAdmin = (data: any) =>
  post('signup', data);

export const deleteAdmin = (employeeId: string) =>
  del('deleteadmin', { employeeId });


// =====================================================
// 🔐 SECURITY
// =====================================================

export const getAllSecurity = ({ officeLocation }: any) => {
  const params = new URLSearchParams();

  if (officeLocation && officeLocation !== 'All') {
    params.append('officeLocation', officeLocation);
  }

  const url = params.toString()
    ? `allsecurity?${params.toString()}`
    : 'allsecurity';

  return get(url);
};

export const createSecurity = (data: any) =>
  post('signup', data);

export const deleteSecurity = (employeeId: string) =>
  del('deleteSecurity', { employeeId });


// =====================================================
// 👥 VISITORS
// =====================================================

export const createVisitor = (formData: FormData) =>
  post('visitor/create', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const updateVisitor = (id: string, data: any) =>
  patch(`visitor/${id}`, data);

export const getVisitors = (params?: any) =>
  get('visitors', params);

export const getVisitorsByBranch = ({ officeLocation, page = 1, limit = 100 }: any) =>
  get('visitors', {
    officeLocation: officeLocation === 'All' ? '' : officeLocation,
    page,
    limit,
  });

export const filterVisitors = (data: any) =>
  post('visitor/filter', data);

export const filterVisitorsByDate = (data: any) =>
  post('visitor/filterdate', data);

export const getVisitorsByLocationAndDate = ({
  officeLocation,
  startDate,
  endDate,
  range,
}: any) => {

  const body: any = {};

  if (startDate) body.startDate = startDate;
  if (endDate) body.endDate = endDate;
  if (range) body.range = range;

  return post('visitor/filterdate', body, {
    params: {
      officeLocation: officeLocation === "All" ? "" : officeLocation,
    },
  });
};


// =====================================================
// 📊 REPORTS / GRAPHS
// =====================================================

// export const getVisitorStats = ({ officeLocation, startDate, endDate }: any) =>
//   post(`visitor/stats?officeLocation=${officeLocation === 'All' ? '' : officeLocation}`, {
//     startDate,
//     endDate,
//   });

// export const getDayGraph = ({ officeLocation, startDate, endDate }: any) =>
//   post(`visitor/daygraph?officeLocation=${officeLocation === 'All' ? '' : officeLocation}`, {
//     startDate,
//     endDate,
//   });
  

// export const getPurposeGraph = ({ officeLocation, startDate, endDate }: any) =>
//   post(`visitor/purposegraph?officeLocation=${officeLocation === 'All' ? '' : officeLocation}`, {
//     startDate,
//     endDate,
//   });

export const getVisitorStats = ({
  officeLocation,
  startDate,
  endDate,
}: any) =>
  post(
    'visitor/stats',
    {
      startDate,
      endDate,
    },
    {
      params: {
        officeLocation: officeLocation === 'All' ? '' : officeLocation,
      },
    }
  );

export const getDayGraph = ({
  officeLocation,
  startDate,
  endDate,
}: any) =>
  post(
    'visitor/daygraph',
    {
      startDate,
      endDate,
    },
    {
      params: {
        officeLocation: officeLocation === 'All' ? '' : officeLocation,
      },
    }
  );
  export const getHourGraph = ({ officeLocation, startDate, endDate }: any) =>
  post(
    `visitor/hourgraph?officeLocation=${officeLocation === 'All' ? '' : officeLocation}`,
    {
      startDate,
      endDate,
    }
  );

export const getPurposeGraph = ({
  officeLocation,
  startDate,
  endDate,
}: any) =>
  post(
    'visitor/purposegraph',
    {
      startDate,
      endDate,
    },
    {
      params: {
        officeLocation: officeLocation === 'All' ? '' : officeLocation,
      },
    }
  );

// =====================================================
// 🔔 NOTIFICATIONS
// =====================================================

export const getNotifications = () =>
  get('getallnotify');

export const notifyForgotPassword = (data: any) =>
  post('notify', data);


// =====================================================
// 🌍 LOCATIONS
// =====================================================

export const getAllLocations = () =>
  get('getAllLocation');


// =====================================================
// 🔄 RESET
// =====================================================

export const resetApp = (data: any) =>
  post('reset', data);


// =====================================================
// EXPORT
// =====================================================

export default api;