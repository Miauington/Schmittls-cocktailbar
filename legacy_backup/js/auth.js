/**
 * Schmittl's Cocktailbar - Authentication System
 * Simple client-side authentication for admin area
 */

class AuthManager {
    constructor() {
        this.storageKey = 'schmittls_auth';
        this.credentialsKey = 'schmittls_credentials';
        this.sessionTimeout = 24 * 60 * 60 * 1000; // 24 hours
        this.init();
    }

    /**
     * Initialize auth system
     */
    init() {
        // Set default credentials if not exists
        if (!localStorage.getItem(this.credentialsKey)) {
            this.setCredentials('admin', 'schmittls2026');
        }

        // Check session on page load
        this.checkSession();
    }

    /**
     * Simple hash function for password storage
     */
    hash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString(36);
    }

    /**
     * Set/Update credentials
     */
    setCredentials(username, password) {
        const credentials = {
            username: username,
            password: this.hash(password)
        };
        localStorage.setItem(this.credentialsKey, JSON.stringify(credentials));
    }

    /**
     * Login
     */
    login(username, password) {
        try {
            const stored = JSON.parse(localStorage.getItem(this.credentialsKey));

            if (stored && stored.username === username && stored.password === this.hash(password)) {
                const session = {
                    username: username,
                    loginTime: Date.now(),
                    expiresAt: Date.now() + this.sessionTimeout
                };

                localStorage.setItem(this.storageKey, JSON.stringify(session));
                return { success: true, message: 'Login erfolgreich!' };
            }

            return { success: false, message: 'Ungültige Anmeldedaten!' };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: 'Ein Fehler ist aufgetreten!' };
        }
    }

    /**
     * Logout
     */
    logout() {
        localStorage.removeItem(this.storageKey);
        window.location.href = 'login.html';
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated() {
        try {
            const session = JSON.parse(localStorage.getItem(this.storageKey));

            if (!session) return false;

            // Check if session expired
            if (Date.now() > session.expiresAt) {
                this.logout();
                return false;
            }

            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Get current session
     */
    getSession() {
        try {
            return JSON.parse(localStorage.getItem(this.storageKey));
        } catch (error) {
            return null;
        }
    }

    /**
     * Check session and redirect if needed
     */
    checkSession() {
        const currentPage = window.location.pathname;
        const isAdminPage = currentPage.includes('/admin/') && !currentPage.includes('/admin/login.html');
        const isLoginPage = currentPage.includes('/admin/login.html');

        if (isAdminPage && !this.isAuthenticated()) {
            window.location.href = 'login.html';
        }

        if (isLoginPage && this.isAuthenticated()) {
            window.location.href = 'dashboard.html';
        }
    }

    /**
     * Require authentication (call this on admin pages)
     */
    requireAuth() {
        if (!this.isAuthenticated()) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }

    /**
     * Change password
     */
    changePassword(currentPassword, newPassword) {
        try {
            const stored = JSON.parse(localStorage.getItem(this.credentialsKey));

            if (stored && stored.password === this.hash(currentPassword)) {
                stored.password = this.hash(newPassword);
                localStorage.setItem(this.credentialsKey, JSON.stringify(stored));
                return { success: true, message: 'Passwort erfolgreich geändert!' };
            }

            return { success: false, message: 'Aktuelles Passwort ist falsch!' };
        } catch (error) {
            console.error('Password change error:', error);
            return { success: false, message: 'Ein Fehler ist aufgetreten!' };
        }
    }
}

// Create global instance
window.authManager = new AuthManager();
