<script lang="ts" setup>
import Link from '~/components/Link.vue'
</script>

<template>
  <div class="layout">
    <div class="navigation">
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
    </div>
    <div class="content"><slot /></div>
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: sans-serif;
}
* {
  box-sizing: border-box;
}
a {
  text-decoration: none;
}
</style>

<style scoped>
.layout {
  display: flex;
  max-width: 900px;
  margin: auto;
}
.content {
  padding: 20px;
  border-left: 2px solid #eee;
  padding-bottom: 50px;
  min-height: 100vh;
}
.navigation {
  padding: 20px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.8em;
}
.logo {
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
