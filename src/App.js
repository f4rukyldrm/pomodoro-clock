import './App.css';
import { useState } from 'react'

function App() {

    const [expression, setExpression] = useState('');
    const [answer, setAnswer] = useState(0);
    const [numbers, setNumbers] = useState([]);

    const display = (e) => {

        // check for zeros at start
        if (expression[0] === '0' && e.target.dataset.value === '0') {
            return;
        }

        // check for multiple dots at the same number
        if (e.target.dataset.value === '.' && /\./.test(numbers[numbers.length - 1])) {
            return;
        }

        //check for consecutive operators
        if (/[+*/-]/.test(e.target.dataset.value) && /[+*/-]/.test(expression[expression.length - 1])) {
            console.log(expression.slice(0, expression.length - 2) + '+')
            if (e.target.dataset.value === '-' && expression[expression.length - 1] === '-') {
                setExpression(expression.slice(0, expression.length - 1) + '+');
                setAnswer(expression + e.target.dataset.value);
                return;
            } else if (e.target.dataset.value === '-') {
                setExpression(expression + e.target.dataset.value);
                setAnswer(expression + e.target.dataset.value);
                return;
            } else {
                if (/[+*/]/.test(expression[expression.length - 2])) {
                    setExpression(expression.slice(0, expression.length - 2) + e.target.dataset.value);
                } else {
                    setExpression(expression.slice(0, expression.length - 1) + e.target.dataset.value);
                    setAnswer(expression + e.target.dataset.value);
                }
                return;
            }
        }

        const sum = expression + e.target.dataset.value;
        setExpression(sum);
        setAnswer(sum);
        setNumbers(sum.split(/[+*/-]/));
    }

    const calculate = () => {
        const sum = expression !== '' ? eval(expression).toString() : '0';
        setAnswer(sum);
        setExpression(sum);
        setAnswer(sum);
    }

    const allClear = () => {
        setExpression('');
        setAnswer(0);
        setAnswer(0);
    }

    return (
        <>
            <div className="calculator">
                <div id='display'>{answer}</div>
                <div onClick={display} data-value='-' className='key' id="subtract">-</div>
                <div onClick={display} data-value='+' className='key' id="add">+</div>
                <div onClick={display} data-value='*' className='key' id="multiply">x</div>
                <div onClick={display} data-value='/' className='key' id="divide">/</div>
                <div onClick={display} data-value='7' className='key' id="seven">7</div>
                <div onClick={display} data-value='8' className='key' id="eight">8</div>
                <div onClick={display} data-value='9' className='key' id="nine">9</div>
                <div onClick={display} data-value='4' className='key' id="four">4</div>
                <div onClick={display} data-value='5' className='key' id="five">5</div>
                <div onClick={display} data-value='6' className='key' id="six">6</div>
                <div onClick={display} data-value='1' className='key' id="one">1</div>
                <div onClick={display} data-value='2' className='key' id="two">2</div>
                <div onClick={display} data-value='3' className='key' id="three">3</div>
                <div onClick={display} data-value='0' className='key' id="zero">0</div>
                <div onClick={display} data-value='.' className='key' id="decimal">.</div>
                <div onClick={allClear} data-value='AC' className='key' id='clear'>AC</div>
                <div onClick={calculate} data-value='=' className='key' id="equals">=</div>
            </div>
        </>
    );
}

export default App;
