<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Input from '@example/form/views/Input.vue';
import BasicForm from '@example/form/BasicForm';
export default defineComponent({
  components: {
    Input
  },
  props: {
    controller: {
      type: Object as PropType<BasicForm>,
      required: true,
    }
  },
  setup(props) {
    console.log(props.controller);
    return {
      fields: props.controller.fields
    }
  },
});
</script>

<template>
  <div>
    <div>{{ fields.length }}</div>
    <div v-for="controller in fields" :key="controller.getConfig().key">
      <Input v-if="controller.getConfig().view === 'Input'"  :controller="controller" />
    </div>
  </div>
</template>
  
<style lang="less" scoped>

</style>
  