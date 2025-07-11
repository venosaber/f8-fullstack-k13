"use client"
import {useParams} from "next/navigation";

export default function (){
    const {id} = useParams();

    console.log('id', id)

    return (
        <>
            <h1>Products Detail {id}</h1>
            {/*<span>products detail {id}</span>*/}
        </>
    )
}