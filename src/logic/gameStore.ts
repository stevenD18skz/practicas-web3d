import { create } from 'zustand'

interface GameState {
    food: number
    fedPets: string[]
    isPlaying: boolean
    currentRoom: string
    isInventoryOpen: boolean
    feedPet: (petId: string) => void
    addFood: (amount: number) => void
    setIsPlaying: (playing: boolean) => void
    setRoom: (roomName: string) => void
    toggleInventory: () => void
}

export const useGameStore = create<GameState>((set) => ({
    food: 5,
    fedPets: [],
    isPlaying: false,
    currentRoom: 'Desconocido',
    isInventoryOpen: false,

    feedPet: (petId) => set((state) => {
        if (state.food <= 0) return state
        if (state.fedPets.includes(petId)) return state

        return {
            food: state.food - 1,
            fedPets: [...state.fedPets, petId]
        }
    }),

    addFood: (amount) => set((state) => ({ food: state.food + amount })),

    setIsPlaying: (playing) => set({ isPlaying: playing }),

    setRoom: (roomName) => set({ currentRoom: roomName }),

    toggleInventory: () => set((state) => ({ isInventoryOpen: !state.isInventoryOpen }))
}))
