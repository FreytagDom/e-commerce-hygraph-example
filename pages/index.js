import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Image from "next/image";

export default function Home({ allBooks }) {
  return (
    <>
      <Head>
        <title>Books | Home</title>
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>
          All my Books <span>📙</span>
        </h1>
        <div className={styles.products_container}>
          {allBooks.map((product) => {
            return (
              <div className={styles.product_card} key={product.id}>
                <Link href={`books/${product.slug}`}>
                  <div className={styles.flip_card}>
                    <div className={styles.flip_card_inner}>
                      <div className={styles.flip_card_front}>
                        <Image
                          className={styles.product_img}
                          src={product.image.url}
                          alt={product.name}
                          width={120}
                          height={220}
                        />
                      </div>
                      <div className={styles.flip_card_back}>
                        <p className={styles.titles}>
                          {product.beschreibung.text}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className={styles.product_content}>
                  <h3>{product.name}</h3>
                  <p>€{product.price}</p>
                  <button
                    className="btn snipcart-add-item"
                    data-item-id={product.id}
                    data-item-price={product.price}
                    data-item-url={`books/${product.slug}`}
                    data-item-image={product.image.url}
                    data-item-name={product.name}
                  >
                    Add to cart 🛒
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clf6wzca26aul01um3xuq2otf/master",
    cache: new InMemoryCache(),
  });

  const data = await client.query({
    query: gql`
      query MyQuery {
        books {
          id
          name
          slug
          price
          image {
            url
          }
          beschreibung {
            text
          }
        }
      }
    `,
  });

  const allBooks = data.data.books;

  return {
    props: {
      allBooks,
    },
  };
}
