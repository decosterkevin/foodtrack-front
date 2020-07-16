<template>
  <div>
    <client-only>
    </client-only>
    <Navbar class="navbar"/>
    <nuxt/>
    <Footer/>
  </div>
</template>
<script>
import Navbar from '~/components/layout/Navbar'
import Footer from '~/components/layout/Footer'
export default {
  components: {
    Navbar,
    Footer
  }
}
</script>
<style>
.navbar {
  position: fixed;
  width: 100vw;
  top: 0;
  left: 0;
}
</style>
