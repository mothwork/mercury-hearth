import React from 'react'
import { useSelector } from 'react-redux'
import { getPages } from '../../store/page'
import getProjects from '../../store/project'


const Stats = ({type}) => {

    let pageState = useSelector(state => state.pages)
    let pageArray = pageState.pageArray
    let pageTypes = {}
    if (pageArray) {

        for (let page of pageArray) {
            let content = JSON.parse(page.content)
            let type = content.pageType
            console.log(type)
            if (pageTypes[type] === undefined) {
                pageTypes[type] = 1
            } else {
                pageTypes[type] += 1
            }
        }
        console.log('types',pageTypes)
        return (
            <>
            <h2>Stats</h2>
            <ul>
                <li>Pages {pageArray.length}</li>
                <li>People: {pageTypes.person}</li>
                <li>Continents: {pageTypes.continent}</li>
                <li>Regions: {pageTypes.region}</li>
                <li>Countries: {pageTypes.country}</li>
                <li>Cities: {pageTypes.city}</li>
                <li>Objects: {pageTypes.object}</li>
            </ul>
            </>
        )
    }

    return null




}

export default Stats
