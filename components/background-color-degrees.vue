<template>
  <div>
    <n-h3 prefix="bar">배경색 그래디언트 각도</n-h3>
    <n-space vertical>
      <n-icon :size="96" :style="styles">
        <arrow-back-circle-outline></arrow-back-circle-outline>
      </n-icon>
      <n-slider v-model:value="degrees" :min="0" :max="360"></n-slider>
    </n-space>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts" setup>
import {ArrowBackCircleOutline} from "@vicons/ionicons5"
import {CSSProperties} from "@vue/runtime-dom";

const emit = defineEmits(['update:value'])
const props = defineProps({
  value: {type: Number, default: 135},
})

const degrees = computed({
  get() {
    return props.value ?? 135
  },
  set(v) {
    emit('update:value', v)
  }
})

const styles = computed(() => {
  const styles: CSSProperties = {}
  styles.transform = `rotate(${degrees.value + 90}deg)`
  return styles
})
</script>
