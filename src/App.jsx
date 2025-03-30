import React, { useState } from 'react';
import './App.css'; // Import CSS for styling

const Calculator = () => {
    const [display, setDisplay] = useState('0');
    const [expression, setExpression] = useState('');
    const [history, setHistory] = useState([]);
    const [lastAnswer, setLastAnswer] = useState('0'); 
    const [angleMode, setAngleMode] = useState('Rad'); // Default to radians

    const handleButtonClick = (value) => {
        if (value === '=') {
            try {
                // Evaluate the expression safely using Function instead of eval()
                const result = Function(`'use strict'; return (${expression})`)();
                setDisplay(result.toString());
                setExpression(result.toString());
                setHistory([...history, `${expression} = ${result}`]);
                setLastAnswer(result.toString()); // Store the last answer
            } catch (error) {
                setDisplay('Error');
                setExpression('');
            }
        } else if (value === '^') {
            setExpression(expression + '^'); // Show `^` on display
            setDisplay(display + '^');
        } else if (value === 'Ans') {
            setExpression(expression + lastAnswer); // Insert last answer
            setDisplay(display === '0' ? lastAnswer : display + lastAnswer);    
        } else if (value === 'AC') {
            setDisplay('0');
            setExpression('');
        } else if (value === 'Del') {
            setExpression((prev) => (prev.length > 1 ? prev.slice(0, -1) : ''));
            setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
        } else if (value === '+/-') {
            setDisplay((parseFloat(display) * -1).toString());
            setExpression((parseFloat(expression) * -1).toString());
        } else if (value === '.') {
            if (!display.includes('.')) {
                setDisplay(display + value);
                setExpression(expression + value);
            }
        } else {
            // Handling leading zero case
            if (display === '0' && !isNaN(value) && value !== '.') {
                setDisplay(value);
                setExpression(value);
            } else {
                setDisplay(display + value);
                setExpression(expression + value);
            }
        }
    };

    const handleScientificOperation = (operation) => { 
        const convertAngle = (angle) => (angleMode === 'Deg' ? (angle * Math.PI) / 180 : angle);

        switch (operation) {
            
            case 'sin':
                setDisplay(Math.sin(parseFloat(display)).toString());
                setExpression(`Math.sin(${expression})`);
                break;
            case 'cos':
                setDisplay(Math.cos(parseFloat(display)).toString());
                setExpression(`Math.cos(${expression})`);
                break;
            case 'tan':
                setDisplay(Math.tan(parseFloat(display)).toString());
                setExpression(`Math.tan(${expression})`);
                break;
            case 'log':
                setDisplay(Math.log10(parseFloat(display)).toString());
                setExpression(`Math.log10(${expression})`);
                break;
            case 'ln':
                setDisplay(Math.log(parseFloat(display)).toString());
                setExpression(`Math.log(${expression})`);
                break;
            case '√':
                setDisplay(Math.sqrt(parseFloat(display)).toString());
                setExpression(`Math.sqrt(${expression})`);
                break;
            case 'EXP':
                setDisplay(Math.exp(parseFloat(display)).toString());
                setExpression(`Math.exp(${expression})`);
                break;
            case 'π':
                setDisplay(Math.PI.toString());
                setExpression(Math.PI.toString());
                break;
            case 'e':
                setDisplay(Math.E.toString());
                setExpression(Math.E.toString());
                break;
            case 'x!': {
                const num = parseFloat(display);
                if (num < 0 || !Number.isInteger(num)) {
                    setDisplay('Error');
                    setExpression('');
                } else {
                    let factorial = 1;
                    for (let i = 2; i <= num; i++) {
                        factorial *= i;
                    }
                    setDisplay(factorial.toString());
                    setExpression(factorial.toString());
                }
                break;
            }
            case 'x^y':
                setExpression(expression + '**'); // Use ** for power
                setDisplay(display + '^');
                break;
            case 'Inv':
                setDisplay((1 / parseFloat(display)).toString());
                setExpression(`(1/(${expression}))`);
                break;
            case '%':
                setDisplay((parseFloat(display) / 100).toString());
                setExpression(`(${expression}/100)`);
                break;
            case 'Rad':
                setAngleMode('Rad');
                break;
            case 'Deg':
                setAngleMode('Deg');
                break;
            default:
                break;
        }
    };

    return (
        
        <div className="app-container">
            <div className="sidebar">
                <h2>History</h2>
                <ul>
                    {history.map((entry, index) => (
                        <li key={index}>{entry}</li>
                    ))}
                </ul>
            </div>
            <div className="calculator-container">
                <div className="calculator">
                <div className="display">
    <div className="expression">{expression || "0"}</div>
    <div className="result">{display !== "0" ? display : ""}</div>
</div>


                    <br />
                    <div className="buttons">
                        
                           <button className="func-button" onClick={() => handleScientificOperation('Rad')}>Rad</button>
                           <button className="func-button" onClick={() => handleScientificOperation('Deg')}>Deg</button>
                            <button className="func-button" onClick={() => handleScientificOperation('EXP')}>EXP</button>
                            <button className="func-button" onClick={() => handleScientificOperation('tan')}>tan</button>

                            <button className="func-button" onClick={() => handleScientificOperation('cos')}>cos</button>
                            <button className="func-button" onClick={() => handleScientificOperation('log')}>log</button>
                            <button className="func-button" onClick={() => handleScientificOperation('sin')}>sin</button>
                            <button className="func-button" onClick={() => handleScientificOperation('x^y')}>xʸ</button>
                            <button className="func-button" onClick={() => handleScientificOperation('e')}>e</button>
                            <button className="func-button" onClick={() => handleScientificOperation('x!')}>x!</button>
                            <button className="func-button" onClick={() => handleScientificOperation('√')}>√</button>                     
                            <button className="func-button" onClick={() => handleScientificOperation('ln')}>ln</button>  
                            <button className="func-button" onClick={() => handleScientificOperation('Inv')}>Inv</button>
                            <button className="func-button" onClick={() => handleButtonClick('(')}>(</button>
                            <button className="func-button" onClick={() => handleButtonClick(')')}>)</button>
                            <button className="func-button" onClick={() => handleScientificOperation('π')}>π</button>
                            </div>
                            <br />
                    <div className="buttons">
                            <button className="func-button" onClick={() => handleScientificOperation('%')}>%</button>
                            
                            <button className="func-button" onClick={() => handleButtonClick('AC')}>AC</button>
                             <button className="op-button" onClick={() => handleButtonClick('Del')}>Del</button>
                             <button className="op-button" onClick={() => handleButtonClick('/')}>÷</button>
                            <button className="num-button" onClick={() => handleButtonClick('7')}>7</button>
                            <button className="num-button" onClick={() => handleButtonClick('8')}>8</button>
                            <button className="num-button" onClick={() => handleButtonClick('9')}>9</button>
                            <button className="op-button" onClick={() => handleButtonClick('*')}>×</button>

                            <button className="num-button" onClick={() => handleButtonClick('4')}>4</button>
                            <button className="num-button" onClick={() => handleButtonClick('5')}>5</button>
                            <button className="num-button" onClick={() => handleButtonClick('6')}>6</button>
                            <button className="op-button" onClick={() => handleButtonClick('-')}>-</button>

                            <button className="num-button" onClick={() => handleButtonClick('1')}>1</button>
                            <button className="num-button" onClick={() => handleButtonClick('2')}>2</button>
                            <button className="num-button" onClick={() => handleButtonClick('3')}>3</button>
                            <button className="op-button" onClick={() => handleButtonClick('+')}>+</button>
                            <button className="func-button" onClick={() => handleButtonClick('Ans')}>Ans</button>
                            <button className="num-button" onClick={() => handleButtonClick('0')}>0</button>
     
                            <button className="num-button" onClick={() => handleButtonClick('.')}>.</button>
                            <button className="equals-button" onClick={() => handleButtonClick('=')}>=</button>
                                 </div>
                </div>
            </div>
        </div>
    );
};

export default Calculator;