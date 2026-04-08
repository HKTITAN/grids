import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import Grid from '@/components/Grid.vue'
import { useLayoutStore } from '@/stores/layout'

vi.mock('vue3-grid-layout', () => ({
  GridLayout: {
    name: 'GridLayout',
    template: '<div class="grid-layout-stub"><slot /></div>',
  },
  GridItem: {
    name: 'GridItem',
    template: '<div class="grid-item-stub"><slot /></div>',
  },
}))

vi.mock('@/components/GridTile.vue', () => ({
  default: {
    name: 'GridTile',
    template: '<div class="grid-tile-stub" />',
  },
}))

describe('Grid', () => {
  it('renders a polished loading state while the layout is loading', () => {
    setActivePinia(createPinia())
    const layoutStore = useLayoutStore()
    layoutStore.isLoading = true
    layoutStore.currentLayout = null

    const wrapper = mount(Grid, {
      props: { rowHeight: 75 },
    })

    expect(wrapper.find('[data-testid="grid-status"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Loading your grid')
    expect(wrapper.text()).toContain('We are arranging tiles and restoring the latest layout.')
  })

  it('renders a polished empty state when the grid has no tiles', () => {
    setActivePinia(createPinia())
    const layoutStore = useLayoutStore()
    layoutStore.isLoading = false
    layoutStore.currentLayout = {
      id: 'layout-1',
      userId: 'user-1',
      name: 'Empty layout',
      colNum: 12,
      verticalCompact: false,
      tiles: [],
      backgroundImageSrc: '',
      backgroundEmbed: false,
      createdAt: null,
      updatedAt: null,
      lastOpenedAt: null,
    }

    const wrapper = mount(Grid, {
      props: { rowHeight: 75 },
    })

    expect(wrapper.find('[data-testid="grid-status"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Nothing here yet')
    expect(wrapper.text()).toContain('Start adding tiles to shape this space.')
  })
})
