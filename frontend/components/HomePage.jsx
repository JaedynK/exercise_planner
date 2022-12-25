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
    const [currentWorkout, setCurretWorkout]= useState([])
    const [theDelete, setTheDelete]= useState('')
    const [theDeleteEx, setTheDeleteEx]= useState(0)



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


    
      const quotes = {
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


      useEffect(()=>{
        funQuotes()
        getDayOfExercise()
    }, [])

    useEffect(()=>{
    
    },[theDeleteEx])


    return(
    <div className='home_page'>
        <div className="home_header">
        
            <h1>My Personal Workout Tracker</h1>
        </div>
      {workPlz}
      <div>
    { currentWorkout.length === 0 ?<h3> Rest Day </h3> :  currentWorkout && currentWorkout.map(group => {
                return <div>
                <ul>
                  <li>
                  {theDelete === group ? 
                  <h3 style={{ color: 'red', textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>{group}</h3> 
                  : <div className='groupNameDiv'>
                    <text style={{fontWeight: 'bold', fontSize: '1.5rem'}}>{group}</text> 
                    <Button variant="outline-danger" size="sm" style={{marginLeft:'1rem'}} onClick={(event) => setTheDelete(group) }>delete</Button>
                    </div>}
        
                  {exercises && exercises.map((index, i) => { return <div> {group === index.muscile_group ? 
                  <div>
                  <text>{index.exercise_title} 
                <Button style={{marginLeft:'1rem'}} variant="outline-danger" size="sm" onClick={()=>
                  {deleteExercise(index.id); setTheDeleteEx(index.id)}}>x</Button>
                <br></br> ({index.weight}lbs| {index.reps} Reps| {index.sets} Sets)</text>
                <hr></hr>
                </div>
                  : <></>}
                    </div>
                  })}
        
                  </li>
                </ul>
                </div>
                })}
      </div>
      

    <div className="home_quote square rounded border border-5">
        <h4>{quote}</h4>
    </div>
    </div>
    )
}
