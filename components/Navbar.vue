<script setup lang="ts">
import { ref } from 'vue'

interface NavBarLink {
  name: string
  url: string
  external?: boolean
}

// 这里可以从配置文件中导入，暂时使用示例数据
const links = ref<NavBarLink[]>([
  { name: 'Home', url: '/' },
  { name: 'About', url: '/about' },
  { name: 'GitHub', url: 'https://github.com', external: true }
])

const isDark = ref(false)
const isSettingsPanelOpen = ref(false)
const isNavMenuOpen = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.theme = 'dark'
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.theme = 'light'
  }
}

const toggleSettingsPanel = () => {
  isSettingsPanelOpen.value = !isSettingsPanelOpen.value
}

const toggleNavMenu = () => {
  isNavMenuOpen.value = !isNavMenuOpen.value
}
</script>

<template>
  <div id="navbar" class="z-50 onload-animation">
    <div class="absolute h-8 left-0 right-0 -top-8 bg-[var(--card-bg)] transition" />
    <div
      class="card-base !overflow-visible max-w-[var(--page-width)] h-[4.5rem] !rounded-t-none mx-auto flex items-center justify-between px-4"
    >
      <NuxtLink to="/" class="btn-plain scale-animation rounded-lg h-[3.25rem] px-5 font-bold active:scale-95">
        <div class="flex flex-row text-[var(--primary)] items-center text-md">
          <Icon name="material-symbols:home-outline-rounded" class="text-[1.75rem] mb-1 mr-2" />
          <span>Blog Title</span>
        </div>
      </NuxtLink>

      <div class="hidden md:flex">
        <template v-for="link in links" :key="link.url">
          <component
            :is="link.external ? 'a' : 'NuxtLink'"
            :to="!link.external ? link.url : undefined"
            :href="link.external ? link.url : undefined"
            :target="link.external ? '_blank' : undefined"
            class="btn-plain scale-animation rounded-lg h-11 font-bold px-5 active:scale-95"
          >
            <div class="flex items-center">
              {{ link.name }}
              <Icon
                v-if="link.external"
                name="fa6-solid:arrow-up-right-from-square"
                class="text-[0.875rem] transition -translate-y-[1px] ml-1 text-black/[0.2] dark:text-white/[0.2]"
              />
            </div>
          </component>
        </template>
      </div>

      <div class="flex">
        <Search />
        <button
          aria-label="Display Settings"
          class="btn-plain scale-animation rounded-lg h-11 w-11 active:scale-90"
          @click="toggleSettingsPanel"
        >
          <Icon name="material-symbols:palette-outline" class="text-[1.25rem]" />
        </button>

        <button
          aria-label="Toggle Theme"
          class="btn-plain scale-animation rounded-lg h-11 w-11 active:scale-90"
          @click="toggleTheme"
        >
          <Icon
            :name="isDark ? 'material-symbols:dark-mode-outline' : 'material-symbols:light-mode-outline'"
            class="text-[1.25rem]"
          />
        </button>

        <button
          aria-label="Menu"
          class="btn-plain scale-animation rounded-lg w-11 h-11 active:scale-90 md:!hidden"
          @click="toggleNavMenu"
        >
          <Icon name="material-symbols:menu-rounded" class="text-[1.25rem]" />
        </button>
      </div>

      <!-- Mobile Navigation Menu -->
      <div
        v-show="isNavMenuOpen"
        class="float-panel absolute transition-all fixed right-4 px-2 py-2"
      >
        <template v-for="link in links" :key="link.url">
          <component
            :is="link.external ? 'a' : 'NuxtLink'"
            :to="!link.external ? link.url : undefined"
            :href="link.external ? link.url : undefined"
            :target="link.external ? '_blank' : undefined"
            class="group flex justify-between items-center py-2 pl-3 pr-1 rounded-lg gap-8 hover:bg-[var(--btn-plain-bg-hover)] active:bg-[var(--btn-plain-bg-active)] transition"
          >
            <div
              class="transition text-black/75 dark:text-white/75 font-bold group-hover:text-[var(--primary)] group-active:text-[var(--primary)]"
            >
              {{ link.name }}
            </div>
            <Icon
              v-if="!link.external"
              name="material-symbols:chevron-right-rounded"
              class="transition text-[1.25rem] text-[var(--primary)]"
            />
            <Icon
              v-else
              name="fa6-solid:arrow-up-right-from-square"
              class="transition text-[0.75rem] text-black/25 dark:text-white/25 -translate-x-1"
            />
          </component>
        </template>
      </div>

      <!-- Settings Panel -->
      <div v-show="isSettingsPanelOpen" class="float-panel absolute transition-all fixed right-4 px-2 py-2">
        <!-- Add your settings panel content here -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.float-panel {
  background: var(--card-bg);
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  top: 5rem;
  min-width: 16rem;
  z-index: 100;
}

.btn-plain {
  transition: all 0.2s;
}

.scale-animation {
  transition: transform 0.2s;
}

.card-base {
  background: var(--card-bg);
  border-radius: 0.5rem;
}
</style>