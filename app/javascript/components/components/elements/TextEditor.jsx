import React from 'react';
import PropTypes from 'prop-types';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';

import ImageApi from '../api/image-api';

class TextEditor extends React.Component {

    constructor(props) {
        super(props);

        if (_.isEmpty(this.props.content)) {
            this.state = { editorState: EditorState.createEmpty() };
        } else {
            let blocksFromHtml = htmlToDraft(props.content);
            let { contentBlocks, entityMap } = blocksFromHtml;
            let contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
            let editorState = EditorState.createWithContent(contentState);

            this.state = { editorState: editorState };
        }
    }

    setEditorReference(ref) {
        this.editorReference = ref;
    }

    uploadImage(file) {
        return ImageApi.create(null, file).then((image) => {
            return { data: { link: image.url } }
        }).catch((response) => {
            this.setState({
                errors: response.responseJSON.errors
            });
        });
    }

    onEditorClick() {
        this.editorReference.focus();
    }

    handleChange(editorState) {
        this.setState({
            editorState: editorState
        });

        this.props.onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    }

    render() {
        let { onChange, small, ...props } = this.props;

        let smallClassName = small ? 'editor-editor-small' : '';

        return (
            <div className='editor'>
                <div onClick={this.onEditorClick.bind(this)}>
                    <Editor wrapperClassName='editor-wrapper' editorClassName={`editor-editor ${smallClassName}`} toolbarClassName='editor-toolbar'
                        editorState={this.state.editorState} onEditorStateChange={(editorState) => this.handleChange(editorState)}
                        toolbar={{ options: [ 'inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'image', 'history' ], image: { uploadEnabled: true, uploadCallback: (image) => { return this.uploadImage(image) } },
                        colorPicker: { colors: [ 'rgba(255,255,255,0)' ] } }}
                        editorRef={(ref) => this.setEditorReference(ref)} {...props} />
                </div>
            </div>
        );
    }
}

TextEditor.propTypes = {
    onChange: PropTypes.func.isRequired,
    content: PropTypes.string,
    small: PropTypes.bool
};

export default TextEditor;
