<template>
  <li
    class="grid-card"
    :class="{ 'is-drag-over': isDragOver }"
    :draggable="draggable"
    @dragstart="$emit('dragstart', $event, layout.id)"
    @dragover="$emit('dragover', $event, layout.id)"
    @drop="$emit('drop', $event, layout.id)"
    @dragend="$emit('dragend', $event, layout.id)"
  >
    <router-link :to="`/grid/${layout.id}`" class="grid-link">
      <DashboardGridStarButton
        :grid-id="layout.id"
        :is-starred="isStarred"
        @toggle-star="$emit('toggle-star', $event)"
      />
      <span class="grid-name">{{ layout.name }}
        <svg class="grid-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>

      <DashboardGridUpdatedLabel :layout="layout" />

      <DashboardGridCardActions
        :layout="layout"
        :is-default-grid="isDefaultGrid"
        :split-menu-open="splitMenuOpen"
        @toggle-default="$emit('toggle-default', $event)"
        @duplicate="(l, depth) => $emit('duplicate', l, depth)"
        @toggle-split-menu="$emit('toggle-split-menu', $event)"
        @rename="$emit('rename', $event)"
        @delete="$emit('delete', $event)"
      />
    </router-link>
  </li>
</template>

<script setup>
import DashboardGridStarButton from './DashboardGridStarButton.vue';
import DashboardGridUpdatedLabel from './DashboardGridUpdatedLabel.vue';
import DashboardGridCardActions from './DashboardGridCardActions.vue';

defineProps({
  layout: { type: Object, required: true },
  isDefaultGrid: { type: Boolean, default: false },
  isStarred: { type: Boolean, default: false },
  splitMenuOpen: { type: Boolean, default: false },
  draggable: { type: Boolean, default: false },
  isDragOver: { type: Boolean, default: false },
});

defineEmits([
  'toggle-star',
  'toggle-default',
  'duplicate',
  'toggle-split-menu',
  'rename',
  'delete',
  'dragstart',
  'dragover',
  'drop',
  'dragend',
]);
</script>

<style scoped>
.grid-card {
  list-style: none;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  animation: cardEnter var(--duration-slow) var(--easing-spring) both;
}

/* Staggered entrance via nth-child delay */
.grid-card:nth-child(1) { animation-delay: 0ms; }
.grid-card:nth-child(2) { animation-delay: 40ms; }
.grid-card:nth-child(3) { animation-delay: 80ms; }
.grid-card:nth-child(4) { animation-delay: 120ms; }
.grid-card:nth-child(5) { animation-delay: 160ms; }
.grid-card:nth-child(6) { animation-delay: 200ms; }
.grid-card:nth-child(7) { animation-delay: 240ms; }
.grid-card:nth-child(8) { animation-delay: 280ms; }
.grid-card:nth-child(9) { animation-delay: 320ms; }
.grid-card:nth-child(10) { animation-delay: 360ms; }

@keyframes cardEnter {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.grid-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background-color: var(--color-content-background);
  border-radius: var(--radius-md);
  text-decoration: none;
  color: var(--color-text-primary);
  transition:
    background-color var(--duration-fast) var(--easing-smooth),
    transform var(--duration-fast) var(--easing-spring),
    box-shadow var(--duration-fast) var(--easing-smooth);
  cursor: pointer;
  flex: 1;
}

.grid-link:hover {
  background-color: var(--color-tile-background);
  transform: translateX(4px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.grid-link:active {
  transform: translateX(2px) scale(0.99);
  transition-duration: var(--duration-instant);
}

.grid-link:hover :deep(.star-lead:not(.is-starred)) {
  background-color: var(--color-base-8);
  color: var(--color-text-primary);
}

.grid-name {
  flex: 1;
  min-width: 0;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.grid-arrow {
  margin-left: var(--spacing-sm);
  color: var(--color-content-default);
  opacity: 0;
  transform: translateX(-4px);
  transition: all var(--duration-fast) var(--easing-spring);
  flex-shrink: 0;
}

.grid-link:hover .grid-arrow {
  opacity: 1;
  transform: translateX(2px);
}

.grid-card.is-drag-over .grid-link {
  outline: 1px dashed var(--color-content-default);
  outline-offset: 2px;
  background-color: var(--color-base-8);
}
</style>
