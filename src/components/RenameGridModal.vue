<template>
  <Transition name="modal">
    <div v-if="show" class="modal-overlay" @click="handleClose">
      <div class="modal-content" @click.stop>
        <h3>Rename Grid</h3>
        <input
          ref="gridNameInput"
          v-model="gridName"
          type="text"
          placeholder="Enter new grid name..."
          class="grid-name-input"
          @keyup.enter="handleRename"
          @keyup.esc="handleClose"
        />
        <div class="modal-actions">
          <button @click="handleClose" class="cancel-button">Cancel</button>
          <button @click="handleRename" class="rename-button" :disabled="!gridName.trim()">Rename</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  currentName: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['close', 'rename']);

const gridName = ref('');
const gridNameInput = ref(null);

watch(() => props.show, async (newValue) => {
  if (newValue) {
    gridName.value = props.currentName;
    await nextTick();
    gridNameInput.value?.focus();
    gridNameInput.value?.select();
  }
});

const handleClose = () => {
  emit('close');
};

const handleRename = () => {
  const name = gridName.value.trim();
  if (!name) return;
  emit('rename', name);
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  z-index: 1001;
  background-color: var(--color-tile-background);
  border: var(--tile-border-width) solid var(--color-tile-stroke);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  width: 90%;
  max-width: 500px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

/* Transition: enter */
.modal-enter-active {
  transition: opacity var(--duration-normal) var(--easing-smooth);
}

.modal-enter-active .modal-content {
  animation: modalContentIn var(--duration-slow) var(--easing-spring);
}

.modal-enter-from {
  opacity: 0;
}

/* Transition: leave */
.modal-leave-active {
  transition: opacity var(--duration-fast) var(--easing-ease-in);
}

.modal-leave-active .modal-content {
  animation: modalContentOut var(--duration-fast) var(--easing-ease-in) forwards;
}

.modal-leave-to {
  opacity: 0;
}

@keyframes modalContentIn {
  from {
    opacity: 0;
    transform: translateY(24px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes modalContentOut {
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(12px) scale(0.98);
  }
}

.modal-content h3 {
  margin: 0 0 var(--spacing-lg) 0;
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.grid-name-input {
  width: 100%;
  padding: var(--spacing-md);
  font-size: var(--font-size-md);
  font-family: var(--font-family-base);
  color: var(--color-text-primary);
  background-color: var(--color-content-background);
  border: var(--tile-border-width) solid var(--color-tile-stroke);
  border-radius: var(--radius-md);
  outline: none;
  transition:
    border-color var(--duration-fast) var(--easing-smooth),
    background-color var(--duration-fast) var(--easing-smooth),
    box-shadow var(--duration-fast) var(--easing-smooth);
  margin-bottom: var(--spacing-lg);
}

.grid-name-input:focus {
  border-color: var(--color-content-default);
  background-color: var(--color-tile-background);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-content-default) 15%, transparent);
}

.grid-name-input::placeholder {
  color: var(--color-content-default);
  opacity: 0.6;
}

.modal-actions {
  display: flex;
  gap: var(--spacing-sm);
  justify-content: flex-end;
}

.cancel-button,
.rename-button {
  padding: var(--spacing-sm) var(--spacing-lg);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition:
    all var(--duration-fast) var(--easing-smooth),
    transform var(--duration-fast) var(--easing-spring);
  border: var(--tile-border-width) solid var(--color-tile-stroke);
}

.cancel-button {
  background-color: transparent;
  color: var(--color-content-default);
}

.cancel-button:hover {
  background-color: var(--color-content-background);
  color: var(--color-text-primary);
}

.rename-button {
  background-color: var(--color-content-high);
  color: var(--color-text-primary);
}

.rename-button:hover:not(:disabled) {
  background-color: var(--color-content-low);
  transform: translateY(-1px);
}

.rename-button:active:not(:disabled) {
  transform: translateY(1px) scale(0.97);
  transition-duration: var(--duration-instant);
}

.rename-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
