import { Modal } from "antd";
import React from "react";
import "react-quill/dist/quill.snow.css";

export default function ModalPreviewBlogs({
    open,
    content = "",
    onClose,
}) {
    return (
        <Modal
            open={open}
            onCancel={onClose}
            onClose={onClose}
            centered
            width={1000}
            onOk={onClose}
        >
            <div
                className="ql-editor"
                data-gramm="false"
                contenteditable="false"
                style={{
                    border: "1px solid #ddd",
                    padding: "5px",
                    minHeight: "300px",
                    overflowY: "auto",
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                }}
                dangerouslySetInnerHTML={{
                    __html: content,
                }}
            />
        </Modal>
    );
}
