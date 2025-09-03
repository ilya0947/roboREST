<script setup>
    const demoList = [
        {
            id: '1',
            name: 'DEBUG',
            desc: '[2024-08-26 23:15:01.123] Activity initialization started',
        },
        {
            id: '2',
            name: 'DEBUG',
            desc: '[2024-08-26 23:15:01.145] Input parameters received: {"userld": 123, "operation": "get_deals"}',
        },
        {
            id: '3',
            name: 'DEBUG',
            desc: '[2024-08-26 23:15:01.156] Webhook URL validated: https://your_domain.bitrix24.com/rest/1/xxxx/',
        },
        {
            id: '4',
            name: 'INFO',
            desc: '[2024-08-26 23:15:01.234] * Bitrix24 activity started: executeBitrix24Activity',
        },
        {
            id: '5',
            name: 'INFO',
            desc: '[2024-08-26 23:15:01.267] B24Hook initialized successfully',
            multiple: true
        },
        {
            id: '6',
            name: 'INFO',
            desc: '[2024-08-26 23:15:01.289] Executing operation: get_deals',
        },
    ];
</script>

<template>
    <ul>
        <li v-for="data in demoList" :key="data.id" class="not-first:mt-4">
            <div :class="['inline-block min-w-[70px] text-center font-medium text-[#333] text-xl mr-8', data.name === 'INFO' ? 'bg-[#f3fcfe] rounded-[5px] text-[#00789e]' : '']">{{ data.name }}</div>
            <div :class="['inline-block font-medium  text-sm', data.name === 'INFO' ? 'text-[#008dba]' : 'text-base-500']">{{ data.desc }}</div>
        </li>
    </ul>
</template>