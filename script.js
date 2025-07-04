document.addEventListener('DOMContentLoaded', function() {
  const mainLogo = document.getElementById('main-logo');
  const secondaryLogos = document.getElementById('secondary-logos');
  const logoLinks = document.querySelectorAll('.logo-link');
  const overlay = document.querySelector('.overlay');
  let isActive = false;

  // Initial setup
  secondaryLogos.style.display = 'none';
  overlay.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';

  // Main logo click handler
  mainLogo.addEventListener('click', function() {
    isActive = !isActive;
    
    if (isActive) {
      activateLogos();
    } else {
      deactivateLogos();
    }
  });

  function activateLogos() {
    // Shrink main logo in place
    mainLogo.classList.remove('main-logo-large');
    mainLogo.classList.add('main-logo-small');
    
    // Show secondary logos
    secondaryLogos.style.display = 'block';
    setTimeout(() => {
      secondaryLogos.classList.add('active');
    }, 10);
    
    // Darken overlay
    overlay.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    
    // Position secondary logos in perfect circle around center
    positionSecondaryLogos();
  }

  function deactivateLogos() {
    // Return main logo to original size
    mainLogo.classList.remove('main-logo-small');
    mainLogo.classList.add('main-logo-large');
    
    // Hide secondary logos
    secondaryLogos.classList.remove('active');
    overlay.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    
    setTimeout(() => {
      secondaryLogos.style.display = 'none';
    }, 500);
    
    // Reset positions
    logoLinks.forEach(link => {
      link.style.left = '50%';
      link.style.top = '50%';
      link.querySelector('.secondary-logo').style.animation = 'none';
    });
  }

  function positionSecondaryLogos() {
    const radius = Math.min(window.innerWidth, window.innerHeight) * 0.2;
    const totalLogos = logoLinks.length;
    const angleStep = (Math.PI * 2) / totalLogos;
    
    logoLinks.forEach((link, index) => {
      const angle = angleStep * index;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      
      // Reset animation
      link.querySelector('.secondary-logo').style.animation = 'none';
      
      // Apply positions with slight delay for each logo
      setTimeout(() => {
        link.style.left = `calc(50% + ${x}px)`;
        link.style.top = `calc(50% + ${y}px)`;
        link.querySelector('.secondary-logo').style.animation = 'popIn 0.5s forwards';
      }, index * 100);
    });
  }

  // Hover effects
  logoLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.querySelector('.secondary-logo').style.transform = 'scale(1.4)';
    });
    
    link.addEventListener('mouseleave', function() {
      if (isActive) {
        this.querySelector('.secondary-logo').style.transform = 'scale(1)';
      }
    });
  });

  // Handle window resize
  window.addEventListener('resize', function() {
    if (isActive) {
      positionSecondaryLogos();
    }
  });
});