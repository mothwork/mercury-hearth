


const CountryTemplate = ({country}) => {

    if (country){
        country = JSON.parse(country)
        return (
            <div className="country-container">
                <h2>{country.name}</h2>
                <div className="detail-box">
                    <h3>Details</h3>
                    <p>Capital: {country.capital}</p>
                    <p>Population: {country.population}</p>
                </div>
                <div className='content-box'>{country.content}</div>
            </div>

        )
    }
}

export default CountryTemplate
