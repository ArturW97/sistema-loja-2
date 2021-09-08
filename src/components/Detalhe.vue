<template>
  <section class="detalhe">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h2>Detalhe do Produto</h2>
          <img :src="produto.img" />
        </div>
        <div class="col-md-9">
          <h2>{{ produto.title }}</h2>
          <p>{{ produto.price }}</p>
        </div>
        <div class="col-md-3">
          <div class="detalhe__box-price">
            <p>Quantidade</p>
            <input @input="toCalculate" type="number" v-model="quantity" />
          </div>
        </div>
        <div class="col-md-12">
          <hr />
          <h3>Descrição:</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. Lorem Ipsum is simply dummy text of
            the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged
          </p>
          <h4>
            Total : {{ finalQuantity }} * {{ produto.price }} =
            {{ total.toString().replace(".", ",") }}
          </h4>
        </div>
        <div class="col-md-12">
          <button v-on:click="alternanciaBloco">Fazer Pedido</button>
          <div v-show="bloco">
            <hr />
            <h3>Novo Pedido</h3>
            <span>CPF Cliente:</span>
            <input class="cpfCliente" v-model="procurarCPF" />
            <button class="buscar" v-on:click="getClienteByCPF">Buscar</button>
            <div v-if="clienteCPF.length == 11">
              <div class="dadosCliente">
                Nome Completo: {{ nome + " " + sobrenome }}
              </div>
              <div class="dadosCliente">CPF: {{ clienteCPF }}</div>
              <div class="dadosCliente">
                Data de Nascimento: {{ dataNascimento }}
              </div>
              <hr />
              <button v-on:click="salvarPedido">Salvar pedido</button>
            </div>
          </div>
          <div v-show="mensagemSucesso" class="mensagemSucesso">
            {{ message }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "Detalhe",
  data: function () {
    return {
      quantity: 1,
      finalQuantity: 1,
      total: 0,
      produto: {},

      procurarCPF: "",
      nome: "",
      sobrenome: "",
      dataNascimento: "",

      bloco: false,
      mensagemSucesso: false,
      message: "",

      produtoId: "",
      clienteCPF: "",
      valorTotal: "",
      valorUnitario: "",
    };
  },
  methods: {
    toCalculate: function () {
      this.finalQuantity = this.quantity;

      if (this.quantity === "" || this.quantity <= 0) {
        this.finalQuantity = 1;
      }
      const total = parseFloat(this.produto.price).toFixed(2) * this.finalQuantity;
      this.total = total.toFixed(2);
    },

    getProduto: async function () {
      const result = await fetch(
        "http://localhost:3000/produtos/" + this.$route.params.id
      )
        .then((res) => res.json())
        .catch((error) => {
          return {
            error: true,
            message: error,
          };
        });
      if (!result.error) {
        this.produto = result;
      }
    },

    alternanciaBloco: function (){
      this.bloco = !this.bloco
      this.mensagemSucesso = false
    },

    getClienteByCPF: async function () {
      const result = await fetch(
        "http://localhost:3000/clientes/busca/" + this.procurarCPF
      )
        .then((res) => res.json())
        .catch((error) => {
          return {
            error: true,
            message: error,
          };
        });
      if (!result.error) {
        this.nome = result.nome;
        this.sobrenome = result.sobrenome;
        this.dataNascimento = result.dataNascimento;
        this.clienteCPF = result.CPF;
      }
    },

    salvarPedido: async function () {
      this.bloco = false
      const newPedido = {
        produtoId: this.produto._id,
        clienteCPF: this.clienteCPF,
        ValorTotal: this.total,
        valorUnitario: this.produto.price,
        quantidade: this.quantity,
      };

      const result = await fetch("http://localhost:3000/pedidos", {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(newPedido),
      })
        .then((res) => res.json())
        .then((res) => res)
        .catch((error) => {
          return {
            error: true,
            message: error,
          };
        });

      if (!result.error) {
        (this.message = "Pedido cadastrado com sucesso."),
          (this.mensagemSucesso = true),
          (this.clienteCPF = ""),
          (this.procurarCPF = "");
      }
    },
  },
  created: function () {
    this.getProduto();
  },

  computed: {
    produtosFiltrados: function () {
      const produto = this.produto;
      return produto;
    },
  },
};
</script>
<style>
.detalhe {
  padding: 50px 0px;
}

.detalhe img {
  margin: 20px auto;
  display: block;
}

.detalhe__box-price {
  text-align: right;
  font-weight: bold;
}

.detalhe input {
  width: 50px;
  height: 30px;
  border-radius: 4px;
  padding: 0px 8px;
}

.detalhe button {
  width: 170px;
  height: 40px;
  border-radius: 6px;
  background-color: #ae382b;
  color: #f5a022;
  border: none;
  font-weight: bold;
  display: block;
  margin: 30px auto;
  cursor: pointer;
}

.detalhe .cpfCliente {
  width: 290px;
  margin-left: 20px;
}

.detalhe .buscar {
  margin: 0;
  width: 100px;
  display: inline;
}
.detalhe .dadosCliente {
  margin: 10px 10px 10px 0;
}
.detalhe .mensagemSucesso {
  margin-top: 30px;
}
</style>
