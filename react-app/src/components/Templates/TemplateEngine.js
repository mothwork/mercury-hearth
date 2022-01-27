import CountryTemplate from "./CountryTemplateRender"
import PersonTemplateRender from './PersonTemplateRender'
import CityTemplateRender from './CityTemplateRender'
import ContinentTemplateRender from './ContinentTemplateRender'

const TemplateEngine = ({page}) => {

    const pageObj = JSON.parse(page.content)

    switch(pageObj.pageType){
        default:
            return 'Hitting default'
        case 'country':
            return (<CountryTemplate country={pageObj}/>)
        case 'person':
            return (<PersonTemplateRender person={pageObj}/>)
        case 'city':
            return (<CityTemplateRender city={pageObj}/>)
        // case 'region':

        case 'continent':
            return (<ContinentTemplateRender continent={pageObj}/>)
    }
}

export default TemplateEngine
