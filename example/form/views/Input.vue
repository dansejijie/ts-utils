<template>
    <AntdInput :value="controller.value" @change="handleChange" />
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { Input as AntdInput } from 'ant-design-vue';
  import IField from '@/form/IField';

  export default defineComponent({
    components: {
      AntdInput
    },
    props: {
      controller: {
        type: Object as PropType<IField<string>>,
        required: true
      }
    },
    setup(props) {
      const handleChange = (e: InputEvent) => {
        console.log('handleChange', e);
        props.controller.setValue(e.target.value);
      }
      return {
        controller: props.controller,
        handleChange
      }
    },
  });
  </script>
  
  <style lang="less" scoped>

  </style>
  