<script setup>
    import Pencil40Icon from '@bitrix24/b24icons-vue/actions/Pencil40Icon';
    import PlayIcon from '@bitrix24/b24icons-vue/button/PlayIcon';
    import TrashBinIcon from '@bitrix24/b24icons-vue/main/TrashBinIcon';

    const store = useGlobalState();
    const item = ref(null);
    const localTitle = ref('');
    const titleMode = ref('view');
    const modalOpen = ref(false);
    const props = defineProps({
        id: {
            type: Number,
            required: true,
        },
    });

    onMounted(async () => {
        const data = props.id > 0 ? store.getItemById(props.id) : store.getItemById(store.addNewItem());
        if (data) item.value = data;
        localTitle.value = item.value?.title || 'Новый элемент';
        store.setModeView('');
    });
    
    useHead({
        title:localTitle
    });

    const changeTitleMode = () => {
        titleMode.value = titleMode.value === 'view' ? 'edit' : 'view';
    }

    const saveTitle = (e) => {
        // console.log(e);
        let save = true;
        if (e.type === 'keydown') {
            save = false;
            if (e.key === 'Enter') save = true;
        }

        if (save) {
            if (localTitle.value?.trim()) {
                const id = item.value?.id;
                if (id) {
                    const newData = JSON.parse(JSON.stringify(item.value));
                    newData.title = localTitle.value;
                    store.updateItem(id,newData);
                }
            } else {
                e.target.focus();
                return;
            }
            titleMode.value = 'view';
        }
    };
    const value = 'test';
</script>

<template>
    <div>
        <template v-if="store.modeView === 'preloader'">
            <PreloaderMain/>
        </template>
        <template v-else>
            <div class="container m-auto pt-10 pl-8 pr-8 pb-8">
                <h1 class="flex items-center">
                    <template v-if="titleMode === 'view'">
                        <span class="font-bold text-base-700 text-3xl">{{ localTitle }}</span>
                        <B24Button
                            :icon="Pencil40Icon"
                            color="air-tertiary"
                            @click="changeTitleMode"
                        /> 
                    </template>
                    <template v-else>
                        <div class="w-full">
                            <B24Input
                                :no-border="true"
                                :autofocus="true"
                                :model-value="localTitle"
                                :b24ui="{base:'font-bold text-base-700 focus:text-base-700 text-3xl'}"
                                @update:model-value="localTitle = $event"
                                @blur="saveTitle"
                                @keydown="saveTitle"
                            />
                            <div v-if="!localTitle.trim()" class="text-alert-text">Название не может быть пустым</div>
                        </div>
                    </template>
                </h1>
                <div class="rounded-2xl bg-white p-8 mt-8">
                    <h2 class="font-bold text-base-700 text-1xl">Входящие параметры</h2>
                    <InParamsList :id="item.id" :params="item.inParams"/>
                </div>
                <div class="rounded-2xl bg-white p-8 mt-8">
                    <h2 class="font-bold text-base-700 text-1xl">Исходящие параметры</h2>
                    <OutParamsList :id="item.id" :params="item.outParams"/>
                </div>
                <div class="rounded-2xl bg-white p-8 mt-8">
                    <h2 class="font-bold text-base-700 text-1xl">Тестирование запросов</h2>
                    <div class="mt-4">
                        <div class="font-medium text-base-500 text-sm mb-2">Входящие параметры</div>
                        <B24Textarea
                            v-model="value"
                            :rows="5"
                        />
                    </div>
                    <div class="mt-4">
                        <div class="font-medium text-base-500 text-sm mb-2">Код</div>
                        <B24Textarea
                            v-model="value"
                            :rows="5"
                        />
                    </div>
                    <div class="mt-4">
                        <div class="font-medium text-base-500 text-sm mb-2">Результат</div>
                        <B24Textarea
                            color="air-primary"
                            :rows="4"
                            placeholder="Результат выполнения будет отображён здесь"
                            :disabled="true"
                            :b24ui="{base:'disabled:pointer-events-auto disabled:resize-y bg-none disabled:opacity-100 disabled:cursor-auto disabled:bg-base-100'}"
                        />
                    </div>
                    <div class="mt-4">
                        <B24Button
                            class="rounded-xs"
                            :icon="PlayIcon"
                            color="primary"
                            :normal-case="false"
                            label="Выполнить тест"
                        />
                    </div>
                </div>
                <div class="mt-4">
                     <B24Modal
                        v-model:open="modalOpen"
                        :title="`Удалть '${localTitle}'?`"
                        description=" "
                    >
                    <B24Button
                        class="rounded-xs"
                        :icon="TrashBinIcon"
                        color="air-primary-alert"
                        :normal-case="false"
                        label="Удалить"
                    />
                        <template #footer>
                            <div class="flex flex-row gap-[10px]">
                                <B24Button
                                    color="air-primary-alert"
                                    label="Удалить"
                                    to="/"
                                    @click="()=>store.deleteItem(item.id)"
                                />
                                <B24Button
                                    color="air-tertiary"
                                    label="Отмена"
                                    @click="modalOpen = false"
                                />
                            </div>
                        </template>
                    </B24Modal>
                </div>
            </div>
        </template>
    </div>
</template>