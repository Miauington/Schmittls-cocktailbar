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
                            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 22h8"/><path d="M7 10h10"/><path d="M12 10v12"/><path d="M13.7 2H6.8L6 10h12l-.8-8z"/></svg>',
                            title: "Premium Cocktails",
                            description: "Klassische und moderne Cocktails, frisch zubereitet von erfahrenen Barkeepern"
                        },
                        {
                            id: 2,
                            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" x2="6" y1="2" y2="4"/><line x1="10" x2="10" y1="2" y2="4"/><line x1="14" x2="14" y1="2" y2="4"/></svg>',
                            title: "Kaffee-Spezialitäten",
                            description: "Erstklassiger Kaffee und Kaffeespezialitäten für jeden Geschmack"
                        },
                        {
                            id: 3,
                            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12c.6 5 4.2 8 9.5 8C17 20 21 16 21 10"/><path d="M12 2c0 6-4 9-4 9h8s-4-3-4-9"/><path d="m2 5 1 1"/><path d="m5 2 1 1"/></svg>',
                            title: "Cremiges Softeis",
                            description: "Leckeres Softeis in verschiedenen Sorten mit vielfältigen Toppings"
                        },
                        {
                            id: 4,
                            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/><rect width="13" height="8" x="9" y="12" rx="2"/><path d="M23 17v2a2 2 0 0 1-2 2h-1"/><path d="M1 12h3"/><path d="M9 17h1"/></svg>',
                            title: "Mobil & Flexibel",
                            description: "Unser Anhänger kommt zu Ihrem Event - egal wo in der Region"
                        },
                        {
                            id: 5,
                            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>',
                            title: "Alle Zahlungsarten",
                            description: "Bar, EC-Karte oder Kreditkarte - Sie haben die Wahl"
                        },
                        {
                            id: 6,
                            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
                            title: "Für jeden Anlass",
                            description: "Hochzeiten, Firmenfeiern, Geburtstage oder Stadtfeste"
                        }
                    ]
                },
                about: {
                    title: "Über uns",
                    story: "Schmittl's Cocktailbar wurde von Patrick Schmitt aus Schriesheim gegründet, um Events und Feste mit mobilen Genusserlebnissen zu bereichern. Unser professioneller Cocktail-Anhänger bringt hochwertige Barkultur direkt zu Ihnen.",
                    mission: "Wir möchten Ihre Veranstaltung zu etwas Besonderem machen - mit erstklassigen Getränken, professionellem Service und einer einzigartigen Atmosphäre. Egal ob Hochzeit, Firmenevent oder private Feier - wir sorgen dafür, dass Ihre Gäste begeistert sind!",
                    founder: {
                        name: "Patrick Schmitt",
                        role: "Gründer & Inhaber",
                        image: "images/team/patrick.jpg",
                        location: "Schriesheim",
                        bio: "Patrick Schmitt ist gelernter KFZ-Mechatroniker und aktives Mitglied der Freiwilligen Feuerwehr Schriesheim. Diese Kombination aus handwerklichem Geschick, technischem Verständnis und Teamgeist prägt die professionelle Arbeitsweise von Schmittl's Cocktailbar. Patrick hat seine Leidenschaft für erstklassige Getränke und exzellenten Service zum Beruf gemacht und bringt die gleiche Präzision und Zuverlässigkeit in sein Unternehmen ein, die er aus seinem handwerklichen Hintergrund kennt. Bei der Freiwilligen Feuerwehr lernte er, auch in stressigen Situationen einen kühlen Kopf zu bewahren - eine Fähigkeit, die sich bei Events mit vielen Gästen als unbezahlbar erweist.",
                        expertise: [
                            "Professionelle Barkunst",
                            "Event-Catering",
                            "Mobile Gastronomieleistungen",
                            "Kundenorientierter Service"
                        ]
                    },
                    testimonials: [
                        {
                            id: 1,
                            name: "Familie Müller",
                            event: "Hochzeit",
                            rating: 5,
                            text: "Patrick und sein Team haben unsere Hochzeit zu einem unvergesslichen Erlebnis gemacht. Die Cocktails waren perfekt, der Service professionell und die Gäste begeistert!",
                            date: "2025-08-15"
                        },
                        {
                            id: 2,
                            name: "Firma Tech Solutions GmbH",
                            event: "Firmenjubiläum",
                            rating: 5,
                            text: "Für unser 25-jähriges Firmenjubiläum haben wir Schmittl's Cocktailbar gebucht. Absolute Empfehlung! Zuverlässig, professionell und die Cocktails waren ein Highlight des Abends.",
                            date: "2025-09-20"
                        },
                        {
                            id: 3,
                            name: "Sandra K.",
                            event: "Geburtstagfeier",
                            rating: 5,
                            text: "Perfekte Organisation von Anfang bis Ende. Patrick ist nicht nur ein talentierter Barkeeper, sondern auch ein sympathischer Gastgeber. Vielen Dank für den tollen Abend!",
                            date: "2025-10-10"
                        }
                    ],
                    gallery: [
                        { id: 1, image: "images/gallery/event-1.jpg", caption: "Elegante Hochzeitsfeier" },
                        { id: 2, image: "images/gallery/event-2.jpg", caption: "Professionelles Firmenevent" },
                        { id: 3, image: "images/gallery/event-3.jpg", caption: "Lebendiges Stadtfest" },
                        { id: 4, image: "images/gallery/trailer-1.jpg", caption: "Unsere mobile Cocktailbar" },
                        { id: 5, image: "images/gallery/trailer-2.jpg", caption: "Professionelle Ausstattung" },
                        { id: 6, image: "images/gallery/drinks-1.jpg", caption: "Erstklassige Cocktails" }
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
                        image: "images/cocktails/mojito.jpg",
                        price: "8.50",
                        alcoholic: true
                    },
                    {
                        id: 2,
                        name: "Caipirinha",
                        category: "Klassiker",
                        description: "Brasilianischer Klassiker mit Cachaça, Limetten und braunem Zucker",
                        image: "images/cocktails/caipirinha.jpg",
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
                    title: "Schriesheimer Stadtfest 2026",
                    date: "2026-06-15",
                    time: "14:00 - 22:00 Uhr",
                    location: "Schriesheim Marktplatz",
                    description: "Besuchen Sie uns beim traditionellen Schriesheimer Stadtfest! Genießen Sie erfrischende Cocktails, aromatischen Kaffee und cremiges Softeis in geselliger Atmosphäre auf dem Marktplatz.",
                    image: "images/events/stadtfest.jpg",
                    type: "public",
                    highlights: [
                        "Premium Cocktails",
                        "Kaffeespezialitäten",
                        "Cremiges Softeis",
                        "Zentrale Lage am Marktplatz"
                    ]
                },
                {
                    id: 2,
                    title: "Weinbergfest Heidelberg",
                    date: "2026-07-20",
                    time: "16:00 - 23:00 Uhr",
                    location: "Heidelberger Weinberge",
                    description: "Erleben Sie das einzigartige Ambiente des Heidelberger Weinbergfests! Bei uns erhalten Sie erlesene Cocktails und exzellenten Kaffee mit traumhafter Aussicht über die Stadt.",
                    image: "images/events/weinbergfest.jpg",
                    type: "public",
                    highlights: [
                        "Exklusive Signature Cocktails",
                        "Barista-Kaffeespezialitäten",
                        "Einzigartige Location",
                        "Live-Musik und Weinverkostung"
                    ]
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
