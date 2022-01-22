
import { useState } from "react"



const CountryForm = () => {
    const [pageType, setPageType] = useState('country')
    const [capital, setCapital] = useState('')
    const [region, setRegion] = useState('')
    const [government, setGovernment] = useState('')
    const [population, setPopulation] = useState('')
    const [religions, setReligions] = useState('')
    const [imports, setImports] = useState('')
    const [exports, setExports] = useState('')
    const [content, setContent] = useState('')

    const handleSubmit = () => {
        const pageContent = {
            pageType,
            capital,
            region,
            government,
            population,
            religions,
            imports,
            exports,
            content
        }

    }

    return (

        <form>
            <input hidden name='pageType' value={pageType}></input>
            <label>Capital:</label>
            <input
                    type='text'
                    name='capital'
                    onChange={setCapital}
                    value={capital}
                    autoComplete='off'
                    ></input>
            <label>Region:</label>
            <input
                    type='text'
                    name='region'
                    onChange={setRegion}
                    value={region}
                    autoComplete='off'
                    ></input>
            <label>Government Type:</label>
            <input
                    type='text'
                    name='governtment'
                    onChange={setGovernment}
                    value={government}
                    autoComplete='off'
                    ></input>
            <label>Population:</label>
            <input
                    type='text'
                    name='population'
                    onChange={setPopulation}
                    value={population}
                    autoComplete='off'
                    ></input>
            <label>Religions:</label>
            <input
                    type='text'
                    name='religions'
                    onChange={setReligions}
                    value={religions}
                    autoComplete='off'
                    ></input>
            <label>Imports:</label>
            <input
                    type='text'
                    name='imports'
                    onChange={setImports}
                    value={imports}
                    autoComplete='off'
                    ></input>
            <label>Exports:</label>
            <input
                    type='text'
                    name='exports'
                    onChange={setExports}
                    value={exports}
                    autoComplete='off'
                    ></input>
            <textarea
                    type='text'
                    name='content'
                    onChange={setContent}
                    value={content}
                    autoComplete='off'
                    />
            <button type="submit" onClick={handleSubmit()}></button>
        </form>
    )
}
