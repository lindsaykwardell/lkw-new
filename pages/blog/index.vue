<template>
  <div>
    <div class="flex flex-col justify-center items-center py-6">
      <label class="text-lg w-5/6 md:w-1/2">
        Search Posts
        <input
          type="text"
          class="p-2 mt-3 text-lg w-full border-2 rounded"
          v-model="search"
          aria-label="Search Posts"
        />
      </label>
    </div>
    <ContentList :content="activePosts" />
    <!-- <div class="flex flex-col lg:flex-row flex-wrap">
      <div
        v-for="post in activePosts"
        :key="post.slug"
        class="w-full lg:w-1/2 xl:w-1/3 p-8"
      >
        <div class="blog-item">
          <nuxt-link :to="`/blog${post.slug}`">
            <img
              class="blog-image"
              :src="post.image || $github.user.avatarUrl"
              :alt="post.title"
            />
            <h3 class="blog-title">{{ post.title }}</h3>
            <p class="blog-excerpt">{{ post.excerpt }}</p>
          </nuxt-link>
        </div>
      </div>
    </div> -->
    <client-only>
      <InfiniteLoading v-if="activePosts.length > visible" @infinite="infiniteHandler" />
    </client-only>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import ContentList from '@/components/ContentList'
import Fuse from 'fuse.js'

export default {
  async asyncData({ $content }) {
    const posts = await $content(`posts`).sortBy('date', 'desc').fetch()

    return {
      posts,
    }
  },
  data: () => ({
    visible: 11,
    search: '',
    fuse: null,
    searchedPosts: [],
  }),
  computed: {
    activePosts() {
      return this.searchedPosts
        .filter((post, index) => index <= this.visible)
        .map((post) => ({
          ...post,
          link: `/blog${post.slug}`,
          image: post.image || this.$github.user.avatarUrl,
        }))
    },
  },
  methods: {
    infiniteHandler($state) {
      if (this.posts.length > this.visible) {
        this.visible += 3
        $state.loaded()
      } else {
        $state.complete()
      }
    },
    performSearch() {
      this.searchedPosts = this.fuse
        .search(this.search)
        .map((s) => ({ ...s.item }))
    },
  },
  watch: {
    search() {
      clearTimeout(this.debounceSearch)

      if (!this.search.length) this.searchedPosts = this.posts
      else this.debounceSearch = setTimeout(() => {
        this.performSearch()
      }, 1000)
    },
  },
  mounted() {
    this.fuse = new Fuse(this.posts, {
      keys: ['title', 'excerpt', 'tags'],
    })
    this.searchedPosts = this.posts

    const initialSearch = this.$router.currentRoute.query.tag

    if (initialSearch) {
      console.log('Setting initial search')
      this.search = initialSearch
      clearTimeout(this.debounceSearch)
      this.performSearch()
    }
  },
  components: {
    InfiniteLoading,
    ContentList,
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
