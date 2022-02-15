// import './personRender.css'


const personTemplate = ({person}) => {

    if (person){
        // person = JSON.parse(person)
        return (
            <div className="person-container">
                {/* <h2>{person.name}</h2> */}
                <div className="detail-box">
                    <h3>Person Details</h3>
                    <p><span className='detail-title'>Race:</span> {person.race}</p>
                    <p><span className='detail-title'>Occupation:</span> {person.occupation}</p>
                    <p><span className='detail-title'>Born:</span> {person.born}</p>
                    <p><span className='detail-title'>Died:</span> {person.died}</p>
                    <p><span className='detail-title'>Residence:</span> {person.residence}</p>
                    <p><span className='detail-title'>Aliases:</span> {person.alias}</p>
                </div>
                <div className='content-box' id='content-box' dangerouslySetInnerHTML={{__html: person.content}}></div>
            </div>

        )
    }
}

export default personTemplate
