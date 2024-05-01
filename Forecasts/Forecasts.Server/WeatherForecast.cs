namespace Forecasts.Server
{
    public class WeatherForecast
    {
        public DateTime Date { get; set; }
        public int TemperatureC { get; set; }
        public double TemperatureF => 32 + (TemperatureC / 0.5556);
        public double TemperatureK => (TemperatureF - 32) * (5 / 9) + 273.15;
        public string? Summary { get; set; }
    }
}
