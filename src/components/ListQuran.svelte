<script>
    import Modal from "../components/Modal.svelte";
    const list = (async () => {
        const response = await fetch("https://quran-endpoint.vercel.app/quran");
        return await response.json();
    })();
</script>

{#await list}
    <section class="py-3 text-center">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <img src="./loader.svg" alt="Loader" />
                </div>
            </div>
        </div>
    </section>
{:then data}
    <section id="list" class="py-1">
        <div class="container">
            <div class="row">
                {#each data.data as surah}
                    <div class="col-lg-4 col-md-6 col-12">
                        <div class="card">
                            <div class="card-body">
                                <h1 class="title">
                                    <span class="number">{surah.number}</span>
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
                {/each}
            </div>
        </div>
    </section>
{:catch error}
    <p>{error}</p>
{/await}

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
</style>
