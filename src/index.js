import { svgDiagramCreate } from './diagram/svg-presenter/svg-diagram-fuctory.js';

// @ts-ignore
const diagram = svgDiagramCreate(document.getElementById('diagram'));

//
// add shape

/** @param {PointerEvent & { currentTarget: Element }} evt */
function shapeAdd(evt) {
	diagram.shapeAdd('shape', {
		templateKey: evt.currentTarget.getAttribute('data-shape'),
		position: { x: 120, y: 120 } //,
		// props: {
		// 	text: { textContent: 'Mars' }
		// }
	});
};
document.getElementById('menu')
	.querySelectorAll('[data-shape]')
	.forEach(itm => itm.addEventListener('click', shapeAdd));

//
// edit shape

/** @param { CustomEvent<IDiagramEventDetail> } evt */
function shapeSelect(evt) {
	// console.log(evt.detail.target);
}
diagram.on('select', shapeSelect);