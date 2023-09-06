<template>
  <div>
    <n-h3 prefix="bar">배경색</n-h3>
    <n-dynamic-input v-model:value="dynamicValues" :min="1" :max="3" :on-create="onCreate">
      <template #create-button-default>
        배경 색상을 추가하세요.
      </template>
      <template #default="{ value }:{value:DynamicItem}">
        <n-color-picker class="min-w-50" v-model:value="value.color"></n-color-picker>
      </template>
    </n-dynamic-input>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts" setup>
import {PropType} from "@vue/runtime-core";
import {Color} from "~/src/model/color";
import {isEqual} from "lodash";

declare type DynamicItem = { color: Color }

const emit = defineEmits(['update:colors'])
const props = defineProps({
  colors: {type: Array as PropType<Color[]>, required: true},
})

const dynamicValues = ref<DynamicItem[]>([])

watch(
    () => props.colors,
    (v: Color[]) => {
      const items = v.map(color => ({color} as DynamicItem));
      if (isEqual(dynamicValues.value, items)) return;
      dynamicValues.value = items
    },
    {immediate: true}
)

watch(dynamicValues, (v: DynamicItem[]) => {
  const converted = v.map(e => (e.color));
  emit('update:colors', converted)
}, {deep: true})

function onCreate(): DynamicItem {
  console.log('onCreate')
  const color = ranHex() as Color
  return {color} as DynamicItem
}

function ranHex() {
  const v = Math.abs(Math.random() * 0xFFFFFF << 0);
  return '#' + v.toString(16).padStart(6, '0') + 'FF';
}
</script>
