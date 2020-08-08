import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { signout } from '../apis/backendAPI'
import { kMaxLength } from 'buffer'


const SignoutBtnComponent:React.FC<{setErrorMessage:any}>=({setErrorMessage})=>{
    const history = useHistory()
    const [errorView, setErrorView] = useState("")
    const SignoutEvent=()=>{
        signout().then((res)=>{
            setErrorMessage("ok")
            history.push('/signin')
        }).catch((err)=>{
            setErrorMessage(err.data)
        })
    }
    
    return(
        <div className="SignoutBtnContainer">
            <button onClick={SignoutEvent}>signout</button>
        </div>
    )
}
export default SignoutBtnComponent