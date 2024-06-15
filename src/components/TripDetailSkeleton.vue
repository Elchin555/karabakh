<template>
    <div class="p-10 space-y-6 animate-pulse overflow-x-auto">
        <div class="flex flex-col w-full">
            <div class="flex space-x-4">
                <div class="h-4 bg-gray-300 rounded-full w-64"></div>
                <div class="h-4 bg-gray-300 rounded-full w-14"></div>
                <div class="h-4 bg-gray-300 rounded-full w-24"></div>
                <div class="h-4 bg-gray-300 rounded-full w-44"></div>
            </div>
        </div>

        <div class="flex w-full space-x-4 flex-nowrap">
            <div v-for="i in 5" :key="i" class="h-[500px] bg-gray-300 rounded-3xl w-64"></div>
        </div>
    </div>
</template>