import CountryTemplate from "./CountryTemplateRender"
import PersonTemplateRender from './PersonTemplateRender'

const TemplateEngine = ({page}) => {

    const pageObj = JSON.parse(page.content)

    switch(pageObj.pageType){
        default:
            return 'Hitting default'
        case 'country':
            return (<CountryTemplate country={pageObj}/>)
        case 'person':
            return (<PersonTemplateRender person={pageObj}/>)
        // case 'city':

        // case 'region':

        // case 'ocean':
    }
}

export default TemplateEngine
