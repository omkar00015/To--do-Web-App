import React, { useState } from 'react';
import './Home.css';
import AddTodo from '../AddTodo/AddTodo';
import ShowTodo from '../ShowTodo/ShowTodo';

export default function Home({ isEnterPrsd, setIsEnterPrsd, searchText, setSearchText}) {

    // console.log(isEnterPrsd);
    const [isDataUpdated, setIsDataUpdated] = useState(false)
    return ( 
        <div className='mainContent'>
            <AddTodo isDataUpdated = {isDataUpdated} setIsDataUpdated = {setIsDataUpdated} key = {1} />
            <ShowTodo isDataUpdated = {isDataUpdated} setIsDataUpdated = {setIsDataUpdated} isEnterPrsd = {isEnterPrsd} setIsEnterPrsd = {setIsEnterPrsd} searchText = {searchText} setSearchText = {setSearchText} key = {2} />
        </div>
    )
}