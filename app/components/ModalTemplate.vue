
<script setup>
    const props = defineProps({
        title: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: false,
            default: () => ' '
        },
        inpurData: {
            type: Object,
            required: false,
            default: () => ({})
        },
        calback: {
            type: Function,
            required: true,
        },
        mainBtnText: {
            type: String,
            required: false,
            default: () => 'Добавить'
        },
        btnText: {
            type: String,
            required: false,
            default: () => 'Сохранить'
        },
        btnColor: {
            type: String,
            required: false,
            default: () => 'air-primary-success'
        },
    });
    
    const modalOpen = ref(false);
    const error = ref(false);

    const {showInput,valContainer,plh,errorText} = props.inpurData
</script>

<template>
    <B24Modal
            v-model:open="modalOpen"
            :title="title"
            :description="desc"
        >
        <B24Button
            class="rounded-xs"
            color="primary"
            :normal-case="false"
            :label="mainBtnText"
        />
        <template v-if="showInput && valContainer" #body>
            <B24Input
                v-model="valContainer"
                :autofocus="true"
                :placeholder="plh"
                @update:model-value="valContainer = $event"
                @input="error = false"
            />
            <div v-if="error" class="text-alert-text">{{ errorText }}</div>
        </template>
        <template #footer>
            <div class="flex flex-row gap-[10px]">
                <B24Button
                    :color="btnColor"
                    :label="btnText"
                    @click="calback"
                />
                <B24Button
                    color="air-tertiary"
                    label="Отмена"
                    @click="modalOpen = false"
                />
            </div>
        </template>
    </B24Modal>
</template>