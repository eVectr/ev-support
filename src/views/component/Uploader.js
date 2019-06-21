import React from 'react'
import Dropzone from 'react-dropzone'

const Uploader = ({ children, onDrop, loading }) => {
   return (
       <Dropzone
           onDrop={onDrop}
           accept={['.jpg', '.jpeg' ]}
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

export default Uploader