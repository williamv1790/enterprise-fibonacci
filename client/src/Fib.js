import React, {Component} from 'react';
import axios from 'axios';

class Fib extends Component {
    state = {
        seenIndexes: [],
        values: {},
        index: ''
    };

    async fetch() {
        const values = await axios.get('/api/values/current');
        this.setState({values: values.data});
    }

    async fetchIndexes() {
        const seenIndexes = await axios.get('/api/values/all');
        this.setState({seenIndexes: seenIndexes.data});
    }

    renderSeenIndexes() {
        return this.state.seenIndexes.map(({ number }) => number).join(', ');
    }

    renderCurrentValues() {
        const entries = [];
        for (let key in this.state.values) {
            entries.push(
                <div key={key}>
                    For index {key} I Calculated {this.state.values[key]}
                </div>
            );
        }
        return entries;
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post('/api/values', {
            index: this.state.index
        });
        this.setState({ index: '' });
    }

    componentWillMount() {
        this.fetch();
        this.fetchIndexes();
    }

    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <labe>Enter you index:</labe>
                    <input
                        value={this.state.index}
                        onChange={event => this.setState({ index: event.target.value })} />
                    <button />
                </form>
                <h3>Indices I have seen:</h3>
                {this.renderSeenIndexes()}
                <h3>Calculated Values</h3>
                {this.renderCurrentValues()}
            </div>
        );
    };
}

export default Fib;