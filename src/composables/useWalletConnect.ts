import { Ref } from 'vue';
import { ethers } from 'ethers';

declare global {
    interface Window {
        ethereum: any;
    }
}

const account: Ref<string | null> = ref(null);
const balance: Ref<string | null> = ref(null);

export default function useWalletConnect() {
    const hasMetamask = typeof window?.ethereum !== 'undefined';

    function disconnect() {
        account.value = null;
    }

    async function connect() {
        const accounts = await window?.ethereum.request({
            method: 'eth_requestAccounts',
            params: [{ eth_accounts: {} }],
        });
        account.value = accounts[0];
    }

    async function getBalance() {
        const balanceHex = await window?.ethereum.request({
            method: 'eth_getBalance',
            params: [account.value, 'latest'],
        });
        balance.value = ethers.formatEther(balanceHex);
    }

    return {
        account,
        connect,
        hasMetamask,
        getBalance,
        balance,
        disconnect,
    };
}
