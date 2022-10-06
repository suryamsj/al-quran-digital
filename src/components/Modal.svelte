<script>
    export let title;
    export let tafsir;
    export let id;
</script>

<div
    class="modal fade"
    id="tafsirModal{id}"
    tabindex="-1"
    aria-labelledby="tafsirModal{id}Label"
    aria-hidden="true"
>
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="tafsirModal{id}Label">{title}</h5>
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                />
            </div>
            <div class="modal-body">{tafsir}</div>
        </div>
    </div>
</div>
