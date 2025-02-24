<script lang="ts">
import { defineComponent, PropType, onMounted } from 'vue';
import Input from '@example/form/views/Input.vue';
import BasicForm from '@example/form/BasicForm';
import components from '@example/form/views/index';
import { FormItem, Form } from 'ant-design-vue';

console.log('components', components);
export default defineComponent({
  components: {
    Input,
    FormItem,
    Form,
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
      components,
      fields: props.controller.fields
    }
  },
});
</script>

<template>
  <div>
    <Form>
      <FormItem v-for="controller in fields" :key="controller.getConfig().key" :label="controller.getConfig().name">
        <component :is="components[controller.getConfig().view]" :controller="controller" />
      </FormItem>
    </Form>
  </div>
</template>

<style lang="less" scoped></style>