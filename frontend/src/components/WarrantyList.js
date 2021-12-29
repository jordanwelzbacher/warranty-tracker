import {useEffect, useState} from 'react';
import axios from '../axios.js'

const WarrantyList = () => {
  const [warrantyList, setWarrantyList] = useState([]);

  const fetchWarranties = async () => {
    const data = await axios.get('/warranty/1');
    const { warranties } = data.data;
    setWarrantyList(warranties);
    console.log(warranties);
  }

  useEffect(() => {
    fetchWarranties();
  }, [])

  return (
    <div>
      <ul>
        {warrantyList.map(warranty => {
          return (<li key={warranty.id}>{warranty.product}</li>)
        })}
      </ul>
    </div>
  )
}

export default WarrantyList
