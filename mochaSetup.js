import { JSDOM } from 'jsdom';
import { describe, it } from 'mocha';

// jsdom
const jsdom = new JSDOM(
   `<body>
        <div id="app"></div>
    </body>`,
	{ url: 'https://localhost:3000' },
);

global.window = jsdom.window;
global.document = jsdom.window.document;

// mocha
global.describe = describe;
global.it = it;
