<template>
<div>{{route}}</div>
</template>

<script>
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'

export default {
  name: 'ProductView',
  setup () {
    const route = useRoute()
    onMounted(() => {
      const id = route.params.id
      console.log(id)
    })
    return {
      route
    }
  }
}
</script>

<style scoped>

</style>
