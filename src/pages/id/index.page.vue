<template>
    <div>
        {{ id }}
    </div>
</template>

<script setup lang="ts">

defineProps({
    id: {
        type: String,
        required: true,
    },
})
</script>
