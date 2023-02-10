import {
  Badge,
  Button,
  Drawer,
  Form,
  Input,
  InputNumber,
  Menu,
  Table,
} from "antd";
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
  const [checkOutDrawOpen, setCheckOutDrawOpen] = useState(false);
  useEffect(() => {
    getCard().then((res) => {
      setcartItems(res.products);
    });
  }, []);
  const onConfirmedOrder = (values) => {};
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
        contentWrapperStyle={{ width: 500 }}
      >
        <Table
          pagination={false}
          columns={[
            {
              title: "Title",
              dataIndex: "title",
            },
            {
              title: "Pricee",
              dataIndex: "price",
              render: (value) => {
                return <span>${value}</span>;
              },
            },
            {
              title: "Quantity",
              dataIndex: "quantity",
              render: (value, record) => {
                return (
                  <InputNumber
                    min={0}
                    defaultValue={value}
                    onChange={(value) => {
                      setcartItems((pre) =>
                        pre.map((cart) => {
                          if (record.id === cart.id) {
                            cart.total = cart.price * value;
                          }
                          return cart;
                        })
                      );
                    }}
                  ></InputNumber>
                );
              },
            },
            {
              title: "Total",
              dataIndex: "total",
              render: (value) => {
                return <span>${value}</span>;
              },
            },
          ]}
          dataSource={cartItems}
          summary={(data) => {
            const total = data.reduce((pre, current) => {
              return pre + current.total;
            }, 0);
            return <span>Total: {total}</span>;
          }}
        />
        <Button
          onClick={() => {
            setCheckOutDrawOpen(true);
          }}
          type="primary"
        >
          Checkout Your Cart
        </Button>
      </Drawer>
      <Drawer
        open={checkOutDrawOpen}
        onClose={() => {
          setCheckOutDrawOpen(false);
        }}
        title="Confirm Order"
      >
        <Form onFinish={onConfirmedOrder}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter your full name",
              },
            ]}
            label="Full Name"
            name="full_name"
          >
            <Input placeholder="Enter your full name"></Input>
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter your email",
              },
            ]}
            label="Email"
            name="email"
          >
            <Input placeholder="Enter your email"></Input>
          </Form.Item>
          <Form.Item label="Address" name="your_address">
            <Input placeholder="Enter your address"></Input>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Confirm Order
          </Button>
        </Form>
      </Drawer>
    </div>
  );
}

export default AppHeader;
