import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const Fib = () => {
    const [seenIndexes, setSeenIndexesState] = useState([]);
    const [values, setValuesState] = useState({});
    const [index, setIndexState] = useState('');

    const fetch = useCallback(async () => {
        const values = await axios.get('/api/values/current');
        setValuesState(values.data);
    }, [setValuesState]);

    const fetchIndexes = useCallback(async () => {
        const seenIndexes = await axios.get('/api/values/all');
        setSeenIndexesState(seenIndexes.data);
    }, [setSeenIndexesState]);

    useEffect(() => {
        fetch();
        fetchIndexes();
    }, [fetch, fetchIndexes]);

    // const renderSeenIndexes = () => {
    //         return seenIndexes.map(({ number }) => number).join(', ');
    // }

    // const renderCurrentValues = () => {
    //     const entries = [];
    //     for (let key in values) {
    //         entries.push(
    //             <div key={key}>
    //                 For index {key} I Calculated {values[key]}
    //             </div>
    //         );
    //     }
    //     return entries;
    // }

    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post('/api/values', {
            index: index
        });
        setIndexState('');
        fetch();
        fetchIndexes();
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>Enter you index:</label>
                <input
                    value={index}
                    onChange={event => setIndexState(event.target.value)} />
                <button type='submit'>Submit</button>
            </form>
            <h3>Indices I have seen:</h3>
            {seenIndexes.map(({ number }) => number).join(', ')}
            <h3>Calculated Values</h3>
            {Object.keys(values).map(k => (
                <div key={k}>
                    For index {k} I Calculated {values[k]}
                </div>
            ))}
        </div>
    );
}

export default Fib;