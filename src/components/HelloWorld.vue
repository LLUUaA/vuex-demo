<template>
  <div class="hello">
    <h1>{{ msg }} {{num}} {{name}}</h1>
    <h1>{{ msg2 }}</h1>

    <button @click="updateValue()">update</button>
    <Bar name="nav"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Bar from './bar'

export default {
  name: "HelloWorld",
  components : {
  Bar
  },
  data() {
    return {
      msg: "Welcome",
      msg2: "5"
    };
  },

  mounted() {
    setTimeout(() => {
      // this.$store.dispatch('updateValue',{});
    }, 1000);

    this.msg2 = this.$store.getters.getState("name");
  },

  created() {},

  computed: {
    ...mapGetters({
      num: "num",
      name: "name"
    })
  },

  methods: {
    ...mapActions({
      updateValue: "updateValue"
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
