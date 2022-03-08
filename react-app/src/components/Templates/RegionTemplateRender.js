import './CountryRender.css'


const RegionTemplate = ({region}) => {

    if (region){

        return (
            <div className="country-container">
                <div className="detail-box">
                    <h3>Region Details</h3>
                    <p><span className='detail-title'>Location:</span> {region.location}</p>
                    <p><span className='detail-title'>Geography Types:</span> {region.geoType}</p>
                    <p><span className='detail-title'>Weather:</span> {region.weather}</p>
                    <p><span className='detail-title'>Civilization Types:</span> {region.civType}</p>
                    <p><span className='detail-title'>Travel Safety:</span> {region.travelSafety}</p>
                    <p><span className='detail-title'>Government:</span> {region.government}</p>
                    <p><span className='detail-title'>Population Centers:</span> {region.popCenters}</p>
                </div>
                <div className='content-box' id='content-box' dangerouslySetInnerHTML={{__html: region.content}}></div>
            </div>

        )
    }
}

export default RegionTemplate
