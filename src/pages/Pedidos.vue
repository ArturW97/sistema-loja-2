<template>
  <div class="Pedidos">
    <Header />
    <main>
      <TicketPedido />
    </main>
    <Footer />
  </div>
</template>
<script>
import Header from "../components/Header.vue";
import TicketPedido from "../components/TicketPedido.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "Pedidos",
  components: {
    Header,
    TicketPedido,
    Footer,
  },
};
</script>
<style>
</style>