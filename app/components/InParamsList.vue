<script setup>
    import Cross55Icon from '@bitrix24/b24icons-vue/actions/Cross55Icon'

    const store = useGlobalState();
    const modalOpen = ref(false);
    const error = ref('');
    const newFieldCode = ref('');
    const props = defineProps({
        id: {
            type: Number,
            required: true,
        },
        params: {
            type: Object,
            required: false,
            default: () => ({})
        },
    });
    const localParams = ref({ ...props.params });

    onMounted(async () => {
    });

    const addNewField = () => {
        console.log(newFieldCode.value)
        if (!newFieldCode.value || !newFieldCode.value.trim()) {
            error.value = 'Название не может быть пустым';
        } else if (localParams.value[newFieldCode.value]) {
            error.value = 'Такое поле уже существует';
        } else {
            localParams.value[newFieldCode.value] = {code:newFieldCode.value,name: ''};
            modalOpen.value = false
            newFieldCode.value = '';
            saveData();
        }
    };

    const deleteField = (code) => {
        const newParams = {...localParams.value};
        delete newParams[code];
        localParams.value = newParams;
        saveData();
    };

    const updateName = (code, newName) => {
        localParams.value[code].name = newName;
    };

    const saveData = () => {
        const curDataItem = store.getItemById(props.id);
        curDataItem.inParams = localParams.value;
        store.updateItem(props.id,curDataItem);
    }
    
</script>


<template>
    <template v-if="localParams && typeof(localParams) === 'object' && Object.keys(localParams).length > 0">
        <ul class="p-2">
            <li v-for="(value, key) in localParams" :key="key" class="bg-base-100 p-4 rounded-lg mt-4">
                <div class="flex justify-between items-center gap-4">
                    <div class="flex gap-4 flex-wrap w-full">
                        <div class="min-w-[35%]">
                            <h3 class="font-medium text-base-500 text-sm mb-1">Код поля</h3>
                            <B24Input
                                v-model="value.code"
                                :disabled="true"
                                :b24ui="{base:'disabled:text-base-500 disabled:pointer-events-auto bg-none disabled:opacity-100 disabled:cursor-auto disabled:bg-base-150'}"
                            />
                        </div>
                        <div class="min-w-[35%]">
                            <h3 class="font-medium text-base-500 text-sm mb-1">Название поля</h3>
                            <B24Input
                                v-model="value.name"
                                placeholder="Введите название"
                                @update:model-value="updateName(key,$event)"
                                @blur="saveData"
                            />
                        </div>
                    </div>
                    <div>
                        <B24Button
                           class="rounded-xs"
                           :icon="Cross55Icon"
                           color="danger"
                           @click="deleteField(value.code)"
                        />
                    </div>

                </div>
            </li>
        </ul>
    </template>
    <template v-else>
        <ul class="flex justify-center w-full">
            <li class="font-bold text-base-700 text-2xl">Нет полей</li>
        </ul>
    </template>
    <div class="mt-4">
        <!-- <ModalTemplate
            main-btn-text="+ Добавить поле"
            title="Введите код поля"
            desc="Указывается только при создании"
            :calback="addNewField"
            :inpur-data="{
                showInput: true,
                valContainer: newFieldCode,
                errorText: 'Название не может быть пустым',
                plh: 'Введите код поля',
            }"
        /> -->
        <B24Modal
            v-model:open="modalOpen"
            title="Введите код поля"
            description="Указывается только при создании"
        >
            <B24Button
                class="rounded-xs"
                color="primary"
                :normal-case="false"
                label="+ Добавить поле"
            />
            <template #body>
                <B24Input
                    v-model="newFieldCode"
                    :autofocus="true"
                    placeholder="Введите код поля"
                    @update:model-value="newFieldCode = $event"
                    @input="error = ''"
                />
                <div v-if="error" class="text-alert-text">{{ error }}</div>
            </template>
            <template #footer>
                <div class="flex flex-row gap-[10px]">
                    <B24Button
                        color="air-primary-success"
                        label="Сохранить"
                        @click="addNewField"
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
</template>