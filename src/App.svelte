<script>
  import { Router } from "@roxi/routify";
  import { routes } from "../.routify/routes";
  import Navbar from "./components/Navbar.svelte";
  import Footer from "./components/Footer.svelte";
</script>

<Navbar />
<main class="flex-shrink-0">
  <Router {routes} />
</main>
<Footer />
