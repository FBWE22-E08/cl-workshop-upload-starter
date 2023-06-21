import React, { useState } from 'react'
import axios from '../util/axiosInstance';

export const UploadForm = () => {
  const [uploadedImage, setUploadedImage] = useState(null);

  const onSubmitForm = async(event) => {
     event.preventDefault();

     const formData = new FormData(event.target);
     
     //POST request to the server with the filedata
     try {
        const res = await axios.post('/api/files/create', formData);

        console.log("the response is ", res);
        setUploadedImage(res.data.newFile.filePath);
     } catch (error) {
        console.error(error);
     }
  }

  return (
    <>
<h1>Upload a file</h1>

{uploadedImage && <img src={uploadedImage} />}

<form onSubmit={onSubmitForm}>
{/* set the name of input to image  */}
<input type="file" name="image" multiple={false}  />
<button>Upload</button>
</form>
</>
  )
}
