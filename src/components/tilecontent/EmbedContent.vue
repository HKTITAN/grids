<template>
  <div class="embed-wrapper">
    <img v-if="isDirectImage" class="embed-media" :src="content.src" alt="Embedded image" />

    <video v-else-if="isDirectVideo" class="embed-media" :src="content.src" controls />

    <iframe
      v-else
      class="embed-frame"
      scrolling="no"
      :src="sanitizedSrc"
      frameborder="no"
      loading="lazy"
      referrerpolicy="no-referrer"
      sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen="true"
    >
      embedded content
    </iframe>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { type EmbedContent } from "@/types/TileContent";

export default defineComponent({
  props: {
    content: {
      type: Object as () => EmbedContent,
      required: true,
    },
  },
  setup(props) {
    const sanitizedSrc = computed(() => {
      const src = props.content.src;
      if (!src) return '';
      try {
        const url = new URL(src);
        if (url.protocol !== 'http:' && url.protocol !== 'https:') return '';
        return url.toString();
      } catch {
        return '';
      }
    });

    const isDirectImage = computed(() => {
      const src = props.content.src;
      if (!src) return false;

      try {
        const url = new URL(src);
        const pathname = url.pathname.toLowerCase();
        return (
          pathname.endsWith(".png") ||
          pathname.endsWith(".jpg") ||
          pathname.endsWith(".jpeg") ||
          pathname.endsWith(".gif") ||
          pathname.endsWith(".webp") ||
          pathname.endsWith(".bmp") ||
          pathname.endsWith(".svg")
        );
      } catch {
        const lower = src.toLowerCase();
        return (
          lower.includes(".png") ||
          lower.includes(".jpg") ||
          lower.includes(".jpeg") ||
          lower.includes(".gif") ||
          lower.includes(".webp") ||
          lower.includes(".bmp") ||
          lower.includes(".svg")
        );
      }
    });

    const isDirectVideo = computed(() => {
      const src = props.content.src;
      if (!src) return false;

      try {
        const url = new URL(src);
        const pathname = url.pathname.toLowerCase();
        return (
          pathname.endsWith(".mp4") ||
          pathname.endsWith(".webm") ||
          pathname.endsWith(".mov")
        );
      } catch {
        const lower = src.toLowerCase();
        return lower.includes(".mp4") || lower.includes(".webm") || lower.includes(".mov");
      }
    });

    return {
      sanitizedSrc,
      isDirectImage,
      isDirectVideo,
    };
  },
});
</script>

<style scoped lang="scss">
.embed-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.embed-media {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
}

.embed-frame {
  width: 100%;
  height: 100%;
  border: none;
  position: relative;
  z-index: 0;
  cursor: default;
  pointer-events: all;
}
</style>
