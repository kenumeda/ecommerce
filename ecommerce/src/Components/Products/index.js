import {
  Card,
  List,
  Image,
  Typography,
  Badge,
  Rate,
  Button,
  message,
  Spin,
} from "antd";
import { useEffect, useState } from "react";
import { addtoCart, getAllProducts, getProductsByCategory } from "../../API";
import { useParams } from "react-router-dom";

function Products() {
  const [loading, setLoading] = useState(false);
  const param = useParams();
  const [items, setItems] = useState([]);
  useEffect(() => {
    setLoading(true);
    (param.categoryId
      ? getProductsByCategory(param.categoryId)
      : getAllProducts()
    ).then((res) => {
      setItems(res.products);
      setLoading(false);
    });
    if (loading) {
      return <Spin spinning />;
    }
  }, [param]);
  return (
    <div>
      <List
        grid={{ column: 3 }}
        renderItem={(product, index) => {
          return (
            <Badge.Ribbon
              classname="itemCardBadge"
              text={product.discountPercentage}
              color="red"
            >
              <Card
                className="itemCard"
                title={product.title}
                key={index}
                cover={
                  <Image className="itemCardImage" src={product.thumbnail} />
                }
                actions={[
                  <Rate allowHalf disabled value={product.rating} />,
                  <AddtoCardButton item={product} />,
                ]}
              >
                <Card.Meta
                  title={
                    <Typography.Paragraph>
                      Price: ${product.price}{" "}
                      <Typography.Text delete type="danger">
                        $
                        {parseFloat(
                          product.price +
                            (product.price * product.discountPercentage) / 100
                        ).toFixed(2)}
                      </Typography.Text>
                    </Typography.Paragraph>
                  }
                  description={
                    <Typography.Paragraph
                      ellipsis={{
                        rows: 2,
                        expandable: true,
                        symbol: "more",
                      }}
                    >
                      {product.description}
                    </Typography.Paragraph>
                  }
                ></Card.Meta>
              </Card>
            </Badge.Ribbon>
          );
        }}
        dataSource={items}
      ></List>
    </div>
  );
}

function AddtoCardButton({ item }) {
  const [loading, setLoading] = useState(false);
  const addProducttoCard = () => {
    setLoading(true);
    addtoCart(item.id).then((res) => {
      message.success(`${item.title}has been added to cart`);
      setLoading(false);
    });
  };

  return (
    <Button
      type="link"
      onClick={() => {
        addProducttoCard();
      }}
      loading={loading}
    >
      {" "}
      Add to Cart
    </Button>
  );
}

export default Products;
