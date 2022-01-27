import EditCountryForm from './EditCountryForm'
import EditPersonForm from './EditPersonForm'
import EditCityForm from './EditCityForm'
import ContinentForm from './ContinentForm'


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
        // case 'region':

        case 'continent':
            return (<ContinentForm continent={pageObj}/>)
    }
}

export default EditEngine
