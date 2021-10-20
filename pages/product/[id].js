import SingleProduct from '../../components/SingleProduct';

export default function SingleProductPage({ query }) {
  console.log(query.id);
  return <SingleProduct id={query.id} />;
}
