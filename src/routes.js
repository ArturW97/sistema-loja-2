import VueRouter from "vue-router";
import Home from "./pages/Home.vue";
import ProdutoDetalhe from "./pages/ProdutoDetalhe.vue";
import Pedidos from "./pages/Pedidos.vue"

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/produto-detalhe", component: ProdutoDetalhe, name: "produto-detalhe" },
  { path: "/produto-detalhe/:id", component: ProdutoDetalhe, name: "produto-detalhe-id"},
  { path: "/pedidos", component: Pedidos, name: "pedidos"}
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router;