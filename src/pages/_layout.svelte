<script>
    import Navbar from "../components/Navbar.svelte";
    import Footer from "../components/Footer.svelte";
</script>

<!-- routify:options preload="proximity" -->
<Navbar />
<main class="flex-shrink-0">
    <slot />
</main>
<Footer />
