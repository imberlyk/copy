document.addEventListener('DOMContentLoaded', function() {

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
        document.body.appendChild(clone); 
        void clone.offsetWidth;
  
        clone.style.opacity = '1';
  
        // on click dinger verschwinden 
        clone.addEventListener('click', function() {
          document.body.removeChild(clone);
        });
      }, delay);
    }
  
    function startDuplication() {
      let numDivs = Math.ceil(window.innerWidth * window.innerHeight / (200 * 100)); // 
  
   
      numDivs *= 16;
    
      const delayBetweenDuplicates = 80; //schnelligkeit//
    
      for (let i = 0; i < numDivs; i++) {
        duplicateDivWithDelay(i * delayBetweenDuplicates);
      }
  
      // After all duplicates have spawned, wait for a delay and then remove them with a falling animation
      setTimeout(function() {
        const duplicates = document.querySelectorAll('.duplicate');
        duplicates.forEach(function(clone, index) {
          setTimeout(function() {
            clone.style.transition = 'top 2s ease-in';
            clone.style.top = window.innerHeight + 'px';
            setTimeout(function() {
              document.body.removeChild(clone);
            }, 2000);
          }, index * 50);
        });
  
        
        setTimeout(startDuplication, 3000); // Restart after 3 seconds
      }, numDivs * delayBetweenDuplicates);
    }
  
    startDuplication(); 
  });