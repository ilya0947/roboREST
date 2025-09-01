<script setup>
    import Chats3Icon from '@bitrix24/b24icons-vue/main/Chats3Icon';
    // const { $initializeB24Frame } = useNuxtApp();
    // const BX24 = await $initializeB24Frame();
    // const store = useGlobalState();

	// const makeOpenFeedBack = async() =>
	// {
	// 	return BX24.slider.openSliderAppPage(
	// 		{
	// 			place: 'chat',
	// 			bx24_width: 650,
	// 			bx24_label: {
	// 				bgColor: 'green',
	// 				text: 'Чат с поддержкой',
	// 				color: '#ffffff',
	// 			},
	// 			bx24_title: 'Чат с поддержкой',
	// 		}
	// 	)
	// }	
</script>

<template>
    <B24Slideover :b24ui="{ header: 'support-widget-header', body: 'support-widget-body' }" :side="'right'">
    <div class="cust-widget">
        <div class="puls"/>
        <div class="icon-container">
            <Chats3Icon class="w-6 h-6 text-white" />
        </div>
    </div>
    <template #body>
        <iframe src="#" class="w-full h-screen mt-0"/>
    </template>
    </B24Slideover>
</template>

<style>
    .support-widget-header {
        margin-top: 0;
    }
    .support-widget-header .min-h-2xl {
        min-height: 0;
    }
    .support-widget-body {
        margin-top: 0;
    }
    .cust-widget {
        position: relative;
        width: 40px;
        height: 40px;
    }
    .cust-widget .puls {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        border: 1px solid #3BC8F5;
        border-radius: 50%;
        animation: custWidgetPuls infinite 1.5s;
    }
    .cust-widget .icon-container {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background-color: #3BC8F5;
        border-radius: 50%;
        z-index: 3;
        cursor: pointer;
        transition: all .2s;
        outline: 0 solid #A5E9FF;
    }
    .cust-widget .icon-container:hover {
        outline-width: 5px;
    }

    @keyframes custWidgetPuls {
        50% {
            -webkit-transform: scale(1, 1);
            transform: scale(1, 1);
            opacity: 1;
        }
        100% {
            -webkit-transform: scale(2, 2);
            transform: scale(2, 2);
            opacity: 0;
        }
    }
</style>