/**
 * Schmittl's Cocktailbar - Inline Editor
 * WYSIWYG editing functionality for content
 */

class InlineEditor {
    constructor() {
        this.editMode = false;
        this.editableElements = new Map();
        this.init();
    }

    /**
     * Initialize inline editor
     */
    init() {
        // Check if user is authenticated
        if (!window.authManager || !window.authManager.isAuthenticated()) {
            return;
        }

        // Add edit mode toggle button
        this.addEditModeToggle();
    }

    /**
     * Add edit mode toggle button
     */
    addEditModeToggle() {
        const button = document.createElement('button');
        button.id = 'edit-mode-toggle';
        button.innerHTML = '✏️ Bearbeitungsmodus';
        button.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 12px 24px;
      background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%);
      color: #1a1a2e;
      border: none;
      border-radius: 50px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
      z-index: 10000;
      transition: all 0.3s ease;
    `;

        button.addEventListener('click', () => this.toggleEditMode());
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
            button.style.boxShadow = '0 6px 20px rgba(212, 175, 55, 0.6)';
        });
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = '0 4px 15px rgba(212, 175, 55, 0.4)';
        });

        document.body.appendChild(button);
    }

    /**
     * Toggle edit mode
     */
    toggleEditMode() {
        this.editMode = !this.editMode;
        const button = document.getElementById('edit-mode-toggle');

        if (this.editMode) {
            button.innerHTML = '✓ Speichern';
            button.style.background = 'linear-gradient(135deg, #00f5ff 0%, #8338ec 100%)';
            this.enableEditing();
            this.showEditToolbar();
        } else {
            button.innerHTML = '✏️ Bearbeitungsmodus';
            button.style.background = 'linear-gradient(135deg, #d4af37 0%, #f4d03f 100%)';
            this.saveChanges();
            this.disableEditing();
            this.hideEditToolbar();
        }
    }

    /**
     * Enable editing for all content elements
     */
    enableEditing() {
        // Make text elements editable
        const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, li');
        textElements.forEach(el => {
            // Skip navigation and footer elements
            if (el.closest('.navbar') || el.closest('.footer') || el.closest('#edit-toolbar')) {
                return;
            }

            el.contentEditable = true;
            el.style.outline = '2px dashed rgba(212, 175, 55, 0.3)';
            el.style.outlineOffset = '4px';
            el.style.cursor = 'text';

            // Store original content
            this.editableElements.set(el, {
                original: el.innerHTML,
                path: el.dataset.contentPath
            });

            // Add focus effect
            el.addEventListener('focus', () => {
                el.style.outline = '2px solid var(--color-accent-gold)';
            });

            el.addEventListener('blur', () => {
                el.style.outline = '2px dashed rgba(212, 175, 55, 0.3)';
            });
        });

        // Make images clickable for replacement
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (img.closest('.navbar') || img.closest('.footer')) {
                return;
            }

            img.style.cursor = 'pointer';
            img.style.outline = '2px dashed rgba(0, 245, 255, 0.3)';
            img.style.outlineOffset = '4px';

            img.addEventListener('click', () => this.changeImage(img));
        });
    }

    /**
     * Disable editing
     */
    disableEditing() {
        this.editableElements.forEach((data, el) => {
            el.contentEditable = false;
            el.style.outline = '';
            el.style.cursor = '';
        });

        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.style.cursor = '';
            img.style.outline = '';
        });
    }

    /**
     * Show edit toolbar
     */
    showEditToolbar() {
        const toolbar = document.createElement('div');
        toolbar.id = 'edit-toolbar';
        toolbar.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      background: rgba(31, 31, 58, 0.95);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(212, 175, 55, 0.2);
      border-radius: 12px;
      padding: 16px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
      z-index: 9999;
      min-width: 200px;
    `;

        toolbar.innerHTML = `
      <div style="color: var(--color-accent-gold); font-weight: 600; margin-bottom: 12px;">
        Bearbeitungsmodus aktiv
      </div>
      <div style="color: var(--color-text-muted); font-size: 0.875rem; margin-bottom: 16px;">
        Klicken Sie auf Texte zum Bearbeiten oder auf Bilder zum Austauschen.
      </div>
      <button onclick="inlineEditor.cancelEdit()" style="
        width: 100%;
        padding: 8px;
        background: rgba(239, 71, 111, 0.2);
        border: 1px solid var(--color-error);
        border-radius: 6px;
        color: var(--color-text);
        cursor: pointer;
        transition: all 0.2s;
      " onmouseover="this.style.background='rgba(239, 71, 111, 0.3)'" onmouseout="this.style.background='rgba(239, 71, 111, 0.2)'">
        Abbrechen
      </button>
    `;

        document.body.appendChild(toolbar);
    }

    /**
     * Hide edit toolbar
     */
    hideEditToolbar() {
        const toolbar = document.getElementById('edit-toolbar');
        if (toolbar) {
            toolbar.remove();
        }
    }

    /**
     * Change image
     */
    changeImage(img) {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';

        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    img.src = event.target.result;
                    this.showNotification('Bild geändert. Klicken Sie auf "Speichern" um die Änderung zu übernehmen.', 'info');
                };
                reader.readAsDataURL(file);
            }
        });

        input.click();
    }

    /**
     * Save changes
     */
    saveChanges() {
        let changesMade = false;

        this.editableElements.forEach((data, el) => {
            if (el.innerHTML !== data.original) {
                changesMade = true;
                // In a real implementation, save to contentManager with the path
                console.log('Content changed:', el.innerHTML);
            }
        });

        if (changesMade) {
            // Save to localStorage
            if (window.contentManager) {
                window.contentManager.saveContent();
            }
            this.showNotification('Änderungen gespeichert!', 'success');
        }

        this.editableElements.clear();
    }

    /**
     * Cancel editing
     */
    cancelEdit() {
        this.editableElements.forEach((data, el) => {
            el.innerHTML = data.original;
        });

        this.editMode = false;
        const button = document.getElementById('edit-mode-toggle');
        button.innerHTML = '✏️ Bearbeitungsmodus';
        button.style.background = 'linear-gradient(135deg, #d4af37 0%, #f4d03f 100%)';

        this.disableEditing();
        this.hideEditToolbar();
        this.editableElements.clear();

        this.showNotification('Änderungen verworfen.', 'info');
    }

    /**
     * Show notification
     */
    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 16px 24px;
      background: rgba(31, 31, 58, 0.95);
      backdrop-filter: blur(10px);
      border-radius: 12px;
      color: var(--color-text);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
      z-index: 10001;
      animation: slideInRight 0.3s ease-out;
      border-left: 4px solid ${type === 'success' ? '#06d6a0' : type === 'error' ? '#ef476f' : '#00f5ff'};
    `;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize inline editor if authenticated
if (window.authManager && window.authManager.isAuthenticated()) {
    window.inlineEditor = new InlineEditor();
}
