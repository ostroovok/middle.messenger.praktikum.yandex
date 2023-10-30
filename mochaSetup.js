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
global.Node = jsdom.window.Node;
global.MouseEvent = jsdom.window.MouseEvent;
global.XMLHttpRequest = jsdom.window.XMLHttpRequest;

// mocha
global.describe = describe;
global.it = it;
