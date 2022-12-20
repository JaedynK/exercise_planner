import axios from 'axios'

export default function User(){
    const signIn=async()=>{
        event.preventDefault()
        let username=document.getElementById("signInUserName").value
        let password=document.getElementById("signInPassword").value
        console.log(username, password)
        let myResponse=await axios.post('signIn/',{
          'username':username,
          'password':password
        })
            
        console.log(myResponse.data)
        if (myResponse.data["signIn"]==true){
          window.location.href="/"
        }
    //     else{
    //         alert("incorrect input")
    //         // window.location.reload()
    //     }
      }

    return(
        <div className='form_page'>
            <div className='form_container'>
                <form onSubmit={signIn}>
                    <input id='signInUserName' placeholder='username' />
                    <input id='signInPassword' placeholder='password' type="password"/>
                    <button onClick={signIn}>Sign In</button>
                </form>
            </div>
        </div>
    )
}
