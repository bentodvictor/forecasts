import { useEffect, useState } from 'react';
import './App.css';

interface Forecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    temperatureK: number;
    summary: string;
}

function App() {
    const [forecasts, setForecasts] = useState<Forecast[]>([]);
    const [search, setSearch] = useState<string>('');

    // Filter forecast 
    const filteredForecasts = search.length > 0
        ? forecasts.filter(f => f.summary.toLowerCase().includes(search.toLowerCase()))
        : forecasts;

    // State Handler for search field
    const searchHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearch(e.target.value);
    }

    // Function to populate weather data
    const populateWeatherData = async () => {
        const response = await fetch('weatherforecast');
        const data = await response.json();
        setForecasts(data);
    }

    useEffect(() => {
        populateWeatherData();
    }, []);


    const contents = forecasts.length <= 0
        ? <p><em>Loading... </em></p>
        : <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Temp. (K)</th>
                    <th>Summary</th>
                </tr>
            </thead>
            <tbody>
                {filteredForecasts.map(forecast =>
                    <tr key={forecast.date}>
                        <td>{new Date(forecast.date).toString()}</td>
                        <td>{forecast.temperatureC.toFixed(2)}</td>
                        <td>{forecast.temperatureF.toFixed(2)}</td>
                        <td>{forecast.temperatureK.toFixed(2)}</td>
                        <td>{forecast.summary}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h1 id="tabelLabel">Weather forecast</h1>
            <label form="search"></label>
            <input type="text" name="search" placeholder="Search..." value={search} onChange={searchHandler}></input>
            {contents}
        </div >
    );
}

export default App;