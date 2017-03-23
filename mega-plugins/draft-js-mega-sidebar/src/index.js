import decorateComponentWithProps from 'decorate-component-with-props';
import createStore from './utils/createStore';
import Sidebar from './components/Sidebar';
import DefaultBlockTypeSelect from './components/DefaultBlockTypeSelect';
import buttonStyles from './buttonStyles.css';
import blockTypeSelectStyles from './blockTypeSelectStyles.css';
import sidebarStyles from './sidebarStyles.css';
import modalStyles from './modalStyles.css';

export default (config = {}) => {
  const defaultTheme = { buttonStyles, blockTypeSelectStyles, sidebarStyles, modalStyles };

  const store = createStore({
    isVisible: false,
  });

  const {
    theme = defaultTheme,
    structure = [
      DefaultBlockTypeSelect
    ]
  } = config;

  const sidebarProps = {
    store,
    structure,
    theme,
  };

  return {
    initialize: ({ setEditorState, getEditorState, getEditorRef }) => {
      store.updateItem('getEditorState', getEditorState);
      store.updateItem('setEditorState', setEditorState);
      store.updateItem('getEditorRef', getEditorRef);
    },
    // Re-Render the sidebar on every change
    onChange: (editorState) => {
      store.updateItem('editorState', editorState);
      return editorState;
    },
    SideToolbar: decorateComponentWithProps(Sidebar, sidebarProps),
  };
};
