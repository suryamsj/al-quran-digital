<script>
    function Notif() {
        Swal.fire({
            icon: "info",
            title: "Akan Datang",
            text: "Fitur sedang dalam pengembangan, harap bersabar ya.",
        });
    }
</script>

<header class="py-5">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-lg-4 col-md-4 col-12">
                <h1>Al-Qur'an Digital</h1>
                <h3>Daftar Surah</h3>
            </div>
            <div class="col-lg-8 col-md-8 col-12">
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
                        />
                        <button
                            class="btn btn-secondary"
                            type="submit"
                            id="btn_cari">Cari</button
                        >
                    </div>
                </form>
            </div>
        </div>
    </div>
</header>

<style>
    .input-group-text {
        background: #232946;
        padding: 0 1.3rem;
        color: #ffffff;
        border: none;
    }

    input {
        border: 2px solid #232946;
    }

    input:hover {
        border: 2px solid #232946;
    }

    input:focus,
    input:active,
    input:hover {
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
        h1,
        h3 {
            text-align: center;
        }

        .input-group {
            margin: 1rem 0;
        }
    }
</style>
