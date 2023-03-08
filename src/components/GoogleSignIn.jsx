import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSessionId } from '../reducer'
import { setItem } from '../utils/localStorage'

const BACK = process.env.REACT_APP_BACK

/*
const userData = {
    name: response.data.name,
    token: response.headers.token,
  };
  dispatch(setSessionId(userData));
  setItem("sessionId", userData);
  // devuelve al iniciar sesión al perfil del usuario con url modificada con parte de su usuario
  navigate("/user");
*/

export default function GoogleSignIn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleCredentialResponse = ({ credential }) => {
        fetch(`${BACK}/patients/google`, {
            method: 'post',
            headers: {
                'token': credential
            }
        })
            .then(async response => ({
                token: response.headers.get('token'),
                name: await response.json().then(o => o.name)
            }))
            .then(data => {
                dispatch(setSessionId(data))
                setItem('sessionId', data)
            })
            .then(() => navigate('/user'))
    }

    useEffect(() => {
        /* global google */
        if (window.google) {
            google.accounts.id.initialize({
                client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                callback: handleCredentialResponse
            })

            google.accounts.id.renderButton(document.getElementById('googleSignIn'), {
                // customization
                type: 'standard',
                theme: 'filled_blue',
                size: 'large',
                text: 'signin_with',
                shape: 'pill',
                logo_alignment: 'left',
                locale: 'es_ES'
            })
        }
    }, [])

    return (
        <div id='googleSignIn' />
    )
}
