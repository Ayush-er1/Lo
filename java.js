// ===== GLOBAL VARIABLES =====
let currentlyPlaying = null;
let progressUpdateInterval = null;
let isPlaying = false;

// ===== PASSWORD PROTECTION LOGIC =====
const passwordScreen = document.getElementById('passwordScreen');
const mainContent = document.getElementById('mainContent');
const passwordInput = document.getElementById('passwordInput');
const passwordBtn = document.getElementById('passwordBtn');
const errorMessage = document.getElementById('errorMessage');
const correctPassword = '0821'; // Your special date

// Password validation function
function validatePassword() {
    const enteredPassword = passwordInput.value.trim();
    
    if (enteredPassword === correctPassword) {
        // Correct password - show main content
        passwordScreen.classList.add('hidden');
        setTimeout(() => {
            mainContent.classList.add('visible');
            // Create welcome hearts effect
            createWelcomeHearts();
        }, 800);
    } else {
        // Wrong password - show error
        errorMessage.classList.add('show');
        passwordInput.value = '';
        passwordInput.style.borderColor = '#ff6b6b';
        
        // Hide error after 3 seconds
        setTimeout(() => {
            errorMessage.classList.remove('show');
            passwordInput.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        }, 3000);
    }
}

// Welcome hearts effect when password is correct
function createWelcomeHearts() {
    const colors = ['💕', '💖', '💗', '💝', '❤️', '💜'];
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = colors[Math.floor(Math.random() * colors.length)];
            heart.className = 'heart-particle';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '110%';
            heart.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 3000);
        }, i * 200);
    }
}

// ===== NAVBAR SCROLL LOGIC =====
function initializeNavbar() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                navbar.classList.add('visible');
            } else {
                navbar.classList.remove('visible');
            }
        });
    }
}

// ===== MAIN AUDIO PLAYER LOGIC =====
function initializeMainAudioPlayer() {
    const audio = document.getElementById('audioPlayer');
    const playBtn = document.getElementById('playButton');
    const playIcon = document.getElementById('playIcon');
    const pauseIcon = document.getElementById('pauseIcon');

    if (playBtn && audio && playIcon && pauseIcon) {
        // Play/pause button event listener
        playBtn.addEventListener('click', () => {
            if (isPlaying) {
                audio.pause();
                playIcon.style.display = 'block';
                pauseIcon.style.display = 'none';
            } else {
                audio.play();
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
            }
            isPlaying = !isPlaying;
        });

        // Initial icon setup
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    }
}

// ===== HEART ICON AND LOVE MESSAGE LOGIC =====
function initializeHeartIcon() {
    const heartIcon = document.getElementById('heartIcon');
    const loveMessage = document.getElementById('loveMessage');
    
    if (heartIcon && loveMessage) {
        // Create heart particles container once
        const heartParticles = document.createElement('div');
        heartParticles.className = 'heart-particles';
        document.body.appendChild(heartParticles);

        // Heart icon click event
        heartIcon.addEventListener('click', () => {
            // Toggle heart fill class
            heartIcon.classList.toggle('filled');

            // Show love message
            loveMessage.classList.add('active');
            loveMessage.classList.add('pulse');

            // Create sparkles and hearts
            createSparkles();
            createHeartParticles();

            // Hide love message after 5 seconds
            setTimeout(() => {
                loveMessage.classList.remove('active');
                setTimeout(() => {
                    loveMessage.classList.remove('pulse');
                }, 500);
            }, 5000);
        });
    }
}

// Function to create floating heart particles
function createHeartParticles() {
    const heartParticles = document.querySelector('.heart-particles');
    if (!heartParticles) return;
    
    // Clear existing heart particles
    heartParticles.innerHTML = '';
    
    // Create new heart particles
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-particle';
        
        // Position hearts to emanate from the center
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const radius = 100;
        const angle = Math.random() * Math.PI * 2;
        
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        
        // Random size - make them larger
        const size = 20 + Math.random() * 25;
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        
        // Random colors for variety
        const colors = ['#ff3366', '#ff0033', '#ff6699', '#ff0066'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        heart.style.backgroundColor = randomColor;
        
        // Random rotation
        const rotation = Math.random() * 360;
        heart.style.transform = `rotate(${rotation}deg)`;
        
        // Random delay for staggered effect
        const delay = Math.random() * 2000;
        setTimeout(() => {
            heartParticles.appendChild(heart);
        }, delay);
        
        // Remove heart after animation
        setTimeout(() => {
            if (heart.parentNode) {
                heart.remove();
            }
        }, delay + 4000);
    }
}

