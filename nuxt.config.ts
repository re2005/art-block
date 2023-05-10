// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    srcDir: 'src/',
    app: {
        head: {
            link: [
                { rel: "icon", href: "favicon.ico" },
            ],
        },
    },
    css: ['@/assets/main.scss'],
    modules: ['@nuxtjs/apollo', '@nuxt/image-edge'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    apollo: {
        clients: {
            default: {
                httpEndpoint: 'https://artblocks-mainnet.hasura.app/v1/graphql',
            },
        },
    },
});
