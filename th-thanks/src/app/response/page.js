"use client"
import { useEffect, useState } from "react"
import styles from './page.module.css'

export default function Response(){
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        fetch('http://th-thanks.vercel.app/user/getallthanks')
            .then(response => response.json())
            .then(data => {
                const messageObject = data.map(user => ({
                    name: user.name,
                    messages: user.messages
                
                }))
                console.log(messageObject)
                setMessages(prevMessages => [...prevMessages,...messageObject]);
            })
            .catch(error => console.error(error));

    }, [])

    return(
        <div className={styles.app}>

            <div>
                {messages.map((message, index) => (
                    <div key={index}>
                        <h1>{message.name}</h1>
                        {message.messages.map((message, index) => (
                            <p key={index}>{message}</p>
                        ))}
                    </div>
                ))}
            </div>
            


        </div>
    )
}