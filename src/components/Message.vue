
<script setup>
    const message = defineProps(['msgProps'])

</script>

<template>
    <div class="message">
        <p>{{ message.msgProps }}</p>
    </div>
</template>

<style scoped>
.message {
    text-align: center;
    color: #004085;
    background-color: #cce5ff;
    border: 2px solid #88daff;
    border-radius: 5px;
    padding: 10px;
    max-width: 500px;
    margin: 30px auto;
}

</style>