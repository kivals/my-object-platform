import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { create } from 'zustand/react';
import type { StateCreator } from 'zustand/vanilla';

interface IActions {
	toggleSidebar: () => void;
}

interface IInitialState {
	isSidebarOpen: boolean;
}

interface IUIState extends IInitialState, IActions {}

const initialState: IInitialState = {
	isSidebarOpen: true
};

const UIStore: StateCreator<
	IUIState,
	[['zustand/devtools', never], ['zustand/persist', unknown]]
> = set => ({
	...initialState,
	toggleSidebar: () =>
		set(state => ({ isSidebarOpen: !state.isSidebarOpen }), undefined, 'ui/toggleSidebar')
});

const useUIStore = create<IUIState>()(
	devtools(
		persist(UIStore, {
			name: 'ui-store',
			storage: createJSONStorage(() => localStorage),
			partialize: s => ({ sidebarOpen: s.isSidebarOpen })
		}),
		{ name: 'ui-store' }
	)
);

export const useSidebarOpen = () => useUIStore(state => state.isSidebarOpen);
export const useToggleSidebar = () => useUIStore.getState().toggleSidebar;
