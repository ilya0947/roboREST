<script setup>

    const store = useGlobalState();

    onMounted(async () => {
    });
    

</script>

<template>
    <template v-if="store.items && typeof(store.items) === 'object' && JSON.stringify(store.items) !== '[]'">
        <ul class="flex justify-between flex-wrap w-full gap-4">
            <li v-for="item in store.items" :key="item.id" class="flex justify-between p-4 rounded-lg bg-primary-background shadow-xl w-[100%] max-w-[30%] min-w-[300px]">
                <div class="flex justify-between w-full">
                    <span class="font-bold text-base-700 text-2xl text-ellipsis overflow-hidden" :title="item.title">{{ item.title }}</span>
                    <B24Button
                        class="rounded-xs"
                        color="primary"
                        :normal-case="false"
                        label="Редактировать"
                        :to="'/element/'+item.id+'/'"
                        @click="store.setModeView('preloader')"
                    />
                </div>
            </li>
        </ul>
    </template>
    <template v-else>
        <ul class="flex justify-center w-full">
            <li class="font-bold text-base-700 text-2xl">Пусто</li>
        </ul>
    </template>
</template>