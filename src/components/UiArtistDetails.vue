<template>
    <div class="card bg-base-100 shadow-lg group">
        <figure class="px-10 pt-10">
            <nuxt-img
                :alt="props.artist.user.display_name"
                :src="props.artist.user.profile?.profile_picture?.url"
                class="rounded-xl transition-all group-hover:border-2 border-violet-600 group-hover:scale-95"
                loading="lazy"
            />
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title">
                {{ props.artist.user.display_name }}
            </h2>
            <p class="opacity-60 mt-4 text-xs">Recent projects</p>
            <div class="card-actions">
                <ul class="flex gap-6">
                    <li v-for="project in props.artist.projects.slice(0, 2)">
                        <div class="badge badge-secondary badge-outline">
                            {{ project.name.slice(0, 20) }}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    const props = defineProps({
        artist: {
            type: Object,
            required: true,
        },
    });
</script>

<style lang="scss" scoped></style>
