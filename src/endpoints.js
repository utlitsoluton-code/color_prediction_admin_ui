// // actions.js
import api from './config'

export const login = async (email, password) => {
  try {
    const headers = {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    }
    const response = await api.post('login', { email, password }, { headers })
    const token = response.data.token
    localStorage.setItem('token', token) // Store token in local storage
    return response.data
  } catch (error) {
    console.error('Login failed:', error)
    throw error
  }
}
export async function getToken() {
  let token = localStorage.getItem('token')
  return token
}
export const logout = async () => {
  try {
    await api.post('logout') // or api.delete('logout'), depending on your API
    localStorage.removeItem('token') // Remove token from local storage
    // Optionally, you can dispatch an action to reset other parts of the state
  } catch (error) {
    console.error('Logout failed:', error)
  }
}

const token = localStorage.getItem('token')
if (token) {
  api.defaults.headers.common['authKey'] = `${token}`
}

export const adminDetail = async (id) => {
  try {
    const response = await api.get(`profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })

    if (!response.data.success) {
      throw new Error(response.data.message)
    }

    return response.data.data
  } catch (error) {
    res.send({
      msg: 'Error fetching profile detail.',
      status: false,
    })

    throw error
  }
}

export const slotlist = async (perPageCount, pageNumber) => {
  try {
    // const response = await api.get(`slot/list?contentPerPage=${perPageCount}&page=${pageNumber}`)
    const response = await api.get(`slot/list`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    // if (!response.data.success) {
    //   throw new Error(response.data.message);
    // }
    return response.data
  } catch (error) {
    console.error('Error fetching slot list:', error)
    throw error
  }
}

export const slotDetail = async (id) => {
  try {
    // const response = await api.get(`slot/list?contentPerPage=${perPageCount}&page=${pageNumber}`)
    const response = await api.get(`/slot/details/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    // if (!response.data.success) {
    //   throw new Error(response.data.message);
    // }
    return response.data
  } catch (error) {
    console.error('Error fetching slot list:', error)
    throw error
  }
}

export const updateSlot = async (id, data) => {
  try {
    const headers = {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
    const response = await api.patch(`/slot/update/${id}`, data, { headers })
    return response.data
  } catch (error) {
    console.error('Error updating slot:', error)
    throw error
  }
}
export const updateStatus = async (_id, data) => {
  const newData = {
    _id: _id,
    status: data,
  }
  try {
    // const response = await api.get(`slot/list?contentPerPage=${perPageCount}&page=${pageNumber}`)
    const response = await api.put(`/slot/status`, newData, {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching status updated:', error)
    throw error
  }
}
export const userStatusChange = async (_id, data) => {
  const newData = JSON.stringify({
    _id: _id,
    status: data,
  })
  try {
    // const response = await api.get(`slot/list?contentPerPage=${perPageCount}&page=${pageNumber}`)
    const response = await api.put(`/user/status`, newData, {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching status updated:', error)
    throw error
  }
}
export const addSlot = async (data) => {
  try {
    const response = await api.post('/slot/add', data, {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })

    return response.data
  } catch (error) {
    console.error('Error fetching slot list:', error)
    throw error
  }
}

export const userlist = async () => {
  try {
    // const response = await api.get(`slot/list?contentPerPage=${perPageCount}&page=${pageNumber}`)
    const response = await api.get(`user/list`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })

    return response.data
  } catch (error) {
    console.error('Error fetching user list:', error)
    throw error
  }
}
export const userDeatil = async (id) => {
  try {
    // const response = await api.get(`slot/list?contentPerPage=${perPageCount}&page=${pageNumber}`)
    const response = await api.get(`/user/details/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })

    return response.data
  } catch (error) {
    console.error('Error fetching user detail:', error)
    throw error
  }
}
export const ReferralEarningDeatil = async (id) => {
  try {
    // const response = await api.get(`slot/list?contentPerPage=${perPageCount}&page=${pageNumber}`)
    const response = await api.get(`/user/earning/details/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })

    return response.data
  } catch (error) {
    console.error('Error fetching user detail:', error)
    throw error
  }
}

export default { login, logout }
