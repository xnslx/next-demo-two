import path from 'path';
import fs from 'fs/promises';

import Link from 'next/link';

import Head from 'next/head'
import styles from '../styles/Home.module.css';

function Home(props) {
  const {products} = props;
  return (
    <div>
      {products.map(product => (
        <li key={product.id}><Link href={`/${product.id}`}>{product.title}</Link></li>
      ))}
    </div>
  )
};

export async function getStaticProps(context) {
  console.log('context', context)
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);


  return{
    props:{
      products: data.products
    },
    revalidate: 10
  }
}

export default Home;
