import Head from "next/head";
import styles from "../../styles/SingleProduct.module.css";
import Image from "next/image";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Link from "next/link";

const singlebook = ({ book }) => {
  return (
    <>
      <Head>
        <title>{book.name}</title>
      </Head>
      <div className={styles.single_container}>
        <div className={styles.left_section}>
          <Image
            src={book.image.url}
            className={styles.left_img}
            alt=""
            width={80}
            height={120}
          />
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
          <button className={styles.button}>
            <Link href="/">
              <svg
                height="16"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                viewBox="0 0 1024 1024"
              >
                <path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path>
              </svg>
              <span className={styles.btn_title}>Back</span>
            </Link>
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
          beschreibung {
            text
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
          beschreibung {
            text
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
