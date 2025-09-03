<script setup>
    import loader from '@monaco-editor/loader'

    const container = shallowRef();
    const languages = ref([{id:'javascript',label:'js'}, {id:'typescript',label:'ts'}]);
    let editor = null

    const props = defineProps({
        modelValue: {
            type: String,
            default: ''
        },
        lang: {
            type: String,
            default: 'javascript'
        },
        checkChange: {
            type: Function,
            required: true,
        }
    });
    
    const language = ref(props.lang);

    const emit = defineEmits(['update:modelValue','update:lang']);

    onMounted(async () => {
        // Загружаем Monaco
        await loader.init()

        const monaco = await loader.init()

        editor = monaco.editor.create(container.value, {
        value: props.modelValue,
        language: language.value,
        automaticLayout: true,
        scrollBeyondLastLine: false,
        fontSize: 14
        })

        // Следим за изменениями
        editor.onDidChangeModelContent(() => {
            emit('update:modelValue', editor.getValue());
            props.checkChange(editor.getValue(), 'activityCode');
        })
    })

    watch(() => props.modelValue, (newVal) => {
            if (editor && editor.getValue() !== newVal) editor.setValue(newVal);
        }
    );
    watch(language, (newLang) => {
        if (editor) {
            const model = editor.getModel();
            if (model) {
                window.monaco.editor.setModelLanguage(model, newLang);
                props.checkChange(newLang,'activityCodeLang');
            }
        }
    });

    // Очистка при уничтожении
    onUnmounted(() => {
        if (editor) {
            editor.dispose();
            editor = null;
        }
    })
</script>

<template>
    <div class="flex justify-end items-center gap-2 mb-2">
        <span class="font-medium text-base-500 text-sm">Язык редактора</span>
        <B24RadioGroup
            v-model="language"
            :items="languages"
            value-key="id"
            orientation="horizontal"
            variant="list"
            @change="emit('update:lang', language);"
        />
    </div>
    <div ref="container" class="h-[800px] rounded-[5px]  border-2 border-base-350 border-solid"/>
</template>
