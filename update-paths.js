const fs = require('fs');
const path = require('path');

// Files to update
const htmlFiles = [
    'angebot.html',
    'events.html',
    'ueber-uns.html',
    'kontakt.html',
    'impressum.html',
    'datenschutz.html'
];

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Update CSS path
    content = content.replace(/href="css\/style\.css"/g, 'href="/src/css/style.css"');

    // Update JS paths and add type="module"
    content = content.replace(/src="js\//g, 'type="module" src="/src/js/');

    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
});

console.log('All files updated successfully!');
