// import EditCountryForm from './EditCountryForm'
import EditPersonForm from './EditPersonForm'
import EditCityForm from './EditCityForm'
import ContinentForm from './ContinentFormRefactor'
import EditRegionForm from './EditRegionForm'
import EditObjectForm from './EditObjectForm'
import CountryForm from './CountryFormRefactor'

const EditEngine = ({page}) => {

    const pageObj = JSON.parse(page.content)

    switch(pageObj.pageType){
        default:
            return 'Hitting default'
        case 'country':
            return (<CountryForm country={pageObj} page={page} action='Edit'/>)
        case 'person':
            return (<EditPersonForm person={pageObj} page={page}/>)
        case 'city':
            return (<EditCityForm city={pageObj} page={page}/>)
        case 'region':
            return (<EditRegionForm region={pageObj} page={page}/>)
        case 'continent':
            return (<ContinentForm continent={pageObj} page={page} action='Edit'/>)
        case 'object':
            return (<EditObjectForm object={pageObj} page={page}/>)
    }
}

export default EditEngine
