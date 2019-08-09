import React from 'react'
import Dropzone from 'react-dropzone'

const EmailUploader = ({ children, onDrop, loading }) => {
  return (
    <Dropzone
      onDrop={onDrop}
      accept={['.pdf', '.Zip', '.Doc', '.jpg', '.jpeg', '.png']}
      multiple
    >
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()} className='dropzone'>
          <input {...getInputProps()} disabled={loading} />
          {children}
        </div>
      )}
    </Dropzone>
  )
}

export default EmailUploader
