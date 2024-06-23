<script>
  // Array mit Video-URLs
  const videoUrls = [
    '/animations/neutral.mp4',
    '/animations/sad.mp4',
    '/animations/angry.mp4',
    '/animations/happy.mp4',
    '/animations/sad.mp4',
  ];
  
  // Variable für den aktuellen Video-Index
  let currentIndex = 0;
  
  // Variable für die aktuelle Video-Quelle
  let src = videoUrls[currentIndex];
  
  // Funktion zum Wechseln des Videos
  function changeVideo() {
    currentIndex = (currentIndex + 1) % videoUrls.length;
    src = videoUrls[currentIndex];
  }
</script>

<!-- Video-Tag -->
<video {src} autoplay loop muted>
  Your browser does not support the video tag.
</video>

<!-- Button zum Wechseln des Videos -->
<button on:click={changeVideo}>Wechsel Video</button>

<style>
  video {
    width: 90%; /* Beispielstil, um das Video responsiv zu machen */
    height: auto;
  }

  button {
    display: block;
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
  }
</style>
