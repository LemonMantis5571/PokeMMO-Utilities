import { create } from 'zustand'

interface TierStore {
    tier: {
        value: string
    }
    updateTier: (tier: {value: string }) => void;
}

const useTier = create<TierStore>((set) => ({
    tier: {
        value: ''
    },
    updateTier: (tier) => set(() => ({
        tier: {
            value: tier.value
        }
    }))
}));

export default useTier;