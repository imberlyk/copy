document.addEventListener('DOMContentLoaded', function() {
  // Function to generate a random position covering the entire viewport
  function getRandomPosition() {
      const maxX = window.innerWidth - 100; // Adjust according to viewport size
      const maxY = window.innerHeight - 50; // Adjust according to viewport size
      const x = Math.floor(Math.random() * maxX);
      const y = Math.floor(Math.random() * maxY);
      return { x, y };
  }

  // Array of predefined colors
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff'];

  function duplicateDivWithDelay(delay) {
      setTimeout(function() {
          const originalDiv = document.querySelector('.duplicate');
          const clone = originalDiv.cloneNode(true);
          const position = getRandomPosition();
          clone.style.position = 'absolute';
          clone.style.left = position.x + 'px';
          clone.style.top = position.y + 'px';
          document.body.appendChild(clone);
          void clone.offsetWidth;

          clone.style.opacity = '1';
          clone.style.transition = 'opacity 0.3s ease'; // Faster fade-in animation

          // Change font family to Helvetica
          clone.style.fontFamily = 'Helvetica';

          // Add click event listener to remove the clone when clicked
          clone.addEventListener('click', function() {
              document.body.removeChild(clone);
          });
      }, delay);
  }

  function startDuplication() {
      let numDivs = Math.ceil(window.innerWidth * window.innerHeight / (200 * 100)); //

      // Triple the number of duplicates
      numDivs *= 20;

      const delayBetweenDuplicates = 20; // milliseconds

      for (let i = 0; i < numDivs; i++) {
          duplicateDivWithDelay(i * delayBetweenDuplicates);
      }

      // After all duplicates have spawned, wait for a delay and then remove them with a falling animation
      setTimeout(function() {
          const duplicates = document.querySelectorAll('.duplicate');
          duplicates.forEach(function(clone, index) {
              setTimeout(function() {
                  // Change the z-index for falling divs to be in front
                  clone.style.zIndex = '1';
                  clone.style.transition = 'top 2s ease-out';
                  clone.style.top = window.innerHeight - clone.offsetHeight + 'px'; // Position at the bottom
                  setTimeout(function() {
                      document.body.removeChild(clone);
                  }, 2000);
              }, index * 50);
          });

          // Restart duplication process after a delay
          setTimeout(startDuplication, 1000); // Restart after 3 seconds
      }, numDivs * delayBetweenDuplicates);
  }

  // Event listener to change CSS properties on click
  document.body.addEventListener('click', function() {
      const randomColorIndex = Math.floor(Math.random() * colors.length);
      const randomColor = colors[randomColorIndex];
      document.body.style.backgroundColor = randomColor;
      const duplicates = document.querySelectorAll('.duplicate');
      duplicates.forEach(function(clone) {
          clone.style.backgroundColor = randomColor;
      });
  });

  startDuplication(); // Start the duplication process initially
});

