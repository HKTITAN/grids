<template>
  <div class="toast-container" aria-live="polite" aria-atomic="false">
    <TransitionGroup name="toast">
      <div
        v-for="toast in toastStore.toasts"
        :key="toast.id"
        class="toast"
        :class="`toast--${toast.type}`"
        data-testid="toast-item"
        role="status"
        @click="toastStore.removeToast(toast.id)"
      >
        <div class="toast-content">
          <svg v-if="toast.type === 'success'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M20 6L9 17L4 12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg v-else-if="toast.type === 'error'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" stroke-width="2"/>
            <path d="M15 9L9 15M9 9L15 15" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" stroke-width="2"/>
            <path d="M12 16V12M12 8H12.01" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <div class="toast-copy">
            <span class="toast-label">{{ toast.type }}</span>
            <span class="toast-message">{{ toast.message }}</span>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useToastStore } from '@/stores/toast';

export default defineComponent({
  name: 'ToastContainer',
  setup() {
    const toastStore = useToastStore();

    return {
      toastStore,
    };
  },
});
</script>

<style lang="scss" scoped>
.toast-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 99999;
  display: flex;
  flex-direction: column-reverse;
  gap: var(--spacing-sm);
  pointer-events: none;
}

.toast {
  background: var(--color-tile-background);
  border: 2px solid var(--color-tile-stroke);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  box-shadow: var(--shadow-xl);
  min-width: 250px;
  max-width: 400px;
  pointer-events: auto;
  cursor: pointer;
  transition: all var(--duration-fast) var(--easing-smooth);
  will-change: transform, opacity;

  &:hover {
    transform: translateX(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  }

  &:active {
    transform: scale(0.98);
  }

  &--success {
    border-color: var(--color-tile-stroke);
    background: var(--color-tile-background);

    svg {
      color: var(--color-figma-green);
    }
  }

  &--error {
    border-color: var(--color-figma-red);
    background: var(--color-tile-background);

    svg {
      color: var(--color-figma-red);
    }
  }

  &--info {
    border-color: var(--color-figma-purple);
    background: var(--color-tile-background);

    svg {
      color: var(--color-figma-purple);
    }
  }
}

.toast-content {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  font-family: var(--font-family-base);
  line-height: 1.5;
}

.toast-copy {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.toast-label {
  font-size: 11px;
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-content-default);
}

.toast-message {
  color: var(--color-text-primary);
  word-break: break-word;
}

/* TransitionGroup enter/leave + sibling reflow */
.toast-enter-active {
  animation: toastSlideIn var(--duration-slow) var(--easing-spring);
}

.toast-leave-active {
  animation: toastSlideOut var(--duration-normal) var(--easing-smooth) forwards;
  position: absolute;
  right: 0;
}

.toast-move {
  transition: transform var(--duration-slow) var(--easing-spring);
}

@keyframes toastSlideIn {
  0% {
    opacity: 0;
    transform: translateX(100%) scale(0.8);
  }
  60% {
    opacity: 1;
    transform: translateX(-6px) scale(1.02);
  }
  100% {
    transform: translateX(0) scale(1);
  }
}

@keyframes toastSlideOut {
  0% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateX(80px) scale(0.9);
  }
}
</style>
