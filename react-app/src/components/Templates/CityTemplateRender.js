// import './cityRender.css'


const CityTemplate = ({city}) => {

    if (city){
        // city = JSON.parse(city)
        return (
            <div className="city-container">
                
                <div className="detail-box">
                    <h3>City Details</h3>
                    <p><span className='detail-title'>City Type:</span> {city.cityType}</p>
                    <p><span className='detail-title'>Region:</span> {city.region}</p>
                    <p><span className='detail-title'>Government:</span> {city.government}</p>
                    <p><span className='detail-title'>Population:</span> {city.population}</p>
                    <p><span className='detail-title'>Religions:</span> {city.religions}</p>
                    <p><span className='detail-title'>Imports:</span> {city.imports}</p>
                    <p><span className='detail-title'>Exports:</span> {city.exports}</p>
                </div>
                <div className='content-box'>{city.content}</div>
            </div>

        )
    }
}

export default CityTemplate
