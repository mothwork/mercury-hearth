const ContinentTemplate = ({continent}) => {

    if (continent){
        // continent = JSON.parse(continent)
        return (
            <div className="continent-container">
                {/* <h2>{continent.name}</h2> */}
                <div className='overview-box'>
                    <h3><span className='detail-title'>Overview:</span> </h3>
                    <p>{continent.overview}</p>
                </div>
                <div className="detail-box">
                    <h3>Continent Info</h3>
                    <p><span className='detail-title'>Geography and Ecology:</span> {continent.geographyAndEcology}</p>
                    <p><span className='detail-title'>Countries:</span> {continent.countries}</p>
                    <p><span className='detail-title'>Peoples:</span> {continent.peoples}</p>
                    <p><span className='detail-title'>Cultures:</span> {continent.culture}</p>
                    <p><span className='detail-title'>Trade:</span> {continent.trade}</p>
                </div>
                <div className='content-box'>{continent.content}</div>
            </div>

        )
    }
}

export default ContinentTemplate
