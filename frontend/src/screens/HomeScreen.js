import { useEffect, useReducer} from 'react';
import axios from 'axios';
//import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import InfiniteScroll from 'react-infinite-scroll-component'
import LoadingBox from '../components/LoadingBox';
//import MessageBox from '../components/MessageBox';
import Container from 'react-bootstrap/esm/Container';
import Slider from '../components/Slider';


const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function HomeScreen() {

  const [{ loading, error, products }, dispatch] = useReducer((reducer), {
    products: [],
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }

      // setProducts(result.data);
    };
    fetchData();
  }, []);
  const sliderproducts = products.slice(7, 20)

  return (
    loading ? <LoadingBox /> :(
    <Container fluid>
      <Helmet>
        <title>UG YARD</title>
      </Helmet>
     

  {/*     <h1 className='featured'>Featured This Week</h1>
        <Slider products={products}/>

 */}
      <h1 className='featured d-flex justify-content-center'>For Your Eyes</h1>

      <div className="products">

          <InfiniteScroll
          dataLength={products.length}
          hasMore={true}
          next={products.fetchMoreData}
          >
            <Row>
            {products && products.map && products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={4} className="mb-3">
                <Product product={product}></Product>
              </Col>
            )).slice(1, 100).reverse()}
            </Row>
          </InfiniteScroll>       
      </div>    
    </Container>
    )
  )
}
