<template>
  <div class="flex flex-col lg:flex-row flex-wrap">
    <div
      v-for="item in content"
      :key="item.link"
      class="w-full lg:w-1/2 xl:w-1/3 p-8"
    >
      <slot :item="item">
        <div class="blog-item">
          <component
            :is="item.link.includes('http') ? 'a' : 'nuxt-link'"
            :href="item.link"
            :to="item.link"
          >
            <img class="blog-image" :src="item.image" :alt="item.title" />
            <h3 class="blog-title">{{ item.title }}</h3>
            <p class="blog-excerpt">{{ item.excerpt }}</p>
          </component>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="postcss" scoped>
.blog-item {
  @apply shadow-md rounded-lg relative overflow-hidden flex justify-center bg-white;
  height: 415px;
  animation: 0.3s ease-out 0s 1 shift;

  .blog-image {
    @apply transition duration-500;
    height: 415px;
    width: 100%;
    object-fit: cover;
    /* filter: blur(3px); */
  }

  &:hover {
    .blog-image {
      transform: scale(1.1);
      filter: blur(0);
    }
  }
}

@keyframes shift {
  0% {
    transform: translateY(30%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.blog-title {
  @apply p-2 rounded shadow absolute bg-black text-white w-full top-0 right-0;
}

.blog-excerpt {
  @apply p-3 rounded shadow absolute bottom-0 left-0 w-full bg-black text-white text-lg;
  min-height: 6rem;
}
</style>
