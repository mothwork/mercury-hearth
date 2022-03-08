import CountryTemplate from "./CountryTemplateRender"
import PersonTemplateRender from './PersonTemplateRender'
import CityTemplateRender from './CityTemplateRender'
import ContinentTemplateRender from './ContinentTemplateRender'
import RegionTemplate from "./RegionTemplateRender"

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
        case 'region':
            return (<RegionTemplate region={pageObj}/>)
        case 'continent':
            return (<ContinentTemplateRender continent={pageObj}/>)
    }
}

export default TemplateEngine
