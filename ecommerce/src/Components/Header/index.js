import { Badge, Menu } from "antd";
import Typography from "antd/es/typography/Typography";
import { useNavigate } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Drawer from "rc-drawer";

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
  return (
    <div>
      <Badge count={7} className="shoppingCartIcon">
        <ShoppingCartOutlined />
      </Badge>
      <Drawer open={}></Drawer>
    </div>
  );
}


export default AppHeader;


