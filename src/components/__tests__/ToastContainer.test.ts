import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import ToastContainer from '@/components/ToastContainer.vue'
import { useToastStore } from '@/stores/toast'

describe('ToastContainer', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders multiple toasts in store order with accessible text', async () => {
    const toastStore = useToastStore()
    toastStore.addToast('First toast', 'info', 10000)
    toastStore.addToast('Second toast', 'success', 10000)

    const wrapper = mount(ToastContainer)
    const toasts = wrapper.findAll('[data-testid="toast-item"]')

    expect(toasts).toHaveLength(2)
    expect(toasts[0].text()).toContain('First toast')
    expect(toasts[1].text()).toContain('Second toast')
    expect(wrapper.text()).toContain('First toast')
    expect(wrapper.text()).toContain('Second toast')
  })

  it('dismisses a toast when clicked', async () => {
    const toastStore = useToastStore()
    const id = toastStore.addToast('Dismiss me', 'error', 10000)

    const wrapper = mount(ToastContainer)
    await wrapper.get('[data-testid="toast-item"]').trigger('click')

    expect(toastStore.toasts.find((toast) => toast.id === id)).toBeUndefined()
  })
})
