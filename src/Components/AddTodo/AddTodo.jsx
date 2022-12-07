import React, { useState, useContext, useEffect } from 'react';
import { UseAuth } from '../Firebase/AuthContext';
import { db } from '../Firebase/Config';
import {collection, getDocs, getDoc, addDoc, doc, updateDoc, setDoc} from 'firebase/firestore'; 
import { render } from 'react-dom';
import ShowTodo from '../ShowTodo/ShowTodo';

export default function AddTodo({isDataUpdated, setIsDataUpdated}) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dataBase, setDataBase] = useState(false)

    const { user } = UseAuth();

    const insertTodo = async () => {
        
        if(user) {

            if(title === "" || description === "") {

                alert("Please Enter the title and description both!");
                return;
            }
            
            const today = new Date();
            const day = `${today.getDate()} / ${today.getMonth()+1} / ${today.getFullYear()}`;
            let hour, min;
            if(today.getHours().toString().length === 1) {
                hour = "0" + today.getHours();
            } else {
                hour = today.getHours();
            }

            if(today.getMinutes().toString().length === 1) {
                min = "0" + today.getMinutes();
            } else {

                min = today.getMinutes();
            }

            const time = hour + " : " + min;

            const todoRef = collection(db, `users/${user.uid}/todos`)
            const setDocRef = await setDoc(doc(todoRef), {
                    title: title,
                    description: description, 
                    time: time,
                    day: day
            })

            setDataBase(dataBase => !dataBase);

            setTitle("");
            setDescription("");

            setIsDataUpdated(isDataUpdated => !isDataUpdated);
        } else {

            alert("Please Sign Up to add your todo!");
        }
    }

    return (

        <div className='addTodo'>
            <div className='inp'>
                <h2>Add Todo</h2>
                <label htmlFor="title" className='lab'>Title</label>
                <input id="title" name='title' type="text" value={title} onChange = {(e) => setTitle(e.target.value)} placeholder='Enter the title...' />
                <label htmlFor="description" className='lab'>Description</label>
                <input id="description" name='description' type="text" value={description} onChange = {(e) => setDescription(e.target.value)} placeholder='Enter the description...' />
                <button className='addButton' onClick={insertTodo}>Add</button>
            </div>
        </div>
    )
}