/**
 * Schmittl's Cocktailbar - Cookie Consent Banner
 * DSGVO-compliant cookie consent management
 */

class CookieConsent {
    constructor() {
        this.storageKey = 'schmittls_cookie_consent';
        this.init();
    }

    /**
     * Initialize cookie consent
     */
    init() {
        // Check if consent already given
        if (!this.hasConsent()) {
            this.showBanner();
        }
    }

    /**
     * Check if user has given consent
     */
    hasConsent() {
        const consent = localStorage.getItem(this.storageKey);
        return consent !== null;
    }

    /**
     * Get consent preferences
     */
    getConsent() {
        try {
            return JSON.parse(localStorage.getItem(this.storageKey));
        } catch (error) {
            return null;
        }
    }

    /**
     * Save consent preferences
     */
    saveConsent(preferences) {
        localStorage.setItem(this.storageKey, JSON.stringify({
            ...preferences,
            timestamp: Date.now()
        }));
        this.hideBanner();
    }

    /**
     * Show cookie banner
     */
    showBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.className = 'cookie-banner';
        banner.innerHTML = `
      <div class="cookie-banner-content">
        <div class="cookie-banner-text">
          <h3>🍪 Cookie-Einstellungen</h3>
          <p>Wir verwenden Cookies, um Ihre Erfahrung auf unserer Website zu verbessern. Notwendige Cookies sind für die Funktionalität der Website erforderlich.</p>
        </div>
        <div class="cookie-banner-actions">
          <button class="btn btn-secondary" onclick="cookieConsent.showSettings()">Einstellungen</button>
          <button class="btn btn-primary" onclick="cookieConsent.acceptAll()">Alle akzeptieren</button>
        </div>
      </div>
    `;
        document.body.appendChild(banner);

        // Add styles
        this.addStyles();
    }

    /**
     * Hide cookie banner
     */
    hideBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.style.animation = 'slideDown 0.3s ease-out';
            setTimeout(() => banner.remove(), 300);
        }

        const modal = document.getElementById('cookie-settings-modal');
        if (modal) {
            modal.remove();
        }
    }

    /**
     * Accept all cookies
     */
    acceptAll() {
        this.saveConsent({
            necessary: true,
            analytics: true,
            marketing: true
        });
    }

    /**
     * Accept only necessary cookies
     */
    acceptNecessary() {
        this.saveConsent({
            necessary: true,
            analytics: false,
            marketing: false
        });
    }

    /**
     * Show settings modal
     */
    showSettings() {
        const modal = document.createElement('div');
        modal.id = 'cookie-settings-modal';
        modal.className = 'cookie-modal';
        modal.innerHTML = `
      <div class="cookie-modal-content glass">
        <h2>Cookie-Einstellungen</h2>
        <p class="text-muted mb-lg">Wählen Sie, welche Cookies Sie zulassen möchten:</p>
        
        <div class="cookie-option">
          <div class="cookie-option-header">
            <label>
              <input type="checkbox" checked disabled>
              <span class="cookie-option-title">Notwendige Cookies</span>
            </label>
          </div>
          <p class="cookie-option-description">Diese Cookies sind für die Grundfunktionen der Website erforderlich.</p>
        </div>
        
        <div class="cookie-option">
          <div class="cookie-option-header">
            <label>
              <input type="checkbox" id="analytics-cookies">
              <span class="cookie-option-title">Analyse-Cookies</span>
            </label>
          </div>
          <p class="cookie-option-description">Helfen uns zu verstehen, wie Besucher mit der Website interagieren.</p>
        </div>
        
        <div class="cookie-option">
          <div class="cookie-option-header">
            <label>
              <input type="checkbox" id="marketing-cookies">
              <span class="cookie-option-title">Marketing-Cookies</span>
            </label>
          </div>
          <p class="cookie-option-description">Werden verwendet, um Besuchern relevante Werbung anzuzeigen.</p>
        </div>
        
        <div class="cookie-modal-actions">
          <button class="btn btn-secondary" onclick="cookieConsent.acceptNecessary()">Nur Notwendige</button>
          <button class="btn btn-primary" onclick="cookieConsent.saveSettings()">Auswahl speichern</button>
        </div>
      </div>
    `;
        document.body.appendChild(modal);
    }

    /**
     * Save custom settings
     */
    saveSettings() {
        const analytics = document.getElementById('analytics-cookies')?.checked || false;
        const marketing = document.getElementById('marketing-cookies')?.checked || false;

        this.saveConsent({
            necessary: true,
            analytics: analytics,
            marketing: marketing
        });
    }

    /**
     * Revoke consent
     */
    revoke() {
        localStorage.removeItem(this.storageKey);
        this.showBanner();
    }

    /**
     * Add styles for cookie banner
     */
    addStyles() {
        if (document.getElementById('cookie-consent-styles')) return;

        const style = document.createElement('style');
        style.id = 'cookie-consent-styles';
        style.textContent = `
      .cookie-banner {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(26, 26, 46, 0.98);
        backdrop-filter: blur(10px);
        border-top: 2px solid var(--color-accent-gold);
        padding: var(--spacing-xl);
        z-index: var(--z-modal);
        animation: slideUp 0.3s ease-out;
        box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.5);
      }
      
      .cookie-banner-content {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: var(--spacing-xl);
      }
      
      .cookie-banner-text h3 {
        margin-bottom: var(--spacing-sm);
        color: var(--color-accent-gold);
      }
      
      .cookie-banner-text p {
        margin: 0;
        color: var(--color-text-muted);
      }
      
      .cookie-banner-actions {
        display: flex;
        gap: var(--spacing-md);
        flex-shrink: 0;
      }
      
      .cookie-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: var(--z-modal);
        padding: var(--spacing-xl);
        animation: fadeIn 0.3s ease-out;
      }
      
      .cookie-modal-content {
        max-width: 600px;
        width: 100%;
        padding: var(--spacing-2xl);
        border-radius: var(--radius-xl);
        max-height: 90vh;
        overflow-y: auto;
      }
      
      .cookie-option {
        background: rgba(255, 255, 255, 0.05);
        padding: var(--spacing-lg);
        border-radius: var(--radius-md);
        margin-bottom: var(--spacing-md);
      }
      
      .cookie-option-header {
        margin-bottom: var(--spacing-sm);
      }
      
      .cookie-option-header label {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        cursor: pointer;
      }
      
      .cookie-option-title {
        font-weight: 600;
        color: var(--color-text);
      }
      
      .cookie-option-description {
        margin: 0;
        font-size: var(--font-size-sm);
        color: var(--color-text-muted);
      }
      
      .cookie-modal-actions {
        display: flex;
        gap: var(--spacing-md);
        margin-top: var(--spacing-xl);
      }
      
      @keyframes slideUp {
        from {
          transform: translateY(100%);
        }
        to {
          transform: translateY(0);
        }
      }
      
      @keyframes slideDown {
        from {
          transform: translateY(0);
        }
        to {
          transform: translateY(100%);
        }
      }
      
      @media (max-width: 768px) {
        .cookie-banner-content {
          flex-direction: column;
          text-align: center;
        }
        
        .cookie-banner-actions {
          flex-direction: column;
          width: 100%;
        }
        
        .cookie-banner-actions .btn {
          width: 100%;
        }
      }
    `;
        document.head.appendChild(style);
    }
}

// Create global instance
window.cookieConsent = new CookieConsent();
