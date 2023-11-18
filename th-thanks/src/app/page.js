"use client"
import styles from './page.module.css'
import { useState } from 'react';
import Link from 'next/link';
// import { useNavigate } from 'react-router-dom';
// import myGif from '../../public/turkeygif.gif'


export default function Home(){

    const [selectedName, setSelectedName] = useState('Ekdev');
    const names = ['Ekdev', 'Abhishek', 'Li', 'Ayo', 'Anish','Kirthi','Ashrita','Jaden'
                    ,'Malavi','Arya','Jiyoon','Mateo','Anjali','Keegan','Big Harsh','Naveen',
                    'Gabe','Nafi','Lizzy','Joshua','Adnan','Austin','Rita','Adam','Lil Harsh','Nico','Kat'

];
    const handleNameChange = (event) => {
        setSelectedName(event.target.value);
    };

    const handleButtonClick = () => {

        if (typeof window !== 'undefined') {
            window.localStorage.setItem('loggedInUser', selectedName);
        }
        console.log(selectedName);
        // navigate('/assets');
    };




    return( 
    <div className={styles.app}>
            <img src='/giphy.gif' alt="turkey gif" className={styles.gif} />

        <div className={styles.content}>
            <h1 className={styles.title}>Hello I am </h1>
            <select className={styles.inputField} onChange={(e) => handleNameChange(e)}> 
                {names.map((name, index) => (
                    <option key={index} value={name}>
                        {name}
                        </option>))}
            
            </select>
            <div className={styles.buttonContainer}>
                <Link href="assets" className={styles.buttons} onClick={handleButtonClick} ><p>Ready to give thanks</p></Link>
            </div>

        </div>

    </div>
    )
}