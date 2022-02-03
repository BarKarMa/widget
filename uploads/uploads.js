// import axios from 'axios'

const API_URL = "http://localhost:5000"

cloudinaryUpload = (fileToUpload) => {
    return axios.post(API_URL + '/cloudinary-upload', fileToUpload)
    .then(res => res.data)
    .catch(err => console.log(err))
}

module.exports = { cloudinaryUpload: cloudinaryUpload }