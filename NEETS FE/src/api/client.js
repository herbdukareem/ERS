
import { useUserStore } from "@/stores/user";
import { useAuthStore } from "@/stores/auth";
// import { memoizedRefreshToken } from "../utilities/refreshToken";
import { CapacitorHttp } from '@capacitor/core';
// Create an instance for making HTTP requests
import { showModal } from "@/plugins/modal";
//const user = localStorage.getItem("user");
/* const HTTP = axios.create({  
  headers: {
    "Content-Type": "application/json",
  },
}); */

/* const HTTPFORMDATA = axios.create({  
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
 */
function requestLogout() {
  if (!window.modalOpened) {
    const currentUrl = window.location.href;
    if (currentUrl.includes("auth")) {
      displayOk("Network Error");
    } else{
      showModal({
        text: "Network Error: Probably session expired. Logout?",
        confirmText: "Login",
        cancelText: "Cancel",
      }).then((result) => {
        window.modalOpened = false;    
        if (result) {
          const store = useAuthStore();
          store.logout();
        } 
      });
    }
   
  }
}
function sessionExpired() {
  if (!window.modalOpened) {
    showModal({
      text: "Session expired!",
      confirmText: "Login",
      cancelText: "Cancel",
    }).then(function () {
      window.modalOpened = false;
      const store = useAuthStore();
      store.logout();
    });
  }
}

function displayOk(text) {
  if (!window.modalOpened) {
    showModal({
      text: text,
      confirmText: "Ok",
      cancelText: "Cancel",
    });
    window.modalOpened = false;
  }
}

export const get = async (resource,idempotency = "") => {
  const token = localStorage.getItem("userToken");
  const store = useUserStore();
  store.isLoading = true;
  try {    
    const response = await CapacitorHttp.get({url: window.baseUrl + resource, headers:{
      idempotency: idempotency,
      'X-Fake-Header': 'Fake-Value',
      Authorization: token ? `Bearer ${token}` : "",
    }});
    store.isLoading = false;
    if (response.data?.error || response?.status == 422) {            
      throw new Error(JSON.stringify(response));
    }
    
    if(response.status == 401 || response.status ==302){
      const currentUrl = window.location.href;
      if (currentUrl.includes("auth")) {
        displayOk("Invalid credentials");
      } else if(currentUrl.includes("otp")){
        displayOk("Invalid OTP");
      }else{
        sessionExpired();
      }
      window.modalOpened = true;
      return false;
    }

    return response.data.responseBody; //for now
  
  } catch (e) {
    store.isLoading = false;
    if (e.message=='Failed to fetch') {
      requestLogout();
      return false;
    }
    let res = e.message
    if (typeof res === "string" && (res.startsWith("{") && res.endsWith("}"))) {
      res = JSON.parse(e.message)?.data
    }        
    
    store.isLoading = false;      
    const message = [
      typeof res?.responseBody || res  == "object"
        ? extractMessage(res?.responseBody || res)
        : res?.responseBody || res       
    ];
    displayOk(message.join("@").replaceAll("@", " "));    
    return false;
  }
};

export const post = async (resource, data, idempotency = "") => {
  const token = localStorage.getItem("userToken"); const store = useUserStore();
  store.isLoading = true;
  
  try {
    const response = await CapacitorHttp.post({
      url: window.baseUrl + resource,
      headers: {
        Accept: "application/json",
        'X-Fake-Header': 'Fake-Value',
        "Content-Type": "application/json",
        idempotency: idempotency,
        Authorization: token ? `Bearer ${token}` : "",
      },
      data
    });
    
    if (response.data?.error || response?.status == 422) {            
      throw new Error(JSON.stringify(response));
    }
    
    if(response.status == 401 || response.status ==302){
      const currentUrl = window.location.href;
      if (currentUrl.includes("auth")) {
        displayOk("Invalid credentials");
      } else if(currentUrl.includes("otp")){
        displayOk("Invalid OTP");
      }else{
        sessionExpired();
      }
      window.modalOpened = true;
      return false;
    }

    //store.isLoading = false;
    return response.data.responseBody;
    let obj = typeof response.data === "object" ? response.data : {};
    if (Object.keys(obj)?.includes("data")) {
    } else {            
      return response.data;
    } 
  } catch (e) {
    store.isLoading = false;
    if (e.message=='Failed to fetch') {
      requestLogout();
      return false;
    }
    let res = e.message
    if (typeof res === "string" && (res.startsWith("{") && res.endsWith("}"))) {
      res = JSON.parse(e.message)?.data
    }        
    
    store.isLoading = false;      
    const message = [
      typeof res?.responseBody || res  == "object"
        ? extractMessage(res?.responseBody || res)
        : res?.responseBody || res       
    ];
    displayOk(message.join("@").replaceAll("@", " "));    
    return false;
  }
};

export const postFormData = async (
  resource,
  data,
  prefix = true,
 // idempotency = ""
) => {
  const token = localStorage.getItem("userToken");
  const store = useUserStore();
  store.isLoading = true;
  try {
    const response = await CapacitorHttp.post({url:window.baseUrl + resource, headers: {
      // idempotency: idempotency,
      'X-Fake-Header': 'Fake-Value',
      "Content-Type": "multipart/form-data",
      Authorization: token ? `Bearer ${token}` : "",
    },data});
    store.isLoading = false;
    let obj = typeof response.data === "object" ? response.data : {};
    if (Object.keys(obj)?.includes("data")) {
      return response.data.data; //for now
    } else if (Object.keys(obj)?.includes("status") === "success") {
      return response.data;
    } else {
      return response.data;
      //throw new Error(response?.data.message ?? "Something went wrong!");
    }
  } catch (e) {
    store.isLoading = false;
    if (e?.message === "Network Error") {
      requestLogout();
    } else if (e.response.status === 401 || e.response.status === 302) {
      sessionExpired();
      window.modalOpened = true;
    } else {
      const message = [
  typeof e.response?.data == "object"
    ? extractMessage(e.response?.data)
    : e.response?.data,
  e.response?.data?.responseBody,
];
displayOk(message.join("@").replaceAll("@", " "));
    }

    return false;
  }
};

function extractMessage(data) {  
  if (data && typeof data === 'object') {
    // Extract the first error message from the 'message' object
    const errorKeys = Object.keys(data);
    return data[errorKeys[0]][0];
  }
  return data
}
