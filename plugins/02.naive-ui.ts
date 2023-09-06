import naive from 'naive-ui'
//
// export default defineNuxtPlugin((nuxtApp) => {
//     nuxtApp.vueApp.use(naive)
// })

import {setup} from '@css-render/vue3-ssr'
import {defineNuxtPlugin} from '#app'
// import {getLogger} from "~/src/utils/logger";

// const logger = getLogger('plugins')
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(naive)
    // logger.debug('naive-ui is installed.')
    if (process.server) {
        const {collect} = setup(nuxtApp.vueApp)
        if (nuxtApp.ssrContext === undefined) return
        const originalRenderMeta = nuxtApp.ssrContext.renderMeta
        nuxtApp.ssrContext.renderMeta = () => {
            if (!originalRenderMeta) {
                return {
                    headTags: collect()
                }
            }
            const originalMeta = originalRenderMeta()
            if ('then' in originalMeta) {
                return originalMeta.then((resolvedOriginalMeta) => {
                    return {
                        ...resolvedOriginalMeta,
                        headTags: resolvedOriginalMeta['headTags'] + collect()
                    }
                })
            } else {
                return {
                    ...originalMeta,
                    headTags: originalMeta['headTags'] + collect()
                }
            }
        }
        // logger.debug('naive-ui SSR is configured.')
    }
})
