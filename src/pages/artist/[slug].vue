<template>
    <div>
        <UiLoading v-if="pending" />

        <div
            v-else
            class="hero min-h-[500px] bg-base-200"
        >
            <div class="hero-content flex-col lg:flex-row gap-20">
                <nuxt-img
                    :alt="data?.artists[0].user.display_name"
                    :src="data?.artists[0].user.profile?.profile_picture?.url"
                    class="rounded-xl max-w-[300px]"
                    loading="lazy"
                />

                <div>
                    <h1 class="text-6xl font-bold">
                        {{ data?.artists[0].user.display_name }}
                    </h1>
                    <p class="py-6 max-w-[300px]">
                        {{ data?.artists[0].user.profile.bio }}
                    </p>
                    <a href="#projects" class="btn btn-primary">Projects</a>
                </div>
            </div>
        </div>

        <h3 class="pt-20 text-5xl font-semibold" id="projects">Projects</h3>
        <ul class="flex flex-col gap-32 mt-10">
            <li v-for="project in data?.artists[0].projects">
                <UiProjectDetails
                    v-if="projectsData?.projects_metadata.find(p => p.id === project.id)"
                    :project="project"
                    :project-data="projectsData?.projects_metadata.find(p => p.id === project.id)"
                />
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
    import UiLoading from '~/components/UiLoading.vue';
    import UiProjectDetails from '~/components/UiProjectDetails.vue';

    const route = useRoute();

    const queryProjects = gql`
        query Token($artist: String) {
            projects_metadata(where: { artist_address: { _eq: $artist } }) {
                id
                artist_address
                tokens {
                    image {
                        url
                    }
                }
            }
        }
    `;

    const query = gql`
        query Artist($public_address: String) {
            artists(
                where: {
                    user: {
                        profile: { profile_picture: { url: { _is_null: false } } }
                        public_address: { _eq: $public_address }
                    }
                }
            ) {
                public_address
                user {
                    display_name
                    profile {
                        bio
                        profile_picture {
                            url
                        }
                    }
                }
                projects {
                    id
                    active
                    complete
                    description
                    name
                    tags {
                        tag_name
                    }
                    website
                }
            }
        }
    `;

    const variables = {
        public_address: route?.params?.slug,
    };

    const { data, pending } = useLazyAsyncQuery(query, variables);
    const { data: projectsData, pending: tokenPending } = useLazyAsyncQuery(queryProjects, {
        artist: route?.params?.slug,
    });
</script>
