// import EditCountryForm from './EditCountryForm'
import EditPersonForm from './EditPersonForm'
// import EditCityForm from './EditCityForm'
import CityForm from './CityFormRefactor'
import ContinentForm from './ContinentFormRefactor'
// import EditRegionForm from './EditRegionForm'
import RegionForm from './RegionFromRefactor'
import EditObjectForm from './EditObjectForm'
import CountryForm from './CountryFormRefactor'

const EditEngine = ({page}) => {

    const pageObj = JSON.parse(page.content)

    switch(pageObj.pageType){
        default:
            return 'Hitting default'
        case 'country':
            return (<CountryForm country={pageObj} page={page} action={'Edit'}/>)
        case 'person':
            return (<EditPersonForm person={pageObj} page={page}/>)
        case 'city':
            return (<CityForm city={pageObj} page={page} action={'Edit'}/>)
        case 'region':
            return (<RegionForm region={pageObj} page={page} action={"Edit"}/>)
        case 'continent':
            return (<ContinentForm continent={pageObj} page={page} action={'Edit'}/>)
        case 'object':
            return (<EditObjectForm object={pageObj} page={page}/>)
    }
}

export default EditEngine
