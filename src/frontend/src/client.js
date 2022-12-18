import fetch from 'unfetch'


const BASE_URL = "api/v1/students"
const checkStatus = response => {
    if (response.ok) {
        return response
    }
    const error = new Error(response.statusText)
    error.response = response
    return Promise.reject(error)
}

export const getAllStudents = () => {
    return fetch(BASE_URL)
        .then(checkStatus)
        .then(res => res.json())
}

export const addNewStudent = (student) => {
    return fetch(BASE_URL, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(student)
    }).then(checkStatus)
}
export const deleteStudent = (id)=> {
    return fetch(BASE_URL+'/'+parseFloat(id), {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE',

    }).then(checkStatus)
}