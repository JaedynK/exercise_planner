import axios from 'axios'

export default function NewUser(){

        const signUp=async()=>{
            event.preventDefault()
            let email=document.getElementById("signUpEmail").value
            let username=document.getElementById("signUpUserName").value
            let first_name=document.getElementById("signUpFirstName").value
            let last_name=document.getElementById("signUpLastName").value
            let password=document.getElementById("signUpPassword").value
            let password2=document.getElementById("signUpPassword2").value
            console.log(email, password, password2)

            if (password === password2){
            let myResponse=await axios.post('signUp/',{
                'username': username,
                'first_name': first_name,
                'last_name': last_name,
                'email':email,
                'password':password
            })
        }else{
            alert("Make sure your passwords match!")
        }
        if(myResponse.data['signup']==true){
            window.location.href="/"
        }
    }

    return(
    <div className='form_page'>
        <div className='form_container'>
        <form onSubmit={signUp}>
        <div>
        <input className='signInput' id='signUpFirstName' placeholder='First Name' />
        <input className='signInput' id='signUpLastName' placeholder='Last Name' />
        </div><br></br>
        <div>
        <input className='signInput' id='signUpEmail' placeholder='email' />
        <input className='signInput' id='signUpUserName' placeholder='username' />
        </div><br></br>
        <input className='signInput' id='signUpPassword' placeholder='password' />
        <input className='signInput' id='signUpPassword2' placeholder='re-enter password' />
        <br></br>
        <button onClick={signUp}>Sign Up</button>
        </form>
        </div>
    </div>
    )
}
