
import PersonForm from './PersonFormRefactor'
import CityForm from './CityFormRefactor'
import ContinentForm from './ContinentFormRefactor'
import RegionForm from './RegionFromRefactor'
import ObjectForm from './ObjectFormRefactor'
import CountryForm from './CountryFormRefactor'

const EditEngine = ({page}) => {

    const pageObj = JSON.parse(page.content)

    switch(pageObj.pageType){
        default:
            return 'Hitting default'
        case 'country':
            return (<CountryForm country={pageObj} page={page} action={'Edit'}/>)
        case 'person':
            return (<PersonForm person={pageObj} page={page} action={'Edit'}/>)
        case 'city':
            return (<CityForm city={pageObj} page={page} action={'Edit'}/>)
        case 'region':
            return (<RegionForm region={pageObj} page={page} action={"Edit"}/>)
        case 'continent':
            return (<ContinentForm continent={pageObj} page={page} action={'Edit'}/>)
        case 'object':
            return (<ObjectForm object={pageObj} page={page} action={'Edit'}/>)
    }
}

export default EditEngine
