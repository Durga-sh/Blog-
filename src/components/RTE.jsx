import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "" }) {
  // Local state for real-time updates
  const [editorContent, setEditorContent] = useState(defaultValue);

  return (
    <div className="w-full">
      {/* Label */}
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      {/* TinyMCE Editor with react-hook-form Controller */}
      <Controller
        name={name || "content"}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey="b6y81j0mqwxg6812xxnc6zb44stldtbcngetll0ofygmek5q" // Replace with your TinyMCE API key
            value={editorContent} // Controlled Component
            onEditorChange={(content) => {
              setEditorContent(content); // Update local state in real-time
              onChange(content); // Update form control
            }}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "advlist autolink lists link image charmap preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table code help wordcount"
              ],
              toolbar:
                "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
            }}
          />
        )}
      />

      {/* Real-Time Live Preview */}
      <h3 className="mt-4">Real-Time Preview:</h3>
      <div className="p-3 border rounded shadow-sm bg-white">
        <div dangerouslySetInnerHTML={{ __html: editorContent }} />
      </div>
    </div>
  );
}
