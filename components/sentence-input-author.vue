<template>
  <n-space vertical>
    <n-h3 prefix="bar">저자</n-h3>
    <n-input
        v-model:value="model"
        type="text"
        placeholder="저자 이름"
        clearable
        show-count
        :maxlength="36"
    ></n-input>
  </n-space>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts" setup>
const emit = defineEmits(['update:value'])
const props = defineProps({
  value: {type: String, required: true, default: ""},
})

const model = computed<string>({
  get() {
    return props.value ?? ""
  },
  set(v: string) {
    emit("update:value", v)
  }
})
</script>
