document.addEventListener('DOMContentLoaded', function() {
    // Function to generate a random position covering the entire viewport
    function getRandomPosition() {
      const maxX = window.innerWidth - 200; // Adjust according to viewport size
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
    
      document.removeEventListener('click', startDuplication);
    }
  
    document.addEventListener('click', startDuplication);
  });
  