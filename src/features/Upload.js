import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import Dropzone,{useDropzone} from 'react-dropzone';
import styles from './counter/Counter.module.css';

export function Upload() {
  const submitFile = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const binaryStr = reader.result
        console.log(binaryStr)
      }
      reader.readAsArrayBuffer(file)
    })
  }
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps
  } = useDropzone({
    onDrop: submitFile,
    accept: '.wsdl'
  });
  const acceptedFileItems = acceptedFiles.map(file => (
    <div key={file.path}>
      <h1 className="display-6 text-success">File Accepted</h1>
      <p className="lead">{file.path} - {file.size} bytes</p>
    </div>
  ));
  return (
    <div>
      <div className="container text-center justify-content-center">    
      <div className="row content">
        <div className="col-sm-12 mt-5"> 
          <h1 className="bd-title text-center">Welcome to Rules Console</h1>
          <p className="lead text-center">Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.</p>
        </div>
        <div className="container m-5">
          <section className="container">
            <div {...getRootProps({ className: styles.dropzone })}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
              <em>(Only *.wsdl files will be accepted)</em>
            </div>
            <aside className="mt-4">
              {acceptedFileItems}
            </aside>
          </section>
        </div>
      </div>
    </div>
    </div>
  );
}
