<script lang="ts">
  import { endpoints } from "./constants";

  async function fetchData(path: string) {
    try {
      const res = await fetch(
        `https://v6.exchangerate-api.com/v6/f2a57241ccda24b044173b2b${path}`
      );
      const data = await res.json();

      return data;
    } catch (e) {
      console.error(e);
    }
  }

  let valueIn: number;
  let valueOut: number;

  const onChangeInput = (e: Event) => {
    const target = e.target as HTMLInputElement;

    if (target.id === "in") {
      const inpOutEl = document.getElementById("out") as HTMLInputElement;

      target.dataset.lastModified = "true";
      inpOutEl.dataset.lastModified = "false";
    } else {
      const inpInEl = document.getElementById("in") as HTMLInputElement;

      target.dataset.lastModified = "true";
      inpInEl.dataset.lastModified = "false";
    }
  };

  const onSubmitForm = async (e: Event) => {
    const inOptionEl = document.getElementById("inOption") as HTMLSelectElement;
    const outOptionEl = document.getElementById(
      "outOption"
    ) as HTMLSelectElement;
    const inpInEl = document.getElementById("in") as HTMLInputElement;
    const inpOutEl = document.getElementById("out") as HTMLInputElement;

    if (inOptionEl.value && outOptionEl.value) {
      if (valueIn || valueOut) {
        if (inpInEl.dataset.lastModified === "true") {
          const data = await fetchData(
            endpoints.convert(
              inOptionEl.value,
              outOptionEl.value,
              valueIn.toString()
            )
          );
          inpOutEl.value = await data.conversion_result.toFixed(2);
        } else {
          const data = await fetchData(
            endpoints.convert(
              outOptionEl.value,
              inOptionEl.value,
              valueOut.toString()
            )
          );

          inpInEl.value = await data.conversion_result.toFixed(2);
        }
      }
    }
  };
</script>

<main>
  <form on:submit|preventDefault|stopPropagation={onSubmitForm}>
    {#await fetchData(endpoints.codes) then data}
      <div>
        <input
          id="in"
          type="number"
          min="0"
          step=".01"
          placeholder="1.234"
          on:change={onChangeInput}
          bind:value={valueIn}
        />
        <select id="inOption">
          <option value="">--Please choose an option--</option>
          {#each data.supported_codes as code}
            <option value={code[0]}>{code[0]}</option>
          {/each}
        </select>
      </div>

      <div>
        <input
          id="out"
          type="number"
          min="0"
          step=".01"
          placeholder="2.468"
          on:change={onChangeInput}
          bind:value={valueOut}
        />
        <select id="outOption">
          <option value="">--Please choose an option--</option>
          {#each data.supported_codes as code}
            <option value={code[0]}>{code[0]}</option>
          {/each}
        </select>
      </div>
    {/await}

    <button>submit</button>
  </form>
</main>

<style>
</style>
