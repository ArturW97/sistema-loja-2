<template>
  <div class="TicketPedido">
    <div class="container">
      <div class="row">
        <div class="ticket">
          <div class="valor">Código: {{ produtoId }}</div>
          <div class="valor">CPF do cliente: {{ clienteCPF }}</div>
          <div class="valor">Valor Unitário: R$ {{ valorUnitario }}</div>
          <div class="valor">Valor total: R$ {{ ValorTotal }}</div>
          <div class="valor">Quantidade: {{ quantidade }}</div>
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
    valorUnitario: String,
    ValorTotal: String,
    quantidade: Number
  },
};
</script>
<style>
.ticket{
  background-color: rgb(208, 208, 208);
  width: 950px;
  padding: 10px;
  margin: 10px;
  border: solid;
}
.ticket .valor{
  margin: 5px 0px 5px 10px;
}
</style>