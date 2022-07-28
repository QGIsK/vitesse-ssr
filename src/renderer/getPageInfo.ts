import type {DefaultPageContext} from '~/types/pagecontext/default'
import {APP_NAME} from '~/constants'

export {getPageInfo}

const getPageInfo = (pageContext: DefaultPageContext): { title: string; description: string } => {
    const title = `${(pageContext.documentProps || {}).title} | ${APP_NAME}` || APP_NAME

    const description
    = `${(pageContext.documentProps || {}).description}`
    || ` ${APP_NAME}`

    return {title, description}
}
