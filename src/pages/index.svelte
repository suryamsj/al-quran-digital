<script>
    import { fly } from "svelte/transition";
    import { listSurah } from "../utils/store";
    import { onMount } from "svelte";

    import Modal from "../components/Modal.svelte";
    import Header from "../components/Header.svelte";
    import axios from "axios";
    import Gambar from "../image/404.svg";

    onMount(async () => {
        $listSurah = await getSurah();
    });

    // Get Surah
    const getSurah = async () => {
        const response = await axios.get(
            `https://quran-endpoint.vercel.app/quran`
        );
        return await response.data.data;
    };

    let search = "";
    $: searchSurah = $listSurah.filter((surahlist) => {
        return surahlist.asma.id.short.toLowerCase().includes(search);
    });
</script>

<Header {search}>
    <svelte:fragment slot="footer">
        <div class="input-group">
            <span class="input-group-text" id="cari"
                ><i class="bi bi-search" /></span
            >
            <input
                type="text"
                name="cari"
                id="cari"
                class="form-control"
                placeholder="Cari surah"
                aria-label="Username"
                aria-describedby="cari"
                bind:value={search}
            />
        </div>
    </svelte:fragment>
</Header>

<div
    in:fly={{ y: -50, duration: 450, delay: 550 }}
    out:fly={{ y: -50, duration: 450 }}
>
    {#if searchSurah === null}
        <section class="py-3 text-center">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-12">
                        <div class="not-found text-center">
                            <img src={Gambar} alt="404" />
                            <h3>Surah tidak ditemukan</h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    {:else}
        <section id="list" class="py-1">
            <div class="container">
                <div class="row">
                    {#each searchSurah as surah}
                        <div class="col-lg-4 col-md-6 col-12">
                            <div class="card">
                                <div class="card-body">
                                    <h1 class="title">
                                        <span class="number"
                                            >{surah.number}</span
                                        >
                                        {surah.asma.id.short}
                                        ({surah.asma.ar.short})
                                    </h1>
                                    <p class="arti">
                                        "{surah.asma.translation.id}"
                                    </p>
                                    <p class="info">
                                        {surah.ayahCount} Ayat | {surah.type.id}
                                    </p>
                                    <a
                                        href="/surah/{surah.number}"
                                        class="btn btn-baca">Baca Surah</a
                                    >
                                    <button
                                        type="button"
                                        class="btn btn-tafsir"
                                        data-bs-toggle="modal"
                                        data-bs-target="#tafsirModal{surah.number}"
                                        >Tafsir</button
                                    >
                                    <Modal
                                        title={surah.asma.id.short}
                                        tafsir={surah.tafsir.id}
                                        id={surah.number}
                                    />
                                </div>
                            </div>
                        </div>
                    {:else}
                        <div class="col-lg-12 col-md-12 col-12">
                            <div class="not-found text-center">
                                <img src={Gambar} alt="404" />
                                <h3>Surah tidak ditemukan</h3>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        </section>
    {/if}
</div>

<style>
    .not-found img {
        width: 30%;
        height: auto;
    }
    img {
        width: 50px;
        height: auto;
    }
    .btn-baca {
        background: #232946;
        font-family: "Nunito", sans-serif;
        border-radius: 8px;
        border: 2px solid #232946;
        color: #fffffe;
        font-weight: 800;
        font-size: 1rem;
        padding: 10px 20px;
        cursor: pointer;
        transition: 0.3s ease-in-out;
    }

    .btn-baca:hover {
        background: #fffffe;
        color: #232946;
        border: 2px solid #232946;
    }

    .btn-tafsir {
        background: #b8c1ec;
        font-family: "Nunito", sans-serif;
        border-radius: 8px;
        border: 2px solid #b8c1ec;
        color: #232946;
        font-weight: 800;
        font-size: 1rem;
        padding: 10px 20px;
        cursor: pointer;
        transition: 0.3s ease-in-out;
    }

    .btn-tafsir:hover {
        background: #fffffe;
        color: #232946;
        border: 2px solid #232946;
    }

    .input-group-text {
        background: #232946;
        padding: 0 1.3rem;
        color: #ffffff;
        border: none;
    }

    input {
        border: 2px solid #232946 !important;
    }

    input:hover {
        border: 2px solid #232946;
    }

    input:focus,
    input:active,
    input:hover,
    input {
        outline: none !important;
        box-shadow: none !important;
    }

    section {
        min-height: 100vh;
    }

    @media (max-width: 767.98px) {
        .input-group {
            margin: 1rem 0;
        }
    }
</style>
