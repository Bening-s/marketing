import React, { useEffect, useState } from "react";
import axios from "axios";
import { ConfigProvider, message } from "antd";
import ModalPreviewBlogs from "./components/ModalPreviewBlogs";
import RichTextEditor from "./components/RichTextEditor";
import TableBlogs from "./components/TableBlogs";

function App() {
    const initialState = useState({
        data: null,
        loading: false,
        error: null,
    });

    const [blogs, setBlogs] = useState(initialState);
    const [tags, setTags] = useState(initialState);
    const [categories, setCategories] = useState(initialState);

    const [isCreate, setIsCreate] = useState(false);

    const [isEdit, setIsEdit] = useState(false);
    const [dataEdit, setDataEdit] = useState(null);

    const [isPreview, setIsPreview] = useState(false);
    const [dataPreview, setDataPreview] = useState(null);

    const getTags = async () => {
        try {
            setTags({ data: null, loading: true, error: null });
            const response = await axios.get(
                "https://wise-subtle-longhorn.ngrok-free.app/tags"
            );
            const { data } = response;

            setTags({ data: data.tags, loading: false, error: null });
        } catch (error) {
            console.error(error);
        }
    };

    const getCategory = async () => {
        try {
            setCategories({ data: null, loading: true, error: null });
            const response = await axios.get(
                "https://wise-subtle-longhorn.ngrok-free.app/category"
            );
            const { data } = response;

            setCategories({
                data: data.category,
                loading: false,
                error: null,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const getBlogs = async () => {
        try {
            setBlogs({ data: null, loading: true, error: null });
            const response = await axios.get(
                "https://wise-subtle-longhorn.ngrok-free.app/blogs"
            );
            const { data } = response;
            setBlogs({ data: data.blogs, loading: false, error: null });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getBlogs();
        getTags();
        getCategory();
    }, []);

    const onClickCreate = () => setIsCreate(!isCreate);
    const onClickCancel = () => setIsCreate(!isCreate);

    const handleDelete = (id) => {
        axios
            .delete(`https://wise-subtle-longhorn.ngrok-free.app/blogs/${id}`)
            .then((res) => {
                getBlogs();
                getTags();
                getCategory();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleEdit = (data) => {
        // setDataEdit(data);
        // setIsEdit(!isEdit);
        console.log(data);
    };

    const handlePreview = (data) => {
        setDataPreview(data.content);
        setIsPreview(!isPreview);
    };

    const handleClosePreview = () => setIsPreview(!isPreview);

    const handleSubmit = (data) => {
        axios
            .post("https://wise-subtle-longhorn.ngrok-free.app/blogs", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                getBlogs();
                getTags();
                getCategory();
                setIsCreate(!isCreate);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getBlogs();
    }, []);

    return (
        <ConfigProvider>
            <div className="App">
                <ModalPreviewBlogs
                    open={isPreview}
                    onClose={handleClosePreview}
                    content={dataPreview}
                />
                <TableBlogs
                    loadigs={blogs.loading}
                    blogs={blogs}
                    categories={categories}
                    onClickEdit={handleEdit}
                    tags={tags}
                    onClickCreate={onClickCreate}
                    isCreate={isCreate}
                    onClickPreview={handlePreview}
                    onDelete={handleDelete}
                />

                <RichTextEditor
                    isCreate={isCreate}
                    onSubmit={handleSubmit}
                    isEdit={isEdit}
                    tags={tags}
                    categories={categories}
                    dataEdit={dataEdit}
                    onCancel={onClickCancel}
                />
            </div>
        </ConfigProvider>
    );
}

export default App;
