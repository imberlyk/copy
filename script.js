document.addEventListener('DOMContentLoaded', function() {
    // Function to generate a random position covering the entire viewport
    function getRandomPosition() {
      const maxX = window.innerWidth - 150; // Adjust according to viewport size
      const maxY = window.innerHeight - 100; // Adjust according to viewport size
      const x = Math.floor(Math.random() * maxX);
      const y = Math.floor(Math.random() * maxY);
      return { x, y };
    }
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
    
          // Add click event listener to remove the clone when clicked
          clone.addEventListener('click', function() {
            document.body.removeChild(clone);
          });
        }, delay);
      }
    
      function startDuplication() {
        let numDivs = Math.ceil(window.innerWidth * window.innerHeight / (200 * 100)); // 
    
        // Triple the number of duplicates
        numDivs *= 16;
      
        const delayBetweenDuplicates = 100; // milliseconds
      
        for (let i = 0; i < numDivs; i++) {
          duplicateDivWithDelay(i * delayBetweenDuplicates);
        }
    
        // After all duplicates have spawned, wait for a delay and then remove them with a falling animation
        setTimeout(function() {
          const duplicates = document.querySelectorAll('.duplicate');
          duplicates.forEach(function(clone, index) {
            setTimeout(function() {
              clone.style.transition = 'top 2s ease-out';
              clone.style.top = window.innerHeight + 'px';
              setTimeout(function() {
                document.body.removeChild(clone);
              }, 2000);
            }, index * 50);
          });
    
          // Restart duplication process after a delay
          setTimeout(startDuplication, 3000); // Restart after 3 seconds
        }, numDivs * delayBetweenDuplicates);
      }
    
      startDuplication(); // Start the duplication process initially
    });