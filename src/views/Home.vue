<template>
  <div class="home container" style="padding-top: 20px;">
    <Preview msg=""></Preview>
    <div id="nbcharacters" style="position:absolute;top:-100px;right:10px;width:270px;">
      <div style="position:relative;top:60px;left:0;width:200px;">
        {{nbcharacters}} caractères/<span style="margin-right:11px">{{maxcharacters}}</span>
        <br/>
        <small style="color:gray;">{{nbwords}} mots/{{maxwords}}</small>
      </div>
      <v-progress-circular size="60" :color="progressColor" width="10" rotate="-90" :value="percentagechars"></v-progress-circular>
    </div>

    <p v-if="percentagechars > 100" class="is-danger has-text-left-desktop"
       style="padding:10px 20px;margin-bottom:10px;background-color:#d3394c;border-radius: 6px;color:white">
      Votre texte est long, merci de le raccourcir.
    </p>
    <ckeditor :editor="editor" v-model="trimmedArticle" :config="editorConfig"></ckeditor>
    <div style="margin-top: 20px;" class="columns">
      <div class="column grandeimagecol">
        <div class="drop display-inline align-center" @dragover.prevent @drop="onDrop">
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
        <div class="drop display-inline align-center" @dragover.prevent @drop="onDrop">
          <label v-if="!image2" class="btn display-inline">
            IMAGE 2
            <input type="file" name="image2" @change="onChange2">
          </label>
          <div class="hidden display-inline align-center" v-else v-bind:class="{ 'image': true }">
            <img :src="image2" alt="" class="img" />
            <br>
            <br>
            <button class="btn" @click="removeFile2">ENLEVER</button>
          </div>
        </div>
        <div class="drop display-inline align-center" @dragover.prevent @drop="onDrop">
          <label v-if="!image3" class="btn display-inline">
            IMAGE 3
            <input type="file" name="image3" @change="onChange3">
          </label>
          <div class="hidden display-inline align-center" v-else v-bind:class="{ 'image': true }">
            <img :src="image3" alt="" class="img" />
            <br>
            <br>
            <button class="btn" @click="removeFile3">ENLEVER</button>
          </div>
        </div>
      </div>
    </div>
    <button class="button is-info">Envoyer</button>
  </div>
</template>

<script>
// @ is an alias to /src
import Preview from '@/components/Preview'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default {
  name: 'Home',
  data: function () {
    return {
      image: '',
      image2: '',
      image3: '',
      maxcharacters: 1700,
      maxwords: 250,
      article: 'Saisissez ou copiez-coller dans cette zone le texte de votre article. ',
      editor: ClassicEditor,
      editorData: '<p>Content of the editor.</p>',
      editorConfig: {
        toolbar: ['bold', 'italic', 'bulletedList'],
        extraPlugins: ''
        // The configuration of the editor.
      }
    }
  },
  components: {
    Preview
  },
  computed: {
    trimmedArticle:
    {
      get () {
        return this.article.slice(0, Math.round(this.maxcharacters * 1.03))
      },
      set (value) {
        this.article = value.slice(0, Math.round(this.maxcharacters * 1.03))
      }
    },
    nbcharacters: function () {
      return this.article.length
    },
    percentagechars: function () {
      return Math.round(this.article.length / this.maxcharacters * 100)
    },
    nbwords: function () {
      return (this.article.split(' ').length - 1)
    },
    progressColor: function () {
      if (this.percentagechars < 40) {
        return '#ffffff'
      } else if (this.percentagechars < 90) {
        return '#55bb55'
      } else if (this.percentagechars <= 100) {
        return '#ff7f00'
      } else {
        return '#ff3300'
      }
    },
    actionUpdate: function () {
      console.log('update')
      return true
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
    onChange2 (e) {
      var files = e.target.files
      this.createFile2(files[0])
    },
    onChange3 (e) {
      var files = e.target.files
      this.createFile3(files[0])
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
    createFile2 (file) {
      if (!file.type.match('image.*')) {
        alert('Select an image')
        return
      }
      var reader = new FileReader()
      var vm = this

      reader.onload = function (e) {
        vm.image2 = e.target.result
      }
      reader.readAsDataURL(file)
    },
    createFile3 (file) {
      if (!file.type.match('image.*')) {
        alert('Select an image')
        return
      }
      var reader = new FileReader()
      var vm = this

      reader.onload = function (e) {
        vm.image3 = e.target.result
      }
      reader.readAsDataURL(file)
    },
    removeFile () {
      this.image = ''
    },
    removeFile2 () {
      this.image2 = ''
    },
    removeFile3 () {
      this.image3 = ''
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
