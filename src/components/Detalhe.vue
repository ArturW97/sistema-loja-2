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
          <div v-if="bloco === false" @click="mostrarBloco">
            <button>Fazer Pedido</button>
          </div>
          <div v-else @click="mostrarBloco"><button>Fazer Pedido</button><hr/></div>
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
      preco: 100,
      total: 0,
      produto: {},
      bloco: false,
    };
  },
  methods: {
    toCalculate: function () {
      this.finalQuantity = this.quantity;

      if (this.quantity === "") {
        this.finalQuantity = 1;
      }

      const total = parseFloat(this.produto.price) * this.finalQuantity;
      this.total = total.toFixed(2);
    },

    getNovoProduto: async function () {
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
    mostrarBloco: function () {
      if (this.bloco === true) {
        this.bloco = false;
      } else {
        this.bloco = true;
      }
      console.log(this.bloco);
    },
  },
  created: function () {
    this.getNovoProduto();
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
}
</style>