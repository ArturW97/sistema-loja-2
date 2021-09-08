<template>
  <div class="Pedidos">
    <Header />
    <main>
      <div class="container"><h2>Todos os Pedidos</h2></div>

      <div v-for="pedido in pedidos" :key="pedido._id">
        <TicketPedido
          :produtoId="pedido.produtoId"
          :clienteCPF="pedido.clienteCPF"
          :valorUnitario="parseFloat(pedido.valorUnitario).toFixed(2)"
          :ValorTotal="parseFloat(pedido.ValorTotal).toFixed(2)"
          :quantidade="parseFloat(pedido.quantidade)"
        />
      </div>
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
  data: function () {
    return {
      pedidos: [],
    };
  },
  methods: {
    getPedidos: async function () {
      const result = await fetch("http://localhost:3000/pedidos")
        .then((res) => res.json())
        .catch((error) => {
          return {
            error: true,
            message: error,
          };
        });
      if (!result.error) {
        this.pedidos = result;
      }
    },
  },
  created: function () {
    this.getPedidos();
  },
};
</script>
<style>
</style>