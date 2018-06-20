module.exports = {
  activate (state) {
    return require('atom-package-deps').install('tool-bar-jack')
  },

  deactivate () {
    return this.toolBar.removeItems()
  },

  serialize () {},

  consumeToolBar (toolBar) {
    this.toolBar = toolBar('jack-tool-bar')

    this.toolBar.addButton({
      type: 'button',
      icon: 'file',
      callback: 'application:new-file',
      tooltip: 'Create a new empty file',
      iconset: 'mdi'
    })
    this.toolBar.addButton({
      type: 'button',
      icon: 'plus',
      callback: 'tree-view:add-file',
      tooltip: 'Create a new file'
    })
    this.toolBar.addButton({
      type: 'button',
      icon: 'file-directory',
      callback: 'tree-view:add-folder',
      tooltip: 'Create a new folder'
    })

    this.toolBar.addSpacer()

    this.toolBar.addButton({
      type: 'button',
      icon: 'file',
      callback: 'application:open',
      tooltip: 'Open file'
    })
    this.toolBar.addButton({
      type: 'button',
      icon: 'repo',
      callback: 'application:add-project-folder',
      tooltip: 'Open project folder'
    })

    this.toolBar.addSpacer()

    this.toolBar.addButton({
      type: 'button',
      icon: 'file',
      callback: 'core:save',
      tooltip: 'Save'
    })

    let beautifyLoaded = atom.packages.loadedPackages['atom-beautify']
    let splitdiffLoaded = atom.packages.loadedPackages['split-diff']

    if (beautifyLoaded || splitdiffLoaded) {
      this.toolBar.addSpacer()
    }

    if (beautifyLoaded) {
      this.toolBar.addButton({
        type: 'button',
        icon: 'zap',
        callback: 'atom-beautify:beautify-editor',
        tooltip: 'Beautify'
      })
    }

    if (splitdiffLoaded) {
      this.toolBar.addButton({
        type: 'button',
        icon: 'zap',
        callback: 'split-diff:toggle',
        tooltip: 'Toggle Split Diff'
      })
    }

    this.toolBar.addSpacer()

    this.toolBar.addButton({
      type: 'button',
      icon: 'package',
      callback: 'settings-view:install-packages-and-themes',
      tooltip: 'Open install packages view'
    })
    this.toolBar.addButton({
      type: 'button',
      icon: 'settings',
      callback: 'settings-view:open',
      tooltip: 'Open settings'
    })

    if (atom.inDevMode()) {
      this.toolBar.addSpacer()

      this.toolBar.addButton({
        icon: 'refresh',
        callback: 'window:reload',
        tooltip: 'Reload Window',
        iconset: 'ion'
      })
      return this.toolBar.addButton({
        icon: 'terminal',
        callback () {
          return require('remote').getCurrentWindow().toggleDevTools()
        },
        tooltip: 'Toggle Developer Tools'
      })
    }
  }
}
