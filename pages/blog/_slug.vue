<template>
  <div class="flex justify-center items-center flex-col">
    <div class="bg-white p-5 shadow-md my-5">
      <div class="post-title mt-6">
        <img class="hero" v-if="blog.image" :src="blog.image" :alt="blog.title" />
        <h1>{{ blog.title }}</h1>
        <div class="text-center pt-2">
          Published by {{ blog.author }} on {{ date }}
          <em>(last updated {{ updatedDate }})</em>
        </div>
      </div>
      <article class="py-8">
        <nuxt-content :document="blog"></nuxt-content>
      </article>
    </div>
    <div class="bg-gray-400 p-6 w-full">
      <div class="mb-4">
        <h2>Tags</h2>
        <div
          v-for="tag in blog.tags"
          :key="tag"
          color="gray-800"
          size="md"
          class="pill"
        >
          {{ tag }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  async asyncData({ $content, params }) {
    const blog = (
      await $content(`posts`)
        .where({ slug: '/' + params.slug })
        .fetch()
    )[0]

    return {
      blog,
    }
  },
  computed: {
    date() {
      return dayjs(this.blog.date).format('MM/DD/YYYY')
    },
    updatedDate() {
      return dayjs(this.blog.updatedAt).format('MM/DD/YYYY')
    },
  },
}
</script>

<style lang="postcss">
li {
  @apply ml-5;

  &:before {
    @apply mr-2;
    content: ' - ';
  }
}

.post-title {
  text-align: center;
}
.hero {
  max-height: 550px;
  object-fit: contain;
  object-position: center;
  margin: 0 auto;
}

blockquote {
  @apply p-6 mx-16 bg-gray-100 shadow italic;
}

pre[class*='language'] {
  @apply rounded shadow-md p-6 mx-16 my-6;
}

article {
  max-width: 1000px;

  img {
    @apply m-auto w-2/3 shadow-md my-4;
  }

  a {
    @apply underline;
  }
}

.pill {
  @apply bg-gray-800 text-white shadow no-underline py-2 px-4 rounded-full m-1 font-bold select-none text-sm inline-block;
}

input,
textarea {
  @apply p-2 my-3 border-2 rounded w-full text-lg;
  resize: none;
}

button[type='submit'] {
  @apply py-2 px-3 bg-blue-500 text-white rounded;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    @apply bg-blue-700;
  }

  &[disabled] {
    @apply bg-blue-300;
  }
}

.success {
  @apply bg-green-200 p-2 rounded mt-4 text-center;
}

.error {
  @apply bg-red-200 p-2 rounded mt-4 text-center;
}
</style>
