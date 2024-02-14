import { useState, useCallback, useMemo } from 'react';

import IconButton from '../UI/IconButton.jsx';
import MinusIcon from '../UI/Icons/MinusIcon.jsx';
import PlusIcon from '../UI/Icons/PlusIcon.jsx';
import CounterOutput from './CounterOutput.jsx';
import { log } from '../../log.js';

function isPrime(number) {
    log(
        'Calculating if is prime number',
        2,
        'other'
    );
    if (number <= 1) {
        return false;
    }

    const limit = Math.sqrt(number);

    for (let i = 2; i <= limit; i++) {
        if (number % i === 0) {
            return false;
        }
    }

    return true;
}

const Counter = function Counter({ initialCount }) {
    log('<Counter /> rendered', 1);
    const initialCountIsPrime = useMemo(() => isPrime(initialCount), [initialCount]);

    const [counter, setCounter] = useState(initialCount);

    const handleDecrement = useCallback(function handleDecrement() {
        setCounter((prevCounter) => prevCounter - 1);
    }, []);

    const handleIncrement = useCallback(function handleIncrement() {
        setCounter((prevCounter) => prevCounter + 1);
    }, []);

    //useCallback used here because handle functions are recreated each time counter changes
    //so "memo" from IconButton always receive different links for handlers and keeps rerendering

    return (
        <section className="counter">
            <p className="counter-info">
                The initial counter value was <strong>{initialCount}</strong>. It{' '}
                <strong>is {initialCountIsPrime ? 'a' : 'not a'}</strong> prime number.
            </p>
            <p>
                <IconButton icon={MinusIcon} onClick={handleDecrement}>
                    Decrement
                </IconButton>
                <CounterOutput value={counter} />
                <IconButton icon={PlusIcon} onClick={handleIncrement}>
                    Increment
                </IconButton>
            </p>
        </section>
    );
}

export default Counter;