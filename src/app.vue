<template>
    <div class="container p-10 mx-auto">
        <div class="navbar mb-16">
            <div class="flex-1">
                <NuxtLink
                    class="flex"
                    to="/"
                >
                    <UiIcon
                        class="w-[300px] text-violet-600"
                        icon="logo"
                    />
                </NuxtLink>
            </div>
            <div class="flex-none gap-6">
                <div
                    v-if="balance && account"
                    class="border-2 px-5 py-3 rounded-2xl border-violet-600"
                >
                    <a class="flex justify-start gap-3">
                        <span class="font-bold"> Balance: </span>
                        <span class="">{{ balance }}</span></a
                    >
                </div>
                <div class="dropdown dropdown-end">
                    <label
                        class="btn btn-ghost btn-circle avatar"
                        tabindex="0"
                    >
                        <UiIcon
                            class="w-10"
                            icon="wallet"
                        />
                    </label>
                    <ClientOnly>
                        <ul
                            class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-black rounded-box w-[260px]"
                            tabindex="0"
                        >
                            <li>
                                <button
                                    v-if="hasMetamask && !account"
                                    class="justify-between"
                                    @click="connect"
                                >
                                    Connect Wallet
                                    <span class="badge">Metamask</span>
                                </button>
                                <button
                                    v-if="hasMetamask && account"
                                    @click="disconnect"
                                >
                                    Disconnect
                                </button>
                                <a
                                    v-if="!hasMetamask"
                                    href="https://metamask.io"
                                    target="_blank"
                                    >Install metamask
                                </a>
                            </li>
                        </ul>
                    </ClientOnly>
                </div>
            </div>
        </div>

        <NuxtPage />
    </div>
</template>
<script lang="ts" setup>
    import { useServerSeoMeta } from 'unhead';
    import UiIcon from '~/components/UiIcon.vue';
    import useWalletConnect from '~/composables/useWalletConnect';

    const { hasMetamask, connect, getBalance, account, balance, disconnect } = useWalletConnect();

    useServerSeoMeta({
        title: 'Art Blocks',
        ogTitle: 'Art Blocks | Amazing Curated Artist Collection',
        description: 'Art Blocks is an amazing artists gallery',
        ogDescription: 'Art Blocks is an amazing artists gallery',
    });

    watch(account, () => {
        getBalance();
    });
</script>
