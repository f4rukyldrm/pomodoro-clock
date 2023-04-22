import React, { useEffect, useState } from 'react'

function Pad({ clip, setDisplay }) {

    const { keyCode, id, text, src } = clip;
    const [active, setActive] = useState(false);


    const playSound = () => {
        const audio = document.getElementById(text);
        audio.currentTime = 0;
        audio.play();

        setDisplay(id);
        setActive(true);
        setTimeout(() => {
            setActive(false);
        }, 200);
    }

    const handleKeyPress = (e) => {
        if (e.keyCode === keyCode) {
            playSound(text, id);
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress)
        return () => {
            document.removeEventListener('keydown', handleKeyPress)
        }
    }, []);


    return (
        <div className={`drum-pad ${active ? 'active' : ''}`} id={id} onClick={playSound}>
            <audio className="clip" id={text} src={src}></audio>
            {text}
        </div>
    )
}

export default Pad;