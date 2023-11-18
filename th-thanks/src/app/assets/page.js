'use client'
import { useState, useEffect } from 'react';
import styles from './page.module.css'
// import myGif from '../../public/turkeygif.gif'


export default function Home(){
    const [userName, setUserName] = useState('');
    const [thankCount, setThankCount] = useState(0);
    const [randomUser, setRandomUser] = useState('');
    const [message, setMessage] = useState('');
// https://th-thanks-backend-a80h7y8wg-adnans-projects-c429a957.vercel.app/  https://th-thanks.vercel.app/
    useEffect(() => {
        const isBrowser = typeof window !== 'undefined';
        const loggedInUser = isBrowser ? localStorage.getItem('loggedInUser') : '';
        setUserName(loggedInUser);

        if (loggedInUser) {
            fetch(`https://th-thanks.vercel.app/user/getinfo/${loggedInUser}`)
                .then(response => response.json())
                .then(data => {
                    setThankCount(data.postCount);
                })
                .catch(error => console.error(error)).then(() => {

            fetch(`https://th-thanks.vercel.app/user/${loggedInUser}/getuser`)
                .then(response => response.json())
                .then(data => {
                    setRandomUser(data.name);
                });
            });
        }
    }, []);

    function submitThanks(){
        fetch(`https://th-thanks.vercel.app/user/${userName}/${randomUser}`, {
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
            return fetch(`https://th-thanks.vercel.app/user/${userName}/getuser`);
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
            <h1 className={styles.title}>howdy {userName}, you gave {thankCount} thanks! Give thanks to {randomUser}</h1>
            <textarea className={styles.inputField} value={message} onChange={event => setMessage(event.target.value)} placeholder='Write a nice long message to your pookie' />
            <div className={styles.buttonContainer}>
                <button className={styles.buttons} onClick={submitThanks} disabled={thankCount === 26 || message === ''}> <p>Next</p></button>
            </div>

        </div>

    </div>
    )
}