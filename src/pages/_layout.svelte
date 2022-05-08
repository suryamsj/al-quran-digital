<script>
    import Navbar from "../components/Navbar.svelte";
    import Footer from "../components/Footer.svelte";
</script>

<!-- routify:options preload="proximity" -->
<!-- Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
    href="https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&family=Poppins:wght@400;600&display=swap"
    rel="stylesheet"
/>

<!-- CSS -->
<link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
    crossorigin="anonymous"
/>

<Navbar />
<main class="flex-shrink-0">
    <slot />
</main>
<Footer />
