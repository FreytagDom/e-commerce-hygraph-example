import Head from "next/head";

import styles from "../../styles/SingleProduct.module.css";

import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const singlebook = ({ book }) => {
  return (
    <>
      <Head>
        <title>{book.name}</title>
      </Head>
      <div className={styles.single_container}>
        <div className={styles.left_section}>
          <img src={book.image.url} className={styles.left_img} alt="" />
        </div>
        <div className={styles.right_section}>
          <h3 className={styles.title}>{book.name}</h3>
          <p className={styles.price}>€{book.price}</p>
          <div
            className={styles.para}
            dangerouslySetInnerHTML={{
              __html: book.description.html,
            }}
          ></div>
          <button
            className="btn snipcart-add-item"
            data-item-id={book.id}
            data-item-price={book.price}
            data-item-url={`books/${book.slug}`}
            data-item-image={book.image.url}
            data-item-name={book.name}
          >
            Add to cart 🛒
          </button>
        </div>
      </div>
    </>
  );
};

export default singlebook;

export async function getStaticProps({ params }) {
  const client = new ApolloClient({
    uri: "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clf6wzca26aul01um3xuq2otf/master",
    cache: new InMemoryCache(),
  });

  const data = await client.query({
    query: gql`
      query MyQuery($slug: String) {
        book(where: { slug: $slug }) {
          id
          name
          price
          slug
          image {
            url
          }
          description {
            html
          }
        }
      }
    `,
    variables: {
      slug: params.bookslug,
    },
  });

  const book = data.data.book;

  return {
    props: {
      book,
    },
  };
}

export async function getStaticPaths() {
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
        }
      }
    `,
  });

  const paths = data.data.books.map((singleBook) => {
    return {
      params: {
        bookslug: singleBook.slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
