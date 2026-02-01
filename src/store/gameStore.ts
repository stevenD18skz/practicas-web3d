import { create } from 'zustand'

interface GameState {
    food: number
    fedPets: string[]
    feedPet: (petId: string) => void
    addFood: (amount: number) => void
}

export const useGameStore = create<GameState>((set) => ({
    food: 5, // Empezamos con 5 unidades de comida
    fedPets: [],

    feedPet: (petId) => set((state) => {
        if (state.food <= 0) return state // Si no hay comida, no hace nada
        if (state.fedPets.includes(petId)) return state // Si ya comió, no gasta comida

        return {
            food: state.food - 1,
            fedPets: [...state.fedPets, petId]
        }
    }),

    addFood: (amount) => set((state) => ({ food: state.food + amount }))
}))
