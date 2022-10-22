import React, { useState } from 'react';
import { Link, useParams} from "react-router-dom";
import { addressSubmit } from '../Api/Api';


const initialValue = {
    user_id: "",
    AddressDetails: {
        no:{
            prev_address_line1: "",
            prev_address_line2: "",
            prev_address_line3: ""
        }
    },

}


function AddressDetails() {
    const { id } = useParams();

    const [addressCount, setAddressCount] = useState([1]);
    const [address, setAddress] = useState(initialValue);
    const [add1, setAdd1] = useState([]);
    const [add2, setAdd2] = useState([]);
    const [add3, setAdd3] = useState([]);

    const handleSubmit = async() => {
        for(let i=0; i<addressCount.length; i++){
            setAddress({...address, user_id: id,
            AddressDetails: {
                i:{
                    prev_address_line1: add1[i],
                    prev_address_line2: add2[i],
                    prev_address_line3: add3[i]
                }
            }})
        }
        
       let response = await addressSubmit(address);
       console.log(response)
    }

    const handleAdd = () => {
        setAddressCount([...addressCount, 1])
    }
    const handleRemove = () => {
        setAddressCount(addressCount.filter((item, index) => { return index !== addressCount.length - 1 }))
    }
    return (

        <div className='flex bg-white p-[200px] justify-center'>
            <div className='bg-gray-100 w-[50%] rounded-md py-2 border border-black'>
                <span className='flex justify-center py-2 text-2xl font-semibold text-gray-800'>Enter Your Previous Address</span>
                <div className='p-4 space-y-5'>
                    {addressCount.map((item, index) => (
                        <div className='space-y-4'>
                            <p className='text-lg text-gray-700'>Previous Address {index + 1}</p>
                            <input onChange={(e)=>setAdd1[index](e.target.value)} name="prev_address_line1" className='w-full p-2 text-xs border border-gray-400 rounded-md' type="text" placeholder="Address Line 1" />
                            <input onChange={(e)=>setAdd2[index](e.target.value)} name="prev_address_line2" className='w-full p-2 text-xs border border-gray-400 rounded-md' type="text" placeholder="Address Line 2" />
                            <input onChange={(e)=>setAdd3[index](e.target.value)} name="prev_address_line3" className='w-full p-2 text-xs border border-gray-400 rounded-md' type="text" placeholder="Address Line 3" />
                        </div>
                    ))}


                    <div className='flex flex-col items-center justify-center'>
                        <button onClick={handleSubmit} className='py-2 text-gray-100 bg-green-800 rounded-md px-14'>Submit</button>
                        <p onClick={handleAdd} className='py-2 text-sm text-blue-500 underline cursor-pointer w-36'>Add Another Address</p>
                        {addressCount.length > 1 ?
                            <p onClick={handleRemove} className='py-2 text-sm text-blue-500 underline cursor-pointer '>Remove Address</p>
                            : <Link to="/"><p className='py-2 text-sm text-blue-500 underline cursor-pointer '>{`<<Back`}</p></Link>
                        }

                    </div>

                </div>

            </div>
        </div>
    )
}

export default AddressDetails