// Function to create sparkles
function createSparkles() {
    const loveMessage = document.getElementById('loveMessage');
    if (!loveMessage) return;
    
    // Clear any existing sparkles
    const existingSparkles = loveMessage.querySelectorAll('.sparkle');
    existingSparkles.forEach(sparkle => sparkle.remove());
    
    for (let i = 0; i < 25; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        
        // Random position around message - wider distribution
        const angle = Math.random() * Math.PI * 2;
        const distance = 80 + Math.random() * 150;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        sparkle.style.left = `calc(50% + ${x}px)`;
        sparkle.style.top = `calc(50% + ${y}px)`;
        
        // Random size for varied effect
        const size = 5 + Math.random() * 7;
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        
        // Random colors
        const colors = ['#fff', '#fffacd', '#ffb6c1', '#ffd700'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        sparkle.style.backgroundColor = randomColor;
        
        // Random delay for staggered effect
        const delay = Math.random() * 1500;
        setTimeout(() => {
            sparkle.classList.add('sparkle-animation');
        }, delay);
        
        loveMessage.appendChild(sparkle);
        
        // Remove sparkle after animation
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.remove();
            }
        }, delay + 2000);
    }
}

// ===== POEMS FUNCTIONALITY =====
function initializePoems() {
    // Check if poems variable exists
    if (typeof poems === 'undefined') {
        console.log('Poems variable not defined');
        return;
    }

    // Calculate word counts for each poem
    poems.forEach(poem => {
        poem.wordCount = countWords(poem.text);
    });

    // DOM Elements
    const viewAllButton = document.getElementById('view-all-button');
    const morePoems = document.querySelector('.more-poems');
    const poemDetails = document.getElementById('poem-details');
    const closeButton = document.querySelector('.close-button');
    const detailTitle = document.getElementById('detail-title');
    const detailPoem = document.getElementById('detail-poem');
    const detailWordcount = document.getElementById('detail-wordcount');

    // Event Listeners
    if (viewAllButton) {
        viewAllButton.addEventListener('click', toggleMorePoems);
    }
    
    if (closeButton) {
        closeButton.addEventListener('click', closePoem);
    }

    // Initialize poem items with click listeners
    initializePoemItems();
    
    // Function to count words in a text
    function countWords(text) {
        return text.trim().split(/\s+/).length;
    }
    
    function initializePoemItems() {
        const allPoemItems = document.querySelectorAll('.poem-item');
        
        allPoemItems.forEach(item => {
            const poemNumberElement = item.querySelector('.poem-number');
            if (poemNumberElement) {
                const poemNumberText = poemNumberElement.textContent;
                const poemId = parseInt(poemNumberText.replace(/[()]/g, ''));
                
                // Update word count with calculated values
                const wordCountElement = item.querySelector('.poem-wordcount');
                const poem = poems.find(p => p.id === poemId);
                if (poem && wordCountElement) {
                    wordCountElement.textContent = `${poem.wordCount} words`;
                }
                
                // Add click event listener
                item.addEventListener('click', () => {
                    showPoemDetails(poemId);
                });
            }
        });
    }

    // Toggle more poems visibility
    function toggleMorePoems() {
        if (morePoems.style.display === 'none' || !morePoems.style.display) {
            morePoems.style.display = 'block';
            viewAllButton.textContent = 'Hide Additional Poems';
        } else {
            morePoems.style.display = 'none';
            viewAllButton.textContent = 'View More Poems';
        }
    }

    // Show poem details
    function showPoemDetails(poemId) {
        const poem = poems.find(p => p.id === poemId);
        
        if (poem && detailTitle && detailPoem && detailWordcount && poemDetails) {
            detailTitle.textContent = poem.title;
            detailPoem.textContent = poem.text;
            detailWordcount.textContent = `Word count: ${poem.wordCount}`;
            
            poemDetails.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    // Close poem details
    function closePoem() {
        if (poemDetails) {
            poemDetails.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Close modal if clicking outside the content
    if (poemDetails) {
        poemDetails.addEventListener('click', function(e) {
            if (e.target === poemDetails) {
                closePoem();
            }
        });
    }

    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && poemDetails && poemDetails.classList.contains('active')) {
            closePoem();
        }
    });
}

// ===== AUDIO PLAYERS FUNCTIONALITY =====
function initializeAudioPlayers() {
    const playButtons = document.querySelectorAll('.play-button');
    const audioElements = document.querySelectorAll('audio');
    
    console.log(`Found ${playButtons.length} play buttons`);
    
    // Function to format time display
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    // Function to update progress bar and time display
    function updateProgress(audio, audioId) {
        const progressBar = document.getElementById(`progress-${audioId}`);
        const timeDisplay = document.getElementById(`time-${audioId}`);
        
        if (progressBar && timeDisplay && audio.duration) {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = progress + '%';
            
            const currentTime = formatTime(audio.currentTime);
            const duration = formatTime(audio.duration);
            timeDisplay.textContent = `${currentTime} / ${duration}`;
        }
    }
    
    // Function to stop all audio
    function stopAllAudio() {
        if (currentlyPlaying) {
            const currentAudio = document.getElementById(currentlyPlaying.audioId);
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
                
                // Reset button appearance
                currentlyPlaying.button.innerHTML = '▶';
                currentlyPlaying.button.classList.remove('playing');
                
                // Reset progress bar
                const progressBar = document.getElementById(`progress-${currentlyPlaying.audioId}`);
                if (progressBar) {
                    progressBar.style.width = '0%';
                }
                
                // Clear progress update interval
                if (progressUpdateInterval) {
                    clearInterval(progressUpdateInterval);
                    progressUpdateInterval = null;
                }
            }
            currentlyPlaying = null;
        }
    }
    
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const audioId = this.getAttribute('data-audio');
            const startTime = parseFloat(this.getAttribute('data-start-time') || 0);
            const endTime = parseFloat(this.getAttribute('data-end-time') || 0);
            const audio = document.getElementById(audioId);
            
            console.log(`Attempting to play: ${audioId}, Start: ${startTime}, End: ${endTime}`);
            
            if (!audio) {
                console.error('Audio element not found:', audioId);
                return;
            }
            
            // If clicking the same button that's currently playing, stop it
            if (currentlyPlaying && currentlyPlaying.button === this) {
                stopAllAudio();
                return;
            }
            
            // Stop any currently playing audio
            stopAllAudio();
            
            // Set up new audio playback
            audio.currentTime = startTime;
            
            // Play the audio
            const playPromise = audio.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log('Audio started playing successfully');
                    
                    // Update button appearance
                    this.innerHTML = '⏸';
                    this.classList.add('playing');
                    
                    // Set current playing reference
                    currentlyPlaying = {
                        audioId: audioId,
                        button: this,
                        startTime: startTime,
                        endTime: endTime
                    };
                    
                    // Set up progress updates
                    progressUpdateInterval = setInterval(() => {
                        updateProgress(audio, audioId);
                        
                        // Check if we've reached the end time
                        if (endTime > 0 && audio.currentTime >= endTime) {
                            stopAllAudio();
                        }
                    }, 100);
                    
                }).catch(error => {
                    console.error('Error playing audio:', error);
                });
            }
            
            // Handle audio end event
            audio.onended = function() {
                stopAllAudio();
            };
            
            // Handle audio error event
            audio.onerror = function(e) {
                console.error('Audio error:', e);
                stopAllAudio();
            };
        });
    });
    
    // Initialize time displays when audio metadata is loaded
    audioElements.forEach(audio => {
        audio.addEventListener('loadedmetadata', function() {
            const audioId = this.id;
            const timeDisplay = document.getElementById(`time-${audioId}`);
            if (timeDisplay) {
                timeDisplay.textContent = `0:00 / ${formatTime(this.duration)}`;
            }
        });
        
        // Handle load errors
        audio.addEventListener('error', function(e) {
            console.error(`Error loading ${this.id}:`, e);
        });
    });
}

