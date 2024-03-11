document.addEventListener('DOMContentLoaded', function() {
    // Function to generate a random position covering the entire viewport
    function getRandomPosition() {
      const maxX = window.innerWidth - 100; // Adjust according to viewport size
      const maxY = window.innerHeight - 50; // Adjust according to viewport size
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
        clone.style.opacity = '0'; // Start with opacity 0
        document.body.appendChild(clone); 
        void clone.offsetWidth;
  
        // Gradually increase opacity for fade-in effect
        let opacity = 0;
        const fadeInInterval = setInterval(function() {
          opacity += 0.05; // Adjust the increment as needed
          clone.style.opacity = opacity.toString();
          if (opacity >= 1) {
            clearInterval(fadeInInterval);
          }
        }, 50); // Adjust the interval as needed
      }, delay);
    }
  
    function startDuplication() {
      let numDivs = Math.ceil(window.innerWidth * window.innerHeight / (200 * 100)); // 
  
      // Triple the number of duplicates
      numDivs *= 9;
    
      const delayBetweenDuplicates = 100; // milliseconds
    
      for (let i = 0; i < numDivs; i++) {
        duplicateDivWithDelay(i * delayBetweenDuplicates);
      }
    
      document.removeEventListener('click', startDuplication);
    }
  
    document.addEventListener('click', startDuplication);
  });
  