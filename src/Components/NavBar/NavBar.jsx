import React, { useState, useEffect } from 'react';
import './NavBar.css';
import TextField from '@mui/material/TextField';
import { UseAuth } from '../Firebase/AuthContext';
import GoogleButton from 'react-google-button';
import { Link } from 'react-router-dom';
import { getDoc, setDoc, doc, collection } from 'firebase/firestore';
import { db } from '../Firebase/Config';

export default function NavBar({ isEnterPrsd, setIsEnterPrsd, searchText, setSearchText }) {

    const [isToggleOn, setIsToggleOn] = useState(true);
    const {googleSignIn, user, logOut} = UseAuth();

    const hadleGoogleSignIn = async () => {
        try{    
            await googleSignIn();
        } catch(error) {
            console.log(error);
        }
    }

    const handleLogOut = async () => {
        try{
            await logOut();
        }catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {

        const createNewUser = async () => {

            if(user && Object.keys(user).length !== 0) {
               
                // console.log(user);
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);

                // console.log(docSnap.exists());
                if(!docSnap.exists()) {

                    const newUserRef = await setDoc(docRef, {}); 
                    const todoRef = collection(db, `users/${user.uid}/todos`)
                    const setDocRef = await setDoc(doc(todoRef), {})
                }
            }
        }

        createNewUser();
    }, [user])

    return (
        <div>
            <nav>
                <ul className= { isToggleOn ? 'menu' : 'menu active'}>
                    <li className='logo'><Link to = "/">Todo App</Link></li>
                    <li className='userName'>{user ? "Hey, " + user.displayName : ""} </li>
                    <TextField id="outlined" variant="outlined" label="Search" onInput={e => setSearchText(e.target.value)} onChange = { (e) => setIsEnterPrsd(isEnterPrsd => !isEnterPrsd)} /> 
                    <li className='item'><Link to = "/home">Home</Link></li>
                    <li className='item'><Link to = "/contact">Contact</Link></li>
                    <li className='item'><Link to ="/feedback">Feedback</Link></li>
                    <li className='item button'>
                     {user?.displayName ? <button className='logOut' onClick={handleLogOut}>Log Out</button> : <GoogleButton className='googleButton' onClick={hadleGoogleSignIn}></GoogleButton>} </li>
                    <li className = 'toggle'><a href='#' onClick={()=>setIsToggleOn(!isToggleOn)}> {isToggleOn ? <i className='fas fa-bars'></i> : <i className='fas fa-times'></i>}</a></li>
                </ul>
            </nav>
        </div>
    )
}