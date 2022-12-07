import React, { useState, useEffect, useContext } from 'react'
import { db, auth } from '../Firebase/Config'
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore'
import { UseAuth } from '../Firebase/AuthContext'


export default function ShowTodo({ isDataUpdated, setIsDataUpdated,  isEnterPrsd, setIsEnterPrsd, searchText, setSearchText }) {

  const { user } = UseAuth();  
  const [todos, setTodos] = useState([])

  // console.log(searchText + " " + isEnterPrsd);
  useEffect(() => {
    
    if(user && Object.keys(user).length !== 0) {
      
      const getUserData = async () => {

        const todosRef = ( await getDocs(collection(db, `users/${user.uid}/todos`)) );
        let prevArray = [];
        todosRef.forEach(doc => {
       
          prevArray.push(doc);
        })
        setTodos(prevArray);
      }

      getUserData();
    }
  }, [])

  useEffect(() => {

    // console.log(isEnterPrsd);
    if(user && Object.keys(user).length !== 0) {
      
      const getUserData = async () => {

        const todosRef = ( await getDocs(collection(db, `users/${user.uid}/todos`)) );
        let prevArray = [];
        // console.log(searchText.length);
        if(searchText.length >= 1) {

          prevArray = todosRef.docs.filter(
            (doc) => {
              
              if(doc.data().title !== undefined && doc.data().title.toLowerCase().includes(searchText.toLowerCase()) === true) {
                return doc;
              }
            }
          )

          setSearchText("");
        } else {
          todosRef.forEach(doc => {

              prevArray.push(doc);
          })
        }
        setTodos(prevArray);
      }

      getUserData();
    }
  }, [user, isDataUpdated, isEnterPrsd])

  const deleteTodo =  async (id) => {

    await deleteDoc(doc(db, `users/${user.uid}/todos`, id));
    setIsDataUpdated(isDataUpdated => !isDataUpdated);
  }

  return (
      <div className='showTodo'>
        {user ? 
          <h2>Todo List</h2> 
        : <h2>Sign in to Show Your Todos</h2>}

        {user && todos ?  todos.map((doc, index)=> {
          // console.log(doc.data());
          if(Object.keys(doc.data()).length !== 0) {
            return (
                <div key={doc.id} className='displayTodos'>
                  <h4>{doc.data().title}</h4>
                  <p key={index}>{doc.data().description}</p>
                  <p className='timeDate'>{doc.data().time}, {doc.data().day}</p>
                  <button className='deleteTodo' onClick={() => {deleteTodo(doc.id)}}>Delete</button>
                </div>
            )
          }
        }) : ""}
      </div>
  )
}
