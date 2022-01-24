import CountryTemplate from "./CountryTemplateRender"


const TemplateEngine = ({page}) => {
    console.log('TE Page',page.content)
    const pageObj = JSON.parse(page.content)
    switch(pageObj.name){
        default:
            return 'Hitting default'
        case 'Malimon':
            return (<CountryTemplate country={pageObj}/>)
        case 'city':

        case 'person':

        case 'region':

        case 'ocean':
    }
}

export default TemplateEngine
