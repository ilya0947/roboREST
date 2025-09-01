<script setup>
    import logo from '~/assets/img/logo.png';
    import RecordVideoIcon from '@bitrix24/b24icons-vue/main/RecordVideoIcon';
    // import { useGlobalState } from '~/stores/globalState';
    // const store = useGlobalState();
</script>

<template>
    <header class="bg-white pt-4 pb-2 pl-6 pr-6">
        <div class="flex justify-between">
            <div class="flex gap-4 items-center">
                <NuxtLink to="/">
                    <div class="flex gap-4 items-center f-size-10">
                        <div class="w-[150px]">
                            <img :src="logo" alt="roboREST">
                        </div>
                        <div>
                            <div class="font-semibold text-[20px]">
                                <span>Robo<span class="text-orange-500">REST</span></span>
                            </div>
                            <div class="text-base-600 text-xs">
                                <span>Универсальный конструктор роботов и активити БП</span>
                            </div>
                        </div>
                    </div>
                </NuxtLink>
                
            </div>
            <div class="flex flex-wrap gap-4 items-center justify-between">
                <ul class="flex gap-4 space-x-4 flex-wrap">
                    <li class="flex items-center mr-0">
                        <B24Button
                            to="#"
                            :icon="RecordVideoIcon"
                            color="link"
                            target="_blank"
                            class="normal-case text-lg font-regular text-base-600"
                            label="Инструкция"
                        />
                    </li>
                    <li class="flex gap-[16px] bg-blue-150 text-lg rounded-sm pt-3 pb-3 pr-6 pl-6">
                        <div>
                            <div class="text-base-600">Тех. поддержка</div>
                            <NuxtLink href="mailto:ka@ipgpromo.ru" target="_blank" class="text-blue-530">ka@ipgpromo.ru</NuxtLink>
                        </div>
                        <div>
                            <SupportWidget/>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </header>
</template>



<script>
    export default {
        name: 'HeaderMain',
    };
</script>