<template>
  <n-space vertical>
    <n-h3 prefix="bar">글</n-h3>
    <n-input
        v-model:value="model"
        type="textarea"
        placeholder="여기에 글을 입력하세요."
        clearable
        show-count
        :maxlength="1000"
        :autosize="{
          minRows: 2,
          maxRows: 10
        }"
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
