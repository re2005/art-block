import { Ref } from 'vue';

const searchQuery: Ref<string> = ref('');

export default function useGraphQuery() {
    return {
        searchQuery,
    };
}
