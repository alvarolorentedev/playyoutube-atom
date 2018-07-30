'use babel';

import PlayyoutubeAtomView from './playyoutube-atom-view';
import { CompositeDisposable } from 'atom';

export default {

  playyoutubeAtomView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.playyoutubeAtomView = new PlayyoutubeAtomView(state.playyoutubeAtomViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.playyoutubeAtomView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'playyoutube-atom:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.playyoutubeAtomView.destroy();
  },

  serialize() {
    return {
      playyoutubeAtomViewState: this.playyoutubeAtomView.serialize()
    };
  },

  toggle() {
    console.log('PlayyoutubeAtom was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
