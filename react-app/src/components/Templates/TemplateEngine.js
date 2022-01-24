import CountryTemplate from "./CountryTemplateRender"


const TemplateEngine = ({page}) => {
    console.log('TE Page',page.content)
    const pageObj = JSON.parse(page.content)
    switch(pageObj.pageType){
        default:
            return 'Hitting default'
        case 'country':
            return (<CountryTemplate country={pageObj}/>)
        case 'city':

        case 'person':

        case 'region':

        case 'ocean':
    }
}

export default TemplateEngine
