<script setup>
    const demoList = [
        {
            id: 'field_outnput_1',
            desc: 'Результат обработки',
            status: '"success"',
            statusClass: 'text-[#8ebb01]',
            type: 'String',
            multiple: false
        },
        {
            id: 'field_outnput_2',
            desc: 'Статус выполнения',
            status: '"completed"',
            statusClass: 'text-[#10a9d9]',
            type: 'String',
            multiple: false
        },
        {
            id: 'deals_count',
            desc: 'Количество сделок (автогенерация)',
            status: '847',
            statusClass: '',
            type: 'Number',
            multiple: false
        },
        {
            id: 'execution_time',
            desc: 'Время выполнения (автогенерация)',
            status: '"611ms"',
            statusClass: 'text-[#e89b08]',
            type: 'String',
            multiple: false
        },
        {
            id: 'api_response',
            desc: 'Ответ API (множественное)',
            status: '[{"ID":"1234","TITLE": "Deal 1"}, ...] (847 items)',
            statusClass: 'rounded-[4px] bg-[#edeef0] text-[#9499a4] p-[3px] pl-4 w-[40%]',
            type: 'Array',
            multiple: true
        },
    ];
</script>

<template>
    <ul>
        <li v-for="data in demoList" :key="data.id" class="rounded-sm bg-white p-[10px] border-1 border-[#333] border-solid not-first:mt-4">
            <div class="flex justify-between items-center flex-wrap">
                <div>
                    <div class="font-medium text-[#333] text-xl">{{ data.id }}</div>
                    <div class="font-medium text-base-500 text-sm">{{ data.desc }}</div>
                    <div v-if="data.multiple" class="font-medium text-[#10a9d9] text-sm mt-1">✓Множественное поле</div>
                </div>
                <div :class="data.statusClass">{{ data.status }}</div>
                <div class="font-medium text-base-500 text-sm mb-2">{{ data.type }}</div>
            </div>
        </li>
    </ul>
</template>