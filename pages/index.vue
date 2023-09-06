<template>
  <n-layout class="p-4">
    <n-page-header title="좋은 글" subtitle="이미지로 만들기" @back="handleBack">
      <template #extra>
        <n-button @click="randomSentence">
          <n-icon>
            <refresh-icon></refresh-icon>
          </n-icon>
        </n-button>
      </template>
      <template #default>
        <div>

          <client-only>
            <sentence-renderer
                ref="renderer"
                v-model:sentence="sentence"
                :font-color="fontColor"
                :background-colors="backgroundColors"
                :background-color-degree="backgroundColorDegree"
            ></sentence-renderer>
          </client-only>

          <n-button class="mt-4" block type="default" @click="saveToImage">
            다운로드
          </n-button>

          <n-button class="mt-4" block type="default" @click="shareToImage" v-if="canShare">
            공유하기
          </n-button>

          <sentence-input-sentence
              class="mt-4"
              v-model:value="sentence.text"
          ></sentence-input-sentence>

          <sentence-input-author
              class="mt-4"
              v-model:value="sentence.author"
          ></sentence-input-author>

          <background-color-picker
              class="mt-4"
              v-model:colors="backgroundColors"
          ></background-color-picker>

          <background-color-degrees
              class="mt-4"
              v-show="backgroundColors.length > 1"
              v-model:value="backgroundColorDegree"
          ></background-color-degrees>

        </div>
      </template>
    </n-page-header>
  </n-layout>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts" setup>
import {Sentence, sentences} from "~/src/model/sentences";
import {Color} from "~/src/model/color"
import {Refresh as RefreshIcon} from "@vicons/ionicons5"
import {useDialog} from "naive-ui"
import SentenceRenderer from "~/components/sentence-renderer.vue";
import SentenceInputSentence from "~/components/sentence-input-sentence.vue";
import SentenceInputAuthor from "~/components/sentence-input-author.vue";
import BackgroundColorPicker from "~/components/background-color-picker.vue";
import BackgroundColorDegrees from "~/components/background-color-degrees.vue";
import html2canvas from "html2canvas";

const router = useRouter()

const renderer = ref(null)
const dialog = useDialog()
const sentence = ref<Sentence>({author: '', text: ''})
const fontColor = ref<Color>('#333333ff')
const backgroundColors = ref<Color[]>(['#d2efefff' as Color, '#DDB8DAFF' as Color])
const backgroundColorDegree = ref<number>(135)
const canShare = ref(false)


onMounted(() => {
  randomSentence();
  canShare.value = navigator.canShare !== undefined
})

function randomSentence() {
  const ranNum = Math.floor(Math.random() * sentences.length)
  sentence.value = sentences[ranNum]
}

function handleBack() {
  router.back()
}

async function saveToImage() {
  if (renderer.value === null) return;
  const canvas = await html2canvas(renderer.value!.$el)
  const link = document.createElement("a");
  link.download = name;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

async function shareToImage() {
  if (renderer.value === null) return;
  const canvas = await html2canvas(renderer.value!.$el)
  canvas.toBlob((blob?: Blob | null) => {
    if (blob === undefined || blob == null) {
      dialog.error({
        title: '오류',
        content: '현재 브라우저에서는 저장 할 수 없습니다.'
      })
      return
    }
    const filesArray = [
      new File(
          [blob],
          'goodtext.jpg',
          {
            type: "image/png",
            lastModified: new Date().getTime()
          }
      )
    ];
    const shareData = {
      files: filesArray,
    };
    window.navigator.share(shareData);
  })
}
</script>
