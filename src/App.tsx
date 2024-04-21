import React, { useEffect, useState } from 'react';
import './App.css';

interface PersonalInfo {
  first_name: string;
  last_name: string;
  current_address: string;
};

interface EmployerInfo {
  name: string;
  start_date: string;
  end_date: string;
};

interface GuarantorInfo {
  name: string;
  address: string;
  relation: string
};

function App() {

  const [ personal, setPersonal ] = useState<PersonalInfo>({
    first_name: "",
    last_name: "",
    current_address: ""
  });

  const [ employer, setEmployer ] = useState<EmployerInfo>({
    name: "",
    start_date: "",
    end_date: ""
  });

  const [ listOfEmployers, setlistOfEmployers ] = useState<EmployerInfo[]>([]);

  const [errors, setErrors] = useState<string[]>([]);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const formatDate = (dateString: string): number => {
      const parts = dateString.split('-');
      
      const year = parts[0];
      const month = parts[1];
      const day = parts[2];
      
      const formattedDate = year + month + day;
      return parseInt(formattedDate);
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if(formatDate(employer.end_date) < formatDate(employer.start_date)) {
      setErrors(["Date values should be format (YYYY-MM-DD), start date should come before the end date"]);
      setIsSubmitting(false);
      return;
    }
    setlistOfEmployers([...listOfEmployers, employer])
    // console.log("Data: ", { personal: personal, employer: listOfEmployers});
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setErrors([])

    setEmployer({
      name: "",
      start_date: "",
      end_date: ""
    })

    setIsSubmitting(false);
  }

  useEffect(() => {
    console.log("Data: ", { personal: personal, employer: listOfEmployers});
    // console.log("ERRORS: ", errors);

  }, [personal, employer])

  return (
    <div>
       <h1 className="text-3xl font-bold">
        Simple React Typescript Tailwind Sample
      </h1>
      <form onSubmit={handleSubmit}>
        {
          errors.length > 0 && (errors.map((error) => (
            <li key={error}
              className='bg-red-100 text-red-500 px-4 py-2 rounded'>
                {error}
              </li>
          )))
        }
        <div className='border rounded border-sky-500 p-10'>
          <h4 className="font-bold">
            Personal
          </h4>
          <label className="block text-sm font-medium leading-6 text-gray-900">First name</label>
          <input 
            value={personal.first_name}
            onChange={(e) => setPersonal({...personal, first_name: e.target.value})}
            placeholder='First Name'
            required
            className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          />
          <label className="block text-sm font-medium leading-6 text-gray-900">Last name</label>
          <input 
            value={personal.last_name}
            onChange={(e) => setPersonal({...personal, last_name: e.target.value})}
            placeholder='Last Name'
            required
            className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          />
          <label className="block text-sm font-medium leading-6 text-gray-900">Current Address</label>
          <input 
            value={personal.current_address}
            onChange={(e) => setPersonal({...personal, current_address: e.target.value})}
            placeholder='Current Address'
            required
            className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          />
        </div>

        <div className='border rounded border-sky-500 p-10'>
          <h4 className="font-bold">
            Employer
          </h4>
          <label className="block text-sm font-medium leading-6 text-gray-900">Name</label>
          <input 
            value={employer.name}
            onChange={(e) => setEmployer({...employer, name: (e.target.value)})}
            placeholder='Employer Name'
            required
            className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          />
          <label className="block text-sm font-medium leading-6 text-gray-900">Start Date</label>
          <input 
            value={employer.start_date}
            type="date" 
            id="start_date" 
            onChange={(e) =>  setEmployer({...employer, start_date: e.target.value})}
            placeholder='YYYY-MM-DD'
            required
            className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          />
          <label className="block text-sm font-medium leading-6 text-gray-900">End Date</label>
          <input 
            value={employer.end_date}
            type="date" 
            id="end_date" 
            onChange={(e) => setEmployer({...employer, end_date: e.target.value})}
            placeholder='YYYY-MM-DD'
            required
            className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          />
        </div>

        <button disabled={isSubmitting} className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${isSubmitting ? 'cursor-not-allowed' : ''}`} type='submit'>Submit</button>

      </form>
    </div>
  );
}

export default App;
