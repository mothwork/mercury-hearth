import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getPages } from '../../store/page';
import { useParams } from 'react-router-dom';

const EditPageForm = () => {
    const dispatch = useDispatch()
    let { projectId, pageId } = useParams()
    projectId = parseInt(projectId)
    pageId = parseInt(pageId)

    useEffect(() => {
        dispatch(getPages(projectId))
    }, [dispatch, projectId])

    const pagesContainer = useSelector(state => state.pages)
    const pages = pagesContainer.pages

    const page = pages?.[pageId]

    if (page) {
        const pageContent = JSON.parse(page.content)
        if (pageContent.pageType === 'country'){

        }
    }

}

export default EditPageForm
