<script setup>
    definePageMeta({
        validate: (route) => {
            const id = Number(route.params.id)
            return Number.isInteger(id) && id >= 0
        }
    });
    
    const route = useRoute();
    const id = Number(route.params.id);
</script>

<template>
    <ElementForm :id="id"/>
</template>