// API Base URL - automatically works in production
const API_BASE_URL = window.location.origin;

// Test if we're in production
const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';

// Log environment info (helpful for debugging)
if (!isProduction) {
    console.log('🔧 ValiBNB running in development mode');
} else {
    console.log('🚀 ValiBNB running in production mode');
}

// Tab switching functionality
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tabName = btn.dataset.tab;
        
        // Update active tab button
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update active tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        const targetTab = document.getElementById(`${tabName}-tab`);
        targetTab.classList.add('active');
        targetTab.style.animation = 'fadeInUp 0.3s ease-out';
        
        // Hide result box when switching tabs
        document.getElementById('result').classList.add('hidden');
    });
});

// Show result function with animation
function showResult(data, isError = false) {
    const resultBox = document.getElementById('result');
    const resultContent = document.getElementById('result-content');
    
    resultContent.textContent = JSON.stringify(data, null, 2);
    resultContent.style.color = isError ? '#ff6b6b' : '#00ff88';
    
    resultBox.classList.remove('hidden');
    resultBox.style.opacity = '0';
    resultBox.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        resultBox.style.transition = 'all 0.3s ease-out';
        resultBox.style.opacity = '1';
        resultBox.style.transform = 'translateY(0)';
    }, 10);
    
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Loading state with animation
function showLoading() {
    const resultBox = document.getElementById('result');
    const resultContent = document.getElementById('result-content');
    
    resultContent.textContent = '🔄 Loading...';
    resultContent.style.color = 'var(--primary)';
    
    resultBox.classList.remove('hidden');
    resultBox.style.opacity = '0';
    resultBox.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        resultBox.style.transition = 'all 0.3s ease-out';
        resultBox.style.opacity = '1';
        resultBox.style.transform = 'translateY(0)';
    }, 10);
}

// Health check
async function checkHealth() {
    try {
        showLoading();
        const startTime = Date.now();
        const response = await fetch(`${API_BASE_URL}/health`);
        const data = await response.json();
        const latency = Date.now() - startTime;
        
        data.latency = `${latency}ms`;
        showResult(data, !response.ok);
    } catch (error) {
        showResult({ error: error.message }, true);
    }
}

// Get supported payment types
async function checkSupported() {
    try {
        showLoading();
        const response = await fetch(`${API_BASE_URL}/supported`);
        const data = await response.json();
        showResult(data, !response.ok);
    } catch (error) {
        showResult({ error: error.message }, true);
    }
}

// Verify payment with enhanced feedback
async function verifyPayment() {
    const txHash = document.getElementById('txHash').value.trim();
    const fromAddress = document.getElementById('fromAddress').value.trim();
    const toAddress = document.getElementById('toAddress').value.trim();
    const expectedAmount = document.getElementById('expectedAmount').value.trim();
    
    // Validation with enhanced feedback
    if (!txHash || !fromAddress || !toAddress || !expectedAmount) {
        showResult({ error: 'Please fill in all fields' }, true);
        return;
    }
    
    if (!txHash.startsWith('0x') || txHash.length !== 66) {
        showResult({ error: 'Invalid transaction hash format' }, true);
        return;
    }
    
    try {
        showLoading();
        const response = await fetch(`${API_BASE_URL}/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                transactionHash: txHash,
                fromAddress: fromAddress,
                toAddress: toAddress,
                expectedAmount: expectedAmount,
                currency: 'BNB'
            })
        });
        
        const data = await response.json();
        
        // Add visual feedback for valid/invalid payments
        if (data.valid) {
            showResult({ ...data, status: '✅ Payment Verified!' }, false);
        } else {
            showResult({ ...data, status: '❌ Payment Invalid' }, true);
        }
    } catch (error) {
        showResult({ error: error.message }, true);
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Enhanced animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Animate hero title with stagger
    const heroTitle = document.querySelector('.hero-title');
    const subtitle = document.querySelector('.hero-subtitle');
    const buttons = document.querySelector('.hero-buttons');
    const stats = document.querySelector('.hero-stats');
    
    [heroTitle, subtitle, buttons, stats].forEach((el, index) => {
        if (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 100 * (index + 1));
        }
    });
    
    // Animate feature cards with stagger
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 * (index + 1) + 500);
    });
    
    // Add entrance animation to endpoint cards
    const endpointCards = document.querySelectorAll('.endpoint-card');
    endpointCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
        }, 150 * index + 300);
    });
});

// Parallax effect with throttling
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.hero-visual');
            if (parallax) {
                parallax.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
            ticking = false;
        });
        ticking = true;
    }
});

// Add hover effects to buttons
document.querySelectorAll('.btn-primary, .btn-outline').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.02)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add ripple effect to buttons
document.querySelectorAll('button, .btn-primary, .btn-outline, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});
