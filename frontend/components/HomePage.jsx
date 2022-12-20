import axios from 'axios'
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom'
import NewUser from './NewUser';
import UserAccount from './WorkoutPlan';
import { useState, useEffect} from 'react';

import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function HomePage(){

    
    const [quote, setQuote]= useState('')

    // const [user, setUser]= useState(null)
//--------------Cookie set-up---------------------------//
    // function getCookie(name) {
    //     let cookieValue = null;
    //     if (document.cookie && document.cookie !== '') {
    //         const cookies = document.cookie.split(';');
    //         for (let i = 0; i < cookies.length; i++) {
    //             const cookie = cookies[i].trim();
    //             // Does this cookie string begin with the name we want?
    //             if (cookie.substring(0, name.length + 1) === (name + '=')) {
    //                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
    //                 break;
    //             }
    //         }
    //     }
    
    //     const curr_user=async()=>{
    //       let myResponse=await axios.get('current_user')
    //       let user= myResponse.data && myResponse.data[0] && myResponse.data[0].fields
    //       console.log(myResponse)
    //       setUser(myResponse.data[0])
    //     }
    //     useEffect(()=>{
    //       curr_user()
    //     },[])
    
    //     return cookieValue;
    //   }
    //   const csrftoken = getCookie('csrftoken');
    //   axios.defaults.headers.common["X-CSRFToken"]=csrftoken
      //--------------Cookie set-up---------------------------//
    
      const quotes = {
        method: 'GET',
        // url: 'https://quotes-by-api-ninjas.p.rapidapi.com/v1/quotes',
        // params: {category: 'success'},
        // headers: {
        //   'X-RapidAPI-Key': 'cb985bfd5fmsh86f285b0e1f3f59p124c93jsn9f282fa38c92',
        //   'X-RapidAPI-Host': 'quotes-by-api-ninjas.p.rapidapi.com'
        method: 'POST',
        url: 'https://motivational-quotes1.p.rapidapi.com/motivation',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': 'cb985bfd5fmsh86f285b0e1f3f59p124c93jsn9f282fa38c92',
          'X-RapidAPI-Host': 'motivational-quotes1.p.rapidapi.com'
        },
        data: '{"key1":"value","key2":"value"}'
     }
      
      function funQuotes(){
      axios.request(quotes).then(function (response) {
        // let checkAuthor =response.data[0].author
         console.log(response.data);
        setQuote(response.data)
      }).catch(function (error) {
          console.error(error);
      });
      }


  const [monday, setMonday] = useState([])
  const [tuesday, setTuesday] = useState([])
  const [wednesday, setWednesday] = useState([])
  const [thursday, setThursday] = useState([])
  const [friday, setFriday] = useState([])
  const [saturday, setSaturday] = useState([])
  const [sunday, setSunday] = useState([])
  function getDayOfExercise(){
    axios.get('weekday/').then(response=>{
      let data = response.data
      console.log(data[0])
      if(data.length === 0 ){
        alert("No Exercise Plan made")
      }else{
      setMonday(data[0].mondayGroups)
      setTuesday(data[0].tuesdayGroups)
      setWednesday(data[0].wednesdayGroups)
      setThursday(data[0].thursdayGroups)
      setFriday(data[0].fridayGroups)
      setSaturday(data[0].saturdayGroups)
      setSunday(data[0].sundayGroups)
      }
    })
  }


      useEffect(()=>{
        funQuotes()
        getDayOfExercise()
    }, [])

    return(
    <div className='home_page'>
        <div className="home_header">
      
            <h1>My Personal Workout Tracker</h1>
        </div>
 
        {/* test api  */}
        <div className="home_quote square rounded border border-5">

        <h4>{quote}</h4>
         </div>
         { monday && monday.map(day => {
          return <div>
            <input type='text'
          placeholder={day}
          />
          </div>
          })}
           <h2>Tuesday</h2>
     { tuesday && tuesday.map(day => {
          return <p>{day}</p>
          })}
           <h2>Wednesday</h2>
     { wednesday && wednesday.map(day => {
          return <p>{day}</p>
          })}
           <h2>Thursday</h2>
     { thursday && thursday.map(day => {
          return <p>{day}</p>
          })}
           <h2>Firday</h2>
     { friday && friday.map(day => {
          return <p>{day}</p>
          })}
           <h2>Saturday</h2>
     { saturday && saturday.map(day => {
          return <p>{day}</p>
          })}
           <h2>Sunday</h2>
      { sunday && sunday.map(day => {
          return<p>{day}</p>
          })}
    </div>
    )
}
