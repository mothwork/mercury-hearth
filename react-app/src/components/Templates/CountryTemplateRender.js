import './CountryRender.css'


const CountryTemplate = ({country}) => {

    if (country){

        return (
            <div className="country-container">
                <div className="detail-box">
                    <h3>Country Details</h3>
                    <p><span className='detail-title'>Capital:</span> {country.capital}</p>
                    <p><span className='detail-title'>Region:</span> {country.region}</p>
                    <p><span className='detail-title'>Government:</span> {country.government}</p>
                    <p><span className='detail-title'>Population:</span> {country.population}</p>
                    <p><span className='detail-title'>Religions:</span> {country.religions}</p>
                    <p><span className='detail-title'>Imports:</span> {country.imports}</p>
                    <p><span className='detail-title'>Exports:</span> {country.exports}</p>
                </div>
                <div className='content-box' id='content-box' dangerouslySetInnerHTML={{__html: country.content}}></div>
            </div>

        )
    }
}

export default CountryTemplate