// ===== LISTEN MORE BUTTON FUNCTIONALITY =====
function initializeListenMoreButton() {
    const listenMoreBtn = document.querySelector('.listen-more-btn');
    const additionalContent = document.querySelector('.additional-content');
    
    console.log('Listen More Button found:', !!listenMoreBtn);
    console.log('Additional Content found:', !!additionalContent);
    
    if (listenMoreBtn && additionalContent) {
        // Initialize the additional content as hidden
        additionalContent.style.display = 'none';
        additionalContent.classList.remove('active');
        
        // Set initial button text
        listenMoreBtn.innerHTML = 'Listen More <span class="icon">▼</span>';
        
        listenMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Listen More button clicked');
            
            // Toggle the additional content
            if (additionalContent.style.display === 'none') {
                additionalContent.style.display = 'block';
                additionalContent.classList.add('active');
                this.innerHTML = 'Show Less <span class="icon">▲</span>';
                console.log('Showing additional content');
            } else {
                additionalContent.style.display = 'none';
                additionalContent.classList.remove('active');
                this.innerHTML = 'Listen More <span class="icon">▼</span>';
                console.log('Hiding additional content');
            }
        });
    } else {
        console.log('Listen More button or additional content not found');
        console.log('Available buttons:', document.querySelectorAll('button').length);
        console.log('Available .listen-more-btn:', document.querySelectorAll('.listen-more-btn').length);
        console.log('Available .additional-content:', document.querySelectorAll('.additional-content').length);
    }
}

