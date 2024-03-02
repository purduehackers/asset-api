'use client'
import Image from "next/image";
import Copy from "../components/copy";
import { useState, useEffect } from "react";
import styles from './styles.module.css'

const ProjectPage = () => {
    const [keys, setKeys] = useState([])

    const fetchAndSetKeys = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/keys` || '')
        const data = await response.json();
        setKeys(data.keys)
    }
    
    useEffect(() => {
        fetchAndSetKeys()
    }, [])

    return (
        <table className={styles.AssetsTable}>
            <thead>
                <tr>
                    <th>slug</th>
                    <th>preview</th>
                    <th>url</th>
                    <th>action</th>
                </tr>
            </thead>
            <tbody>
                {keys && keys.map((key) => {
                    const url = `http://localhost:3000/api/${key}`;
                    return (
                        <tr key={key}>
                            <th>{key}</th>
                            <th><Image src={url} alt={key} width={100} height={100}/></th>
                            <th>{url} <Copy url={url}/></th>
                            <th>edit</th>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default ProjectPage;