/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
module.exports = {
  activate(state) {
    return require('atom-package-deps').install('tool-bar-jack');
  },

  deactivate() {
    return (this.toolBar != null ? this.toolBar.removeItems() : undefined);
  },

  serialize() {},

  consumeToolBar(toolBar) {
    this.toolBar = toolBar('jack-tool-bar');

    this.toolBar.addButton({
      icon: 'document',
      callback: 'application:new-file',
      tooltip: 'New File',
      iconset: 'ion'
    });
    this.toolBar.addButton({
      icon: 'folder',
      callback: 'application:open-file',
      tooltip: 'Open...',
      iconset: 'ion'
    });
    this.toolBar.addButton({
      icon: 'archive',
      callback: 'core:save',
      tooltip: 'Save',
      iconset: 'ion'
    });

    this.toolBar.addSpacer();

    this.toolBar.addButton({
      icon: 'search',
      callback: 'find-and-replace:show',
      tooltip: 'Find in Buffer',
      iconset: 'ion'
    });
    this.toolBar.addButton({
      icon: 'shuffle',
      callback: 'find-and-replace:show-replace',
      tooltip: 'Replace in Buffer',
      iconset: 'ion'
    });

    this.toolBar.addSpacer();

    this.toolBar.addButton({
      icon: 'navicon-round',
      callback: 'command-palette:toggle',
      tooltip: 'Toggle Command Palette',
      iconset: 'ion'
    });
    this.toolBar.addButton({
      icon: 'gear-a',
      callback: 'settings-view:open',
      tooltip: 'Open Settings View',
      iconset: 'ion'
    });

    if (atom.packages.loadedPackages['atom-beautify']) {
      this.toolBar.addButton({
        'icon': 'star',
        'callback': 'atom-beautify:beautify-editor',
        'tooltip': 'Beautify',
        'iconset': 'fa'
      });
    }

    if (atom.inDevMode()) {
      this.toolBar.addSpacer();

      this.toolBar.addButton({
        icon: 'refresh',
        callback: 'window:reload',
        tooltip: 'Reload Window',
        iconset: 'ion'
      });
      return this.toolBar.addButton({
        icon: 'terminal',
        callback() {
          return require('remote').getCurrentWindow().toggleDevTools();
        },
        tooltip: 'Toggle Developer Tools'
      });
    }
  }
};
