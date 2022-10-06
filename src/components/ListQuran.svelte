<script>
    import { fly } from "svelte/transition";
    import { callApi } from "../utils/store";

    import Modal from "./Modal.svelte";
    import Header from "./Header.svelte";

    // Get Data from Localstorage
    let listQuran = localStorage.getItem("surah")
        ? JSON.parse(localStorage.getItem("surah"))
        : [];

    // Push Function
    function addToList(
        number,
        asma_id,
        asma_ar,
        asma_translate_id,
        count,
        type_id,
        tafsir_id
    ) {
        listQuran.push({
            surah_number: number,
            surah_asma_id: asma_id,
            surah_asma_ar: asma_ar,
            translate_id: asma_translate_id,
            count: count,
            type: type_id,
            tafsir: tafsir_id,
        });
        listQuran = listQuran;
    }

    const data = callApi("https://quran-endpoint.vercel.app/quran");

    // Store to localstorage
    data.then((data) => {
        if (localStorage.getItem("surah") === null) {
            for (let i = 0; i < 114; i++) {
                addToList(
                    data.data[i].number,
                    data.data[i].asma.id.short,
                    data.data[i].asma.ar.short,
                    data.data[i].asma.translation.id,
                    data.data[i].ayahCount,
                    data.data[i].type.id,
                    data.data[i].tafsir.id
                );
            }
            localStorage.setItem("surah", JSON.stringify(listQuran));
        }
    });

    let search = "";

    function Notif() {
        Swal.fire({
            icon: "info",
            title: "Akan Datang",
            text: "Fitur sedang dalam pengembangan, harap bersabar ya.",
        });
    }
</script>

<Header {search}>
    <svelte:fragment slot="footer">
        <form on:submit|preventDefault={Notif} method="post">
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
                <button class="btn btn-secondary" type="submit" id="btn_cari"
                    >Cari</button
                >
            </div>
        </form>
    </svelte:fragment>
</Header>

<div
    in:fly={{ y: -50, duration: 450, delay: 550 }}
    out:fly={{ y: -50, duration: 450 }}
>
    {#if listQuran === null}
        <section class="py-3 text-center">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <img src="./loader.svg" alt="Loader" />
                    </div>
                </div>
            </div>
        </section>
    {:else}
        <section id="list" class="py-1">
            <div class="container">
                <div class="row">
                    {#each listQuran as surah}
                        <div class="col-lg-4 col-md-6 col-12">
                            <div class="card">
                                <div class="card-body">
                                    <h1 class="title">
                                        <span class="number"
                                            >{surah.surah_number}</span
                                        >
                                        {surah.surah_asma_id}
                                        ({surah.surah_asma_ar})
                                    </h1>
                                    <p class="arti">
                                        "{surah.translate_id}"
                                    </p>
                                    <p class="info">
                                        {surah.count} Ayat | {surah.type}
                                    </p>
                                    <a
                                        href="/surah/{surah.surah_number}"
                                        class="btn btn-baca">Baca Surah</a
                                    >
                                    <button
                                        type="button"
                                        class="btn btn-tafsir"
                                        data-bs-toggle="modal"
                                        data-bs-target="#tafsirModal{surah.surah_number}"
                                        >Tafsir</button
                                    >
                                    <Modal
                                        title={surah.surah_asma_id}
                                        tafsir={surah.tafsir}
                                        id={surah.surah_number}
                                    />
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        </section>
    {/if}
</div>

<style>
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

    .btn-secondary {
        background: #232946;
        color: #ffffff;
        border: none;
        padding: 0 1.3rem;
    }

    @media (max-width: 767.98px) {
        .input-group {
            margin: 1rem 0;
        }
    }
</style>
