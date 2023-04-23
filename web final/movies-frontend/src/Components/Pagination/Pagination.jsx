import React, { useState } from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './Pagination.css'
import { getNameBaseData } from '../../Redux/UserReducer';
import { useDispatch } from 'react-redux';
const PaginationCus = (props) => {

    const dispatch=useDispatch();

    const[pagination,setPagination]=useState({
        count:props.count,
        from:0,
        to:3
    });

    console.log("pagination",pagination)
const handlePageChange=(event,page)=>{
    const from=(page-1)*3;
    const to=(page-1)* 3+3;
    setPagination({...pagination,from:from,to:to});

    console.log("page",page)

    const tempDate = {
        name: props.name,
        profession: props.profession,
        page: page,
      };
      dispatch(getNameBaseData(tempDate));


}

console.log("pagination",pagination)
  return (
    <>
    <div className='mainPagination'>

    
    <Stack spacing={2}>
 
      <Pagination count={Math.ceil(props.count/3)} color="primary" 
      onChange={handlePageChange}

      
      />

    </Stack>
    </div>
    </>
  )
}

export default PaginationCus