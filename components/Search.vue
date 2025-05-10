<script setup lang="ts">
/** 
 * 
 * <!-- toggle btn for phone/tablet view -->
	<button @click="togglePanel" aria-label="Search Panel" id="search-switch" class="btn-plain scale-animation lg:!hidden rounded-lg w-11 h-11 active:scale-90">
		<!-- <Icon icon="material-symbols:search" class="text-[1.25rem]" /> -->
	</button>

	<!-- search panel -->
	<div id="search-panel" :class="['float-panel absolute md:w-[30rem] top-20 left-4 md:left-[unset] right-4 shadow-2xl rounded-2xl p-2', { 'float-panel-closed': isPanelClosed }]">
		<!-- search bar inside panel for phone/tablet -->
		<div
			id="search-bar-inside"
			class="flex relative lg:hidden transition-all items-center h-11 rounded-xl bg-black/[0.04] hover:bg-black/[0.06] focus-within:bg-black/[0.06] dark:bg-white/5 dark:hover:bg-white/10 dark:focus-within:bg-white/10"
		>
			<!-- <Icon 
        icon="material-symbols:search" 
        class="absolute text-[1.25rem] pointer-events-none ml-3 transition my-auto text-black/30 dark:text-white/30"
      /> -->
			<input v-model="keywordMobile" placeholder="Search" class="pl-10 absolute inset-0 text-sm bg-transparent outline-0 focus:w-60 text-black/50 dark:text-white/50" />
		</div>

		<!-- search results -->
		<a
			v-for="item in result"
			:key="item.url"
			:href="item.url"
			class="transition first-of-type:mt-2 lg:first-of-type:mt-0 group block rounded-xl text-lg px-3 py-2 hover:bg-[var(--btn-plain-bg-hover)] active:bg-[var(--btn-plain-bg-active)]"
		>
			<div class="transition text-90 inline-flex font-bold group-hover:text-[var(--primary)]">
				{{ item.meta.title }}
				<!-- <Icon 
          icon="fa6-solid:chevron-right" 
          class="transition text-[0.75rem] translate-x-1 my-auto text-[var(--primary)]"
        /> -->
			</div>
			<div class="transition text-sm text-50" v-html="item.excerpt" />
		</a>
	</div>
 * 
 * 
*/

import { url } from '~/utils/url'

const keywordDesktop = ref('')
const keywordMobile = ref('')
// @ts-ignore
const result = ref<any[]>([])
const panel = ref<HTMLElement | null>(null)
const isPanelClosed = ref(true)

const fakeResult = [
	{
		url: url('/'),
		meta: {
			title: 'This Is a Fake Search Result',
		},
		excerpt: 'Because the search cannot work in the <mark>dev</mark> environment.',
	},
	{
		url: url('/'),
		meta: {
			title: 'If You Want to Test the Search',
		},
		excerpt: 'Try running <mark>npm build && npm preview</mark> instead.',
	},
]

const search = async (keyword: string, isDesktop: boolean) => {
	if (!panel.value) return

	if (!keyword && isDesktop) {
		isPanelClosed.value = true
		return
	}

	let arr = []
	if (import.meta.env.PROD) {
		console.log('searching...')
		// const ret = await pagefind.search(keyword)
		// for (const item of ret.results) {
		// 	arr.push(await item.data())
		// }
	} else {
		arr = fakeResult
	}

	if (!arr.length && isDesktop) {
		isPanelClosed.value = true
		return
	}

	if (isDesktop) {
		isPanelClosed.value = false
	}
	result.value = []
}

const togglePanel = () => {
	isPanelClosed.value = !isPanelClosed.value
}

onMounted(() => {
	panel.value = document.getElementById('search-panel')
})

watch(keywordDesktop, (val) => search(val, true))
watch(keywordMobile, (val) => search(val, false))
</script>

<template>
	<!-- search bar for desktop view -->
	<div
		id="search-bar"
		class="hidden lg:flex transition-all items-center h-11 mr-2 rounded-lg bg-black/[0.04] hover:bg-black/[0.06] focus-within:bg-black/[0.06] dark:bg-white/5 dark:hover:bg-white/10 dark:focus-within:bg-white/10"
	>
		<i i-mdi-search absolute pointer-events-none ml-3 transition my-auto un-text="black/30 [1.25rem] dark:white/30" />
		<input
			placeholder="搜索"
			v-model="keywordDesktop"
			@focus="search(keywordDesktop, true)"
			class="transition-all pl-10 text-sm bg-transparent outline-0 h-full w-40 active:w-60 focus:w-60 text-black/50 dark:text-white/50"
		/>
	</div>
</template>

<style>
input:focus {
	outline: 0;
}

.float-panel {
	transition: transform 0.3s ease, opacity 0.3s ease;
	transform-origin: top right;
}

.float-panel-closed {
	transform: scale(0.9);
	opacity: 0;
	pointer-events: none;
}

.search-panel {
	background: rgba(var(--bg-main), 0.95);
	backdrop-filter: blur(12px);
	-webkit-backdrop-filter: blur(12px);
	z-index: 999;
}
</style>
