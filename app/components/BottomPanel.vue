<script setup>
    const { chancgeElement, callBack } = defineProps({
        chancgeElement: {
            type: Object,
            default: () => ({}),
        },
        callBack: {
            type: Function,
            default: () => console.log('save'),
        }
    });
</script>

<template>
    <transition
        name="bottom-panel"
        enter-active-class="transition-all duration-300 ease-out"
        leave-active-class="transition-all duration-200 ease-in"
        enter-from-class="transform translate-y-full opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform translate-y-full opacity-0"
    >
        <div v-show="Object.keys(chancgeElement).length > 0" class="fixed bg-white right-[0] left-[0] bottom-[0] h-[70px] border-t-[2px] border-base-350 border-solid z-5">
            <div class="m-auto w-full pl-8 pr-8 h-full">
                <div class="flex justify-between items-center flex-wrap h-full">
                    <span class="font-medium text-base-500 text-sm mb-2">У вас есть несохранённые изменения</span>
                    <B24Button
                        class="rounded-xs"
                        color="primary"
                        :normal-case="false"
                        label="Сохранить изменения"
                        @click="callBack"
                    />
                </div>
            </div>
        </div>
    </transition>
</template>