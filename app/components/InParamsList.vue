<script setup>
    import Cross55Icon from '@bitrix24/b24icons-vue/actions/Cross55Icon';
    import { cloneDeep } from 'lodash-es';

    const props = defineProps({
        params: {
            type: Object,
            required: false,
            default: () => ({})
        },
        checkChange: {
            type: Function,
            required: true,
        },
    });
    const localParams = ref(cloneDeep(props.params));
    const emit = defineEmits(['update:params']);

    onMounted(async () => {
    });

    const addNewField = () => {
        const code = `field_input_${Object.keys(localParams.value).length+1}`;
        localParams.value[code] = {code,name: '',value:''};
        saveData();
    };

    const deleteField = (code) => {
        const newParams = cloneDeep(localParams.value);
        delete newParams[code];
        localParams.value = newParams;
        saveData();
    };

    const updateName = (code, newName) => {
        localParams.value[code].name = newName;
    };
    const updateValue = (code, newValue) => {
        localParams.value[code].value = newValue;
    };

    const saveData = () => {
        emit('update:params', localParams.value);
        props.checkChange(localParams.value, 'inParams');
    };
    
</script>


<template>
    <template v-if="localParams && typeof(localParams) === 'object' && Object.keys(localParams).length > 0">
        <ul class="p-2">
            <li v-for="(data, key) in localParams" :key="key" class="bg-base-100 p-4 rounded-lg mt-4">
                <div class="flex justify-between items-center gap-4">
                    <div class="flex gap-4 flex-wrap w-full">
                        <div class="min-w-[32%]">
                            <h3 class="font-medium text-base-500 text-sm mb-1">Код поля</h3>
                            <B24Input
                                v-model="data.code"
                                :disabled="true"
                                :b24ui="{base:'disabled:text-base-500 disabled:pointer-events-auto bg-none disabled:opacity-100 disabled:cursor-auto disabled:bg-base-150'}"
                            />
                        </div>
                        <div class="min-w-[32%]">
                            <h3 class="font-medium text-base-500 text-sm mb-1">Название поля</h3>
                            <B24Input
                                v-model="data.name"
                                placeholder="Введите название"
                                @update:model-value="updateName(key,$event)"
                                @blur="saveData"
                            />
                        </div>
                        <div class="min-w-[32%]">
                            <h3 class="font-medium text-base-500 text-sm mb-1">Значение для тестирования</h3>
                            <B24Input
                                v-model="data.value"
                                placeholder="Введите тестовое название"
                                @update:model-value="updateValue(key,$event)"
                                @blur="saveData"
                            />
                        </div>
                    </div>
                    <div>
                        <B24Button
                           class="rounded-xs"
                           :icon="Cross55Icon"
                           color="danger"
                           @click="deleteField(data.code)"
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
        <B24Button
            class="rounded-xs"
            color="primary"
            :normal-case="false"
            label="+ Добавить поле"
            @click="addNewField"
        />
    </div>
</template>