<script setup>
    import Pencil40Icon from '@bitrix24/b24icons-vue/actions/Pencil40Icon';
    import PlayIcon from '@bitrix24/b24icons-vue/button/PlayIcon';
    import TrashBinIcon from '@bitrix24/b24icons-vue/main/TrashBinIcon';
    import { isEqual, cloneDeep } from 'lodash-es';

    const store = useGlobalState();
    
    const container = shallowRef();
    const containerLogs = shallowRef();
    const item = ref(null);
    const localTitle = ref('');
    const result = ref('');
    const data = ref(null);
    const titleMode = ref('view');
    const modalOpen = ref(false);
    const chancgeElement = ref({});
    const props = defineProps({
        id: {
            type: Number,
            required: true,
        },
    });

    onMounted(async () => {
        data.value = props.id > 0 ? store.getItemById(props.id) : store.getItemById(store.addNewItem());
        if (data.value) item.value = cloneDeep(data.value);
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
                if (id) item.value.title = localTitle.value;
            } else {
                e.target.focus();
                return;
            }
            titleMode.value = 'view';
            checkChange(item.value.title, 'title');
        }
    };

    const saveData = () => {
        const id = props.id === 0 ? item.value.id : props.id;
        store.updateItem(id,item.value);
        data.value = item.value;
        chancgeElement.value = {};
    };

    const checkChange = (newParams, key) => {
        if (isEqual(data.value[key], newParams)) {
            delete chancgeElement.value[key];
        } else {
            chancgeElement.value[key] = true;
        }
    };

    const runCode = () => {
        result.value = '';
        const originalLog = console.log
        const originalError = console.error

        const logs = []

        console.log = (...args) => {
            logs.push(args.map(arg => JSON.stringify(arg)).join(' '))
        }

        console.error = (...args) => {
            logs.push('ОШИБКА: ' + args.map(arg => arg.toString()).join(' '))
        }
        try {
            new Function(data.value.activityCode)();
        } catch (err) {
            logs.push('ИСКЛЮЧЕНИЕ: ' + err.message)
        } finally {
            console.log = originalLog;
            console.error = originalError;
            result.value = logs.join('\n');
        }
        containerLogs.value.textContent = result.value;
        console.log(data.value.activityCode);
    };

</script>

<template>
    <div>
        <template v-if="store.modeView === 'preloader'">
            <PreloaderMain/>
        </template>
        <template v-else>
            <div class="container m-auto pt-10 pl-8 pr-8 pb-8">
                <div class="flex justify-between">
                    <h1 class="flex items-center w-full">
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
                <div class="rounded-2xl bg-white p-8 mt-8">
                    <h2 class="font-bold text-base-700 text-1xl">Входящие параметры</h2>
                    <InParamsList v-model:params="item.inParams" :check-change="checkChange"/>
                </div>
                <div class="rounded-2xl bg-white p-8 mt-8">
                    <h2 class="font-bold text-base-700 text-1xl">Исходящие параметры</h2>
                    <OutParamsList v-model:params="item.outParams" :check-change="checkChange"/>
                </div>
                <div class="rounded-2xl bg-white p-8 mt-8">
                    <h2 class="font-bold text-base-700 text-1xl">Код активити</h2>
                    <div class="mt-4">
                        <ClientOnly>
                            <MonacoEditor v-model="item.activityCode"  v-model:lang="item.activityCodeLang" :check-change="checkChange"/>
                        </ClientOnly>
                    </div>
                </div>
                <div class="rounded-2xl bg-white p-8 mt-8">
                    <div class="flex justify-between items-center">
                        <h2 class="font-bold text-base-700 text-1xl">Тестирование запросов</h2>
                        <B24Button
                            class="rounded-xs"
                            :icon="PlayIcon"
                            color="primary"
                            :normal-case="false"
                            label="Выполнить тест"
                            @click="runCode"
                        />
                    </div>
                    <div class="mt-4">
                        <div ref="container" class="p-[10px] border-2 border-base-350 border-solid bg-base-100 rounded-sm min-h-[100px]"/>
                    </div>
                    <div class="mt-4">
                        <div class="font-medium text-base-500 text-sm mb-2">Логи</div>
                        <div ref="containerLogs" class="p-[10px] border-2 border-base-350 border-solid bg-base-100 rounded-sm min-h-[100px]"/>
                    </div>
                </div>
            </div>
            <BottomPanel :chancge-element="chancgeElement" :call-back="saveData"/>
        </template>
    </div>
</template>