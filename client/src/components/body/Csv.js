
import React, { useMemo, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Message from "../AlertMessage/Message";
const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifycontent: "center",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
    margin: "30px"
};

const activeStyle = {
    borderColor: "#2196f3"
};

const acceptStyle = {
    borderColor: "#00e676"
};

const rejectStyle = {
    borderColor: "#ff1744"
};

function Csv(props) {
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null)
    const [message, setMessage] = useState("")
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
        acceptedFiles,
    } = useDropzone({
        accept: ".csv, text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values",
        noClick: true,
        noKeyboard: true,
        onDrop: acceptedFiles => {
            setFiles(
                acceptedFiles.map(file =>
                    acceptedFiles.forEach((file) => {
                        const reader = new FileReader()

                        reader.onabort = () => console.log('file reading was aborted')
                        reader.onerror = () => console.log('file reading has failed')
                        reader.onload = () => {

                            setSelectedFile(file)
                            const binaryStr = reader.result
                            console.log(binaryStr)
                        }
                        reader.readAsArrayBuffer(file)
                        // Object.assign(file, {
                        //     preview: URL.createObjectURL(file)
                        // })
                    }))
            );
            console.log(files)
        }
    });

    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isDragActive ? activeStyle : { borderColor: "black" }),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {})
        }),
        [isDragActive, isDragReject]
    );
    useEffect(
        () => () => {
            // Make sure to revoke the data uris to avoid memory leaks
            files.forEach(file => URL.revokeObjectURL(file.preview));
        },
        []
    );
    console.log(acceptedFiles)
    var filepath = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    const postData = async (e) => {
        e.preventDefault();
        setSelectedFile(acceptedFiles[0])
        const formData = new FormData();
        formData.append('file', selectedFile);
        console.log(selectedFile);

        const res = await fetch('http://localhost:5000/upload', {
            method: "POST",
            body: formData
        })

        var data = await res.json()
        if (res.status !== 200) {
            console.log(data.message)
            setMessage(data.message);
        }
        else {

            setMessage(data.message);
        }

    }
    var filepathchange
    const onChangeHandle = (e) => {
        setSelectedFile(e.target.files[0])
        console.log(e.target.files[0])
        filepathchange = e.target.files[0].name
        // filepathchange = <li >{e.target.files[0].name} - {e.target.files[0].size} bytes</li>
        // console.log(filepathchange)
    }
    return (
        <div className="container">
            {
                message ? <Message message={message} /> : null
            }
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here</p>
                <em>(Only CSV File will be accepted)</em>
                <div className="mt-3">
                    <input type="file" name="file" accept=".xlsx, .xls, .csv" onChange={onChangeHandle} />
                </div>

            </div>
            <aside>
                <h4 className="ml-5">File</h4>
                <ul>{filepath}</ul>

            </aside>
            <div className="mt-3 d-flex justify-content-center">
                <button type="button" name='file' className="btn btn-primary" onClick={postData}>
                    Add
                </button>
            </div>
        </div>
    );
}

<Csv />

export default Csv