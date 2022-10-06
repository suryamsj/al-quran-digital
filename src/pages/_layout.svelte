<script>
    import Navbar from "../components/Navbar.svelte";
    import Footer from "../components/Footer.svelte";
    import { onMount } from "svelte";

    onMount(() => {
        let buttonTop = document.querySelector(".top");

        buttonTop.onclick = () =>
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        window.onscroll = () =>
            window.scrollY > 500
                ? (buttonTop.style.opacity = 1)
                : (buttonTop.style.opacity = 0);
    });
</script>

<!-- routify:options preload="proximity" -->
<Navbar />
<main class="flex-shrink-0">
    <slot />
</main>
<!-- Start TOP -->
<a href="#top" class="top"><i class="bi bi-caret-up-fill" /></a>
<!-- End TOP -->
<Footer />
