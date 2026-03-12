/**
 * Schmittl's Cocktailbar - Content Management System
 * Core functionality for managing website content
 */

class ContentManager {
    constructor() {
        this.storageKey = 'schmittls_content';
        this.versionKey = 'schmittls_version';
        this.currentVersion = '1.0.0';
        this.content = this.loadContent();
        this.listeners = new Map();
    }

    /**
     * Load content from localStorage or return default content
     */
    loadContent() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (error) {
            console.error('Error loading content:', error);
        }
        return this.getDefaultContent();
    }

    /**
     * Save content to localStorage
     */
    saveContent() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.content));
            localStorage.setItem(this.versionKey, this.currentVersion);
            this.emit('contentSaved', this.content);
            return true;
        } catch (error) {
            console.error('Error saving content:', error);
            return false;
        }
    }

    /**
     * Get default content structure
     */
    getDefaultContent() {
        return {
            site: {
                name: "Schmittl's Cocktailbar",
                owner: "Patrick Schmitt",
                location: "Schriesheim",
                phone: "+49 123 456789",
                email: "info@schmittls-cocktailbar.de",
                description: "Mobile Cocktailbar im Anhänger - Cocktails, Kaffee & Softeis für Ihre Events",
                socialMedia: {
                    facebook: "",
                    instagram: "",
                    twitter: ""
                }
            },
            pages: {
                home: {
                    hero: {
                        title: "Schmittl's Cocktailbar",
                        subtitle: "Mobile Genusserlebnisse für Ihre Events",
                        description: "Cocktails, Kaffee & Softeis - direkt aus unserem stylischen Anhänger",
                        image: "images/hero/cocktail-trailer.jpg",
                        cta: {
                            primary: "Jetzt anfragen",
                            secondary: "Unser Angebot"
                        }
                    },
                    features: [
                        {
                            id: 1,
                            icon: "🍸",
                            title: "Premium Cocktails",
                            description: "Klassische und moderne Cocktails, frisch zubereitet von erfahrenen Barkeepern"
                        },
                        {
                            id: 2,
                            icon: "☕",
                            title: "Kaffee-Spezialitäten",
                            description: "Erstklassiger Kaffee und Kaffeespezialitäten für jeden Geschmack"
                        },
                        {
                            id: 3,
                            icon: "🍦",
                            title: "Cremiges Softeis",
                            description: "Leckeres Softeis in verschiedenen Sorten mit vielfältigen Toppings"
                        },
                        {
                            id: 4,
                            icon: "🚚",
                            title: "Mobil & Flexibel",
                            description: "Unser Anhänger kommt zu Ihrem Event - egal wo in der Region"
                        },
                        {
                            id: 5,
                            icon: "💳",
                            title: "Alle Zahlungsarten",
                            description: "Bar, EC-Karte oder Kreditkarte - Sie haben die Wahl"
                        },
                        {
                            id: 6,
                            icon: "🎉",
                            title: "Für jeden Anlass",
                            description: "Hochzeiten, Firmenfeiern, Geburtstage oder Stadtfeste"
                        }
                    ]
                },
                about: {
                    title: "Über uns",
                    story: "Schmittl's Cocktailbar wurde von Patrick Schmitt aus Schriesheim gegründet, um Events und Feste mit mobilen Genusserlebnissen zu bereichern. Unser stylischer Anhänger bringt professionelle Barkultur direkt zu Ihnen.",
                    mission: "Wir möchten Ihre Veranstaltung zu etwas Besonderem machen - mit erstklassigen Getränken, professionellem Service und einer einzigartigen Atmosphäre.",
                    team: [
                        {
                            id: 1,
                            name: "Patrick Schmitt",
                            role: "Inhaber & Barkeeper",
                            image: "images/team/patrick.jpg",
                            description: "Gründer von Schmittl's Cocktailbar mit Leidenschaft für perfekte Drinks"
                        }
                    ],
                    gallery: [
                        { id: 1, image: "images/gallery/event-1.jpg", caption: "Hochzeit in Heidelberg" },
                        { id: 2, image: "images/gallery/event-2.jpg", caption: "Firmenevent Mannheim" },
                        { id: 3, image: "images/gallery/event-3.jpg", caption: "Stadtfest Schriesheim" },
                        { id: 4, image: "images/gallery/trailer-1.jpg", caption: "Unser Cocktail-Anhänger" },
                        { id: 5, image: "images/gallery/trailer-2.jpg", caption: "Die Bar von innen" },
                        { id: 6, image: "images/gallery/drinks-1.jpg", caption: "Frisch zubereitete Cocktails" }
                    ]
                }
            },
            products: {
                cocktails: [
                    {
                        id: 1,
                        name: "Mojito",
                        category: "Klassiker",
                        description: "Erfrischender Cocktail mit weißem Rum, Limette, Minze und Soda",
                        image: "images/cocktails/mojito.png",
                        price: "8.50",
                        alcoholic: true
                    },
                    {
                        id: 2,
                        name: "Caipirinha",
                        category: "Klassiker",
                        description: "Brasilianischer Klassiker mit Cachaça, Limetten und braunem Zucker",
                        image: "images/cocktails/caipirinha.png",
                        price: "8.00",
                        alcoholic: true
                    },
                    {
                        id: 3,
                        name: "Aperol Spritz",
                        category: "Klassiker",
                        description: "Italienischer Aperitif mit Aperol, Prosecco und Soda",
                        image: "images/cocktails/aperol-spritz.jpg",
                        price: "7.50",
                        alcoholic: true
                    },
                    {
                        id: 4,
                        name: "Virgin Mojito",
                        category: "Alkoholfrei",
                        description: "Alkoholfreie Variante des Klassikers mit Limette, Minze und Soda",
                        image: "images/cocktails/virgin-mojito.jpg",
                        price: "6.50",
                        alcoholic: false
                    }
                ],
                coffee: [
                    {
                        id: 1,
                        name: "Espresso",
                        description: "Klassischer italienischer Espresso",
                        image: "images/coffee/espresso.jpg",
                        price: "2.50"
                    },
                    {
                        id: 2,
                        name: "Cappuccino",
                        description: "Espresso mit aufgeschäumter Milch",
                        image: "images/coffee/cappuccino.jpg",
                        price: "3.50"
                    },
                    {
                        id: 3,
                        name: "Latte Macchiato",
                        description: "Geschichteter Milchkaffee im Glas",
                        image: "images/coffee/latte.jpg",
                        price: "3.80"
                    }
                ],
                icecream: [
                    {
                        id: 1,
                        name: "Vanille",
                        description: "Klassisches Vanille-Softeis",
                        image: "images/icecream/vanilla.jpg",
                        price: "3.00"
                    },
                    {
                        id: 2,
                        name: "Schokolade",
                        description: "Cremiges Schokoladen-Softeis",
                        image: "images/icecream/chocolate.jpg",
                        price: "3.00"
                    },
                    {
                        id: 3,
                        name: "Swirl",
                        description: "Vanille-Schokolade Mix",
                        image: "images/icecream/swirl.jpg",
                        price: "3.00"
                    }
                ]
            },
            events: [
                {
                    id: 1,
                    title: "Schriesheimer Stadtfest",
                    date: "2026-06-15",
                    location: "Schriesheim Marktplatz",
                    description: "Besuchen Sie uns beim diesjährigen Stadtfest!",
                    image: "images/events/stadtfest.jpg",
                    type: "public"
                },
                {
                    id: 2,
                    title: "Weinbergfest Heidelberg",
                    date: "2026-07-20",
                    location: "Heidelberg",
                    description: "Cocktails mit Aussicht beim Weinbergfest",
                    image: "images/events/weinbergfest.jpg",
                    type: "public"
                }
            ]
        };
    }

    /**
     * Get content by path (e.g., 'pages.home.hero.title')
     */
    get(path) {
        return path.split('.').reduce((obj, key) => obj?.[key], this.content);
    }

    /**
     * Set content by path
     */
    set(path, value) {
        const keys = path.split('.');
        const lastKey = keys.pop();
        const target = keys.reduce((obj, key) => {
            if (!obj[key]) obj[key] = {};
            return obj[key];
        }, this.content);
        target[lastKey] = value;
        this.saveContent();
    }

    /**
     * Add item to array
     */
    addItem(path, item) {
        const array = this.get(path);
        if (Array.isArray(array)) {
            // Generate new ID
            const maxId = array.reduce((max, item) => Math.max(max, item.id || 0), 0);
            item.id = maxId + 1;
            array.push(item);
            this.saveContent();
            return item;
        }
        return null;
    }

    /**
     * Update item in array
     */
    updateItem(path, id, updates) {
        const array = this.get(path);
        if (Array.isArray(array)) {
            const index = array.findIndex(item => item.id === id);
            if (index !== -1) {
                array[index] = { ...array[index], ...updates };
                this.saveContent();
                return array[index];
            }
        }
        return null;
    }

    /**
     * Delete item from array
     */
    deleteItem(path, id) {
        const array = this.get(path);
        if (Array.isArray(array)) {
            const index = array.findIndex(item => item.id === id);
            if (index !== -1) {
                array.splice(index, 1);
                this.saveContent();
                return true;
            }
        }
        return false;
    }

    /**
     * Export content as JSON
     */
    exportContent() {
        const dataStr = JSON.stringify(this.content, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `schmittls-backup-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }

    /**
     * Import content from JSON file
     */
    importContent(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const imported = JSON.parse(e.target.result);
                    this.content = imported;
                    this.saveContent();
                    resolve(true);
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = reject;
            reader.readAsText(file);
        });
    }

    /**
     * Reset to default content
     */
    reset() {
        if (confirm('Möchten Sie wirklich alle Inhalte auf die Standardwerte zurücksetzen?')) {
            this.content = this.getDefaultContent();
            this.saveContent();
            return true;
        }
        return false;
    }

    /**
     * Event system
     */
    on(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(callback);
    }

    emit(event, data) {
        if (this.listeners.has(event)) {
            this.listeners.get(event).forEach(callback => callback(data));
        }
    }
}

// Create global instance
window.contentManager = new ContentManager();
