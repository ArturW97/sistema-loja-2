<template>
  <div class="TicketPedido">
    <div class="container">
      <div class="row">
        <div class="ticket">
          <div>Código: {{ produtoId }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TicketPedido",
  props: {
    produtoId: String,
    clienteCPF: String,
    valorTotal: String,
    valorUnitario: String,
  },
};
</script>
<style>
</style>