<script lang="ts" setup>
import InputController, { IInputConfig } from "../controllers/Input";
import { Input } from "ant-design-vue";

const props = defineProps<{
    controller: InputController;
}>();

</script>

<template>
    <Input :placeholder="props.controller.config.attrs.placeholder" />
</template>