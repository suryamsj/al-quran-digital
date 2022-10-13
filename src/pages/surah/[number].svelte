<script>
    import { fly } from "svelte/transition";
    import axios from "axios";

    export let number;

    const getSurah = async () => {
        const response = await axios.get(
            `https://quran-endpoint.vercel.app/quran/${number}`
        );
        return await response.data;
    };
    const list = getSurah();
</script>

<div
    in:fly={{ y: -50, duration: 450, delay: 550 }}
    out:fly={{ y: -50, duration: 450 }}
>
    {#await list}
        <section class="py-3 text-center">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <img src="../loader.svg" alt="Loader" />
                    </div>
                </div>
            </div>
        </section>
    {:then data}
        <section id="list" class="py-1">
            <div class="container">
                <div class="row text-center">
                    <div class="col-lg-12 col-md-12 col-12">
                        <h1 class="title-bismillah">
                            {#if data.data.preBismillah !== null}
                                {data.data.preBismillah.text.ar}
                            {/if}
                        </h1>
                        <p class="bismillah">
                            {#if data.data.preBismillah !== null}
                                {data.data.preBismillah.text.read}
                            {/if}
                        </p>
                    </div>
                </div>
                <div class="row">
                    {#each data.data.ayahs as ayat}
                        <div class="col-lg-12 col-md-12 col-12">
                            <div class="card">
                                <div class="card-body">
                                    <h1 class="title-surat">
                                        <span>{ayat.text.ar}</span>
                                        <p>{ayat.text.read}</p>
                                    </h1>
                                    <p class="translate">
                                        <span class="number-ayat"
                                            >{ayat.number.insurah}</span
                                        >{ayat.translation.id}
                                    </p>
                                    <audio controls src={ayat.audio.url}>
                                        Your browser does not support the
                                        <code>audio</code> element.
                                    </audio>
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
</div>

<style>
    img {
        width: 50px;
        height: auto;
    }

    audio {
        width: 300px;
        height: 54px;
    }
</style>
