// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header background on scroll - updated to match hero section
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const hero = document.querySelector('.hero');
    
    if (header && hero) {
        const heroHeight = hero.offsetHeight;
        
        if (window.scrollY >= heroHeight - 100) {
            header.classList.add('active');
        } else {
            header.classList.remove('active');
        }
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.destination-card, .testimonial, .featured-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add click handler for blog card with null check
const blogCard = document.querySelector('.blog-card');
if (blogCard) {
    blogCard.addEventListener('click', function(e) {
        if (!e.target.classList.contains('read-more')) {
            window.open('https://medium.com/@yourusername', '_blank');
        }
    });
}

// Add hover effects for cards
document.querySelectorAll('.destination-card, .featured-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Chat Interface Functionality
const chatContainer = document.getElementById('chatContainer');
const messageInput = document.querySelector('.message-input');
const sendButton = document.querySelector('.send-button');
const typingIndicator = document.querySelector('.typing-indicator');

// Chat functionality
function createMessageElement(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    messageDiv.innerHTML = `
        <div class="avatar">${isUser ? 'YOU' : 'AI'}</div>
        <div class="message-bubble">${content}</div>
    `;
    
    return messageDiv;
}

function addMessage(content, isUser = false) {
    if (!chatContainer) return;
    const messageElement = createMessageElement(content, isUser);
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function showTypingIndicator() {
    if (!typingIndicator) return;
    typingIndicator.style.display = 'block';
    if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
}

function hideTypingIndicator() {
    if (!typingIndicator) return;
    typingIndicator.style.display = 'none';
}

async function getBotResponse(userMessage) {
    showTypingIndicator();

    try {
        // Parse city and days from message
        let parsedCity = null;
        let parsedDays = null;

        const messageText = userMessage.toLowerCase();
        
        // Extract number of days
        const dayMatches = messageText.match(/(\d+)\s*days?/);
        if (dayMatches) {
            parsedDays = parseInt(dayMatches[1]);
        }

        // Extract city (everything before "for X days" or after "to")
        let cityMatch = messageText.match(/(?:to|visit|go to)\s+([^,\d]+?)(?:\s+for|\s*$)/);
        if (!cityMatch) {
            cityMatch = messageText.match(/([^,\d]+?)\s+for\s+\d+/);
        }
        if (cityMatch) {
            parsedCity = cityMatch[1].trim();
        }

        // Prepare request payload
        let requestBody;
        if (parsedCity && parsedDays) {
            requestBody = {
                city: parsedCity,
                num_days: parsedDays
            };
        } else {
            requestBody = {
                message: userMessage
            };
        }

        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to get response');
        }

        const data = await response.json();
        hideTypingIndicator();
        
        // Format the response for better display
        const formattedResponse = data.reply.replace(/\n/g, '<br>');
        addMessage(formattedResponse);
        
    } catch (error) {
        hideTypingIndicator();
        console.error('Chat error:', error);
        
        let errorMessage = "I'm having trouble connecting right now. ";
        
        if (error.message.includes('API quota')) {
            errorMessage += "It looks like we've reached our API limit. Please try again later.";
        } else if (error.message.includes('Invalid API key')) {
            errorMessage += "There's an issue with our API configuration.";
        } else {
            errorMessage += "Please check your connection and try again, or let me know if you'd like some general travel tips!";
        }
        
        addMessage(errorMessage);
    }
}

function handleSendMessage() {
    if (!messageInput) return;
    const message = messageInput.value.trim();
    if (message) {
        addMessage(message, true);
        messageInput.value = '';
        getBotResponse(message);
    }
}

// Event listeners with null checks
if (messageInput) {
    messageInput.addEventListener('keydown', (e) => {
        if (e.isComposing || e.keyCode === 229) return; // IME in progress
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    });
}

if (sendButton) {
    sendButton.addEventListener('click', handleSendMessage);
}

// Initialize chat with welcome message
setTimeout(() => {
    addMessage("Ready for your next ADVEN-CHEER? 🌍✈️<br><br>Just tell me where you want to go and for how many days! For example:<br>• 'I want to visit Paris for 5 days'<br>• 'Plan a weekend trip to Tokyo'<br>• 'Rome for 3 days'<br><br>I'll create a brilliant day-by-day itinerary with local gems!");
}, 1000);
