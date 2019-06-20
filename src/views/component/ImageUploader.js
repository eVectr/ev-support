import React from 'react'
import Dropzone from 'react-dropzone'

 const ImageUploader = ({ children, onDrop, loading }) => {
   return (
       <Dropzone
           onDrop={onDrop}
           accept={[ '.jpg', '.jpeg', '.png' ]}
           multiple={true}
       >
       {({ getRootProps, getInputProps }) => (
           <div {...getRootProps()}  className = 'dropzone'>
               <input {...getInputProps()} disabled={loading}/>
               {children}
           </div>
       )}
   </Dropzone>
   )
}

export default ImageUploader