// ===== PHOTO CARDS SPARKLE EFFECTS =====
function initializePhotoCards() {
    const photoCards = document.querySelectorAll('.photo-card');
    
    photoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            createPhotoSparkles(this);
        });
    });
    
    function createPhotoSparkles(card) {
        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('div');
            sparkle.style.position = 'absolute';
            sparkle.style.width = '4px';
            sparkle.style.height = '4px';
            sparkle.style.background = '#fff';
            sparkle.style.borderRadius = '50%';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '1000';
            
            const rect = card.getBoundingClientRect();
            sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
            sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
            
            document.body.appendChild(sparkle);
            
            // Animate sparkle
            sparkle.animate([
                { 
                    opacity: 1, 
                    transform: 'scale(0) translateY(0px)' 
                },
                { 
                    opacity: 1, 
                    transform: 'scale(1) translateY(-20px)' 
                },
                { 
                    opacity: 0, 
                    transform: 'scale(0) translateY(-40px)' 
                }
            ], {
                duration: 1000,
                easing: 'ease-out'
            }).onfinish = () => sparkle.remove();
        }
    }
}

// ===== MAIN INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing all components');
    
    // Initialize all components
    try {
        // Password protection
        if (passwordBtn && passwordInput) {
            passwordBtn.addEventListener('click', validatePassword);
            passwordInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    validatePassword();
                }
            });
            
            // Format input as MM/DD while typing
            passwordInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
                if (value.length >= 2) {
                    value = value.substring(0, 2) + value.substring(2, 4);
                }
                e.target.value = value;
            });
        }
        
        // Initialize other components
        initializeNavbar();
        initializeMainAudioPlayer();
        initializeHeartIcon();
        initializePoems();
        initializeAudioPlayers();
        initializeListenMoreButton();
        initializePhotoCards();
        
        console.log('All components initialized successfully');
    } catch (error) {
        console.error('Error during initialization:', error);
    }
      // Create floating hearts
        function createFloatingHearts() {
            const heartsContainer = document.getElementById('floatingHearts');
            const hearts = ['💖', '💕', '💝', '💗', '💘', '❤️', '💙', '💜'];
            
            setInterval(() => {
                const heart = document.createElement('div');
                heart.className = 'heart';
                heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
                heart.style.left = Math.random() * 100 + '%';
                heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
                heart.style.opacity = Math.random() * 0.5 + 0.1;
                
                heartsContainer.appendChild(heart);
                
                setTimeout(() => {
                    heart.remove();
                }, 20000);
            }, 3000);
        }

        // Create twinkling stars
        function createStars() {
            const starsContainer = document.getElementById('stars');
            for (let i = 0; i < 100; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                star.style.animationDelay = Math.random() * 3 + 's';
                star.style.animationDuration = (Math.random() * 2 + 2) + 's';
                starsContainer.appendChild(star);
            }
        }

        // Add click handlers for categories
        document.querySelectorAll('.poem-category').forEach(category => {
            category.addEventListener('click', function() {
                const categoryType = this.dataset.category;
                
                // Add a gentle pulse animation
                this.style.animation = 'pulse 0.6s ease-in-out';
                
                setTimeout(() => {
                    this.style.animation = '';
                }, 600);
                
                // Here you would typically navigate to the specific poetry collection
                console.log(`Opening ${categoryType} poetry collection...`);
            });
        });

        // Initialize effects
        createFloatingHearts();
        createStars();

        // Add some mouse interaction
        document.addEventListener('mousemove', (e) => {
            const sparkles = document.querySelectorAll('.sparkle');
            sparkles.forEach((sparkle, index) => {
                const rect = sparkle.getBoundingClientRect();
                const distance = Math.sqrt(
                    Math.pow(e.clientX - rect.left, 2) + Math.pow(e.clientY - rect.top, 2)
                );
                
                if (distance < 100) {
                    sparkle.style.opacity = '1';
                    sparkle.style.transform = 'scale(1.5)';
                } else {
                    sparkle.style.opacity = '0';
                    sparkle.style.transform = 'scale(1)';
                }
            });
        });
});
