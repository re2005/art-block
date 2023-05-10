<template>
    <div class="shadow-lg">
        <div class="">
            <div class="flex justify-between items-center">
                <h2 class="text-violet-500 text-5xl">
                    {{ props.project?.name }}
                </h2>
                <a
                    :href="props.project?.website"
                    class="text-xl mt-4 text-violet-600 block"
                    target="_blank"
                >
                    {{ props.project?.website }}
                </a>
            </div>
            <p class="text-2xl mt-6">
                {{ props.project?.description }}
            </p>

            <div class="mt-10">
                <ul class="grid grid-cols-4 gap-16">
                    <li
                        v-for="token in props.projectData?.tokens.slice(0, 12)"
                        :key="token.image.url"
                    >
                        <nuxt-img
                            :alt="props.project?.name"
                            :src="token.image.url"
                            class="rounded-xl max-w-[300px]"
                            loading="lazy"
                        />
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    const props = defineProps({
        project: {
            type: Object,
            required: true,
        },
        projectData: {
            type: Object,
            required: true,
        },
    });
</script>

<style lang="scss" scoped></style>
