<template>
  {{ useStore.token }}
</template>
<script setup>
import useUserStore from '@/store/modules/user.js'
const useStore = useUserStore()
</script>
<style lang="scss" scoped>

</style>