<template>
  <div class="home container">
    <Preview msg=""></Preview>
    <div id="nbcharacters" style="position:absolute;top:-60px;right:-30px;">{{nbcharacters}} caractères/<span style="margin-right:11px">{{maxcharacters}}</span>
      <v-progress-circular size="60" color="#C44" width="10" rotate="-90" :value="percentagechars"></v-progress-circular>
    </div>

    <textarea-autosize
      placeholder="Le contenu de votre article"
      ref="myTextarea"
      v-model="article"
      :min-height="30"
      :max-height="350"
      @blur.native="onBlurTextarea"
    />
    <div style="margin-top: 20px;" class="columns">
      <div class="column grandeimagecol">
        <div class="helper"></div>
        <div class="drop display-inline align-center" @dragover.prevent @drop="onDrop">
          <div class="helper"></div>
          <div class="helper"></div>
          <label v-if="!image" class="btn display-inline">
            CHOISISSEZ OU GLISSEZ L'IMAGE PRINCIPALE
            <input type="file" name="image" @change="onChange">
          </label>
          <div class="hidden display-inline align-center" v-else v-bind:class="{ 'image': true }">
            <img :src="image" alt="" class="img" />
            <br>
            <br>
            <button class="btn" @click="removeFile">ENLEVER</button>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="helper"></div>
        <div class="drop display-inline align-center" @dragover.prevent @drop="onDrop">
          <div class="helper"></div>
          <div class="helper"></div>
          <label v-if="!image" class="btn display-inline">
            IMAGE 2
            <input type="file" name="image" @change="onChange">
          </label>
          <div class="hidden display-inline align-center" v-else v-bind:class="{ 'image': true }">
            <img :src="image" alt="" class="img" />
            <br>
            <br>
            <button class="btn" @click="removeFile">ENLEVER</button>
          </div>
        </div>
        <div class="helper"></div>
        <div class="drop display-inline align-center" @dragover.prevent @drop="onDrop">
          <div class="helper"></div>
          <div class="helper"></div>
          <label v-if="!image" class="btn display-inline">
            IMAGE 3
            <input type="file" name="image" @change="onChange">
          </label>
          <div class="hidden display-inline align-center" v-else v-bind:class="{ 'image': true }">
            <img :src="image" alt="" class="img" />
            <br>
            <br>
            <button class="btn" @click="removeFile">ENLEVER</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Preview from '@/components/Preview'

export default {
  name: 'Home',
  data: function () {
    return {
      image: '',
      maxcharacters: 1700,
      maxwords: 250,
      article: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vitae urna massa. Morbi vehicula, dolor vitae ultricies luctus, nisl ante maximus enim, vitae posuere purus nulla a risus. Ut volutpat nisl et aliquet consequat. Phasellus ut consequat elit. Suspendisse a dolor sodales, congue felis ac, iaculis nisi. Cras non purus id sapien posuere mattis in laoreet augue. Maecenas eu velit convallis, egestas purus nec, suscipit elit. Mauris sed auctor libero. Pellentesque eget maximus velit.\n' +
        '\n' +
        'Etiam ultrices ac eros quis imperdiet. Nullam semper, leo ac venenatis tincidunt, enim nisl tincidunt sem, nec pharetra mi risus vitae augue. Aliquam molestie urna venenatis est scelerisque interdum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla finibus, diam vel auctor dapibus, ante felis semper lectus, ac elementum ex nisl eu eros. Duis id arcu nisi. Mauris quam odio, fringilla et porttitor eget, commodo elementum lacus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec posuere nisl quis odio finibus facilisis. Mauris et feugiat nibh, condimentum mollis elit. Mauris id massa nisl. Aliquam erat volutpat. Aliquam a posuere tellus.\n' +
        '\n' +
        'Donec ut congue ipsum. '
    }
  },
  components: {
    Preview
  },
  computed: {
    nbcharacters: function () {
      return this.article.length
    },
    percentagechars: function () {
      return Math.round(this.article.length / this.maxcharacters * 100)
    },
    nbwords: function () {
      return (this.article.split(' ').length - 1)
    }
  },
  methods: {
    onDrop: function (e) {
      e.stopPropagation()
      e.preventDefault()
      var files = e.dataTransfer.files
      this.createFile(files[0])
    },
    onChange (e) {
      var files = e.target.files
      this.createFile(files[0])
    },
    createFile (file) {
      if (!file.type.match('image.*')) {
        alert('Select an image')
        return
      }
      var reader = new FileReader()
      var vm = this

      reader.onload = function (e) {
        vm.image = e.target.result
      }
      reader.readAsDataURL(file)
    },
    removeFile () {
      this.image = ''
    }
  }
}
</script>
<style scoped>
  .btn {
    background-color: #d3394c;
    border: 0;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-weight: bold;
    padding: 15px 35px;
    position: relative;
  }

  .btn:hover {
    background-color: #722040;
  }

  input[type="file"] {
    position: absolute;
    opacity: 0;
    z-index: -1;
  }

  .align-center {
    text-align: center;
  }

  .helper {
    height: 100%;
    display: inline-block;
    vertical-align: middle;
    width: 0;
  }

  .hidden {
    display: none !important;
  }

  .hidden.image {
    display: inline-block !important;
  }

  .display-inline {
    display: inline-block;
    vertical-align: middle;
  }

  .img {
    border: 1px solid #f6f6f6;
    display: inline-block;
    height: auto;
    max-height: 80%;
    max-width: 80%;
    width: auto;
  }

  .drop {
    background-color: #f2f2f2;
    background-color: #f6f6f6;
    border-radius: 2px;
    min-height: 150px;
    max-height: 400px;
    max-width: 600px;
    width: 100%;
  }
  .grandeimagecol .drop {
    height: 100%;
    min-height: 300px;
  }
</style>
