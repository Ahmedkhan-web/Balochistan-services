import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product } from "@/types";

const MAX_QUANTITY_PER_ITEM = 10;
const MAX_ITEM_NOTE_LENGTH = 240;

interface CartState {
  items: CartItem[];
  wishlist: Product[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateItemNote: (productId: string, note: string) => void;
  clear: () => void;
  toggleWishlist: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
  count: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      wishlist: [],
      addItem: (product, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.product.id === product.id);
          if (existing) {
            return state;
          }
          return {
            items: [
              ...state.items,
              { product, quantity: Math.min(MAX_QUANTITY_PER_ITEM, quantity) },
            ],
          };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i.product.id === productId
                ? {
                    ...i,
                    quantity: Math.min(
                      MAX_QUANTITY_PER_ITEM,
                      Math.max(1, quantity),
                    ),
                  }
                : i,
            )
            .filter((i) => i.quantity > 0),
        })),
      updateItemNote: (productId, note) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === productId
              ? {
                  ...i,
                  note: note.trim()
                    ? note.slice(0, MAX_ITEM_NOTE_LENGTH)
                    : undefined,
                }
              : i,
          ),
        })),
      clear: () => set({ items: [] }),
      toggleWishlist: (product) =>
        set((state) => {
          const exists = state.wishlist.some((p) => p.id === product.id);
          return {
            wishlist: exists
              ? state.wishlist.filter((p) => p.id !== product.id)
              : [...state.wishlist, product],
          };
        }),
      isWishlisted: (productId) =>
        get().wishlist.some((p) => p.id === productId),
      count: () => get().items.length,
      subtotal: () =>
        get().items.reduce(
          (sum, i) =>
            sum + (i.product.discount_price ?? i.product.price) * i.quantity,
          0,
        ),
    }),
    {
      name: "bss-cart",
      partialize: (state) => ({ wishlist: state.wishlist }),
      merge: (persistedState, currentState) => {
        const persisted = persistedState as Partial<CartState> | undefined;

        return {
          ...currentState,
          wishlist: Array.isArray(persisted?.wishlist) ? persisted.wishlist : [],
          items: [],
        };
      },
    },
  ),
);
