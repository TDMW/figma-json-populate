var __awaiter =
	(this && this.__awaiter) ||
	function(thisArg, _arguments, P, generator) {
		return new (P || (P = Promise))(function(resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator['throw'](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done
					? resolve(result.value)
					: new P(function(resolve) {
							resolve(result.value);
					  }).then(fulfilled, rejected);
			}
			step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
	};
// Start plugin and show the UI
figma.showUI(__html__);
// Get first selected node
let node = figma.currentPage.selection[0];
figma.ui.onmessage = msg =>
	__awaiter(this, void 0, void 0, function*() {
		if (msg.type === 'replace-text') {
			// Create const and assign it the selection
			const node = figma.currentPage.selection[0];
			// Check if anything is selected and if it's a text layer
			if (!node || node.type != 'TEXT') {
				console.log('No text selected'); // Show error in UI
				figma.closePlugin();
			}
			// Pick value from 'data' sheet
			// Run replaceText function and pass it the node and replacement text
			replaceText(node, msg.body);
		}
	});
function replaceText(node, body) {
	return __awaiter(this, void 0, void 0, function*() {
		// Get the font of the selected node and load it async
		yield figma.loadFontAsync(node.fontName);
		// Set the node it's characters to the message we passed to this function
		node.characters = String(body);
		// Close the plugin
		figma.closePlugin();
	});
}
