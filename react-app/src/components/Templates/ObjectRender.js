


const ObjectTemplate = ({object}) => {

    if (object){
        // person = JSON.parse(person)
        return (
            <div className="object-container">
                <h3>{object.objectType}</h3>
                <div className='content-box' id='content-box' dangerouslySetInnerHTML={{__html: object.content}}></div>
            </div>

        )
    }
}

export default ObjectTemplate
