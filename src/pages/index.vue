<template>
    <div class="hero min-h-[200px] rounded-3xl bg-violet-900">
        <div class="hero-content">
            <h1 class="text-5xl font-bold">Welcome to Art Blocks!</h1>
        </div>
    </div>

    <section class="mt-6">
        <div>
            <div class="form-control px-10">
                <input
                    v-model="searchQuery"
                    class="input input-bordered input-lg rounded-3xl border-violet-600"
                    placeholder="Artists Search..."
                    type="text"
                />
            </div>
        </div>
        <UiLoading v-if="pending" />
        <div v-else>
            <p
                v-if="searchQuery && !results && !results?.length"
                class="text-center text-2xl mt-20"
            >
                No artists were found with the term: <span class="text-violet-500">{{ searchQuery }}</span>
            </p>
            <ul class="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mt-20">
                <li
                    v-for="artist in results"
                    :key="artist.public_address"
                >
                    <nuxt-link :to="`/artist/${artist.public_address}`">
                        <UiArtistDetails :artist="artist" />
                    </nuxt-link>
                </li>
            </ul>
        </div>
    </section>
</template>

<script lang="ts" setup>
    import UiLoading from '~/components/UiLoading.vue';
    import useGraphQuery from '~/composables/useGraphQuery';
    import { Ref } from 'vue';

    const { searchQuery } = useGraphQuery();
    const results: Ref<any[]> = ref([]);

    const queryArtistName = gql`
        query ArtistName($name: String!) {
            artists(where: { user: { display_name: { _ilike: $name } } }) {
                public_address
                user {
                    display_name
                    profile {
                        profile_picture {
                            url
                        }
                    }
                }
                projects {
                    active
                    complete
                    description
                    name
                    website
                }
            }
        }
    `;

    const query = gql`
        query Artists {
            artists(where: { user: { profile: { profile_picture: { url: { _is_null: false } } } } }) {
                public_address
                user {
                    display_name
                    profile {
                        profile_picture {
                            url
                        }
                    }
                }
                projects {
                    name
                }
            }
        }
    `;

    const { data, pending, refresh }: any = useLazyAsyncQuery(query);
    results.value = data.value?.artists;

    let timeout: string | number | NodeJS.Timeout | undefined;
    watch(searchQuery, () => {
        if (timeout) clearTimeout(timeout);
        if (!searchQuery.value) {
            const { data, pending }: any = useLazyAsyncQuery(query);
            results.value = data?.value?.artists;
            return;
        }
        timeout = setTimeout(() => {
            const { data, pending }: any = useLazyAsyncQuery(queryArtistName, {
                name: searchQuery.value,
            });
            console.log(data?.value?.artists);
            results.value = data?.value?.artists;
        }, 500);
    });
</script>
