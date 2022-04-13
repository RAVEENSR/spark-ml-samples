import React from 'react';

import axios from 'axios';

import { MuiThemeProvider, TextareaAutosize } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import CustomPieChart from './components/CustomPieChart';
import { predictUrl } from './config';

const useStyles = () => ({
    root: {
        height: '100%'
    }
});

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textInput: '',
            showChart: false,
            genre: '',
            chartData: ''
        };
        this.onButtonClick = this.onButtonClick.bind(this);
        this.handleTextInput = this.handleTextInput.bind(this);
    }

    handleTextInput = (e) => {
        this.setState({
            textInput: e.target.value
        });
    };

    onButtonClick = async () => {
        if (this.state.textInput) {
            await axios
                .post(predictUrl, this.state.textInput, {
                    headers: {
                        'Content-Type': 'text/plain'
                    }
                })
                .then((response) => {
                    if (response && response.data) {
                        const genre = response.data.genre;
                        this.setState({
                            showChart: true,
                            genre: genre,
                            chartData: [
                                { name: 'Rap', value: response.data.rapProbability },
                                { name: 'Pop', value: response.data.popProbability },
                                { name: 'Country', value: response.data.countryProbability },
                                { name: 'Blues', value: response.data.bluesProbability },
                                { name: 'Jazz', value: response.data.jazzProbability },
                                { name: 'Reggae', value: response.data.reggaeProbability },
                                { name: 'Rock', value: response.data.rockProbability },
                                { name: 'Hip Hop', value: response.data.hiphopProbability }
                            ]
                        });
                    }
                })
                .catch((error) => {
                    console.error('Error occurred while getting prediction', error);
                });
        } else {
            alert('Empty string provided!');
        }
    };

    render() {
        const renderChart = (
            <div>
                <br />
                <br />
                <Typography variant='h6'>Genre: {this.state.genre}</Typography>
                <CustomPieChart chartData={this.state.chartData} />
            </div>
        );

        return (
            <MuiThemeProvider>
                <div align='center'>
                    <div>
                        <div>
                            <Typography variant='h2'>Lyrics Matcher</Typography>
                        </div>
                    </div>
                    <div>
                        <TextareaAutosize
                            aria-label='empty textarea'
                            placeholder='Paste song lyrics here'
                            style={{
                                width: 500,
                                height: 300
                            }}
                            onChange={this.handleTextInput}
                        />
                        <br />
                        <Button variant='contained' onClick={this.onButtonClick}>
                            Get Predictions
                        </Button>
                    </div>
                    {this.state.showChart ? renderChart : <div />}
                </div>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(useStyles)(App);
