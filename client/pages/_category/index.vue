<template>
  <div class="category">{{$route.params.category}}</div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    console.log(this.$route.params);
  }
};
</script>