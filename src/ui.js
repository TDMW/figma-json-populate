import './ui.css';
// ToDo: Multiple elements selection
document.getElementById('replace').onclick = () => {
	const body = 'Replaced text string';
	parent.postMessage({ pluginMessage: { type: 'cancel', body } }, '*');
};
document.getElementById('cancel').onclick = () => {
	parent.postMessage({ pluginMessage: { type: 'cancel', body } }, '*');
};
