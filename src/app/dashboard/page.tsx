"use client"
import { useEffect, useState } from "react";

type Product = {
    id: number ,
    name: string,
}

const Dashbord = () => {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {/*
        const resp = await fetch("/api/products");
        const data = await resp.json();
        setProducts(data.products);*/
    }

    return (<div className="container">
        <button className="btn btn-primary">aaaa</button>
    </div>)
}

export default Dashbord;