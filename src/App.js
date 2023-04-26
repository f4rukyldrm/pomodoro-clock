import './App.css';
import { useState, useEffect } from 'react'

function App() {

    const [length, setLength] = useState({ break: 5, session: 25 });
    const [current, setCurrent] = useState('session');
    const [timeLeft, setTimeLeft] = useState({ m: length[current], s: '00' });
    const [isOn, setIsOn] = useState(false);

    const lengthHandle = (e) => {

        if (e.target.id.includes('break') && !isOn) {
            if (e.target.id === 'break-increment' && length['break'] < 60) {
                setLength({ ...length, break: length.break + 1 })
            } else if (e.target.id === 'break-decrement' && length.break > 1) {
                setLength({ ...length, break: length.break - 1 })
            }
        } else if (e.target.id.includes('session') && !isOn) {
            if (e.target.id === 'session-increment' && length['session'] < 60) {
                setLength(prev => {
                    return { ...prev, session: prev.session + 1 };
                })
            } else if (e.target.id === 'session-decrement' && length.session > 1) {
                setLength({ ...length, session: length.session - 1 })
            }
        }
    }

    const toggleStart = () => {
        setIsOn(prev => !prev);
    }

    const reset = () => {
        toggleSound(false);
        setIsOn(false);
        setCurrent('session');
        setLength({ break: 5, session: 25 });
        setTimeLeft({ m: 25, s: '00' });
    }

    const toggleSound = (condition) => {
        const audio = document.getElementById('beep');
        if (condition) {
            audio.currentTime = 0;
            audio.play();
        } else {
            audio.currentTime = 0;
            audio.pause();
        }
    }

    useEffect(() => {

        const timer = setInterval(() => {
            let state = current;
            if (isOn) {

                if (timeLeft['s'] <= 0) {
                    setTimeLeft(prev => {
                        if (prev.m - 1 == '0') {
                            return { s: 60, m: '00' };
                        }
                        return { s: 60, m: prev.m - 1 };
                    });
                }
                if (timeLeft['m'] < 1) {
                    setTimeLeft(prev => {
                        return { ...prev, m: '00' };
                    });
                }

                setTimeLeft(prev => {
                    if (prev.s - 1 == '0') {
                        return { ...prev, s: '00' }
                    } else {
                        return { ...prev, s: prev.s - 1 };
                    }
                });

                if (timeLeft['s'] <= 0 && timeLeft['m'] <= 0) {
                    setTimeout(() => {
                        toggleSound(true);
                    }, 1000)

                    state = current === 'session' ? 'break' : 'session';
                    setCurrent(prev => state);
                    setTimeLeft(prev => {
                        return { m: length[state], s: '00' };
                    });
                }

            }

        }, 1000);

        return () => {
            clearInterval(timer);
        }
    }, [isOn, timeLeft]);



    useEffect(() => {
        if (!isOn) {
            setTimeLeft(prev => {
                return { m: length[current], s: '00' };
            });
        }
    }, [length, current]);


    return (

        <>
            <div className="timer-container">
                <div className="length-container">
                    <div id="break-label">
                        <div className="text">Break Length</div>
                        <div className="length-btns">
                            <button onClick={lengthHandle} id="break-decrement" value='-'>-</button>
                            <div id="break-length">{length.break}</div>
                            <button onClick={lengthHandle} id="break-increment" value='+'>+</button>
                        </div>
                    </div>
                    <div id="session-label">
                        <div className="text">Session Length</div>
                        <div className="length-btns">
                            <button onClick={lengthHandle} id="session-decrement" value='-'>-</button>
                            <div id="session-length">{length.session}</div>
                            <button onClick={lengthHandle} id="session-increment" value='+'>+</button>
                        </div>
                    </div>
                </div>

                <div className="time-container">
                    <div id="timer-label">{current}</div>
                    <div id="time-left">
                        {`${timeLeft['m'] < 10 && timeLeft['m'].toString()[0] != '0' ? '0' + timeLeft['m'] : timeLeft['m']}:${timeLeft['s'] < 10 && timeLeft['s'].toString()[0] != '0' ? '0' + timeLeft['s'] : timeLeft['s']}`}
                    </div>
                    <div className="time-btns">
                        <button onClick={toggleStart} id="start_stop" className={!isOn ? 'open' : 'close'}>
                            {!isOn
                                ?
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" /></svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" /></svg>}
                        </button>
                        <button onClick={reset} id="reset">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M48.5 224H40c-13.3 0-24-10.7-24-24V72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8H48.5z" /></svg>
                        </button>
                    </div>
                </div>
            </div>


            <div className='fade-text' style={{
                animationDuration: `${timeLeft['m'] * 60}s`,
                animationName: 'fade',
                animationDirection: 'forwards',
                animationPlayState: `${isOn ? 'running' : 'paused'}`
            }} >
                <svg viewBox="0 0 100 100" width="100" height="100">
                    <defs>
                        <path id="circle"
                            d="
                                M 50, 50
                                m -37, 0
                                a 37,37 0 1,1 74,0
                                a 37,37 0 1,1 -74,0"
                        />
                    </defs>
                    <text font-size="3.43">
                        <textPath xlinkHref="#circle">
                            time is a flat circle
                            time is a flat circle
                            time is a flat circle
                            time is a flat circle
                            time is a flat circle
                            time is a flat circle
                            time is a flat circle
                            time is a flat circle
                        </textPath>
                    </text>
                </svg>
            </div >
            <audio src="https://cdn.pixabay.com/audio/2022/03/15/audio_808ee969a0.mp3" id='beep'></audio>
        </>
    );
}

export default App;
