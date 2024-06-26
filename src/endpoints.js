// // actions.js
 import api from './config';

export const login = async (email, password) => {
  try {
    
    const response = await api.post('login', { email, password });
    const token = response.data.token;
    localStorage.setItem('token', token); // Store token in local storage
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};
export async function getToken() {
  let token = localStorage.getItem("token");
  return token;

}
export const logout = async () => {
  await api.post('logout'); // or api.delete('logout'), depending on your API

  localStorage.removeItem('token'); // Remove token from local storage
  // Optionally, you can dispatch an action to reset other parts of the state
};

const token = localStorage.getItem('token');
if (token) {
  api.defaults.headers.common['authKey'] = `${token}`;
}


export const adminDetail = async (id)=>{
  try{
  // const response = await api.get(`slot/list?contentPerPage=${perPageCount}&page=${pageNumber}`)
  const response = await api.get(`profile`)

  return response.data
  }catch(error){
    console.error('Error fetching profile Deatil:', error);
    throw error
  }
}


export const slotlist = async (perPageCount, pageNumber)=>{
  try{
  // const response = await api.get(`slot/list?contentPerPage=${perPageCount}&page=${pageNumber}`)
  const response = await api.get(`slot/list`)

  return response.data
  }catch(error){
    console.error('Error fetching slot list:', error);
    throw error
  }
}

export const slotDetail = async (id)=>{
  try{
  // const response = await api.get(`slot/list?contentPerPage=${perPageCount}&page=${pageNumber}`)
  const response = await api.get(`/slot/details/${id}`)

  return response.data
  }catch(error){
    console.error('Error fetching slot list:', error);
    throw error
  }
}

export const updateSlot = async (id, data)=>{
  try{
  // const response = await api.get(`slot/list?contentPerPage=${perPageCount}&page=${pageNumber}`)
  const response = await api.patch(`/slot/update/${id}`,
  
  )
  return response.data
  }catch(error){
    console.error('Error fetching slot list:', error);
    throw error
  }
}
export const updateStatus = async (_id, data)=>{
  const newData = {
    "_id": _id,
    "status": data,
    }
  console.log(newData)
try{
  // const response = await api.get(`slot/list?contentPerPage=${perPageCount}&page=${pageNumber}`)
  const response = await api.put(`/slot/status`, newData, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data
  }catch(error){
    console.error('Error fetching status updated:', error);
    throw error
  }
}
export const userStatusChange = async (_id, data)=>{

    const newData = JSON.stringify({
      "_id": _id,
      "status": data, 
     });
  console.log(newData)
try{
  // const response = await api.get(`slot/list?contentPerPage=${perPageCount}&page=${pageNumber}`)
  const response = await api.put(`/user/status`, newData, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data
  }catch(error){
    console.error('Error fetching status updated:', error);
    throw error
  }
}
export const addSlot = async (data)=>{
  console.log({data})
//  const newData = JSON.stringify({
//     "slotNumber": data.slotNumber,
//        "slotName":data.slotName, 
//        "startDate":data.startDate, 
//        "startTime":data.startTime,
//        "endTime":data.endTime ,
    
//   })

  try{
  const response = await api.post(`/slot/add`,data)
  console.log(data)

  return response.data
  }catch(error){
    console.error('Error fetching slot list:', error);
    throw error
  }
}


export const userlist = async ()=>{
  try{
  // const response = await api.get(`slot/list?contentPerPage=${perPageCount}&page=${pageNumber}`)
  const response = await api.get(`user/list`)

  console.log({response})
  return response.data
  }catch(error){
    console.error('Error fetching user list:', error);
    throw error
  }
}
export const userDeatil = async (id)=>{
  console.log(id)
  try{
  // const response = await api.get(`slot/list?contentPerPage=${perPageCount}&page=${pageNumber}`)
  const response = await api.get(`/user/details/${id}`)

  console.log({response})
  return response.data
  }catch(error){
    console.error('Error fetching user detail:', error);
    throw error
  }
}





export default {login, logout};
