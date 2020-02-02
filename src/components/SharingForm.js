import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Formik, Form, Field} from 'formik';
import '../assets/css/SharingForm.css';
import {CloudUpload} from '@material-ui/icons';
import Dropzone from 'react-dropzone';
import DropMessage from '../components/DropMessage.js'
import {Typography} from '@material-ui/core'; 

const SharingForm = ()=> {
    const handleSubmit = (values)=> {
      console.log(values)
      axios.post('http://localhost:3001/api/v1/file/new', values, {
        headers: {"Accept": "multipart/form-data"}
      })
      .then (response=> console.log(response))
    }  

    return ( 
            <div className='row'>
              <div className='col-12'>
              <Formik 
            onSubmit={handleSubmit}
            initialValues = {{
              receipientEmail : '', message: '',
              senderEmail : '', files:  []
            }}      
            >
              {
                (
                  {
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting, setFieldValue
                }
                )=> (              
                  <Form className='SharingForm' onSubmit={handleSubmit} >
                    <Typography variat='h2' className='text-center form-header' component='h2'>TRANSFER FILES</Typography>
                    <div className='form-group'>
                      <label htmlFor='receipientEmail' className='labels'>Send files to this email:</label>
                      <Field type='email' className='Form-Input' name='receipientEmail' id='receipientEmail'/>
                    </div>
                    <div  className='form-group'>
                      <label htmlFor='senderEmail'>Your email:</label>
                      <Field type='email' className='Form-Input' name='senderEmail' id='senderEmail' />
                    </div>
                    <div  className='form-group'>
                      <label htmlFor='message'>Message:</label>
                      <Field name='message' className='Message-Input form-control' row='7' id='message' component='textarea'/>
                    </div>
                    <button type='submit' onClick={handleSubmit} className='Transfer-Button col'>Transfer</button>
                  </Form>     
                )
              }
            </Formik>
              </div>
            </div>
    )
}


export default SharingForm;