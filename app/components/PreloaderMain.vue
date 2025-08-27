<script setup>
    import LoaderWaitIcon from '@bitrix24/b24icons-vue/animated/LoaderWaitIcon';
    const store = useGlobalState();
</script>

<template>
    <template v-if="store.modeView ==='preloader'">
        <div class="flex items-center justify-center min-h-svh">
            <LoaderWaitIcon class="w-12 h-12" />
        </div>
    </template>
    <template v-else>
        <slot/>
    </template>
</template>