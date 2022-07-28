import {DefaultPageContext} from '~/types/pagecontext/default';

export const onBeforeRender = (pageContext: DefaultPageContext) => ({pageContext: {
    pageProps: {
        id: pageContext.routeParams.id,
    },
}});
