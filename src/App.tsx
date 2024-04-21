import React, { useState } from 'react';
import { useForm, type FieldValues, useFieldArray } from 'react-hook-form';
import axios from 'axios';
import './App.css';
import ReactHookForm from './ReactHookForm';


export const Header: React.FC<{title: string, subTitle: string}> = ({ title, subTitle }) => (
  <div className='mb-5'>
    <h1 className='text-3xl font-bold'>{title}</h1>
    <h4 className='text-2xl'>{subTitle}</h4>
  </div>
)

function App() {


  return (
    <div>
      <Header title="GL REFERENCE FORM" subTitle="This is a tenant reference check, please fill your information out carefully."/>
      <ReactHookForm />
    </div>
  );
}

export default App;
