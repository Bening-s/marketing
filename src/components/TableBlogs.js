import {
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import { Button, Popconfirm, Table, Tag } from "antd";
import React from "react";

export default function TableBlogs({
    blogs,
    onClickCreate,
    isCreate,
    onClickEdit,
    onClickPreview,
    onDelete,
}) {
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name-blogs",
            width: "20%",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description-blogs",
            width: "20%",
            responsive: ["md"],
            render: (a, b) => {
                return (
                    <>{a.trim().length > 100 ? a.slice(0, 100) + "..." : a}</>
                );
            },
        },
        {
            title: "Short Description",
            dataIndex: "short_description",
            key: "short-description-blogs",
            width: "20%",
            responsive: ["md"],
            render: (a, b) => {
                return (
                    <>{a.trim().length > 100 ? a.slice(0, 100) + "..." : a}</>
                );
            },
        },
        {
            title: "Posted At",
            dataIndex: "created_at",
            key: "posted_at-blogs",
            width: "10%",
            render: (a, b) => {
                return (
                    <>
                        {new Date(a).toLocaleString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            hour12: false,
                        })}
                    </>
                );
            },
        },
        {
            title: "Featured",
            dataIndex: "is_featured",
            align: "center",
            key: "status",
            width: "10%",
            render: (a, b) => {
                return (
                    <div>
                        {a ? (
                            <Tag color="success">Yes</Tag>
                        ) : (
                            <Tag color="error">No</Tag>
                        )}
                    </div>
                );
            },
        },
        {
            title: "Views",
            dataIndex: "total_view",
            align: "center",
            key: "status",
        },
        {
            title: "Status",
            dataIndex: "status",
            align: "center",
            key: "status",
            width: "10%",
        },
        {
            title: "Action",
            dataIndex: "",
            align: "center",
            key: "blogs-action",
            render: (a, b) => {
                return (
                    <div>
                        <Button
                            type="primary"
                            onClick={() => {
                                onClickEdit(b);
                            }}
                        >
                            <EditOutlined />
                        </Button>
                        <Popconfirm
                            title="Are you sure?"
                            onConfirm={() => onDelete(b.id)}
                            cancelText="No"
                            okText="Yes"
                            placement="left"
                        >
                            <Button type="primary" danger>
                                <DeleteOutlined />
                            </Button>
                        </Popconfirm>
                        <Button
                            type="primary"
                            onClick={() => onClickPreview(b)}
                            success
                        >
                            <EyeOutlined />
                        </Button>
                    </div>
                );
            },
        },
    ];
    return (
        <div style={{ margin: "15px" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <h2 style={{ margin: "10px", display: "flex" }}>
                    Article List
                </h2>
                <Button
                    type="primary"
                    style={{ margin: "10px", display: "flex" }}
                    onClick={() => {
                        onClickCreate();
                        const targetElement =
                            document.getElementById("blogs-create-edit");

                        targetElement.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                            inline: "nearest",
                        });
                    }}
                    disabled={isCreate}
                >
                    Create <PlusOutlined />
                </Button>
            </div>
            <Table columns={columns} dataSource={blogs.data} bordered />
        </div>
    );
}
