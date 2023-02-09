import { Badge, Drawer, Menu, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

import Typography from "antd/es/typography/Typography";
import { getCard } from "../../API";

function AppHeader() {
  const navigate = useNavigate();

  const onMenuClick = (item) => {
    navigate(`/${item.key}`);
  };
  return (
    <div className="appHeader">
      <Menu
        onClick={onMenuClick}
        mode="horizontal"
        items={[
          {
            label: "Home",
            key: "",
          },
          {
            label: "Men",
            key: "men",
            children: [
              {
                label: "Mens Shirts",
                key: "mens-shirts",
              },
              {
                label: "Mens Shoes",
                key: "mens-shoes",
              },
              {
                label: "Mens Watches",
                key: "mens-watches",
              },
            ],
          },
          {
            label: "Women",
            key: "women",
            children: [
              {
                label: "Womens Dresses",
                key: "womens-dresses",
              },
              {
                label: "Womens Watches",
                key: "womens-watches",
              },
              {
                label: "Womens Bags",
                key: "womens-bags",
              },
            ],
          },
          {
            label: "Electronics",
            key: "electronics",
          },
        ]}
      />
      <Typography.Title>Ken's Store</Typography.Title>
      <AppCart />
    </div>
  );
}

function AppCart() {
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [cartItems, setcartItems] = useState([]);
  useEffect(() => {
    getCard().then((res) => {
      setcartItems(res.products);
    });
  }, []);

  return (
    <div>
      <Badge
        onClick={() => {
          setCartDrawerOpen(true);
        }}
        count={2}
        className="shoppingCartIcon"
      >
        <ShoppingCartOutlined />
      </Badge>
      <Drawer
        open={cartDrawerOpen}
        onClose={() => {
          setCartDrawerOpen(false);
        }}
        title="Your Cart"
      >
        <Table
          columns={[
            {
              title: "Title",
              dataIndex: "title",
            },
            {
              title: "Pricee",
              dataIndex: "price",
            },
            {
              title: "Quantatity",
              dataIndex: "quantatiy",
            },
            {
              title: "Total",
              dataIndex: "total",
            },
          ]}
        />
      </Drawer>
    </div>
  );
}

export default AppHeader;
