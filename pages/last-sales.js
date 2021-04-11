import {useEffect, useState} from 'react';
import useSWR from 'swr';

function LastSalesPage(props) {

    const [sales, setSales] = useState(props.sales);
    // const [isLoading, setIsLoading] = useState(false);

    const {data, error} = useSWR('https://nextjs-course-b94e9-default-rtdb.firebaseio.com/sales.json')

    useEffect(() => {
        if(data) {
            const transformedSales = [];

            for(const key in data) {
                transformedSales.push({
                    id:key,
                    username:data[key].username,
                    volume: data[key].volume
                })
            }
            setSales(transformedSales)
        }
    },[data])

    if(error) {
        return(
            <p>Failed to load.</p>
        )
    }

    if(!data && !sales) {
        return(
            <p>Loading...</p>
        )
    }



    // useEffect(() => {
    //     setIsLoading(true)
    //     fetch('https://nextjs-course-b94e9-default-rtdb.firebaseio.com/sales.json')
    //         .then(response => response.json())
    //         .then(data => {
    //         console.log('data',data)
    //         const transformedSales = [];

    //         for(const key in data) {
    //             transformedSales.push({
    //                 id:key,
    //                 username:data[key].username,
    //                 volume: data[key].volume
    //             })
    //         }
    //         setSales(transformedSales)
    //         setIsLoading(false)
    //     })
    // },[])

    // if(isLoading) {
    //     return (
    //         <p>Loading...</p>
    //     )
    // }
    // if(!sales) {
    //     return(
    //         <p>No data yet.</p>
    //     )
    // }
    return(
        <ul>
            {sales.map(sale => (
                <li key={sale.id}>{sale.username} - ${sale.volume}</li>
            ))}
        </ul>
    )
};

export async function getStaticProps() {
    const response = await fetch('https://nextjs-course-b94e9-default-rtdb.firebaseio.com/sales.json')
    const data = await response.json()

    const transformedSales = [];

    for(const key in data) {
        transformedSales.push({
            id:key,
            username:data[key].username,
            volume: data[key].volume
        })
    }
    return {
        props: {sales: transformedSales}, revalidate:10
    }
}

export default LastSalesPage;