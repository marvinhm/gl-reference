import React, { useState } from 'react';
import { useForm, type FieldValues, useFieldArray } from 'react-hook-form';
import axios from 'axios';
import './App.css';
import { TenantType } from './TypeDefinitions'; 


export default function ReactHookForm() {

  const { 
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
     
   } = useForm<TenantType>({
    defaultValues: {
      personal: {
        first_name: "",
        last_name: "",
        current_address: ""
      }, 
      employer: [{
        name: "",
        start_date: "",
        end_date: ""
      }]
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "employer"
  });

  const [ currentEmp, setCurrentEmp ] = useState(false);

  function formatDate(dateString: string): number {
    const parts = dateString.split('-');
    
    // Extract year, month, and day from the parts
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    
    const formattedDate = year + month + day;
    
    return Number(formattedDate);
  }

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await axios.post('https://ref-api.goodlord.co/reference/new', {
          data
      });
      console.log(response.data); // handle response here

  } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error here
  }
    reset();
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        
        <div className='personal-conatainer border rounded border-sky-500 p-10 my-5'>
          <h4 className="font-bold">
            Personal
          </h4>
          <div className='fname-block my-3'>
            <label className="block text-sm font-medium leading-6 text-gray-900">First name</label>
            <input
              {
                ...register("personal.first_name", {
                  required: "First Name is required",
                  minLength: {
                    value: 2,
                    message: "First Name must be 2 characters minimum"
                  }
                })
              }
              placeholder='First Name'
              className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
            { errors.personal?.first_name && <p className='text-red-500 text-base/loose'>{errors.personal.first_name.message}</p>}
          </div>
          <div className='lname-block mb-3'>
            <label className="block text-sm font-medium leading-6 text-gray-900">Last name</label>
            <input 
              {
                ...register("personal.last_name", {
                  required: "Last Name is required",
                  minLength: {
                    value: 2,
                    message: "Last Name must be 2 characters minimum"
                  }
                })
              }
              placeholder='Last Name'
              className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
            { errors.personal?.last_name && <p className='text-red-500 text-base/loose'>{errors.personal.last_name.message}</p>}
          </div>
          <div className='caddy-block mb-3'>
            <label className="block text-sm font-medium leading-6 text-gray-900">Current Address</label>
            <input 
              {
                ...register("personal.current_address", {
                  required: "Your address is required"
                })
              }
              placeholder='Current Address'
              className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
            { errors.personal?.current_address && <p className='text-red-500 text-base/loose'>{errors.personal.current_address.message}</p>}
          </div>
        </div>

        <div className='employer-conatainer border rounded border-sky-500 p-10 mb-5'>
          <h4 className="font-bold">
            Employer
          </h4>
            { fields.map((field: any, index: number) => {
              return (
                <div key={field.id}>
                  <div className='empname-block my-3'>
                    <label className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                    <input 
                      {
                        ...register(`employer.${index}.name`, {
                          required: "Employer Name is required"
                        })
                      }
                      defaultValue={field.value}
                      key={field.id}
                      placeholder='Employer Name'
                      className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                    { errors.employer?.[index]?.name && <p className='text-red-500 text-base/loose'>{errors.employer?.[index]?.name?.message}</p>}
                  </div>
                  <div className='checkb-block mb-3 flex'>
                    <input
                      type="checkbox"
                      onChange={() => setCurrentEmp(!currentEmp)}
                      className='mr-3'
                    />
                    <label className="block text-sm font-medium leading-6 text-gray-900">I currently work here</label>
                  </div>
                  <div className='date-block flex mb-3'>
                    <div className='sdate-block mr-11 '>
                      <label className="block text-sm font-medium leading-6 text-gray-900">Start Date</label>
                      <input 
                        {
                          ...register(`employer.${index}.start_date`, {
                            required: "Employment Start date is required",
                          })
                        }
                        type="date" 
                        id="start_date" 
                        defaultValue={field.value}
                        placeholder='YYYY-MM-DD'
                        className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      />
                      { errors.employer?.[index]?.start_date && <p className='text-red-500 text-base/loose'>{errors.employer?.[index]?.start_date?.message}</p>}
                    </div>
                    <div className='edate-block'>
                      <label className="block text-sm font-medium leading-6 text-gray-900">End Date</label>
                      <input 
                        {
                          ...register(`employer.${index}.end_date`, {
                            required: {
                              value: (!currentEmp),
                              message: "Employment End date is required",
                            }
                          })
                        }
                        type="date" 
                        id="end_date"
                        defaultValue={field.value}
                        placeholder='YYYY-MM-DD'
                        disabled={currentEmp}
                        className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      />
                      { (errors.employer?.[index]?.end_date && !currentEmp) && <p className='text-red-500 text-base/loose'>{errors.employer?.[index]?.end_date?.message}</p>}
                    </div>
                  </div>
                </div>
              )
            }) }
        </div>
        <button disabled={isSubmitting} className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${isSubmitting ? 'cursor-not-allowed' : ''}`} type='submit'>Submit</button>
      </form>
    </div>
  );
};

