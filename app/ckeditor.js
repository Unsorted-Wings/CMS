import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor';
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor';

ClassicEditor.builtinPlugins.push(FontColor, FontBackgroundColor);

ClassicEditor.defaultConfig = {
  toolbar: {
    items: [
      'heading', '|',
      'fontColor', 'fontBackgroundColor', '|',
      'bold', 'italic', 'underline', '|',
      'numberedList', 'bulletedList', '|',
      'blockQuote', 'insertTable', 'mediaEmbed', '|',
      'undo', 'redo'
    ],
  },
  language: 'en'
};

export default ClassicEditor;
