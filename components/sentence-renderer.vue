<template>
  <div class="p-4 pb-16 relative w-fit" :style="styles" v-if="backgroundMode == 'COLOR'">
    <pre class="sentence whitespace-break-spaces">{{ sentence.text }}</pre>
    <pre class="sentence mt-6 absolute right-4" v-if="sentence.author">- {{ sentence.author }}</pre>
  </div>
  <div class="p-4 w-fit whitespace-pre" :style="styles" v-else>
    {{ sentence.text }}
  </div>
</template>

<style lang="css" scoped>
.sentence {
  font-family: "궁서체";
  font-size: 1rem;
  font-weight: bold;
}
</style>

<script lang="ts" setup>
import {PropType} from "@vue/runtime-core";
import {Color} from "~/src/model/color"
import {CSSProperties} from "@vue/runtime-dom";
import {join} from "lodash";
import {BackgroundMode} from "~/src/model/background";
import {Sentence} from "~/src/model/sentences"

const props = defineProps({
  sentence: {type: Object as PropType<Sentence>, required: true},
  font: {},
  fontColor: {type: String as PropType<Color>, default: '#FFFFFF'},
  backgroundMode: {type: String as PropType<BackgroundMode>, default: 'COLOR'},
  backgroundColors: {type: Array as PropType<Color[]>, default: '#c9eeeeff' as Color},
  backgroundColorDegree: {type: Number, default: 135},
})

const styles = ref<CSSProperties>({})

watch(
    () => props.backgroundColors,
    updateStyles,
    {immediate: true}
)
watch(
    () => props.backgroundColorDegree,
    updateStyles,
    {immediate: true}
)

function updateStyles() {
  // linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);
  const length = props.backgroundColors?.length
  const converted = props.backgroundColors?.map(color => {
    const [r, g, b, a] = color.toString().match(/\w\w/g)?.map((v) => parseInt(v, 16));
    return `rgba(${r},${g},${b},${a ?? 255})`
  })
  let background
  if (length == 1) {
    background = `${converted}`;
  } else {
    background = `linear-gradient(${props.backgroundColorDegree}deg, ${join(converted, ", ")})`;
  }
  styles.value = {
    color: props.fontColor,
    background: background,
  }
}
</script>
