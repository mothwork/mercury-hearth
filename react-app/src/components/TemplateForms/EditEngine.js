import EditCountryForm from './EditCountryForm'
import EditPersonForm from './EditPersonForm'
import CityForm from './CityForm'
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
            return (<CityForm city={pageObj}/>)
        // case 'region':

        case 'continent':
            return (<ContinentForm continent={pageObj}/>)
    }
}

export default EditEngine
