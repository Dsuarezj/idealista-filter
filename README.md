# Idealista Filter Extension

This Chrome extension helps you filter listings on Idealista by highlighting listings that have red flags on their description. It allows you to configure custom red flags and provides recommended red flags for buying or renting properties.

## Installation

1. Clone the repository or download the ZIP file and extract it.
1. Open Google Chrome and navigate to `chrome://extensions/`.
1. Enable "Developer mode" by toggling the switch in the top right corner.
1. Click on the "Load unpacked" button and select the `chrome_extension` directory.

## Usage

1. Click on the extension icon in the Chrome toolbar to open the configuration popup and configure for the first time.
1. Enter your custom red flags in the textarea, separated by commas.
1. Click the "Submit" button to save your configuration.
1. Optionally, click the "Load recommend red flags" button to load recommended red flags for buying or renting properties.
1. Refresh the Idealista page to see the highlighted listings.
1. Once the config is save it will load automatic the red flags next time. This information will be stored on the localStorage of Idealista.  

## Files

- `background.js`: Handles background tasks and communication between the popup and content scripts.
- `index.html`: The configuration popup HTML file.
- `index.js`: The configuration popup JavaScript file.
- `manifest.json`: The extension manifest file.
- `script.js`: The content script that runs on Idealista pages and highlights listings with red flags.
