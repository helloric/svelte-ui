<h1>Test PUSH!!</h1>
<!--Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation-->
<script>
    let isHappy = false;
  
    function toggleMood() {
      isHappy = !isHappy;
    }
  </script>
  
  <button on:click={toggleMood}>
    {#if isHappy}
      😊 <!-- Happy face emoji -->
    {:else}
      🙂 <!-- Slightly smiling face emoji -->
    {/if}
  </button>
  
  <style>
    button {
      font-size: 2rem;
      padding: 0.5rem 1rem;
      cursor: pointer;
    }
  </style>
  