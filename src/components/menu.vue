<template>
  <div>
    <sidebar-menu
      @toggle-collapse="onToggleCollapse"
      :menu="menu"
      :collapsed="collapsed"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["menu", "collapsed"])
  },
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize);
  },
  methods: {
    onToggleCollapse(collapsed) {
      if (collapsed) {
        document.getElementById("wrapper").style.marginLeft = "50px";
        if (window.innerWidth > 767) {
          document.getElementById("wrapper").style.paddingRight = "50px";
        }
      } else {
        document.getElementById("wrapper").style.marginLeft = "350px";
        if (window.innerWidth > 767) {
          document.getElementById("wrapper").style.paddingRight = "350px";
        }
      }
    },
    onResize() {
      if (window.innerWidth <= 767) {
        this.$store.dispatch("setCollapsed", true);
        document.getElementById("wrapper").style.marginLeft = "50px";
        document.getElementById("wrapper").style.paddingRight = "50px";
      } else {
        this.$store.dispatch("setCollapsed", false);
        document.getElementById("wrapper").style.marginLeft = "350px";
        document.getElementById("wrapper").style.paddingRight = "350px";
      }
    }
  }
};
</script>

<style scoped>
.collapsed {
  padding-left: 50px;
}
</style>
