import "./Plans.css";

// TODO: IMPLEMENT STRIPE INTEGRATION w/ FIREBASE

export const Plans = () => {
  let products = [
    {
      name: "Premium",
      description: "4K +  HDR",
      role: null,
      id: 0,
      active: true,
      price: "$19.99",
    },
    {
      name: "Standard",
      description: "1080p",
      role: null,
      id: 0,
      price: "$15.49",
    },
    {
      name: "Basic",
      description: "720p with ads",
      role: null,
      id: 0,
      price: "$6.99",
    },
  ];

  return (
    <div className="plans">
      {products.map((product) => {
        return (
          <div className="plans__plan">
            <div className="plans__info">
              <h5>{product.name}</h5>
              <h6>{product.description}</h6>
              <h6>{product.price}</h6>
            </div>

            <button className="plans__subscribe">Subscribe</button>
          </div>
        );
      })}
    </div>
  );
};
