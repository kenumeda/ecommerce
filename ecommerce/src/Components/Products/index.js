import { Card, List, Image, Typography } from "antd";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../API";

function Products() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    getAllProducts().then((res) => {
      setItems(res.products);
    });
  }, []);
  return (
    <div>
      <List
        grid={{ colum: 3 }}
        renderItem={(product, index) => {
          return (
            <Card
              title={product.title}
              key={index}
              cover={
                <Image className="itemCardImage" src={product.thumbnail} />
              }
            >
              <Card.Meta
                title={
                  <Typography.Paragraph>
                    Price: ${product.price}{" "}
                    <Typography.Text>
                      {parseFloat}{" "}
                      {product.price +
                        (product.price * product.discountPercentage) / 100)
                        .toFixed(2)}
                    </Typography.Text>
                  </Typography.Paragraph>
                }
              ></Card.Meta>
            </Card>
          );
        }}
        dataSource={items}
      ></List>
    </div>
  );
}

export default Products;
