<script setup>

    const title = 'Мои активити и роботы';
    const store = useGlobalState();
    
    useHead({
        title
    });
    onMounted(async () => {
        store.setModeView('');
    });

</script>

<template>
    <div>
        <template v-if="store.modeView === 'preloader'">
            <PreloaderMain/>
        </template>
        <template v-else>
            <div class="container m-auto pt-10 pl-8 pr-8 pb-8">
                <div class="flex justify-between mb-8">
                    <h1 class="font-bold text-base-700 text-3xl">{{ title }}</h1>
                    <B24Button
                        class="rounded-xs"
                        color="primary"
                        :normal-case="false"
                        label="+ Добавить активити/робота"
                        to="/element/0/"
                        @click="store.setModeView('preloader')"
                    />
                </div>
                <ItemsList/>
            </div>
        </template>
    </div>
</template>
