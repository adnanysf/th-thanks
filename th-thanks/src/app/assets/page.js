'use client'
import { useState, useEffect } from 'react';
import styles from './page.module.css'
// import myGif from '../../public/turkeygif.gif'


export default function Home(){
    const [userName, setUserName] = useState('');
    const [thankCount, setThankCount] = useState(0);
    const [randomUser, setRandomUser] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const isBrowser = typeof window !== 'undefined';
        const loggedInUser = isBrowser ? localStorage.getItem('loggedInUser') : '';
        setUserName(loggedInUser);

        if (loggedInUser) {
            fetch(`http://localhost:4000/user/getinfo/${loggedInUser}`)
                .then(response => response.json())
                .then(data => {
                    setThankCount(data.postCount);
                })
                .catch(error => console.error(error));

            fetch(`http://localhost:4000/user/${loggedInUser}/getuser`)
                .then(response => response.json())
                .then(data => {
                    setRandomUser(data.name);
                });
        }
    }, []);

    function submitThanks(){
        fetch(`http://localhost:4000/user/${userName}/${randomUser}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message })
        })
        .then(response => response.json())
        .then(data => {
            setThankCount(data.postCount);
            setMessage('');
        })
        .then(() => {
            return fetch(`http://localhost:4000/user/${userName}/getuser`);
        })
        .then(response => response.json())
        .then(data => {
            setRandomUser(data.name);
        })
        .catch(error => console.error(error));
    }

    
    return( 
    <div className={styles.app}>
            <img src='/turkeygif.gif' alt="turkey gif" className={styles.gif} />

        <div className={styles.content}>
            <h1 className={styles.title}>hello {userName}, you gave {thankCount} thanks! Give thanks to {randomUser}</h1>
            <textarea className={styles.inputField} value={message} onChange={event => setMessage(event.target.value)} placeholder='Write a nice long message to your pookie' />
            <div className={styles.buttonContainer}>
                <div className={styles.buttons} onClick={submitThanks}><p>Next</p></div>
            </div>

        </div>

    </div>
    )
}