import React from 'react'
import {Editor} from '@tinymce/tinymce-react';
import {Controller} from 'react-hook-form'; // controller lets you wrap uncontrolled componenets like editor so that they can work seamlessly with react-hook-form(rhf)
import conf from '../conf/conf';

export default function RTE({name, control, label, defaultValue =""}) {
    // name : form field name
    // control : The form control object from useForm() in react-hook-form
    // label : label displayed above editor
    // defaultValue : default text inside editor
  return (
    <div className='w-full'> 
    {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

    <Controller
    name={name || "content"}
    control={control}
    render={({field: {onChange,value}}) => ( //render is controller prop , field is a object 
        // as rhf doesnt know when text inside tinymce editor changes, we will connect it to tiny mce editor below 
        <Editor
        apiKey={conf.tinyMceKey}
        initialValue={defaultValue}
        init={{
            initialValue: defaultValue,
            height: 500,
            menubar: true,
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
        value={value} //value is from field prop of controller . it tells Editor “Here’s the latest text from form state”.
        onEditorChange={onChange} //  oneditor change is a callback function that TinyMCE will call every time the editor’s content changes.
        // thus whenever text changes inside editor, onEditorCHange is fired 
        // in turn, onchange is also fired to update react-hook-form that text change has been made
        // so now, rhf can update its internal form state with new text
        />
    )}
    />

     </div>
  )
}
// workflow
// 1. i type inside tinymce editor
// 2. editor detect typing and calls oneditorchange
// 3. oneditorchange =? onchange is triggered
// 4. when onchange is trigerred, 
// This tells React Hook Form: “The field named content has a new value (newContent).”
// RHF updates its internal form state.
