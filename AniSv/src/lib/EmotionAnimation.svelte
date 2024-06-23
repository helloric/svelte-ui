<script>
    import { onMount, afterUpdate } from 'svelte';
  
  
    const emotionVideos = {
      neutral: "/animations/neutral.mp4",
      happy: "/animations/happy.mp4",
      sad: "/animations/sad.mp4"
    };
  
    // @ts-ignore
    let videoElement;
  
    onMount(() => {
      // @ts-ignore
      if (videoElement) {
        videoElement.load();
      }
    });
  
    afterUpdate(() => {
      // @ts-ignore
      if (videoElement) {
        videoElement.load();
      }
    });
  </script>
