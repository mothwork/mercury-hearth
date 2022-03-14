import EditCountryForm from './EditCountryForm'
import EditPersonForm from './EditPersonForm'
import EditCityForm from './EditCityForm'
import EditContinentForm from './EditContinentForm'
import EditRegionForm from './EditRegionForm'


const EditEngine = ({page}) => {

    const pageObj = JSON.parse(page.content)

    switch(pageObj.pageType){
        default:
            return 'Hitting default'
        case 'country':
            return (<EditCountryForm country={pageObj} page={page}/>)
        case 'person':
            return (<EditPersonForm person={pageObj} page={page}/>)
        case 'city':
            return (<EditCityForm city={pageObj} page={page}/>)
        case 'region':
            return (<EditRegionForm region={pageObj} page={page}/>)
        case 'continent':
            return (<EditContinentForm continent={pageObj} page={page}/>)
        
    }
}

export default EditEngine
