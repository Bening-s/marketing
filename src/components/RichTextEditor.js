import {
    CloseOutlined,
    EditOutlined,
    InboxOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import {
    Button,
    Col,
    Divider,
    Flex,
    Form,
    Input,
    Row,
    Select,
    Switch,
    message,
    Upload,
    Image,
    Popconfirm,
} from "antd";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextEditor = ({
    isCreate = false,
    isEdit = false,
    tags,
    categories,
    onSubmit = () => {},
    onCancel = () => {},
}) => {
    const { TextArea } = Input;
    const { Dragger } = Upload;

    const initialState = {
        name: "",
        description: "",
        content: "",
        status: "",
        categories: [],
        tags: [],
        image: {},
        thumbnail: {},
        short_description: "",
        is_featured: false,
    };

    const status = [
        {
            value: "published",
            label: "Published",
        },
        {
            value: "draft",
            label: "Draft",
        },
    ];

    const [form] = Form.useForm();
    const [content, setContent] = useState(initialState);

    const [thumbnailImage, setThumbnailImage] = useState(null);
    const [blogImage, setBlogImage] = useState(null);

    const handleChange = (info, type) => {
        const { file, fileList } = info;
        console.log(info);

        if (file) {
            const imageFile = fileList[fileList.length - 1];
            const fileUrl = URL.createObjectURL(imageFile.originFileObj);

            if (type === "thumbnail") {
                setThumbnailImage(fileUrl);
                setContent({ ...content, thumbnail: imageFile });
                message.success("Thumbnail image uploaded successfully!");
            } else if (type === "blog") {
                setBlogImage(fileUrl);
                setContent({ ...content, image: imageFile });
                message.success("Blog image uploaded successfully!");
            }
        } else if (file.status === "error") {
            message.error("Image upload failed");
        }
    };

    return (
        <div
            id="blogs-create-edit"
            style={{
                margin: "20px",
                display: isEdit ? "block" : isCreate ? "block" : "none",
            }}
        >
            <div>
                <Divider orientation="left">Create Article</Divider>
                <Popconfirm
                    title="Cancel create article?"
                    description="Are you sure to cancel create article?"
                    okText="Yes"
                    onConfirm={() => {
                        form.setFieldsValue(initialState);
                        setContent(initialState);
                        setThumbnailImage(null);
                        setBlogImage(null);
                        onCancel();
                    }}
                    cancelText="No"
                >
                    <Button type="primary" danger style={{ maergin: "10px" }}>
                        Cancel
                        <CloseOutlined />
                    </Button>
                </Popconfirm>
                <Button
                    type="primary"
                    onClick={() => {
                        const formData = new FormData();
                        formData.append("name", content.name);
                        formData.append("description", content.description);
                        formData.append("content", content.content);
                        formData.append("status", content.status);
                        formData.append("categories", content.categories);
                        formData.append("tags", content.tags);
                        formData.append(
                            "short_description",
                            content.short_description
                        );
                        formData.append("is_featured", content.is_featured);
                        formData.append(
                            "thumbnail",
                            content.thumbnail.originFileObj
                        );
                        formData.append("image", content.image.originFileObj);

                        onSubmit(formData);
                    }}
                    style={{ margin: "10px" }}
                >
                    {isEdit ? "Update" : "Create"}
                    {isEdit ? <EditOutlined /> : <UploadOutlined />}
                </Button>
                <Form
                    form={form}
                    name="create-blogs"
                    initialValues={content}
                    style={{
                        display: "flex",
                        gap: "10px",
                        padding: "5px",
                        flexWrap: "wrap",
                    }}
                    layout="vertical"
                >
                    <Flex gap={"middle"}>
                        <Row
                            gutter={{
                                xs: 1,
                                sm: 2,
                                md: 2,
                                lg: 2,
                                xl: 2,
                                xxl: 2,
                            }}
                            style={{ gap: "5px" }}
                        >
                            <Col className="gutter-row" span={10}>
                                <Form.Item name={"name"} label="Title" required>
                                    <TextArea
                                        autoSize={{ minRows: 2, maxRows: 6 }}
                                        placeholder="Article Title"
                                        onChange={(e) =>
                                            setContent({
                                                ...content,
                                                name: e.target.value,
                                            })
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col className="gutter-row" span={10}>
                                <Form.Item
                                    name={"categories"}
                                    label="Categories"
                                    required
                                >
                                    <Select
                                        mode="multiple"
                                        size={"Large"}
                                        placeholder="Please select"
                                        allowClear
                                        showSearch
                                        defaultValue={content.categories.map(
                                            (item) => item.id
                                        )}
                                        onChange={(e) => {
                                            setContent({
                                                ...content,
                                                categories: e,
                                            });
                                        }}
                                        style={{
                                            width: "100%",
                                        }}
                                        filterOption={(input, option) =>
                                            (option?.label ?? "")
                                                .toLowerCase()
                                                .includes(input.toLowerCase())
                                        }
                                        options={categories?.data?.map(
                                            (item) => ({
                                                value: item.id,
                                                label: item.name,
                                            })
                                        )}
                                    />
                                </Form.Item>
                            </Col>
                            <Col className="gutter-row" span={20}>
                                <Form.Item name={"tags"} label="Tags" required>
                                    <Select
                                        mode="multiple"
                                        size={"Large"}
                                        placeholder="Please select"
                                        allowClear
                                        showSearch
                                        defaultValue={content.tags.map(
                                            (item) => item.id
                                        )}
                                        onChange={(e) => {
                                            setContent({
                                                ...content,
                                                tags: e,
                                            });
                                        }}
                                        style={{
                                            width: "100%",
                                        }}
                                        filterOption={(input, option) =>
                                            (option?.label ?? "")
                                                .toLowerCase()
                                                .includes(input.toLowerCase())
                                        }
                                        options={tags?.data?.map((item) => ({
                                            value: item.id,
                                            label: item.name,
                                        }))}
                                    />
                                </Form.Item>
                            </Col>
                            <Col className="gutter-row" span={10}>
                                <Form.Item
                                    name={"is_featured"}
                                    label="Featured"
                                    required
                                >
                                    <Switch
                                        onChange={(e) =>
                                            setContent({
                                                ...content,
                                                is_featured: e,
                                            })
                                        }
                                        checkedChildren="Featured"
                                        unCheckedChildren="Not Featured"
                                    />
                                </Form.Item>
                            </Col>
                            <Col className="gutter-row" span={10}>
                                <Form.Item
                                    name={"status"}
                                    label="Status"
                                    style={{ width: "auto" }}
                                    required
                                >
                                    <Select
                                        onChange={(e) =>
                                            setContent({
                                                ...content,
                                                status: e,
                                            })
                                        }
                                        options={status}
                                        style={{ width: "150px" }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col className="gutter-row" span={20}>
                                <Form.Item
                                    name={"short_description"}
                                    label="Short Description"
                                    required
                                >
                                    <TextArea
                                        placeholder="Article Short Description"
                                        autoSize={{
                                            minRows: 3,
                                        }}
                                        onChange={(e) =>
                                            setContent({
                                                ...content,
                                                short_description:
                                                    e.target.value,
                                            })
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col className="gutter-row" span={20}>
                                <Form.Item
                                    name={"description"}
                                    label="Description"
                                    required
                                >
                                    <TextArea
                                        placeholder="Article Description"
                                        autoSize={{
                                            minRows: 3,
                                        }}
                                        onChange={(e) =>
                                            setContent({
                                                ...content,
                                                description: e.target.value,
                                            })
                                        }
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Flex vertical gap={"middle"}>
                            <div className="image-uploader-container">
                                {/* Thumbnail Image Uploader */}
                                <div className="image-uploader-section">
                                    <h3>Thumbnail Image</h3>
                                    <Dragger
                                        name="thumbnail"
                                        accept="image/*"
                                        beforeUpload={() => false} // Prevent automatic upload to a server
                                        showUploadList={false} // Hide the default upload list
                                        onChange={(info) =>
                                            handleChange(info, "thumbnail")
                                        }
                                        className="custom-dragger"
                                    >
                                        <p className="ant-upload-drag-icon">
                                            <InboxOutlined />
                                        </p>
                                        <p className="ant-upload-text">
                                            Click or drag an image here to
                                            upload a thumbnail
                                        </p>
                                    </Dragger>

                                    {thumbnailImage && (
                                        <div className="uploaded-image-preview">
                                            <h4>Uploaded Thumbnail</h4>
                                            <Image
                                                src={thumbnailImage}
                                                alt="Thumbnail"
                                                width={200}
                                                height={200}
                                                style={{
                                                    objectFit: "cover",
                                                    borderRadius: 8,
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Blog Image Uploader */}
                                <div className="image-uploader-section">
                                    <h3>Blog Image</h3>
                                    <Dragger
                                        name="blog"
                                        accept="image/*"
                                        beforeUpload={() => false} // Prevent automatic upload to a server
                                        showUploadList={false} // Hide the default upload list
                                        onChange={(info) =>
                                            handleChange(info, "blog")
                                        }
                                        className="custom-dragger"
                                    >
                                        <p className="ant-upload-drag-icon">
                                            <InboxOutlined />
                                        </p>
                                        <p className="ant-upload-text">
                                            Click or drag an image here to
                                            upload a blog image
                                        </p>
                                    </Dragger>

                                    {blogImage && (
                                        <div className="uploaded-image-preview">
                                            <h4>Uploaded Blog Image</h4>
                                            <Image
                                                src={blogImage}
                                                alt="Blog"
                                                width={200}
                                                height={200}
                                                style={{
                                                    objectFit: "cover",
                                                    borderRadius: 8,
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Flex>
                    </Flex>
                </Form>
            </div>
            <div
                style={{
                    display: "flex",
                    gap: "30px",
                    padding: "5px",
                    flexWrap: "wrap",
                }}
            >
                <div
                    style={{
                        flex: 1,
                        minWidth: "50vw",
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "30px",
                    }}
                >
                    <h2 style={{ margin: 0 }}>
                        {isCreate ? "Create" : "Edit"} Content
                    </h2>
                    <ReactQuill
                        value={content.content}
                        onChange={(value) => {
                            setContent({
                                ...content,
                                content: value,
                            });
                        }}
                        theme="snow"
                        modules={{
                            toolbar: [
                                [
                                    { header: [1, 2, 3, 4, 5, 6, false] },
                                    { font: [] },
                                ],
                                [{ list: "ordered" }, { list: "bullet" }],
                                ["bold", "italic", "underline", "strike"],
                                ["blockquote", "code-block"],
                                [{ script: "sub" }, { script: "super" }],
                                [{ align: [] }],
                                ["link", "image"],
                                [{ color: [] }, { background: [] }],
                                // ["clean"],
                            ],
                        }}
                        style={{ height: "450px", background: "white" }}
                    />
                </div>
                <div
                    className="ql-container ql-snow"
                    style={{ flex: 1, border: "0" }}
                >
                    <h2>{isCreate ? "Content" : "Edit"} Output:</h2>
                    <div
                        className="ql-editor"
                        style={{
                            flex: 1,
                            padding: 0,
                            minWidth: "500px",
                            display: "flex",
                            flexDirection: "column",
                        }}
                        data-gramm="false"
                        contenteditable="false"
                    >
                        <div
                            style={{
                                border: "1px solid #ddd",
                                padding: "5px",
                                minHeight: "400px",
                                overflowX: "hidden",
                                overflowY: "auto",
                                backgroundColor: "#fff",
                                borderRadius: "8px",
                                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                            }}
                            dangerouslySetInnerHTML={{
                                __html: content.content.replace(
                                    /<img /g,
                                    '<img style="max-height: 100px; width: auto;" '
                                ),
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RichTextEditor;
